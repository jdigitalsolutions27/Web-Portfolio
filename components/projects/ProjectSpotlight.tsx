"use client";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { getProjectStageImage, getProjectThumbnail, type Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { Magnetic } from "@/components/shared/magnetic";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";

type ProjectSpotlightProps = {
  projects: Project[];
  onQuickView?: (project: Project) => void;
};

export function ProjectSpotlight({ projects, onQuickView }: ProjectSpotlightProps) {
  const reducedMotion = useReducedMotion();
  const items = useMemo(() => projects.slice(0, 8), [projects]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [items, paused, reducedMotion]);

  if (items.length === 0) {
    return null;
  }

  const active = items[activeIndex % items.length] ?? items[0];
  const desktop = getProjectStageImage(active);
  const tablet = getProjectThumbnail(active, "tablet");
  const mobile = getProjectThumbnail(active, "mobile");
  const transitionVars = {
    "--vt-image-name": `project-image-${active.slug}`,
    "--vt-title-name": `project-title-${active.slug}`,
  } as CSSProperties;

  return (
    <section
      id="project-spotlight"
      className="ui-surface-main relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 p-4 md:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="relative grid gap-8 xl:grid-cols-[1.02fr_1.18fr] xl:items-center">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Featured Sequence</Badge>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-cyan-200/90">
              <Sparkles size={14} />
              Immersive project spotlight
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">{active.category}</p>
              <h2 className="vt-title mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl" style={transitionVars}>
                {active.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-zinc-300">{active.description}</p>

              <div className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
                {active.highlights.slice(0, 4).map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic strength={0.16}>
                  <Button asChild>
                    <a href={active.url} target="_blank" rel="noreferrer">
                      Live Demo <ExternalLink size={15} className="ml-1.5" />
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild variant="secondary">
                  <ViewTransitionLink href={`/projects/${active.slug}`}>
                    Open Case Study <ArrowRight size={15} className="ml-1.5" />
                  </ViewTransitionLink>
                </Button>
                <Button asChild variant="ghost">
                  <ViewTransitionLink href={`/showcase?project=${active.slug}`}>Open Showcase</ViewTransitionLink>
                </Button>
                {onQuickView ? (
                  <Button variant="outline" onClick={() => onQuickView(active)}>
                    Quick View
                  </Button>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[420px] xl:pl-8">
          <motion.div
            className="absolute inset-x-8 top-3 h-16 rounded-full bg-cyan-300/18 blur-3xl"
            animate={reducedMotion ? undefined : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.slug}-desktop`}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-2 top-4 sm:inset-x-10 xl:inset-x-14"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-zinc-950/80 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-zinc-400">Desktop Frame</span>
                </div>
                <div className="vt-image relative mt-3 aspect-[16/10] overflow-hidden rounded-[1.4rem]" style={transitionVars}>
                  <AnimatedWebsitePreview
                    src={desktop}
                    alt={`${active.title} desktop preview`}
                    imageClassName="object-cover"
                    sizes="(max-width: 1280px) 90vw, 52vw"
                    quality={90}
                    unoptimized
                    mode="stage"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/8" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.slug}-tablet`}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 28, y: 20, rotate: 5 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: 8 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 18, y: -18, rotate: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.08 }}
              className="absolute right-2 top-[18%] hidden w-[30%] min-w-[190px] 2xl:block"
            >
              <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-zinc-950/85 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]">
                  <AnimatedWebsitePreview
                    src={tablet}
                    alt={`${active.title} tablet preview`}
                    imageClassName="object-cover"
                    sizes="28vw"
                    quality={88}
                    unoptimized
                    mode="card"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.slug}-mobile`}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -26, y: 22, rotate: -8 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: -10 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -18, y: -16, rotate: -7 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : 0.12 }}
              className="absolute bottom-0 right-4 hidden w-[18%] min-w-[132px] xl:block"
            >
              <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-zinc-950/88 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[1.3rem]">
                  <AnimatedWebsitePreview
                    src={mobile}
                    alt={`${active.title} mobile preview`}
                    imageClassName="object-cover"
                    sizes="20vw"
                    quality={85}
                    unoptimized
                    mode="card"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((project, index) => {
          const activeState = project.slug === active.slug;
          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                activeState
                  ? "border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
              aria-pressed={activeState}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">{project.title}</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-400">{project.category}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                  animate={{ width: activeState ? "100%" : "0%" }}
                  transition={{ duration: activeState && !reducedMotion && !paused ? 5.1 : 0.25, ease: "linear" }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
