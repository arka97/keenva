import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/company";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of use</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          This website is a demonstration storefront for {company.legal}. Shop checkout is
          simulated. Labs RFQ submissions do not create a contract or invoice until Keenvaa
          issues a written quote and the buyer issues a purchase order.
        </p>
        <p>{company.ruo}</p>
        <p>
          Catalog prices are list prices in USD and may change. Volume, OEM, and standing-order
          pricing is quoted, not displayed as a discount engine on this site.
        </p>
      </div>
    </main>
  );
}
