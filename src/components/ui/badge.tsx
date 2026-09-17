import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
