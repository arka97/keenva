import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { cn, money } from "@/lib/utils";
import { useCommerce } from "@/store/commerce";

export function AddToBag({ product }: { product: Product }) {
  const mode = useCommerce((s) => s.mode);
  const addToCart = useCommerce((s) => s.addToCart);
  const addToQuote = useCommerce((s) => s.addToQuote);
  const [pack, setPack] = useState(product.packs[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const unit = product.packs.find((p) => p.label === pack) ?? product.packs[0];
  const popular = product.packs[1]?.label;

  function cart() {
    if (!unit) return;
    addToCart(product.id, unit.label, qty);
    toast.success(`Added ${qty} × ${product.name} (${unit.label}) to Shop cart`);
  }

  function quote() {
    if (!unit) return;
    addToQuote(product.id, unit.label, qty);
    toast.success(`Added ${qty} × ${product.name} (${unit.label}) to Labs RFQ`);
  }

  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">{money(unit.price)}</span>
        <span className="text-sm text-muted">per {unit.label}</span>
      </div>
      <p className="mt-2 text-xs text-muted">
        List price. Shop charges on a simulated card. Labs uses this number as RFQ reference — never
        charged here.
      </p>
      <p className="mt-5 font-mono text-xs tracking-wide text-subtle uppercase">Pack size</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.packs.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPack(p.label)}
            className={cn(
              "flex min-h-11 flex-col rounded-md border px-3 py-2 text-left",
              pack === p.label ? "border-spruce bg-mist" : "border-line bg-card hover:border-spruce",
            )}
          >
            <span className="text-sm font-semibold">{p.label}</span>
            <span className="font-mono text-xs text-subtle tabular-nums">{money(p.price)}</span>
            {p.label === popular ? (
              <span className="mt-1 font-mono text-xs text-spruce">Common pack</span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <div className="flex h-11 items-center rounded-md border border-line">
          <button type="button" className="size-11 text-lg" onClick={() => setQty((n) => Math.max(1, n - 1))}>
            −
          </button>
          <span className="min-w-8 text-center font-semibold tabular-nums">{qty}</span>
          <button type="button" className="size-11 text-lg" onClick={() => setQty((n) => n + 1)}>
            +
          </button>
        </div>
        {mode === "labs" ? (
          <Button className="flex-1" variant="navy" onClick={quote}>
            Add to RFQ
          </Button>
        ) : (
          <Button className="flex-1" onClick={cart}>
            Add to cart
          </Button>
        )}
      </div>
      <Button className="mt-2 w-full" variant="outline" onClick={mode === "labs" ? cart : quote}>
        {mode === "labs" ? "Also add to Shop cart" : "Also add to Labs RFQ"}
      </Button>
    </div>
  );
}
