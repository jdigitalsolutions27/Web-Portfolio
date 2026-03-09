import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))] active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_44px_rgba(56,189,248,0.34)]",
        secondary:
          "border border-[color:var(--surface-border)] bg-[color:var(--surface-muted)] text-[rgb(var(--fg))] hover:-translate-y-0.5 hover:brightness-105",
        ghost: "text-[rgb(var(--fg))] hover:-translate-y-0.5 hover:bg-white/8",
        outline: "border border-cyan-300/50 bg-transparent text-cyan-200 hover:-translate-y-0.5 hover:bg-cyan-500/10",
        link: "rounded-none p-0 text-cyan-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

