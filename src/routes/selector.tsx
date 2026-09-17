import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { assays, recommend, type AssayId } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/selector")({ component: SelectorPage });

const instruments = [
  { id: "high-rox" as const, name: "High ROX", hint: "ABI 7000 / 7300 / 7900 / StepOne" },
  { id: "low-rox" as const, name: "Low ROX", hint: "ABI 7500, QuantStudio, Stratagene" },
  { id: "no-rox" as const, name: "No ROX", hint: "Bio-Rad CFX, Roche, Rotor-Gene" },
];

function SelectorPage() {
  const [assay, setAssay] = useState<AssayId | null>(null);
  const [instrument, setInstrument] = useState<(typeof instruments)[number]["id"] | null>(null);
  const ready = assay && (assay !== "qpcr" || instrument);
  const hits = ready ? recommend(assay, instrument ?? undefined) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Selector</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Match a reagent to the assay</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Two questions. Recommendations from the KNV line only — no third-party substitutions.
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">1. What are you running?</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {assays.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setAssay(a.id);
                if (a.id !== "qpcr") setInstrument(null);
              }}
              className={cn(
                "rounded-xl border p-4 text-left",
                assay === a.id ? "border-spruce bg-mist" : "border-line bg-card hover:border-spruce",
              )}
            >
              <p className="font-semibold">{a.name}</p>
              <p className="mt-1 text-sm text-muted">{a.hint}</p>
            </button>
          ))}
        </div>
      </section>

      {assay === "qpcr" ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold">2. Instrument ROX requirement</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {instruments.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => setInstrument(i.id)}
                className={cn(
                  "rounded-xl border p-4 text-left",
                  instrument === i.id ? "border-navy bg-mist" : "border-line bg-card hover:border-navy",
                )}
              >
                <p className="font-semibold">{i.name}</p>
                <p className="mt-1 text-sm text-muted">{i.hint}</p>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {ready ? (
        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Recommended</h2>
            <Button variant="ghost" onClick={() => { setAssay(null); setInstrument(null); }}>
              Reset
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hits.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
