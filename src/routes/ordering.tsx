import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCommerce } from "@/store/commerce";

export const Route = createFileRoute("/ordering")({ component: OrderingPage });

function OrderingPage() {
  const setMode = useCommerce((s) => s.setMode);
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Ordering</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Two rails. One catalog.</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-card p-5">
          <p className="font-mono text-xs text-spruce uppercase">Shop</p>
          <h2 className="mt-2 text-xl font-semibold">Card, list prices</h2>
          <p className="mt-2 text-sm text-muted">
            Scientist or small lab buys published pack sizes. This demo simulates checkout and
            does not charge a real card.
          </p>
          <Button className="mt-4" onClick={() => setMode("shop")} asChild>
            <Link to="/shop">Open Shop</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-line bg-card p-5">
          <p className="font-mono text-xs text-navy uppercase">Labs</p>
          <h2 className="mt-2 text-xl font-semibold">RFQ then PO</h2>
          <p className="mt-2 text-sm text-muted">
            Core facilities and purchasing offices attach SKUs, receive a quote, and issue a PO
            offline. No payment is collected on this website.
          </p>
          <Button className="mt-4" variant="navy" onClick={() => setMode("labs")} asChild>
            <Link to="/quote">Open RFQ</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
