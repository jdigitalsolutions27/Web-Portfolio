import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-muted)] px-4 text-sm text-[rgb(var(--fg))] placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

