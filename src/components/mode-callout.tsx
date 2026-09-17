import { Link } from "@tanstack/react-router";
import { useCommerce } from "@/store/commerce";

export function ModeCallout() {
  const mode = useCommerce((s) => s.mode);
  if (mode === "labs") {
    return (
      <div className="rounded-lg border border-navy/20 bg-navy px-4 py-3 text-sm text-paper">
        <span className="font-semibold">Labs mode.</span> List prices are for reference.
        Add lines to an RFQ — Keenvaa replies with a quote. Purchasing issues a PO. No
        payment is taken on this site.{" "}
        <Link to="/quote" className="underline">
          Open RFQ
        </Link>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-spruce/20 bg-mist px-4 py-3 text-sm text-ink">
      <span className="font-semibold">Shop mode.</span> Card checkout for list-price packs.
      This demo does not charge a real card. Switch to Labs for institutional RFQ / PO.
    </div>
  );
}
