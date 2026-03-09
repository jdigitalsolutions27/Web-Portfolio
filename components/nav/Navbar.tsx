"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_SECTIONS, NAV_LINKS, PROFILE } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];
    HOME_SECTIONS.forEach((section) => {
      const node = document.getElementById(section.id);
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { threshold: 0.38 },
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionLabel = useMemo(
    () => HOME_SECTIONS.find((item) => item.id === activeSection)?.label ?? "Hero",
    [activeSection],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-6">
      <div
        className={cn(
          "nav-command-dock mx-auto max-w-[1400px] transition-all duration-300",
          isScrolled ? "translate-y-0 scale-[0.985]" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "editorial-panel nav-command-shell rounded-[2rem] px-3 py-3 shadow-[0_0_80px_rgba(0,0,0,0.45)] transition-all duration-300 md:px-4",
            isScrolled ? "rounded-[1.65rem] py-2.5" : "py-3.5",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                whileHover={reduceMotion ? undefined : { rotate: -4, scale: 1.04 }}
                className="nav-brand-chip relative hidden h-12 w-12 items-center justify-center overflow-hidden rounded-[1.1rem] border border-cyan-300/25 bg-cyan-400/[0.06] sm:inline-flex"
              >
                <Image src="/brand/logo-mark.svg" alt="AJ Centino mark" fill className="object-cover" sizes="48px" priority />
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="min-w-0"
              >
                <ViewTransitionLink
                  href="/"
                  className="block max-w-[11rem] truncate text-sm font-semibold tracking-wide text-white sm:max-w-none md:text-[1.3rem]"
                >
                  {PROFILE.brand}
                </ViewTransitionLink>
                <p className="hidden text-[10px] uppercase tracking-[0.3em] text-zinc-400 sm:block">{PROFILE.role}</p>
              </motion.div>
            </div>

            <motion.nav
              initial={reduceMotion ? false : { opacity: 0, y: -8, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.48, delay: 0.08 }}
              className="nav-main-rail nav-main-rail-glow relative hidden items-center rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 md:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <ViewTransitionLink
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative z-10 rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:text-white dark:hover:text-white",
                      isActive && "text-cyan-100",
                    )}
                  >
                    {!isActive ? <span className="nav-link-sheen absolute inset-0 -z-10 rounded-full opacity-0 transition duration-300 group-hover:opacity-100" /> : null}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(59,130,246,0.2))] shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    ) : null}
                    {item.label}
                  </ViewTransitionLink>
                );
              })}
            </motion.nav>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.48, delay: 0.12 }}
              className="hidden items-center gap-2 md:flex"
            >
              {pathname === "/" ? (
                <div className="nav-info-tile rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Section</p>
                  <p className="mt-1 text-sm text-zinc-100">{sectionLabel}</p>
                </div>
              ) : null}
              <div className="nav-status-pill rounded-[1.2rem] border border-emerald-300/15 bg-emerald-400/[0.06] px-3 py-2">
                <p className="inline-flex items-center gap-2 text-sm text-zinc-100">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                  Available for selected projects
                </p>
              </div>
              <ThemeToggle />
              <Button asChild size="sm" className="rounded-[1.15rem] px-5">
                <ViewTransitionLink href="/contact">Hire Me</ViewTransitionLink>
              </Button>
            </motion.div>

            <button
              aria-label="Open navigation"
              aria-expanded={open}
              className="ui-surface-muted inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-200 md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            className={cn(
              "nav-meta-row mt-3 hidden items-center justify-between gap-3 border-t border-white/8 pt-3 md:flex",
              isScrolled && "nav-meta-row-collapsed",
            )}
          >
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              <span className="text-cyan-200">Command Dock</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Portfolio navigation, status, and quick access</span>
            </div>
            <div className="flex items-center gap-2">
              {["Premium UI", "Conversion-aware", "Full-stack delivery"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="ui-surface-main mx-auto mt-2 max-w-[1400px] rounded-[1.6rem] p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <ViewTransitionLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10",
                  pathname === item.href && "bg-cyan-500/20 text-cyan-100",
                )}
              >
                {item.label}
              </ViewTransitionLink>
            ))}
          </nav>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200">
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
              Available for selected projects
            </div>
            <div className="flex items-center justify-between">
            <ThemeToggle />
            <Button asChild size="sm">
              <ViewTransitionLink href="/contact" onClick={() => setOpen(false)}>
                Hire Me
              </ViewTransitionLink>
            </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
