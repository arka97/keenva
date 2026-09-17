import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/company";

export const Route = createFileRoute("/quality")({ component: QualityPage });

function QualityPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs tracking-widest text-spruce uppercase">Quality</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Lot control, not slogans</h1>
      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          Each KNV lot is activity-assayed and purity-checked before release. Certificates of
          analysis and safety data sheets are issued per lot on request.
        </p>
        <p>
          {company.ruo} Keenvaa does not market these reagents as in vitro diagnostics, companion
          diagnostics, or FDA-cleared kits.
        </p>
        <p>
          Manufacturing and QC are based at {company.shipStreet}, {company.shipCity}. Custom formulations
          and OEM fills are quoted through Labs RFQ, not as unvalidated claims on this site.
        </p>
      </div>
    </main>
  );
}
