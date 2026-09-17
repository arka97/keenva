import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { countItems, useCommerce } from "@/store/commerce";

const nav = [
  { to: "/shop", label: "Products" },
  { to: "/selector", label: "Selector" },
  { to: "/quality", label: "Quality" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const mode = useCommerce((s) => s.mode);
  const setMode = useCommerce((s) => s.setMode);
  const cart = useCommerce((s) => s.cart);
  const quote = useCommerce((s) => s.quote);
  const cartN = hydrated ? countItems(cart) : 0;
  const quoteN = hydrated ? countItems(quote) : 0;

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur-md">
      <div className="border-b border-spruce-deep bg-spruce-deep text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 font-mono text-xs tracking-wide">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={company.phoneHref} className="inline-flex items-center gap-1.5 hover:text-leaf">
              <Phone className="size-3" />
              {company.phone}
            </a>
            <span className="hidden text-leaf sm:inline">/</span>
            <span className="hidden sm:inline">{company.hours}</span>
            <span className="hidden text-leaf md:inline">/</span>
            <span className="hidden md:inline">Bensalem, PA · RUO</span>
          </div>
          <span className="hidden lg:inline text-mist/80">
            Demo · Shop checkout is simulated · Labs RFQ never charges
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 lg:gap-3">
        <Link to="/" className="flex-none" onClick={() => setOpen(false)}>
          <img src="/brand/logo-horizontal.png" alt={company.legal} className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-2.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-spruce"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <form onSubmit={submitSearch} className="hidden max-w-xs flex-1 lg:flex">
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-line bg-paper px-3">
            <Search className="size-4 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Taq, ligase, cDNA…"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
            />
          </label>
        </form>
        <div className="flex rounded-md border border-line p-0.5">
          <button
            type="button"
            onClick={() => setMode("shop")}
            className={cn(
              "h-9 rounded-sm px-3 text-xs font-semibold tracking-wide uppercase",
              mode === "shop" ? "bg-spruce text-paper" : "text-muted hover:text-ink",
            )}
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => setMode("labs")}
            className={cn(
              "h-9 rounded-sm px-3 text-xs font-semibold tracking-wide uppercase",
              mode === "labs" ? "bg-navy text-paper" : "text-muted hover:text-ink",
            )}
          >
            Labs
          </button>
        </div>
        <Link
          to="/account"
          className="hidden size-11 items-center justify-center rounded-md border border-line text-ink hover:border-spruce sm:flex"
          aria-label="Account"
        >
          <User className="size-4" />
        </Link>
        <Link
          to="/cart"
          className={cn(
            "relative flex size-11 items-center justify-center rounded-md border border-line hover:border-spruce",
            mode === "shop" ? "bg-spruce text-paper hover:bg-spruce-deep" : "bg-card text-ink",
          )}
          aria-label="Shop cart"
        >
          <ShoppingCart className="size-4" />
          {cartN > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 font-mono text-xs font-semibold text-paper tabular-nums">
              {cartN}
            </span>
          ) : null}
        </Link>
        <Link
          to="/quote"
          className={cn(
            "relative flex size-11 items-center justify-center rounded-md border border-line hover:border-navy",
            mode === "labs" ? "bg-navy text-paper hover:bg-ink" : "bg-card text-ink",
          )}
          aria-label="Labs RFQ"
        >
          <FileText className="size-4" />
          {quoteN > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-helix px-1 font-mono text-xs font-semibold text-paper tabular-nums">
              {quoteN}
            </span>
          ) : null}
        </Link>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md border border-line xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-card px-4 py-4 xl:hidden">
          <form onSubmit={submitSearch} className="mb-3">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search catalog…" />
          </form>
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/journal" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-semibold">
              Journal
            </Link>
            <Link to="/account" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-semibold">
              Account
            </Link>
            <Link to="/vendors" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-semibold">
              Vendors
            </Link>
          </div>
          <Button className="mt-3 w-full" asChild>
            <Link to={mode === "labs" ? "/quote" : "/shop"} onClick={() => setOpen(false)}>
              {mode === "labs" ? "Open RFQ" : "Shop catalog"}
            </Link>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
