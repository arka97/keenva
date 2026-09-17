# Keenvaa Biolabs — storefront demo

Dual-mode catalog for [Keenvaa Biolabs Inc](https://www.keenvaabiolabs.com/):

- **Shop** — published list prices, guest card checkout (simulated in this demo)
- **Labs** — ProtPure-style RFQ + PO upload, **no charge on the site**

One catalog. Two baskets. Custom frontend (TanStack Start + React 19 + Tailwind v4).

The original static HTML demo is preserved under [`legacy/`](./legacy/).

## Run locally

```bash
npm install
npm run dev
```

The app listens on port 8080.

```bash
npm run typecheck
npm run build
```

Auth and database are off. Shop orders and Labs quotes live in the browser (`localStorage`). Checkout does not charge. Quote submit does not email.

## What to click

1. Home → DNA Express PDP (Protocol tab)
2. Add 5 mL to Shop and 100 mL to Labs
3. Cart splits ambient vs cold pack
4. Quote form has no pay button
5. Journal + 17-step cloning page

## Stack

- TanStack Start / Router, React 19, Tailwind v4, Radix, zustand
- Catalog, journal, cloning steps, and company copy live in `src/lib/`
- Brand assets in `public/brand/`

## Not production

This is a Phase 2–3 stand-in. It is not Stripe, not Squarespace Payments, and not the mailbox. See the rebuild brief for Path A vs Path B and the RFQ lock.
