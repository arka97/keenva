import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { countItems, lineTotal, splitByShip, useCommerce, type Line } from "@/store/commerce";

export const Route = createFileRoute("/cart")({ component: CartPage });

function LineRow({
  line,
  onDelta,
  onRemove,
}: {
  line: Line;
  onDelta: (d: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-4">
      <div className="min-w-0 flex-1">
        <Link to="/products/$id" params={{ id: line.productId }} className="font-semibold hover:text-spruce">
          {line.name}
        </Link>
        <p className="font-mono text-xs text-subtle">
          {line.sku} · {line.pack} · {line.ship}
        </p>
      </div>
      <div className="flex items-center rounded-md border border-line">
        <button type="button" className="size-10" onClick={() => onDelta(-1)}>
          −
        </button>
        <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
        <button type="button" className="size-10" onClick={() => onDelta(1)}>
          +
        </button>
      </div>
      <div className="w-24 text-right font-semibold tabular-nums">{money(line.qty * line.price)}</div>
      <button type="button" className="text-xs text-danger" onClick={onRemove}>
        Remove
      </button>
    </li>
  );
}

function CartPage() {
  const hydrated = useHydrated();
  const cart = useCommerce((s) => s.cart);
  const changeCart = useCommerce((s) => s.changeCart);
  const removeCart = useCommerce((s) => s.removeCart);
  const setMode = useCommerce((s) => s.setMode);
  const addToQuote = useCommerce((s) => s.addToQuote);

  if (!hydrated) {
    return <main className="mx-auto max-w-3xl px-4 py-16">Loading cart…</main>;
  }

  const total = lineTotal(cart);
  const n = countItems(cart);
  const { ambient, cold } = splitByShip(cart);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Shop cart</h1>
      <p className="mt-2 text-sm text-muted">
        Shop checkout is simulated. Labs RFQ is a second basket — it is not emptied when you pay
        here.
      </p>
      {cart.length === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-card p-10 text-center">
          <p className="font-semibold">Your cart is empty</p>
          <Button className="mt-4" asChild>
            <Link to="/shop">Browse catalog</Link>
          </Button>
        </div>
      ) : (
        <>
          {ambient.length ? (
            <section className="mt-6">
              <h2 className="mb-2 font-mono text-xs tracking-widest text-spruce uppercase">
                Ambient parcel · DNA Express
              </h2>
              <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                {ambient.map((line) => (
                  <LineRow
                    key={line.key}
                    line={line}
                    onDelta={(d) => changeCart(line.key, d)}
                    onRemove={() => removeCart(line.key)}
                  />
                ))}
              </ul>
            </section>
          ) : null}
          {cold.length ? (
            <section className="mt-6">
              <h2 className="mb-2 font-mono text-xs tracking-widest text-navy uppercase">
                Cold-pack parcel · −20 °C storage
              </h2>
              <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
                {cold.map((line) => (
                  <LineRow
                    key={line.key}
                    line={line}
                    onDelta={(d) => changeCart(line.key, d)}
                    onRemove={() => removeCart(line.key)}
                  />
                ))}
              </ul>
            </section>
          ) : null}
          {ambient.length && cold.length ? (
            <p className="mt-4 text-sm text-muted">
              These cannot share one ship method. Ambient DNA Express may leave as a separate parcel
              from enzymes.
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">{n} items</p>
              <p className="text-2xl font-semibold tabular-nums">{money(total)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  cart.forEach((l) => addToQuote(l.productId, l.pack, l.qty));
                  setMode("labs");
                }}
              >
                Copy lines to Labs RFQ
              </Button>
              <Button asChild>
                <Link to="/checkout">Demo checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
