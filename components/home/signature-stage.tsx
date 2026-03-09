"use client";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, getProjectStageImage, getProjectThumbnail } from "@/lib/projects";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { cn } from "@/lib/utils";

export function SignatureStage() {
  const projects = featuredProjects.slice(0, 4);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (projects.length <= 1) return;
    const nextIndex = Math.min(projects.length - 1, Math.round(value * (projects.length - 1)));
    if (nextIndex !== activeIndex) setActiveIndex(nextIndex);
  });

  const stageY = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]), {
    stiffness: 88,
    damping: 24,
  });
  const stageRotate = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-1.4, 1.1]), {
    stiffness: 82,
    damping: 24,
  });
  const stageScale = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.98, 1.02]), {
    stiffness: 86,
    damping: 22,
  });
  const mobileFloatY = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [18, -26]), {
    stiffness: 86,
    damping: 24,
  });
  const tabletFloatY = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-16, 18]), {
    stiffness: 86,
    damping: 24,
  });
  const accentOpacity = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0.18, 0.18] : [0.16, 0.32]), {
    stiffness: 80,
    damping: 22,
  });
  const sceneProgress = ((activeIndex + 1) / projects.length) * 100;

  if (!projects.length) return null;
  const activeProject = projects[activeIndex];
  const accentByCategory = {
    "Restaurants & Food": "rgba(249,115,22,0.24)",
    "Resorts & Hotels": "rgba(56,189,248,0.22)",
    "Healthcare & Clinics": "rgba(20,184,166,0.22)",
    Automotive: "rgba(59,130,246,0.24)",
    "Real Estate": "rgba(234,179,8,0.22)",
    "Fitness & Gym": "rgba(34,197,94,0.22)",
    "Pets & Veterinary": "rgba(16,185,129,0.2)",
    "Beauty & Wellness": "rgba(244,114,182,0.22)",
    Rentals: "rgba(59,130,246,0.18)",
    "Agency / Corporate": "rgba(34,211,238,0.22)",
    "Affiliate / Marketing": "rgba(168,85,247,0.24)",
    "Systems / Other": "rgba(148,163,184,0.22)",
  } as const;

  return (
    <section id="signature-stage" ref={ref} className="px-6 py-[120px] md:py-[150px]">
      <div className="layout-wide">
        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start xl:gap-10">
          <div className="xl:sticky xl:top-[calc(var(--nav-offset)+1.5rem)] xl:self-start">
            <div className="launch-stage-shell min-h-[29rem] rounded-[2rem] p-3 md:min-h-[38rem] md:rounded-[2.4rem] md:p-6 xl:min-h-[44rem]">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Featured Launch Sequence</p>
                    <h2 className="mt-3 max-w-xl text-balance text-4xl font-semibold text-white md:text-5xl">
                      Featured work revealed like a product launch.
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects.map((project, index) => (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "launch-stage-chip",
                          index === activeIndex && "border-cyan-300/40 bg-cyan-400/[0.12] text-cyan-100",
                        )}
                      >
                        0{index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="ui-surface-main rounded-[1.4rem] px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Scene Progress</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                        animate={{ width: `${sceneProgress}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-zinc-200">
                      Scene {String(activeIndex + 1).padStart(2, "0")} of {String(projects.length).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="ui-surface-main rounded-[1.4rem] px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Narrative Focus</p>
                    <p className="mt-3 text-sm leading-7 text-zinc-200">{activeProject.goal}</p>
                  </div>
                </div>

                <div className="relative mt-6 min-h-[18rem] md:mt-8 md:min-h-[23rem] xl:min-h-[26rem]">
                  <motion.div
                    className="absolute inset-0 rounded-[2rem]"
                    style={{
                      opacity: accentOpacity,
                      background: `radial-gradient(circle at 22% 24%, ${accentByCategory[activeProject.category]}, transparent 28%), radial-gradient(circle at 82% 18%, rgba(59,130,246,0.18), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent)`,
                    }}
                  />

                  <motion.div
                    className="absolute left-[8%] top-[13%] z-10 w-[78%] md:top-[12%] md:w-[70%]"
                    style={reduced ? undefined : { y: stageY, rotate: stageRotate, scale: stageScale }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeProject.slug}-desktop`}
                        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={reduced ? {} : { opacity: 0, scale: 1.02, y: -12 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="launch-device-shell rounded-[1.55rem] p-2.5 md:rounded-[2rem] md:p-3"
                      >
                        <div className="mb-2 flex items-center gap-2 px-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10">
                          <AnimatedWebsitePreview
                            src={getProjectStageImage(activeProject)}
                            alt={`${activeProject.title} desktop preview`}
                            sizes="(max-width: 1280px) 100vw, 42vw"
                            unoptimized
                            priority
                            mode="hero"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/12 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{activeProject.category}</p>
                            <p className="mt-2 text-2xl font-semibold text-white">{activeProject.title}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="absolute left-[1%] top-[62%] z-20 w-[36%] md:left-[2%] md:top-[55%] md:w-[34%]"
                    style={reduced ? undefined : { y: tabletFloatY }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeProject.slug}-tablet`}
                        initial={reduced ? false : { opacity: 0, scale: 0.92, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={reduced ? {} : { opacity: 0, scale: 1.04, x: 10 }}
                        transition={{ duration: 0.4 }}
                        className="launch-device-shell rounded-[1.25rem] p-1.5 md:rounded-[1.6rem] md:p-2"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-white/10">
                          <AnimatedWebsitePreview
                            src={getProjectThumbnail(activeProject, "tablet")}
                            alt={`${activeProject.title} tablet preview`}
                            sizes="240px"
                            unoptimized
                            mode="card"
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="absolute right-[2%] top-[50%] z-30 w-[28%] md:right-[5%] md:top-[45%] md:w-[24%]"
                    style={reduced ? undefined : { y: mobileFloatY }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeProject.slug}-mobile`}
                        initial={reduced ? false : { opacity: 0, scale: 0.9, x: 12 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={reduced ? {} : { opacity: 0, scale: 1.04, x: -12 }}
                        transition={{ duration: 0.4 }}
                        className="launch-device-shell rounded-[1.3rem] p-1.5 md:rounded-[1.8rem] md:p-2"
                      >
                        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.2rem] border border-white/10">
                          <AnimatedWebsitePreview
                            src={getProjectThumbnail(activeProject, "mobile")}
                            alt={`${activeProject.title} mobile preview`}
                            sizes="180px"
                            unoptimized
                            mode="card"
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeProject.slug}-meta`}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? {} : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex flex-wrap items-end justify-between gap-4 md:mt-6"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Launch Summary</p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-300">{activeProject.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={activeProject.url} target="_blank" rel="noreferrer">
                          Live Demo <ArrowUpRight size={14} className="ml-1.5" />
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <ViewTransitionLink href={`/projects/${activeProject.slug}`}>Open Project</ViewTransitionLink>
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    `${activeProject.category}`,
                    activeProject.highlights[0] ?? "Premium execution",
                    activeProject.tags.slice(0, 2).join(" • "),
                  ].map((item) => (
                    <div key={`${activeProject.slug}-${item}`} className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              return (
              <motion.article
                key={`signature-story-${project.slug}`}
                className={cn(
                    "signature-story-card relative rounded-[2rem] p-5 md:rounded-[2.4rem] md:p-8",
                    isActive && "border-cyan-300/35 shadow-[0_24px_80px_rgba(34,211,238,0.12)]",
                  )}
                  animate={{ opacity: isActive ? 1 : 0.72, scale: isActive ? 1 : 0.985 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="absolute right-6 top-4 text-[clamp(4rem,12vw,8rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]">
                    0{index + 1}
                  </div>

                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Scene 0{index + 1}</p>
                        <h3 className="mt-3 text-balance text-3xl font-semibold text-white md:text-4xl">{project.title}</h3>
                      </div>
                      <Badge variant="neutral">{project.category}</Badge>
                    </div>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">{project.goal}</p>

                    <div className="mt-8 grid gap-4 md:grid-cols-[1.02fr_0.98fr]">
                      <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Solution Direction</p>
                        <p className="mt-4 text-sm leading-7 text-zinc-300">{project.solution}</p>
                      </div>
                      <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Industry Lens</p>
                        <p className="mt-4 text-sm leading-7 text-zinc-300">{project.industryNotes}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {project.highlights.slice(0, 3).map((item) => (
                        <div key={`${project.slug}-${item}`} className="ui-surface-main rounded-[1.3rem] px-4 py-4 text-sm leading-6 text-zinc-200">
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={`${project.slug}-${tag}-signature`} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
