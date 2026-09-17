import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productById } from "@/lib/catalog";

export type Mode = "shop" | "labs";

export type Line = {
  key: string;
  productId: string;
  name: string;
  sku: string;
  pack: string;
  price: number;
  qty: number;
  ship: "ambient" | "cold" | "dry-ice";
};

export type PlacedOrder = {
  id: string;
  kind: "shop";
  email: string;
  name: string;
  org: string;
  lines: Line[];
  total: number;
  placedAt: string;
  lot: "pending";
};

export type PlacedQuote = {
  id: string;
  kind: "labs";
  email: string;
  name: string;
  org: string;
  pi: string;
  shipTo: string;
  neededBy: string;
  po: string;
  poFile: string;
  taxExempt: boolean;
  bulk: boolean;
  note: string;
  lines: Line[];
  listTotal: number;
  placedAt: string;
};

export type Profile = {
  name: string;
  email: string;
  org: string;
  shipTo: string;
  taxExemptName: string;
};

type State = {
  mode: Mode;
  cart: Line[];
  quote: Line[];
  lastOrder: PlacedOrder | null;
  lastQuote: PlacedQuote | null;
  orders: PlacedOrder[];
  quotes: PlacedQuote[];
  profile: Profile;
  setMode: (mode: Mode) => void;
  setProfile: (p: Partial<Profile>) => void;
  addToCart: (productId: string, packLabel: string, qty?: number) => void;
  addToQuote: (productId: string, packLabel: string, qty?: number) => void;
  changeCart: (key: string, delta: number) => void;
  changeQuote: (key: string, delta: number) => void;
  removeCart: (key: string) => void;
  removeQuote: (key: string) => void;
  clearCart: () => void;
  clearQuote: () => void;
  placeOrder: (info: { name: string; email: string; org: string }) => PlacedOrder | null;
  placeQuote: (info: Omit<PlacedQuote, "id" | "kind" | "lines" | "listTotal" | "placedAt">) => PlacedQuote | null;
};

function lineFrom(productId: string, packLabel: string, qty: number): Line | null {
  const p = productById(productId);
  const pack = p?.packs.find((u) => u.label === packLabel);
  if (!p || !pack) return null;
  return {
    key: `${p.id}::${pack.label}`,
    productId: p.id,
    name: p.name,
    sku: p.sku,
    pack: pack.label,
    price: pack.price,
    qty,
    ship: p.ship,
  };
}

function upsert(list: Line[], next: Line): Line[] {
  const i = list.findIndex((l) => l.key === next.key);
  if (i === -1) return [...list, next];
  const copy = list.slice();
  copy[i] = { ...copy[i], qty: copy[i].qty + next.qty };
  return copy;
}

function bump(list: Line[], key: string, delta: number): Line[] {
  return list
    .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
    .filter((l) => l.qty > 0);
}

function rid(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

const emptyProfile: Profile = { name: "", email: "", org: "", shipTo: "", taxExemptName: "" };

export const useCommerce = create<State>()(
  persist(
    (set, get) => ({
      mode: "shop",
      cart: [],
      quote: [],
      lastOrder: null,
      lastQuote: null,
      orders: [],
      quotes: [],
      profile: emptyProfile,
      setMode: (mode) => set({ mode }),
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      addToCart: (productId, packLabel, qty = 1) => {
        const line = lineFrom(productId, packLabel, qty);
        if (!line) return;
        set((s) => ({ cart: upsert(s.cart, line) }));
      },
      addToQuote: (productId, packLabel, qty = 1) => {
        const line = lineFrom(productId, packLabel, qty);
        if (!line) return;
        set((s) => ({ quote: upsert(s.quote, line) }));
      },
      changeCart: (key, delta) => set((s) => ({ cart: bump(s.cart, key, delta) })),
      changeQuote: (key, delta) => set((s) => ({ quote: bump(s.quote, key, delta) })),
      removeCart: (key) => set((s) => ({ cart: s.cart.filter((l) => l.key !== key) })),
      removeQuote: (key) => set((s) => ({ quote: s.quote.filter((l) => l.key !== key) })),
      clearCart: () => set({ cart: [] }),
      clearQuote: () => set({ quote: [] }),
      placeOrder: (info) => {
        const { cart } = get();
        if (!cart.length) return null;
        const order: PlacedOrder = {
          id: rid("KNV"),
          kind: "shop",
          email: info.email,
          name: info.name,
          org: info.org,
          lines: cart,
          total: lineTotal(cart),
          placedAt: new Date().toISOString(),
          lot: "pending",
        };
        set((s) => ({
          lastOrder: order,
          cart: [],
          orders: [order, ...s.orders].slice(0, 12),
          profile: { ...s.profile, name: info.name, email: info.email, org: info.org },
        }));
        return order;
      },
      placeQuote: (info) => {
        const { quote } = get();
        if (!quote.length) return null;
        const q: PlacedQuote = {
          ...info,
          id: rid("RFQ"),
          kind: "labs",
          lines: quote,
          listTotal: lineTotal(quote),
          placedAt: new Date().toISOString(),
        };
        set((s) => ({
          lastQuote: q,
          quote: [],
          quotes: [q, ...s.quotes].slice(0, 12),
          profile: { ...s.profile, name: info.name, email: info.email, org: info.org, shipTo: info.shipTo },
        }));
        return q;
      },
    }),
    { name: "keenvaa-commerce" },
  ),
);

export function lineTotal(lines: Line[]) {
  return lines.reduce((n, l) => n + l.qty * l.price, 0);
}

export function countItems(lines: Line[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function hasCold(lines: Line[]) {
  return lines.some((l) => l.ship === "cold" || l.ship === "dry-ice");
}

export function hasAmbient(lines: Line[]) {
  return lines.some((l) => l.ship === "ambient");
}

export function splitByShip(lines: Line[]) {
  return {
    ambient: lines.filter((l) => l.ship === "ambient"),
    cold: lines.filter((l) => l.ship === "cold" || l.ship === "dry-ice"),
  };
}
