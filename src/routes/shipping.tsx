import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({ component: ShippingPage });

function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Shipping</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Ambient vs cold chain</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          <strong className="text-ink">KNV DNA Express</strong> is formulated for ambient handling
          for short periods and ships without dry ice. Store at 4 °C if keeping beyond a few weeks.
        </p>
        <p>
          <strong className="text-ink">Enzymes, mixes, and ladders</strong> store at −20 °C and
          ship on cold pack. Mixed carts may split into an ambient parcel and a cold parcel.
        </p>
        <p>
          Transit windows are quoted at order or RFQ time. This demo does not promise a 24-hour
          ship-out.
        </p>
      </div>
    </main>
  );
}
