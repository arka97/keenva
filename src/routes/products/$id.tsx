import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Shield, Snowflake, Thermometer } from "lucide-react";
import { AddToBag } from "@/components/add-to-bag";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vial } from "@/components/vial";
import { ModeCallout } from "@/components/mode-callout";
import { families, productById, relatedProducts } from "@/lib/catalog";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  component: ProductPage,
});

const tabs = ["Overview", "Protocol", "Documents", "Specs"] as const;

function ProductPage() {
  const { id } = Route.useParams();
  const product = productById(id);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  if (!product) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-spruce underline">
          Back to catalog
        </Link>
      </main>
    );
  }
  const family = families.find((f) => f.id === product.family);
  const related = relatedProducts(product.id);

  return (
    <main>
      <div className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 font-mono text-xs text-subtle">
          <Link to="/" className="hover:text-spruce">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-spruce">
            Products
          </Link>{" "}
          / {product.name}
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2">
        <div>
          <div className="flex min-h-80 items-center justify-center rounded-xl border border-line bg-helix/10">
            <Vial family={product.family} className="h-44 w-32" />
          </div>
          {product.id === "knv-dna-express" ? (
            <a
              href="/brand/knv-dna-express-infographic.jpg"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block overflow-hidden rounded-xl border border-line"
            >
              <img
                src="/brand/knv-dna-express-infographic.jpg"
                alt="KNV DNA Express workflows A–E"
                className="h-48 w-full object-cover object-top"
              />
            </a>
          ) : null}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{family?.name}</Badge>
            <Badge className="font-mono">{product.sku}</Badge>
            {product.badge ? <Badge className="border-spruce text-spruce">{product.badge}</Badge> : null}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">{product.sub}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              {product.ship === "ambient" ? (
                <Thermometer className="size-4 text-spruce" />
              ) : (
                <Snowflake className="size-4 text-navy" />
              )}
              {product.shipNote}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="size-4 text-spruce" />
              Lot QC · CoA on request
            </span>
          </div>
          {product.instruments ? (
            <div className="mt-4 rounded-lg border border-helix/20 bg-helix/10 p-3 text-sm">
              <p className="font-semibold text-navy">Instrument note</p>
              <p className="mt-1 text-muted">
                High ROX · ABI 7000 / 7300 / 7900 / StepOne. Low ROX · ABI 7500, QuantStudio,
                Stratagene. No ROX · Bio-Rad CFX, Roche LightCycler, Qiagen Rotor-Gene, Eppendorf.
              </p>
            </div>
          ) : null}
          <div className="mt-6">
            <ModeCallout />
          </div>
          <div className="mt-6">
            <AddToBag product={product} />
          </div>
          <p className="mt-4 text-xs text-subtle">{company.ruo}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex flex-wrap gap-1 border-b border-line">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "h-11 px-4 text-sm font-semibold",
                tab === t ? "border-b-2 border-spruce text-spruce" : "text-muted hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-8 py-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {tab === "Overview" ? (
              <ul className="space-y-2 text-sm leading-relaxed text-muted">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            ) : null}
            {tab === "Protocol" ? (
              product.protocol ? (
                <div className="space-y-4">
                  {product.protocol.map((block) => (
                    <div key={block.title} className="rounded-lg border border-line bg-card p-4">
                      <h3 className="font-semibold">{block.title}</h3>
                      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                        {block.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">
                  Insert protocol ships with the lot. Request a current PDF from {company.email}.
                </p>
              )
            ) : null}
            {tab === "Documents" ? (
              <div className="space-y-3 text-sm text-muted">
                <p>CoA is issued per lot — name the catalog number and lot when you write.</p>
                <p>SDS revisions are listed on Support. This demo does not host PDFs.</p>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    <FileText className="size-4" /> Request CoA / SDS
                  </Link>
                </Button>
              </div>
            ) : null}
            {tab === "Specs" ? (
              <dl className="divide-y divide-line text-sm">
                {[
                  ["Catalog no.", product.sku],
                  ["Family", family?.name ?? ""],
                  ["Grade", "Molecular biology, RUO"],
                  ["QC", "Activity assay + purity"],
                  ["Storage", product.storage],
                  ["Shipping", product.shipNote],
                  ["Origin", `${company.shipStreet}, ${company.shipCity}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-subtle">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          <aside className="overflow-hidden rounded-xl border border-line bg-card h-fit">
            <div className="border-b border-line bg-mist px-5 py-3 font-semibold">At a glance</div>
            <dl className="divide-y divide-line px-5 text-sm">
              {[
                ["Storage", product.storage],
                ["Ship", product.shipNote],
                ["Packs", product.packs.map((p) => p.label).join(" · ")],
              ].map(([k, v]) => (
                <div key={k} className="py-3">
                  <dt className="font-mono text-xs text-subtle uppercase">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
      {related.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="mb-4 text-xl font-semibold">Related products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
