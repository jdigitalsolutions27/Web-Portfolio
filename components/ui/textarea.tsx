import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

