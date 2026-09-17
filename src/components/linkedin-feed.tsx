import { Link } from "@tanstack/react-router";
import { linkedInCards } from "@/lib/linkedin";
import { company } from "@/lib/company";

export function LinkedInFeed({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "mx-auto max-w-6xl px-4 py-16"}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-helix uppercase">LinkedIn</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">From the bench</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Static company cards for this demo. A live LinkedIn widget is a v2 item — these three
            notes are the v1 stand-in, drafted from the flyers, not a scraped feed.
          </p>
        </div>
        <a
          href={company.linkedin}
          className="text-sm font-semibold text-spruce"
          target="_blank"
          rel="noreferrer"
        >
          Company page
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {linkedInCards.map((card) => (
          <article key={card.id} className="flex flex-col rounded-xl border border-line bg-card p-5">
            <p className="font-mono text-xs text-subtle">{card.date} · Keenvaa Biolabs</p>
            <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.body}</p>
            {card.href.startsWith("/products/") ? (
              <Link
                to="/products/$id"
                params={{ id: card.href.replace("/products/", "") }}
                className="mt-4 text-sm font-semibold text-spruce"
              >
                Open SKU
              </Link>
            ) : (
              <Link to="/about" className="mt-4 text-sm font-semibold text-spruce">
                About Keenvaa
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
