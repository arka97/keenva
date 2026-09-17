import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { ModeCallout } from "@/components/mode-callout";
import { Input } from "@/components/ui/input";
import {
  applications,
  families,
  products,
  searchProducts,
  type AppId,
  type FamilyId,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string; family?: string; app?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    family: typeof search.family === "string" ? search.family : undefined,
    app: typeof search.app === "string" ? search.app : undefined,
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q = "", family = "", app = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  let list = q ? searchProducts(q) : products;
  if (family) list = list.filter((p) => p.family === family);
  if (app) list = list.filter((p) => p.apps.includes(app as AppId));

  function patch(next: Partial<ShopSearch>) {
    navigate({
      search: { q, family, app, ...next },
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs text-subtle">
        <Link to="/" className="hover:text-spruce">
          Home
        </Link>{" "}
        / Catalog
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">KNV catalog</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Thirteen research-use reagents. Shop for list-price packs, or switch to Labs and
        attach lines to an RFQ.
      </p>
      <div className="mt-6">
        <ModeCallout />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Search</p>
            <Input
              value={q}
              placeholder="Name or SKU"
              onChange={(e) => patch({ q: e.target.value })}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Family</p>
            <div className="flex flex-col gap-1">
              <FilterChip active={!family} onClick={() => patch({ family: "" })}>
                All families
              </FilterChip>
              {families.map((f) => (
                <FilterChip
                  key={f.id}
                  active={family === f.id}
                  onClick={() => patch({ family: f.id as FamilyId })}
                >
                  {f.name}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
              Application
            </p>
            <div className="flex flex-col gap-1">
              <FilterChip active={!app} onClick={() => patch({ app: "" })}>
                All applications
              </FilterChip>
              {applications.map((a) => (
                <FilterChip key={a.id} active={app === a.id} onClick={() => patch({ app: a.id })}>
                  {a.name}
                </FilterChip>
              ))}
            </div>
          </div>
        </aside>
        <section>
          <p className="mb-4 font-mono text-xs text-subtle">{list.length} products</p>
          {list.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-card p-10 text-center">
              <p className="font-semibold">No matches</p>
              <p className="mt-1 text-sm text-muted">Clear filters or try another term.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-left text-sm",
        active ? "bg-spruce text-paper" : "text-ink hover:bg-mist",
      )}
    >
      {children}
    </button>
  );
}
