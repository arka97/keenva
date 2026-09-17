import { createFileRoute, Link } from "@tanstack/react-router";
import { applications, productsInApp } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/applications")({ component: ApplicationsPage });

function ApplicationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Applications</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Reagents by workflow</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Research workflows only. Nothing here is offered as a diagnostic or clinical kit.
      </p>
      <div className="mt-8 space-y-14">
        {applications.map((app) => {
          const list = productsInApp(app.id);
          return (
            <section key={app.id} id={app.id}>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="text-2xl font-semibold">{app.name}</h2>
                <Link
                  to="/shop"
                  search={{ q: "", family: "", app: app.id }}
                  className="text-sm font-semibold text-spruce"
                >
                  {list.length} products
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
