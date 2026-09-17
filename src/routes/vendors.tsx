import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { company, sdsIndex, vendors } from "@/lib/company";

export const Route = createFileRoute("/vendors")({ component: VendorsPage });

function VendorsPage() {
  const [sent, setSent] = useState<"partner" | "credit" | "coa" | null>(null);

  function submit(kind: "partner" | "credit" | "coa") {
    return (e: FormEvent) => {
      e.preventDefault();
      setSent(kind);
    };
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-navy uppercase">Vendor pack</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">What purchasing needs before a PO</h1>
      <p className="mt-2 max-w-2xl text-muted">
        W-9 and bank details on request after a quote is accepted. Credit approval is off-site.
        {company.ruo}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["Entity", `${company.legal}. ${company.corp}`],
          ["Ship-from", `${company.shipStreet}, ${company.shipCity}`],
          ["Registered office", `${company.registeredStreet}, ${company.registeredCity}`],
          ["Net-30", "Application below. Approval is not automatic."],
        ].map(([k, v]) => (
          <article key={k} className="rounded-xl border border-line bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">{k}</p>
            <p className="mt-2 text-sm leading-relaxed">{v}</p>
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">SDS index</h2>
        <p className="mt-2 text-sm text-muted">
          Current revision on request from {company.email}. Full list also lives on{" "}
          <Link to="/support" className="text-spruce underline">
            Support
          </Link>
          .
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {sdsIndex.map((row) => (
            <li key={row.sku} className="rounded-md border border-line bg-card px-4 py-3 text-sm">
              <span className="font-mono text-xs text-subtle">{row.sku}</span> {row.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Authorized channels</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {vendors.map((v) => (
            <article key={v.id} className="rounded-xl border border-line bg-card p-5">
              <Badge>{v.type}</Badge>
              <h3 className="mt-3 text-lg font-semibold">{v.name}</h3>
              <p className="mt-1 text-sm text-muted">{v.region}</p>
              <p className="mt-3 text-sm">{v.notes}</p>
              <p className="mt-4 font-mono text-xs text-leaf">{v.status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-3">
        <FormCard
          title="CoA by lot"
          body="Name catalog number and lot. Demo only — nothing is emailed."
          sent={sent === "coa"}
          onSubmit={submit("coa")}
          cta="Request CoA"
        >
          <Label htmlFor="lot">Lot / SKU</Label>
          <Input id="lot" required placeholder="KNV-1003 · lot" />
        </FormCard>
        <FormCard
          title="Net-30 application"
          body="Credit review is offline. Bank details are not published here."
          sent={sent === "credit"}
          onSubmit={submit("credit")}
          cta="Apply"
        >
          <Label htmlFor="cn">Accounts payable contact</Label>
          <Input id="cn" required />
          <Label htmlFor="ce">AP email</Label>
          <Input id="ce" type="email" required className="mt-3" />
        </FormCard>
        <FormCard
          title="Become a distributor / OEM"
          body="Coverage, cold-chain, existing accounts. Same form as bulk RFQ — no portal in v1."
          sent={sent === "partner"}
          onSubmit={submit("partner")}
          cta="Apply"
        >
          <Label htmlFor="vn">Company</Label>
          <Input id="vn" required />
          <Label htmlFor="vr">Territory</Label>
          <Input id="vr" className="mt-3" />
          <Label htmlFor="vt">Notes</Label>
          <Textarea id="vt" className="mt-3" />
        </FormCard>
      </section>
    </main>
  );
}

function FormCard({
  title,
  body,
  sent,
  onSubmit,
  cta,
  children,
}: {
  title: string;
  body: string;
  sent: boolean;
  onSubmit: (e: FormEvent) => void;
  cta: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
      {sent ? (
        <p className="mt-4 text-sm text-leaf">Captured in this browser. Nothing left Keenvaa’s server.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-2">
          {children}
          <Button type="submit" variant="navy" className="mt-3">
            {cta}
          </Button>
        </form>
      )}
    </div>
  );
}
