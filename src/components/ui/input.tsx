import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-card px-3 text-sm text-ink outline-none placeholder:text-subtle focus:border-spruce",
        className,
      )}
      {...props}
    />
  );
}
