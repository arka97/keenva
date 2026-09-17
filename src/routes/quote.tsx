import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";
import { money } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCommerce, type PlacedQuote } from "@/store/commerce";

export const Route = createFileRoute("/quote")({ component: QuotePage });

function QuotePage() {
  const hydrated = useHydrated();
  const quote = useCommerce((s) => s.quote);
  const lastQuote = useCommerce((s) => s.lastQuote);
  const changeQuote = useCommerce((s) => s.changeQuote);
  const removeQuote = useCommerce((s) => s.removeQuote);
  const placeQuote = useCommerce((s) => s.placeQuote);
  const profile = useCommerce((s) => s.profile);
  const setMode = useCommerce((s) => s.setMode);
  const [done, setDone] = useState<PlacedQuote | null>(null);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [org, setOrg] = useState(profile.org);
  const [pi, setPi] = useState("");
  const [shipTo, setShipTo] = useState(profile.shipTo);
  const [neededBy, setNeededBy] = useState("");
  const [po, setPo] = useState("");
  const [poFile, setPoFile] = useState("");
  const [taxExempt, setTaxExempt] = useState(false);
  const [bulk, setBulk] = useState(false);
  const [note, setNote] = useState("");

  if (!hydrated) return <main className="mx-auto max-w-3xl px-4 py-16">Loading RFQ…</main>;

  const submitted = done ?? (quote.length === 0 ? lastQuote : null);

  function submit(e: FormEvent) {
    e.preventDefault();
    setMode("labs");
    const placed = placeQuote({
      name,
      email,
      org,
      pi,
      shipTo,
      neededBy,
      po,
      poFile,
      taxExempt,
      bulk,
      note,
    });
    if (placed) setDone(placed);
  }

  if (submitted && quote.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <p className="font-mono text-xs tracking-widest text-navy uppercase">Labs RFQ</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{submitted.id} received</h1>
        <p className="mt-3 text-muted">
          No payment was taken. Keenvaa replies from {company.email} with a PDF quote. Purchasing
          then issues a PO offline — wire, check, or invoice. There is no “pay this quote” button.
        </p>
        <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
          {submitted.lines.map((l) => (
            <li key={l.key} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {l.name} · {l.pack} × {l.qty}
              </span>
              <span className="text-subtle tabular-nums">list {money(l.qty * l.price)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          List total {money(submitted.listTotal)} — not an invoice.
          {submitted.poFile ? ` PO file attached: ${submitted.poFile}.` : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="navy" asChild>
            <Link to="/shop">Add more lines</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/account">View in account</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Labs RFQ</h1>
      <p className="mt-2 max-w-xl text-muted">
        Institutional path. Attach SKUs, a PO file if you have one, send the request.{" "}
        <strong className="font-medium text-ink">Zero monetary transaction on this site.</strong>
      </p>
      {quote.length === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-card p-10 text-center">
          <p className="font-semibold">No lines on this RFQ</p>
          <p className="mt-1 text-sm text-muted">Switch to Labs, then add products from the catalog.</p>
          <Button className="mt-4" variant="navy" asChild>
            <Link to="/shop">Browse catalog</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
            {quote.map((line) => (
              <li key={line.key} className="flex flex-wrap items-center gap-3 px-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{line.name}</p>
                  <p className="font-mono text-xs text-subtle">
                    {line.sku} · {line.pack} · {line.ship}
                  </p>
                </div>
                <div className="flex items-center rounded-md border border-line">
                  <button type="button" className="size-10" onClick={() => changeQuote(line.key, -1)}>
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                  <button type="button" className="size-10" onClick={() => changeQuote(line.key, 1)}>
                    +
                  </button>
                </div>
                <div className="w-28 text-right text-sm text-muted tabular-nums">
                  list {money(line.qty * line.price)}
                </div>
                <button type="button" className="text-xs text-danger" onClick={() => removeQuote(line.key)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-line bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="qn">Name</Label>
                <Input id="qn" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="qe">Work email</Label>
                <Input id="qe" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="qo">Billing entity</Label>
                <Input id="qo" required value={org} onChange={(e) => setOrg(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="pi">PI / lab head</Label>
                <Input id="pi" value={pi} onChange={(e) => setPi(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="st">Ship-to</Label>
                <Input id="st" value={shipTo} onChange={(e) => setShipTo(e.target.value)} placeholder="Dock, building, hours" />
              </div>
              <div>
                <Label htmlFor="nb">Needed by</Label>
                <Input id="nb" type="date" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="qp">PO number</Label>
                <Input id="qp" value={po} onChange={(e) => setPo(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="pf">Upload PO or tax-exempt file</Label>
                <Input
                  id="pf"
                  type="file"
                  onChange={(e) => setPoFile(e.target.files?.[0]?.name ?? "")}
                />
                {poFile ? <p className="mt-1 font-mono text-xs text-subtle">{poFile} (held in this browser)</p> : null}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={taxExempt} onChange={(e) => setTaxExempt(e.target.checked)} />
              Tax-exempt (certificate on file or attached)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={bulk} onChange={(e) => setBulk(e.target.checked)} />
              Distributor / OEM / bulk fill — same form, no dealer portal in v1
            </label>
            <div>
              <Label htmlFor="qt">Notes for quoting</Label>
              <Textarea
                id="qt"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Standing order, custom fill, dock hours…"
              />
            </div>
            <Button type="submit" variant="navy" className="w-full">
              Submit RFQ — no charge
            </Button>
          </form>
        </>
      )}
    </main>
  );
}
