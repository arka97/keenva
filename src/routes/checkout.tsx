import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { company } from "@/lib/company";
import { money } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { lineTotal, splitByShip, useCommerce, type PlacedOrder } from "@/store/commerce";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const hydrated = useHydrated();
  const cart = useCommerce((s) => s.cart);
  const lastOrder = useCommerce((s) => s.lastOrder);
  const placeOrder = useCommerce((s) => s.placeOrder);
  const profile = useCommerce((s) => s.profile);
  const [done, setDone] = useState<PlacedOrder | null>(null);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [org, setOrg] = useState(profile.org);
  const [card, setCard] = useState("4242 4242 4242 4242");

  if (!hydrated) return <main className="mx-auto max-w-xl px-4 py-16">Loading…</main>;

  const order = done ?? (cart.length === 0 ? lastOrder : null);
  const split = splitByShip(cart);

  function submit(e: FormEvent) {
    e.preventDefault();
    const placed = placeOrder({ name, email, org });
    if (placed) setDone(placed);
  }

  if (order && cart.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <p className="font-mono text-xs tracking-widest text-leaf uppercase">Demo order</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Order {order.id}</h1>
        <p className="mt-3 text-muted">
          Simulated checkout only — no payment was taken. Lot is{" "}
          <span className="font-semibold text-ink">pending assignment</span>. A human confirmation
          would come from {company.email} during {company.hours}.
        </p>
        <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
          {order.lines.map((l) => (
            <li key={l.key} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {l.name} · {l.pack} × {l.qty}
              </span>
              <span className="font-medium tabular-nums">{money(l.qty * l.price)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-semibold tabular-nums">{money(order.total)}</p>
        <p className="mt-1 text-sm text-muted">Confirmation would go to {order.email}.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/shop">Continue shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/account">Account</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Nothing to check out</h1>
        <Button className="mt-4" asChild>
          <Link to="/shop">Browse catalog</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Demo checkout</h1>
      <p className="mt-2 text-sm text-muted">
        Path B preview: card on www. This form does not process payments.
      </p>
      <p className="mt-4 text-lg font-semibold tabular-nums">{money(lineTotal(cart))}</p>
      {split.ambient.length && split.cold.length ? (
        <p className="mt-2 text-sm text-muted">
          Cart mixes ambient and cold-pack SKUs. They may ship as two parcels.
        </p>
      ) : null}
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-line bg-card p-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="org">Lab / organization</Label>
          <Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="card">Test card (not charged)</Label>
          <Input id="card" value={card} onChange={(e) => setCard(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">
          Place demo order
        </Button>
      </form>
    </main>
  );
}
