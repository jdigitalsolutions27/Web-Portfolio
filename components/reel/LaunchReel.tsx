"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects";
import { getProjectStageImage, getProjectThumbnail } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { cn } from "@/lib/utils";

type LaunchReelProps = {
  projects: Project[];
  id?: string;
};

export function LaunchReel({ projects, id = "launch-reel" }: LaunchReelProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadFailed, setLoadFailed] = useState<Record<string, boolean>>({});
  const [loadedSources, setLoadedSources] = useState<Record<string, boolean>>({
    "/thumbnails/fallback-showcase.svg": true,
  });
  const progressRef = useRef(0);
  const items = useMemo(() => projects.slice(0, 8), [projects]);
  const duration = reduced ? 5600 : 4200;

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const isPaused = paused || hoverPaused;

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    let raf = 0;
    const started = performance.now() - (progressRef.current / 100) * duration;

    const tick = (time: number) => {
      const next = ((time - started) / duration) * 100;
      if (next >= 100) {
        setProgress(0);
        setIndex((prev) => (prev + 1) % items.length);
        return;
      }
      setProgress(next);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [duration, index, isPaused, items.length]);

  if (!items.length) return null;
  const active = items[index];
  const activeDesktop = getProjectStageImage(active);
  const activeSrc = loadFailed[active.slug] ? "/thumbnails/fallback-showcase.svg" : activeDesktop;
  const isLoaded = !!loadedSources[activeSrc];

  const move = (direction: "prev" | "next") => {
    setProgress(0);
    setIndex((prev) => (direction === "next" ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length));
  };

  return (
    <section id={id} className="px-6 py-[120px] md:py-[150px]">
      <div className="layout-wide">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Launch Reel</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold text-white md:text-6xl">
              A cinematic montage that presents live work like a premium release lineup.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              Instead of a normal carousel, the reel behaves like an editorial product stage. Each project gets a visual spotlight, a clear narrative label, and an immediate route into the full story.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="ui-surface-main rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </div>
            <Button size="sm" variant="secondary" onClick={() => setPaused((prev) => !prev)} aria-label="Toggle autoplay">
              {paused ? <Play size={14} className="mr-1.5" /> : <Pause size={14} className="mr-1.5" />}
              {paused ? "Resume" : "Pause"}
            </Button>
          </div>
        </div>

        <div
          className="reel-stage-shell rounded-[2.6rem] p-4 md:p-5"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <div className="grid gap-5 xl:grid-cols-[1.22fr_0.78fr]">
            <div className="relative overflow-hidden rounded-[2.1rem] border border-white/10 bg-black/25">
              <div className="absolute inset-x-0 top-0 z-20 h-1 bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  className="relative w-full"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? {} : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  drag={reduced ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) < 90) return;
                    move(info.offset.x < 0 ? "next" : "prev");
                  }}
                >
                  <motion.div
                    className="relative h-[14rem] w-full sm:h-[18rem] md:h-[29rem] xl:h-[35rem]"
                    animate={reduced ? {} : { scale: [1, 1.045], x: [0, -10, 0], y: [0, -6, 0] }}
                    transition={reduced ? undefined : { duration: 6.5, ease: "easeInOut" }}
                  >
                    {!isLoaded ? <div className="absolute inset-0 animate-pulse bg-zinc-900/70" aria-hidden /> : null}
                    <AnimatedWebsitePreview
                      src={activeSrc}
                      alt={`${active.title} launch reel preview`}
                      priority
                      className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
                      imageClassName="object-cover"
                      sizes="(max-width: 1280px) 100vw, 68vw"
                      quality={92}
                      unoptimized
                      mode="hero"
                      onLoad={() => setLoadedSources((prev) => ({ ...prev, [activeSrc]: true }))}
                      onError={() => {
                        setLoadFailed((prev) => ({ ...prev, [active.slug]: true }));
                        setLoadedSources((prev) => ({
                          ...prev,
                          [activeSrc]: true,
                          "/thumbnails/fallback-showcase.svg": true,
                        }));
                      }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.1),rgba(2,6,23,0.88))]" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
                <span className="launch-stage-chip border-cyan-300/35 bg-cyan-400/[0.1] text-cyan-100">Live Preview Montage</span>
                <span className="launch-stage-chip">{active.category}</span>
              </div>

              <div className="absolute left-4 top-[6rem] z-20 hidden md:flex md:items-center xl:inset-y-0">
                <Button size="icon" variant="secondary" className="h-10 w-10" onClick={() => move("prev")} aria-label="Previous project preview">
                  <ArrowLeft size={15} />
                </Button>
              </div>
              <div className="absolute right-4 top-[6rem] z-20 hidden md:flex md:items-center xl:inset-y-0">
                <Button size="icon" variant="secondary" className="h-10 w-10" onClick={() => move("next")} aria-label="Next project preview">
                  <ArrowRight size={15} />
                </Button>
              </div>

              <div className="relative z-20 border-t border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(2,6,23,0.96))] p-5 md:absolute md:inset-x-0 md:bottom-0 md:border-t-0 md:bg-transparent md:p-7">
                <div className="grid gap-5 md:grid-cols-[1.02fr_0.98fr] xl:grid-cols-[1.02fr_0.98fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Selected Launch</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{active.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-200">{active.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={active.url} target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <ViewTransitionLink href={`/projects/${active.slug}`}>Case Study</ViewTransitionLink>
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-1">
                    {[active.highlights[0] ?? "Premium interface", active.highlights[1] ?? "Responsive delivery", active.highlights[2] ?? "Conversion-first structure"].map((item) => (
                      <div key={item} className="ui-surface-main rounded-[1.4rem] px-4 py-4 text-sm leading-6 text-zinc-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="ui-surface-main rounded-[1.8rem] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Reel Navigator</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">Jump through highlighted launches and keep the reel under your control.</p>
                  </div>
                  <Sparkles size={18} className="text-cyan-200" />
                </div>
              </div>

              <div className="grid gap-3">
                {items.map((item, itemIndex) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-label={`View ${item.title}`}
                    onClick={() => {
                      setProgress(0);
                      setIndex(itemIndex);
                    }}
                    className={cn(
                      "reel-selector-card group rounded-[1.6rem] p-3 text-left transition",
                      itemIndex === index
                        ? "border-cyan-300/45 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
                        : "border-white/10 hover:border-white/20",
                    )}
                  >
                    <div className="grid gap-3 sm:grid-cols-[140px_1fr] xl:grid-cols-[132px_1fr]">
                      <div className="relative overflow-hidden rounded-[1rem] border border-white/10">
                      <div className="relative aspect-[4/3]">
                          <AnimatedWebsitePreview
                            src={getProjectThumbnail(item, "desktop")}
                            alt={`${item.title} thumbnail`}
                            className="transition duration-300 group-hover:scale-105"
                            imageClassName="object-cover"
                            sizes="140px"
                            unoptimized
                            active={itemIndex === index}
                            mode="card"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                          <span className="text-[11px] uppercase tracking-[0.16em] text-cyan-200">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400">{item.category}</p>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-300">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
