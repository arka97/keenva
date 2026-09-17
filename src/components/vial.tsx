import { cn } from "@/lib/utils";
import type { FamilyId } from "@/lib/catalog";

const fill: Record<FamilyId, string> = {
  extraction: "fill-leaf",
  pcr: "fill-spruce",
  qpcr: "fill-navy",
  rt: "fill-spruce",
  cloning: "fill-leaf",
  ladders: "fill-navy",
};

export function Vial({ family, className }: { family: FamilyId; className?: string }) {
  return (
    <svg
      viewBox="0 0 66 92"
      className={cn("h-20 w-14", className)}
      fill="none"
      aria-hidden
    >
      <rect x="24" y="6" width="18" height="11" rx="2.5" className="fill-ink" />
      <rect x="27.5" y="15" width="11" height="9" className="fill-ink/70" />
      <rect
        x="15"
        y="23"
        width="36"
        height="63"
        rx="11"
        className="fill-card stroke-ink"
        strokeWidth="2.4"
      />
      <path
        d="M17.4 56 H48.6 V74.2 A10.8 10.8 0 0 1 37.8 85 H28.2 A10.8 10.8 0 0 1 17.4 74.2 Z"
        className={fill[family]}
        opacity=".92"
      />
      <rect
        x="19.5"
        y="31"
        width="27"
        height="15"
        rx="3"
        className="fill-mist stroke-line"
        strokeWidth="1.2"
      />
      <path
        d="M23 37h13M23 41h9"
        className="stroke-subtle"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
