import { createFileRoute, Link } from "@tanstack/react-router";
import { company, directors, founder } from "@/lib/company";

export const Route = createFileRoute("/about/leadership")({ component: LeadershipPage });

function LeadershipPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="font-mono text-xs text-subtle">
        <Link to="/about" className="hover:text-spruce">
          About
        </Link>{" "}
        / Leadership
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Leadership</h1>
      <p className="mt-3 text-muted">{company.corp}</p>

      <article className="mt-8 rounded-xl border border-line bg-card p-6">
        <p className="font-mono text-xs tracking-widest text-leaf uppercase">{founder.role}</p>
        <h2 className="mt-2 text-2xl font-semibold">{founder.name}</h2>
        <p className="mt-3 leading-relaxed text-muted">{founder.blurb}</p>
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
      </article>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {directors.map((d) => (
          <article key={d.name} className="rounded-xl border border-line bg-card p-6">
            <div className="flex size-12 items-center justify-center rounded-full bg-mist font-mono text-sm font-semibold text-spruce">
              {d.initials}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{d.name}</h2>
            <p className="text-sm text-leaf">{d.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
