import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { money } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCommerce } from "@/store/commerce";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const hydrated = useHydrated();
  const profile = useCommerce((s) => s.profile);
  const setProfile = useCommerce((s) => s.setProfile);
  const orders = useCommerce((s) => s.orders);
  const quotes = useCommerce((s) => s.quotes);
  const lastOrder = useCommerce((s) => s.lastOrder);
  const lastQuote = useCommerce((s) => s.lastQuote);
  const [saved, setSaved] = useState(false);

  if (!hydrated) return <main className="mx-auto max-w-4xl px-4 py-16">Loading account…</main>;

  const shopOrders = orders.length ? orders : lastOrder ? [lastOrder] : [];
  const labQuotes = quotes.length ? quotes : lastQuote ? [lastQuote] : [];

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setProfile({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      org: String(fd.get("org") ?? ""),
      shipTo: String(fd.get("shipTo") ?? ""),
      taxExemptName: String(fd.get("tax") ?? ""),
    });
    setSaved(true);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Account</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Guest lab desk</h1>
      <p className="mt-2 max-w-2xl text-muted">
        No sign-in in this demo. Addresses, tax-exempt notes, Shop orders, and Labs quotes live in
        this browser. Guest checkout and guest RFQ stay allowed.
      </p>

      <form onSubmit={save} className="mt-8 grid gap-4 rounded-xl border border-line bg-card p-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={profile.name} />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email} />
        </div>
        <div>
          <Label htmlFor="org">Institution / billing entity</Label>
          <Input id="org" name="org" defaultValue={profile.org} />
        </div>
        <div>
          <Label htmlFor="tax">Tax-exempt certificate (name / number)</Label>
          <Input id="tax" name="tax" defaultValue={profile.taxExemptName} placeholder="ST-123 / pending" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="shipTo">Ship-to</Label>
          <Input id="shipTo" name="shipTo" defaultValue={profile.shipTo} placeholder="Dock, building, PI lab" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="outline">
            Save in this browser
          </Button>
          {saved ? <span className="ml-3 text-sm text-leaf">Saved.</span> : null}
        </div>
      </form>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">Shop orders</h2>
          {shopOrders.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              No demo orders yet.{" "}
              <Link to="/shop" className="text-spruce underline">
                Catalog
              </Link>
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {shopOrders.map((o) => (
                <li key={o.id} className="rounded-lg border border-line bg-card p-4 text-sm">
                  <p className="font-mono text-xs text-subtle">{o.id} · lot pending</p>
                  <p className="mt-1 font-semibold tabular-nums">{money(o.total)}</p>
                  <p className="text-muted">{o.lines.map((l) => `${l.name} ${l.pack}`).join(" · ")}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="text-xl font-semibold">Labs quotes</h2>
          {labQuotes.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              No RFQs yet.{" "}
              <Link to="/quote" className="text-spruce underline">
                Open RFQ
              </Link>
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {labQuotes.map((q) => (
                <li key={q.id} className="rounded-lg border border-line bg-card p-4 text-sm">
                  <p className="font-mono text-xs text-subtle">{q.id} · not an invoice</p>
                  <p className="mt-1 font-semibold tabular-nums">list {money(q.listTotal)}</p>
                  <p className="text-muted">{q.org || q.email}</p>
                  {q.poFile ? <p className="mt-1 text-xs text-subtle">PO file: {q.poFile}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
