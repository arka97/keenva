import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/company";

export const Route = createFileRoute("/returns")({ component: ReturnsPage });

function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Legal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Returns and temperature</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          Unopened product, still in the labeled cold chain, may be returned within 7 days of
          delivery. Contact {company.email} before shipping anything back.
        </p>
        <p>
          Temperature excursion: if a cold-pack parcel arrives warm, photograph the pack-out and
          write the same day. Keenvaa will replace or credit at its discretion. After an excursion
          the lot is not returnable as unused.
        </p>
        <p>
          Ambient SKUs (KNV DNA Express) are not judged by ice remaining. Enzymes and master mixes
          are. Do not put both on one assumed ship method.
        </p>
        <p>{company.ruo}</p>
      </div>
    </main>
  );
}
