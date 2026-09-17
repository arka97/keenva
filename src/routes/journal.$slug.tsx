import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { productById } from "@/lib/catalog";
import { postBySlug, posts } from "@/lib/journal";

export const Route = createFileRoute("/journal/$slug")({ component: JournalPost });

function JournalPost() {
  const { slug } = Route.useParams();
  const post = postBySlug(slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Note not found</h1>
        <Link to="/journal" className="mt-4 inline-block text-spruce underline">
          Back to journal
        </Link>
      </main>
    );
  }
  const related = post.related.map((id) => productById(id)).filter(Boolean);
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-xs text-subtle">
        <Link to="/journal" className="hover:text-spruce">
          Journal
        </Link>{" "}
        / {post.kicker}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-lg text-muted">{post.dek}</p>
      <p className="mt-2 font-mono text-xs text-subtle">
        {post.date} · {post.minutes} min read
      </p>
      <div className="mt-10 space-y-8">
        {post.body.map((block) => (
          <section key={block.p}>
            {block.h ? <h2 className="mb-2 text-xl font-semibold">{block.h}</h2> : null}
            <p className="leading-relaxed text-muted">{block.p}</p>
          </section>
        ))}
      </div>
      {related.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Related reagents</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (p ? <ProductCard key={p.id} product={p} /> : null))}
          </div>
        </section>
      ) : null}
      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-sm font-semibold">More notes</h2>
        <ul className="mt-3 space-y-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to="/journal/$slug" params={{ slug: p.slug }} className="text-spruce hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
