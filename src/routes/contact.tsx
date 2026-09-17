import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
      <p className="mt-2 max-w-xl text-muted">
        Product questions, Labs RFQ follow-up, technical support, or distribution. This demo
        stores nothing on a server.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        {sent ? (
          <div className="rounded-xl border border-line bg-card p-8">
            <h2 className="text-xl font-semibold">Message captured in this browser</h2>
            <p className="mt-2 text-muted">
              In production this would email {company.email}. Nothing was transmitted from this demo.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-xl border border-line bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cn">Name</Label>
                <Input id="cn" required placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="ce">Work email</Label>
                <Input id="ce" type="email" required placeholder="jane@lab.edu" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="co">Organization</Label>
                <Input id="co" placeholder="University / company" />
              </div>
              <div>
                <Label htmlFor="ci">I'm interested in</Label>
                <select
                  id="ci"
                  className="h-11 w-full rounded-md border border-line bg-card px-3 text-sm"
                  defaultValue="general"
                >
                  <option value="general">General enquiry</option>
                  <option value="rfq">Labs RFQ / PO</option>
                  <option value="distributor">Becoming a distributor</option>
                  <option value="support">Technical support</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="cm">Message</Label>
              <Textarea id="cm" required placeholder="How can we help?" />
            </div>
            <Button type="submit">Send message</Button>
          </form>
        )}
        <aside className="space-y-4">
          <div className="rounded-xl border border-line bg-card p-6">
            <div className="flex gap-3 border-b border-line pb-4">
              <MapPin className="mt-0.5 size-5 text-spruce" />
              <div>
                <p className="text-xs text-subtle">Location</p>
                <p className="font-medium">
                  Ship-from · {company.shipStreet}
                  <br />
                  {company.shipCity}, {company.country}
                </p>
                <p className="mt-2 text-xs text-subtle">
                  Registered office · {company.registeredStreet}, {company.registeredCity}
                </p>
              </div>
            </div>
            <div className="flex gap-3 border-b border-line py-4">
              <Mail className="mt-0.5 size-5 text-leaf" />
              <div>
                <p className="text-xs text-subtle">Email</p>
                <a href={`mailto:${company.email}`} className="font-medium text-spruce">
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Phone className="mt-0.5 size-5 text-navy" />
              <div>
                <p className="text-xs text-subtle">Phone</p>
                <a href={company.phoneHref} className="font-medium text-spruce">
                  {company.phone}
                </a>
                <p className="text-xs text-subtle">{company.hours}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
