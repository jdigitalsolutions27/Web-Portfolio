"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, ExternalLink, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { featuredProjects, getProjectStageImage, getProjectThumbnail, projects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { cn } from "@/lib/utils";

export function ShowcaseViewer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();
  const startSlug = searchParams.get("project");

  const dataset = useMemo(() => (featuredProjects.length ? featuredProjects : projects), []);
  const initialIndex = Math.max(0, startSlug ? dataset.findIndex((item) => item.slug === startSlug) : 0);
  const [index, setIndex] = useState(initialIndex);
  const [autoTour, setAutoTour] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [tourProgress, setTourProgress] = useState(0);
  const tourProgressRef = useRef(0);
  const ambientXRaw = useMotionValue(50);
  const ambientYRaw = useMotionValue(20);
  const stageXRaw = useMotionValue(0);
  const stageYRaw = useMotionValue(0);
  const ambientX = useSpring(ambientXRaw, { stiffness: 52, damping: 24, mass: 0.9 });
  const ambientY = useSpring(ambientYRaw, { stiffness: 52, damping: 24, mass: 0.9 });
  const stageX = useSpring(stageXRaw, { stiffness: 110, damping: 18, mass: 0.7 });
  const stageY = useSpring(stageYRaw, { stiffness: 110, damping: 18, mass: 0.7 });
  const stageRotateX = useTransform(stageY, [-14, 14], [3, -3]);
  const stageRotateY = useTransform(stageX, [-14, 14], [-3, 3]);
  const ambientBg = useMotionTemplate`radial-gradient(circle at ${ambientX}% ${ambientY}%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.16), transparent 44%), linear-gradient(180deg,#060a15,#04070f)`;

  const active = dataset[index] ?? dataset[0];
  const transitionVars = {
    "--vt-image-name": `project-image-${active.slug}`,
    "--vt-title-name": `project-title-${active.slug}`,
  } as CSSProperties;
  const accentByCategory = useMemo(
    () =>
      ({
        "Restaurants & Food": "rgba(249,115,22,0.24)",
        "Resorts & Hotels": "rgba(56,189,248,0.24)",
        "Healthcare & Clinics": "rgba(20,184,166,0.24)",
        Automotive: "rgba(59,130,246,0.24)",
        "Real Estate": "rgba(234,179,8,0.22)",
        "Fitness & Gym": "rgba(244,63,94,0.24)",
        "Pets & Veterinary": "rgba(16,185,129,0.22)",
        "Beauty & Wellness": "rgba(244,114,182,0.22)",
        Rentals: "rgba(59,130,246,0.2)",
        "Agency / Corporate": "rgba(34,211,238,0.22)",
        "Affiliate / Marketing": "rgba(168,85,247,0.24)",
        "Systems / Other": "rgba(148,163,184,0.22)",
      }) as const,
    [],
  );

  const desktopSrc = imageErrors[`${active.slug}-desktop`]
    ? "/thumbnails/fallback-showcase.svg"
    : getProjectStageImage(active);
  const mobileSrc = imageErrors[`${active.slug}-mobile`] ? desktopSrc : getProjectThumbnail(active, "mobile");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((prev) => (prev + 1) % dataset.length);
      if (event.key === "ArrowLeft") setIndex((prev) => (prev - 1 + dataset.length) % dataset.length);
      if (event.key === "Escape") router.push("/projects");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dataset.length, router]);

  useEffect(() => {
    tourProgressRef.current = tourProgress;
  }, [tourProgress]);

  useEffect(() => {
    if (!autoTour || reduced) return;

    const duration = 3600;
    let raf = 0;
    const start = performance.now() - (tourProgressRef.current / 100) * duration;

    const loop = (time: number) => {
      const next = ((time - start) / duration) * 100;
      if (next >= 100) {
        setTourProgress(0);
        setIndex((prev) => (prev + 1) % dataset.length);
        return;
      }
      setTourProgress(next);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [autoTour, reduced, dataset.length, index]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(active.url);
      toast.success("Project link copied.");
    } catch {
      toast.error("Unable to copy project link.");
    }
  };

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[rgb(var(--bg))] px-4 pb-12 pt-28 md:px-8"
      onMouseMove={(event) => {
        if (reduced) return;
        const xPercent = (event.clientX / window.innerWidth) * 100;
        const yPercent = (event.clientY / window.innerHeight) * 100;
        ambientXRaw.set(xPercent);
        ambientYRaw.set(yPercent);
        stageXRaw.set((xPercent - 50) * 0.18);
        stageYRaw.set((yPercent - 50) * 0.15);
      }}
      onMouseLeave={() => {
        if (reduced) return;
        ambientXRaw.set(50);
        ambientYRaw.set(20);
        stageXRaw.set(0);
        stageYRaw.set(0);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: ambientBg }} />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: reduced ? 0.26 : [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ background: `radial-gradient(circle at 72% 18%, ${accentByCategory[active.category]}, transparent 45%)` }}
      />

      <div className="relative z-10 layout-wide px-2">
        <div className="showcase-hero-shell mb-6 rounded-[2.2rem] p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Showcase Mode</p>
              <h1 className="mt-3 text-balance text-4xl font-semibold text-white md:text-5xl">Cinematic Project Viewer</h1>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Navigate featured launches like a product showroom. Use arrow keys, swipe on mobile, or run the auto tour.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setAutoTour((prev) => !prev)}>
                {autoTour ? <Pause size={14} className="mr-1.5" /> : <Play size={14} className="mr-1.5" />}
                {autoTour ? "Pause Tour" : "Auto Tour"}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/projects">Exit</Link>
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              ["Viewer", "Fullscreen editorial mode"],
              ["Navigation", "Keyboard, touch, and manual controls"],
              ["Selection", `${index + 1} / ${dataset.length}`],
              ["State", autoTour ? "Auto tour active" : "Manual mode"],
            ].map(([label, value]) => (
              <div key={label} className="ui-surface-main rounded-[1.35rem] px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">{label}</p>
                <p className="mt-2 text-sm text-zinc-100">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr]"
          onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            const end = event.changedTouches[0]?.clientX;
            if (touchStart === null || end === undefined) return;
            const delta = touchStart - end;
            if (Math.abs(delta) < 45) return;
            setTourProgress(0);
            if (delta > 0) setIndex((prev) => (prev + 1) % dataset.length);
            else setIndex((prev) => (prev - 1 + dataset.length) % dataset.length);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <motion.div
                className="showcase-stage-shell relative overflow-hidden rounded-[2.4rem] p-4 md:p-5"
                style={
                  reduced
                    ? undefined
                    : {
                        x: stageX,
                        y: stageY,
                        rotateX: stageRotateX,
                        rotateY: stageRotateY,
                        transformPerspective: 1200,
                      }
                }
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{active.category}</Badge>
                    <span className="launch-stage-chip">Selected launch</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{active.title}</p>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-black/30 p-2">
                  <div className="vt-image relative aspect-[16/10] overflow-hidden rounded-[1.3rem] border border-white/10 bg-black/35" style={transitionVars}>
                    <AnimatedWebsitePreview
                      src={desktopSrc}
                      alt={`${active.title} desktop preview`}
                      priority
                      imageClassName="object-cover"
                      sizes="(max-width: 1024px) 100vw, 760px"
                      quality={90}
                      unoptimized
                      mode="hero"
                      onError={() => setImageErrors((prev) => ({ ...prev, [`${active.slug}-desktop`]: true }))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/68 via-zinc-950/10 to-transparent" />
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-2 right-8 w-[34%] rounded-[1.8rem] border border-white/15 bg-zinc-900/85 p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.1rem] border border-white/10">
                    <AnimatedWebsitePreview
                      src={mobileSrc}
                      alt={`${active.title} mobile preview`}
                      imageClassName="object-cover"
                      sizes="300px"
                      quality={90}
                      unoptimized
                      mode="card"
                      onError={() => setImageErrors((prev) => ({ ...prev, [`${active.slug}-mobile`]: true }))}
                    />
                  </div>
                </div>
              </motion.div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTourProgress(0);
                    setIndex((prev) => (prev - 1 + dataset.length) % dataset.length);
                  }}
                >
                  <ArrowLeft size={14} className="mr-1.5" /> Previous
                </Button>
                <p className="text-xs text-zinc-400">
                  {index + 1} / {dataset.length}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTourProgress(0);
                    setIndex((prev) => (prev + 1) % dataset.length);
                  }}
                >
                  Next <ArrowRight size={14} className="ml-1.5" />
                </Button>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400"
                  animate={{ width: `${tourProgress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.aside
              key={`${active.slug}-meta`}
              initial={reduced ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? {} : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="showcase-copy-shell space-y-5 rounded-[2.2rem] p-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Showcase Notes</p>
                <h1 className="vt-title mt-3 text-balance text-4xl font-semibold text-white" style={transitionVars}>
                  {active.title}
                </h1>
                <p className="mt-4 text-zinc-300">{active.description}</p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Goal</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{active.goal}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Solution</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{active.solution}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {active.highlights.slice(0, 4).map((item) => (
                  <div key={item} className="ui-surface-main rounded-[1.25rem] px-4 py-4 text-sm leading-6 text-zinc-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild>
                  <a href={active.url} target="_blank" rel="noreferrer">
                    Live Demo <ExternalLink size={14} className="ml-1.5" />
                  </a>
                </Button>
                <Button variant="outline" onClick={copyLink}>
                  Copy Link <Copy size={14} className="ml-1.5" />
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/projects">Back to Explorer</Link>
                </Button>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        <div className="mt-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-3">
            {dataset.map((project, itemIndex) => (
              <button
                key={`showcase-thumb-${project.slug}`}
                type="button"
                onClick={() => {
                  setTourProgress(0);
                  setIndex(itemIndex);
                }}
                className={cn(
                  "showcase-thumb-card group relative w-40 shrink-0 overflow-hidden rounded-[1.3rem] text-left transition",
                  itemIndex === index ? "border-cyan-300/50 shadow-[0_0_26px_rgba(34,211,238,0.22)]" : "border-white/10",
                )}
                aria-label={`View ${project.title}`}
              >
                <div className="relative h-24 w-full overflow-hidden">
                  <AnimatedWebsitePreview
                    src={getProjectThumbnail(project, "desktop")}
                    alt={`${project.title} thumbnail`}
                    className="transition duration-300 group-hover:scale-105"
                    imageClassName="object-cover"
                    sizes="160px"
                    unoptimized
                    active={itemIndex === index}
                    mode="card"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="px-3 py-3">
                  <p className="line-clamp-2 text-[11px] uppercase tracking-[0.16em] text-cyan-200">{project.category}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-200">{project.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
