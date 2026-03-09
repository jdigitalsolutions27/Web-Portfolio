"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { HOME_SECTIONS, NAV_LINKS, PROFILE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    HOME_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { threshold: 0.4 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pathname]);

  const activeSectionLabel = useMemo(
    () => HOME_SECTIONS.find((item) => item.id === activeSection)?.label ?? "Hero",
    [activeSection],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <Link href="/" className="min-w-fit text-sm font-semibold tracking-wide text-white md:text-base">
          {PROFILE.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-zinc-300 transition hover:text-white",
                  active && "text-cyan-200",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {pathname === "/" ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              Section: <span className="text-cyan-200">{activeSectionLabel}</span>
            </span>
          ) : null}
          <ThemeToggle />
          <Button asChild variant="default" size="sm">
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-zinc-950/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10",
                  pathname === item.href && "bg-cyan-500/20 text-cyan-100",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Hire Me
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

