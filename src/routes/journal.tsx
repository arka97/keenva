import { createFileRoute, Link } from "@tanstack/react-router";
import { LinkedInFeed } from "@/components/linkedin-feed";
import { posts } from "@/lib/journal";

export const Route = createFileRoute("/journal")({ component: JournalIndex });

function JournalIndex() {
  return (
    <main>
      <div className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="font-mono text-xs tracking-widest text-spruce uppercase">Journal</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Notes from Bensalem</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Four drafted notes — protocols and QC, not an empty blog. Scientific copy is conservative:
            no 5× yield, no diagnostic language, no 24/7 promise.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/journal/$slug"
            params={{ slug: post.slug }}
            className="rounded-xl border border-line bg-card p-6 transition-colors duration-200 hover:border-spruce"
          >
            <p className="font-mono text-xs tracking-widest text-spruce uppercase">
              {post.kicker} · {post.date} · {post.minutes} min
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.dek}</p>
          </Link>
        ))}
      </div>
      <LinkedInFeed />
    </main>
  );
}
