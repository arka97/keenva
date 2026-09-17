import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { cloningSteps } from "@/lib/cloning";
import { productById } from "@/lib/catalog";

export const Route = createFileRoute("/support/cloning")({ component: CloningPage });

function CloningPage() {
  const featured = ["pfu-pol", "t4-ligase-hc", "knv-mastermix", "ladder-100"]
    .map((id) => productById(id))
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Support · 17 steps</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Molecular cloning — gene to expression</h1>
      <p className="mt-2 max-w-2xl text-muted">
        The poster is the v1 content layer, not a hero bitmap. Steps that map to a KNV SKU open the
        product. Research use only.
      </p>
      <img
        src="/brand/molecular-cloning-workflow.jpg"
        alt="Molecular cloning workflow from gene to expression"
        className="mt-8 w-full rounded-xl border border-line"
      />
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cloningSteps.map((step) => (
          <li key={step.n} className="flex flex-col rounded-xl border border-line bg-card p-4">
            <p className="font-mono text-xs text-subtle">{String(step.n).padStart(2, "0")}</p>
            <h2 className="mt-1 font-semibold">{step.title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted">{step.body}</p>
            {step.productIds.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {step.productIds.map((id) => {
                  const p = productById(id);
                  if (!p) return null;
                  return (
                    <Link
                      key={id}
                      to="/products/$id"
                      params={{ id }}
                      className="rounded-md border border-line px-2 py-1 font-mono text-xs text-spruce hover:border-spruce"
                    >
                      {p.sku}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 font-mono text-xs text-subtle">Not a KNV SKU</p>
            )}
          </li>
        ))}
      </ol>
      <h2 className="mt-12 text-xl font-semibold">Matching reagents</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (p ? <ProductCard key={p.id} product={p} /> : null))}
      </div>
      <Button className="mt-8" asChild>
        <Link to="/selector">Use the selector</Link>
      </Button>
    </main>
  );
}
