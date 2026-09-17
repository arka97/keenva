import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { company, directors, founder } from "@/lib/company";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <section className="bg-spruce-deep text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs tracking-widest text-leaf uppercase">Your partner in discovery</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">
            Translating molecular research into reagents you can trust
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-mist/85">
            {company.legal} develops molecular biology reagents for research and biopharmaceutical
            development. {company.ruo}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-mist/70">
            Long-term aim — labeled as pipeline, not a current product: FDA-reviewed molecular
            detection kits. Nothing on this catalog is a diagnostic, companion diagnostic, or
            cleared kit.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-widest text-spruce uppercase">Who we are</p>
          <h2 className="mt-2 text-2xl font-semibold">Deep scientific expertise, startup agility</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Led by Dr. Darshan Patel, a protein engineer with over 25 years of experience, the
            team pairs rigorous science with a short path from bench to bottle. Dr. Patel has
            guided Ph.D. students, authored 40+ publications and patents, and worked across
            academia and industry — including quality control of therapeutic proteins.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The KNV portfolio covers sample prep, PCR enzymes, master mixes, cloning, and cDNA.
            Manufactured in Bensalem, Pennsylvania. Ship-from is {company.shipStreet}. The
            registered office is {company.registeredStreet}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["25+", "years of expertise"],
            ["40+", "publications & patents"],
            ["2", "countries of R&D training"],
            ["USA", "manufactured & QC-tested"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-line bg-card p-5">
              <div className="text-2xl font-semibold text-spruce">{n}</div>
              <div className="mt-1 text-sm text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid overflow-hidden rounded-xl border border-line lg:grid-cols-[.8fr_1.2fr]">
          <div className="flex items-center justify-center bg-navy p-10">
            <img src="/brand/mark-white.png" alt="" className="h-36 w-auto" />
          </div>
          <div className="p-8">
            <p className="font-mono text-xs tracking-widest text-leaf uppercase">{founder.role}</p>
            <h2 className="mt-2 text-2xl font-semibold">{founder.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A protein engineer with 25+ years in molecular biology, protein research, and product
              development. Ph.D. in Biotechnology, Sardar Patel University; postdoctoral research
              at Chonnam National University. Industry experience includes quality control of
              monoclonal antibodies at Kashiv Biosciences, USA.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={founder.orcid} target="_blank" rel="noreferrer" className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce">
                ORCID
              </a>
              <a href={founder.scopus} target="_blank" rel="noreferrer" className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce">
                Scopus
              </a>
              <a href={founder.scholar} target="_blank" rel="noreferrer" className="rounded-md border border-line px-3 py-2 font-mono text-xs text-spruce">
                Google Scholar
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center text-2xl font-semibold">Leadership</h2>
        <p className="mt-2 text-center">
          <Link to="/about/leadership" className="text-sm font-semibold text-spruce">
            Full bios
          </Link>
        </p>
        <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
          {directors.map((d) => (
            <div key={d.name} className="flex gap-4 rounded-xl border border-line bg-card p-5">
              <div className="flex size-14 flex-none items-center justify-center rounded-full bg-mist font-semibold text-spruce">
                {d.initials}
              </div>
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm font-medium text-leaf">{d.role}</p>
                <p className="mt-1 text-sm text-muted">{d.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-line bg-mist">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12">
          <div>
            <h2 className="text-2xl font-semibold">Let's build a better tomorrow</h2>
            <p className="mt-1 text-muted">Product questions, RFQ, or a distribution partnership.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/contact">Contact</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/shop">Browse products</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
