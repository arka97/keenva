import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/company";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          This demo stores cart, RFQ, and last confirmation locally in your browser
          (localStorage key <span className="font-mono text-ink">keenvaa-commerce</span>). It does
          not send personal data to a backend.
        </p>
        <p>
          A production site would collect order and RFQ details at {company.email} only as needed
          to fulfil reagents or reply to a quote.
        </p>
      </div>
    </main>
  );
}
