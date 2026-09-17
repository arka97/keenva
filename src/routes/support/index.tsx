import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, FlaskConical, Shield, Thermometer } from "lucide-react";
import { sdsIndex } from "@/lib/company";
import { company } from "@/lib/company";

export const Route = createFileRoute("/support/")({ component: SupportHub });

const cards = [
  {
    to: "/support/cloning" as const,
    icon: FlaskConical,
    title: "Cloning workflow",
    body: "Seventeen steps, gene to expression. Steps that map to a KNV SKU link into the catalog.",
  },
  {
    to: "/journal" as const,
    icon: FileText,
    title: "Protocols & journal",
    body: "DNA Express A–E, Mastermix cycling, and QC notes. Drafted, not an empty blog.",
  },
  {
    to: "/quality" as const,
    icon: Shield,
    title: "CoA by lot",
    body: "Email the catalog number and lot. We send the certificate — there is no public CoA vault in v1.",
  },
  {
    to: "/shipping" as const,
    icon: Thermometer,
    title: "Ambient vs cold pack",
    body: "DNA Express is room-temp. Enzymes ship on cold pack. One method cannot cover both.",
  },
];

function SupportHub() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Support</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Protocols, documents, a named inbox</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {company.email} · {company.phone} · {company.hours}. Tech and commercial share one inbox in
        this demo. No 24/7, no fake live chat.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="rounded-xl border border-line bg-card p-5 transition-colors duration-200 hover:border-spruce"
          >
            <c.icon className="size-5 text-spruce" />
            <h2 className="mt-3 text-lg font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-muted">{c.body}</p>
          </Link>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="text-xl font-semibold">SDS index</h2>
        <p className="mt-2 text-sm text-muted">
          Files are listed so procurement can see they exist. This demo does not host PDFs — request
          a current revision from {company.email}.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist font-mono text-xs tracking-wide text-subtle uppercase">
              <tr>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Reagent</th>
                <th className="px-4 py-3">SDS</th>
                <th className="px-4 py-3">Rev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sdsIndex.map((row) => (
                <tr key={row.sku}>
                  <td className="px-4 py-3 font-mono text-xs">{row.sku}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-muted">{row.file}</td>
                  <td className="px-4 py-3 text-muted">{row.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
