import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FlaskConical, Shield, Truck, Wrench } from "lucide-react";
import { LinkedInFeed } from "@/components/linkedin-feed";
import { ModeCallout } from "@/components/mode-callout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { families, featuredProducts, products } from "@/lib/catalog";
import { company, founder } from "@/lib/company";
import { posts } from "@/lib/journal";
import { useCommerce } from "@/store/commerce";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const mode = useCommerce((s) => s.mode);
  const featured = featuredProducts().slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-helix/10" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-spruce uppercase">
              Molecular biology reagents · Bensalem, PA
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              KNV reagents specified for the bench, not the catalog photograph.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Sample prep, Taq, master mixes, ligases, cDNA — manufactured by protein scientists.
              Shop pays the list. Labs requests a quote. {company.ruo}
            </p>
            <div className="mt-6">
              <ModeCallout />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/shop">Browse products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={mode === "labs" ? "/quote" : "/selector"}>
                  {mode === "labs" ? "Start an RFQ" : "Find a reagent"}
                </Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {["Lot QC + CoA on request", "Ambient or cold-chain, stated", "Two baskets: cart and RFQ"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-leaf" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="relative min-h-96 overflow-hidden rounded-xl bg-spruce-deep p-8 text-paper">
            <img src="/brand/mark-white.png" alt="" className="mx-auto h-52 w-auto opacity-90" />
            <div className="absolute top-5 left-5 rounded-md bg-card px-3 py-2 text-ink shadow-sm">
              <p className="font-mono text-xs text-spruce">TAQ · 5 U/µL</p>
              <p className="text-sm font-semibold">Activity-assayed lots</p>
            </div>
            <div className="absolute right-5 bottom-5 rounded-md bg-card px-3 py-2 text-ink shadow-sm">
              <p className="font-mono text-xs text-leaf">KNV DNA EXPRESS</p>
              <p className="text-sm font-semibold">Lysate → PCR · 10 min</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {[
            ["25+", "years protein-engineering expertise"],
            ["40+", "publications & patents"],
            [String(products.length), "core reagents in the KNV line"],
            ["RUO", "research use only — not diagnostic"],
          ].map(([n, l], i) => (
            <div key={l} className={`px-6 py-8 text-center ${i < 3 ? "border-r border-line" : ""}`}>
              <div className="text-3xl font-semibold text-spruce">{n}</div>
              <div className="mt-1 text-sm text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">Catalog</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Five families</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-semibold text-spruce sm:flex">
            All products <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((f) => {
            const n = products.filter((p) => p.family === f.id).length;
            return (
              <Link
                key={f.id}
                to="/shop"
                search={{ family: f.id }}
                className="rounded-xl border border-line bg-card p-5 transition-colors duration-200 hover:border-spruce"
              >
                <p className="font-mono text-xs text-subtle">{n} products</p>
                <h3 className="mt-2 text-lg font-semibold">{f.name}</h3>
                <p className="mt-1 text-sm text-muted">{f.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="overflow-hidden rounded-xl bg-spruce-deep text-paper">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="font-mono text-xs tracking-widest text-leaf uppercase">Flagship</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">KNV DNA Express</h2>
              <p className="mt-3 max-w-md text-mist/85">
                Single-buffer genomic DNA prep. Protocols A–E: heat lysis, mechanical lysis,
                phenol-chloroform, spin column, magnetic beads. Lysate to PCR in 10 minutes.
              </p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  "Direct PCR from crude lysate",
                  "Single buffer, five workflows",
                  "PEG-formate compatible",
                  "Plants · animals · microbes",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-leaf" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="leaf" asChild>
                  <Link to="/products/$id" params={{ id: "knv-dna-express" }}>
                    Open product
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-paper/20 bg-transparent text-paper hover:border-paper hover:bg-paper/10 hover:text-paper"
                  asChild
                >
                  <Link to="/journal/$slug" params={{ slug: "lysate-to-pcr" }}>
                    Protocol note
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 self-center">
              {[
                ["10", "minutes"],
                ["5", "workflows"],
                ["1", "buffer"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-lg bg-paper/10 px-3 py-6 text-center">
                  <div className="text-3xl font-semibold text-leaf">{n}</div>
                  <div className="mt-1 text-xs text-mist/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">Best sellers</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Four featured SKUs</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-spruce">
            All products
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="overflow-hidden rounded-xl border border-line bg-card lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 lg:p-10">
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">Workflow</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Cloning, gene to expression</h2>
            <p className="mt-3 max-w-md text-muted">
              Seventeen steps. Amplify, ligate, screen colonies. The poster is a map — each SKU
              step opens the product, not a stock photograph.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/support/cloning">Open the 17-step page</Link>
            </Button>
          </div>
          <Link to="/support/cloning" className="block min-h-56 overflow-hidden bg-mist">
            <img
              src="/brand/molecular-cloning-workflow.jpg"
              alt="Molecular cloning workflow poster"
              className="h-full w-full object-cover object-top"
            />
          </Link>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">Why Keenvaa</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Bench reagents, priced for the bench.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                [Shield, "Lot quality", "Activity-assayed lots. Certificates of analysis on request."],
                [FlaskConical, "Honest list prices", "Direct-from-manufacturer packs. Labs RFQ for volume."],
                [Truck, "Cold chain when needed", "Ambient DNA Express. Enzymes ship on cold pack."],
                [Wrench, "OEM & custom", "Private-label and custom formulations via RFQ — never charged here."],
              ] as const
            ).map(([Icon, title, body]) => (
              <div key={title} className="rounded-xl border border-line p-5">
                <Icon className="size-5 text-spruce" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">Journal</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Four drafted notes</h2>
          </div>
          <Link to="/journal" className="text-sm font-semibold text-spruce">
            All notes
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/journal/$slug"
              params={{ slug: post.slug }}
              className="rounded-xl border border-line bg-card p-5 transition-colors duration-200 hover:border-spruce"
            >
              <p className="font-mono text-xs tracking-widest text-spruce uppercase">
                {post.kicker} · {post.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-1 text-sm text-muted">{post.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <LinkedInFeed />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-mist p-8">
            <p className="font-mono text-xs tracking-widest text-leaf uppercase">Labs RFQ</p>
            <h3 className="mt-2 text-2xl font-semibold">Core facility or purchasing office?</h3>
            <p className="mt-3 max-w-md text-muted">
              Build an RFQ. Attach a PO. Keenvaa returns a quote. Your institution pays off-site.
            </p>
            <Button className="mt-6" variant="leaf" asChild>
              <Link to="/quote">Request a quote</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-line bg-card p-8">
            <p className="font-mono text-xs tracking-widest text-navy uppercase">Vendors</p>
            <h3 className="mt-2 text-2xl font-semibold">W-9, SDS index, Net-30 application</h3>
            <p className="mt-3 max-w-md text-muted">
              Procurement pages live on /vendors. Credit approval is off-site. No payment link.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/vendors">Vendor hub</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid overflow-hidden rounded-xl border border-line bg-card lg:grid-cols-2">
          <div className="flex items-center justify-center bg-navy p-10">
            <img src="/brand/mark-white.png" alt="" className="h-40 w-auto" />
          </div>
          <div className="p-8 lg:p-10">
            <p className="font-mono text-xs tracking-widest text-leaf uppercase">Founder-led science</p>
            <h2 className="mt-2 text-2xl font-semibold">{founder.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{founder.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={founder.orcid} className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce" target="_blank" rel="noreferrer">
                ORCID
              </a>
              <a href={founder.scopus} className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce" target="_blank" rel="noreferrer">
                Scopus
              </a>
              <a href={founder.scholar} className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce" target="_blank" rel="noreferrer">
                Scholar
              </a>
            </div>
            <Link to="/about/leadership" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-spruce">
              Leadership <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
