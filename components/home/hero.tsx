"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Award, Layers3, MapPin, MonitorSmartphone, Mouse, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { PROFILE, ROLE_ROTATOR } from "@/lib/constants";
import { featuredProjects, getProjectStageImage, getProjectThumbnail } from "@/lib/projects";

const DynamicHeroScene = dynamic(() => import("@/components/home/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
});

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const heroProjects = featuredProjects.slice(0, 4);
  const [roleIndex, setRoleIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const portfolioOneLabel = PROFILE.links.portfolioOne.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const portfolioTwoLabel = PROFILE.links.portfolioTwo.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(18);
  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const portraitBaseY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 70, damping: 24, mass: 0.7 });
  const glowYSpring = useSpring(glowY, { stiffness: 70, damping: 24, mass: 0.7 });
  const stageXSpring = useSpring(stageX, { stiffness: 110, damping: 22, mass: 0.7 });
  const stageYSpring = useSpring(stageY, { stiffness: 110, damping: 22, mass: 0.7 });
  const portraitY = useSpring(portraitBaseY, { stiffness: 120, damping: 20, mass: 0.8 });
  const heroSpot = useMotionTemplate`radial-gradient(620px circle at ${glowXSpring}% ${glowYSpring}%, rgba(34,211,238,0.22), transparent 62%)`;
  const projectProgress = ((projectIndex + 1) / Math.max(heroProjects.length, 1)) * 100;

  useEffect(() => {
    if (reduceMotion) return;
    const roleTimer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLE_ROTATOR.length);
    }, 1900);
    const projectTimer = window.setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % Math.max(heroProjects.length, 1));
    }, 4600);

    return () => {
      window.clearInterval(roleTimer);
      window.clearInterval(projectTimer);
    };
  }, [heroProjects.length, reduceMotion]);

  const activeRole = useMemo(() => ROLE_ROTATOR[roleIndex], [roleIndex]);
  const activeProject = heroProjects[projectIndex] ?? heroProjects[0];
  const transitionVars = activeProject
    ? ({
        "--vt-image-name": `project-image-${activeProject.slug}`,
        "--vt-title-name": `project-title-${activeProject.slug}`,
      } as CSSProperties)
    : undefined;

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-6 pb-24 pt-[8.75rem] md:pb-28 md:pt-48"
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const xPercent = (event.clientX / window.innerWidth) * 100;
        const yPercent = (event.clientY / window.innerHeight) * 100;
        glowX.set(xPercent);
        glowY.set(yPercent);
        stageX.set((xPercent - 50) * 0.12);
        stageY.set((yPercent - 50) * 0.1);
        portraitBaseY.set((yPercent - 50) * -0.12);
      }}
      onMouseLeave={() => {
        if (reduceMotion) return;
        glowX.set(50);
        glowY.set(18);
        stageX.set(0);
        stageY.set(0);
        portraitBaseY.set(0);
      }}
    >
      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 -z-30 opacity-60">
          <DynamicHeroScene />
        </div>
      ) : null}
      <div className="hero-aura absolute inset-0 -z-20" />
      <motion.div className="pointer-events-none absolute inset-0 -z-[15]" style={{ background: heroSpot }} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(59,130,246,0.16),transparent_38%)]" />
      <motion.div
        className="hero-float-orb hero-float-orb-a"
        animate={reduceMotion ? undefined : { y: [0, -16, 0], x: [0, 10, 0], scale: [1, 1.04, 1] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-float-orb hero-float-orb-b"
        animate={reduceMotion ? undefined : { y: [0, 18, 0], x: [0, -14, 0], scale: [1, 1.06, 1] }}
        transition={reduceMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="layout-wide grid items-start gap-10 md:gap-14 xl:grid-cols-[0.94fr_1.06fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55 }}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-cyan-200/35 bg-cyan-300/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-cyan-100"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            Premium full-stack developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="max-w-6xl text-balance text-[clamp(3rem,12vw,6.8rem)] font-semibold leading-[0.9] text-white"
          >
            <span className="block">Interfaces that launch</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              like premium products.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-sm uppercase tracking-[0.2em] text-cyan-200"
          >
            {PROFILE.name} {" - "} {PROFILE.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-4xl text-base leading-8 text-zinc-200 sm:text-lg xl:text-[1.16rem]"
          >
            I build premium digital experiences that combine sharp interface direction, full-stack implementation, and conversion-aware
            structure so the final result feels credible, fast, and commercially useful from the first screen.
          </motion.p>

          <div className="mt-5 h-9 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeRole}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.35 }}
                className="text-sm uppercase tracking-[0.16em] text-cyan-200"
              >
                {activeRole}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-8 grid max-w-xl gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center"
          >
            <Magnetic>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <ViewTransitionLink href="/projects">
                  Open Project Explorer <ArrowRight className="ml-2" size={16} />
                </ViewTransitionLink>
              </Button>
            </Magnetic>
            <Magnetic strength={0.16} rotate>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <ViewTransitionLink href="/showcase">Enter Showcase Mode</ViewTransitionLink>
              </Button>
            </Magnetic>
            <Magnetic strength={0.14}>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <ViewTransitionLink href="/contact">Start a Project</ViewTransitionLink>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            {[
              { icon: Award, label: "Summa Cum Laude", detail: "Academic distinction" },
              { icon: Layers3, label: "23 Live Builds", detail: "Across multiple industries" },
              { icon: MonitorSmartphone, label: "Responsive by Default", detail: "Desktop to mobile polish" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} whileHover={reduceMotion ? undefined : { y: -4 }} className="ui-surface-main rounded-[1.4rem] px-4 py-4">
                  <p className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200">
                    <Icon size={16} />
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-400">{item.detail}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-zinc-200">
              <MapPin size={14} className="text-cyan-200" />
              {PROFILE.location}
            </p>
            <a
              href={PROFILE.links.portfolioOne}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/35 hover:text-white"
            >
              {portfolioOneLabel}
            </a>
            <a
              href={PROFILE.links.portfolioTwo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/35 hover:text-white"
            >
              {portfolioTwoLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400 md:inline-flex"
          >
            <span className="hero-scroll-cue">
              <Mouse size={12} />
            </span>
            Scroll to explore launches, proof, and case studies
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24, filter: "blur(14px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.72, delay: 0.14 }}
          className="relative mt-2 xl:pt-4"
          style={reduceMotion ? undefined : { x: stageXSpring, y: stageYSpring }}
        >
          <div className="relative mx-auto max-w-[760px]">
            <div className="pointer-events-none absolute left-[10%] top-[16%] h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl" />
            <div className="pointer-events-none absolute right-[8%] top-[4%] h-52 w-52 rounded-full bg-blue-400/12 blur-3xl" />

            <div className="grid gap-4 xl:grid-cols-[0.68fr_0.32fr] xl:gap-5">
              <div className="launch-stage-shell order-2 relative overflow-hidden rounded-[2.2rem] p-3 sm:p-4 md:min-h-[28rem] md:rounded-[2.5rem] md:p-5 xl:order-2 lg:min-h-[34rem]">
                <div className="pointer-events-none absolute inset-x-8 top-6 z-0 h-28 rounded-full bg-cyan-300/10 blur-3xl" />
                <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between">
                  <span className="launch-stage-chip border-cyan-300/30 bg-cyan-400/[0.1] text-cyan-100">First-screen launch reveal</span>
                  <div className="hero-progress-rail hidden w-32 sm:block">
                    <motion.span
                      className="hero-progress-fill"
                      animate={{ width: `${projectProgress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject?.slug ?? "hero-empty"}
                    initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? {} : { opacity: 0, y: -12, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full"
                  >
                    {activeProject ? (
                      <>
                        <div className="space-y-4 pt-16 md:hidden">
                          <motion.div
                            className="launch-device-shell relative mx-auto w-full max-w-[22rem] rounded-[1.55rem] p-2.5"
                            animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-0.8, 0.4, -0.1] }}
                            transition={reduceMotion ? undefined : { duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <div className="mb-2 flex items-center gap-2 px-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                            </div>
                            <div className="vt-image relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10" style={transitionVars}>
                              <AnimatedWebsitePreview
                                src={getProjectStageImage(activeProject)}
                                alt={`${activeProject.title} preview`}
                                sizes="100vw"
                                priority
                                unoptimized
                                mode="hero"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/72 via-zinc-950/10 to-transparent" />
                            </div>
                          </motion.div>

                          <div className="mx-auto w-full max-w-[22rem] rounded-[1.45rem] border border-white/10 bg-zinc-950/60 p-4 backdrop-blur-md">
                            <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                              {activeProject.category}
                            </p>
                            <h2 className="vt-title mt-3 text-[2rem] font-semibold leading-[0.95] text-white" style={transitionVars}>
                              {activeProject.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-zinc-200">{activeProject.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {activeProject.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="hero-project-pill">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <Button asChild size="sm" className="mt-4 w-full rounded-full">
                              <ViewTransitionLink href={`/projects/${activeProject.slug}`}>
                                <Sparkles size={14} className="mr-2" />
                                Open Case Study
                              </ViewTransitionLink>
                            </Button>
                          </div>
                        </div>

                        <div className="relative hidden h-full md:block md:pb-28 lg:pb-32">
                          <motion.div
                            className="launch-device-shell absolute left-[7%] top-[14%] z-10 w-[78%] rounded-[2rem] p-3 lg:w-[74%]"
                            animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-1.2, 0.8, -0.2] }}
                            transition={reduceMotion ? undefined : { duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <div className="mb-2 flex items-center gap-2 px-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                            </div>
                            <div className="vt-image relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-white/10" style={transitionVars}>
                              <AnimatedWebsitePreview
                                src={getProjectStageImage(activeProject)}
                                alt={`${activeProject.title} desktop preview`}
                                sizes="(max-width: 1280px) 100vw, 34vw"
                                priority
                                unoptimized
                                mode="hero"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/72 via-zinc-950/10 to-transparent" />
                            </div>
                          </motion.div>

                          <motion.div
                            className="launch-device-shell absolute left-[2%] top-[58%] z-20 hidden w-[31%] rounded-[1.7rem] p-2 xl:block"
                            animate={reduceMotion ? undefined : { y: [6, -10, 6], rotate: [-2, 1.5, -1] }}
                            transition={reduceMotion ? undefined : { duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-white/10">
                              <AnimatedWebsitePreview
                                src={getProjectThumbnail(activeProject, "tablet")}
                                alt={`${activeProject.title} tablet preview`}
                                sizes="220px"
                                unoptimized
                                mode="card"
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            className="launch-device-shell absolute right-[2%] top-[40%] z-30 hidden w-[22%] rounded-[1.7rem] p-2 lg:block lg:w-[24%] xl:w-[22%]"
                            animate={reduceMotion ? undefined : { y: [-4, 12, -4], rotate: [2, -1.5, 0.5] }}
                            transition={reduceMotion ? undefined : { duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.1rem] border border-white/10">
                              <AnimatedWebsitePreview
                                src={getProjectThumbnail(activeProject, "mobile")}
                                alt={`${activeProject.title} mobile preview`}
                                sizes="180px"
                                unoptimized
                                mode="card"
                              />
                            </div>
                          </motion.div>

                          <div className="absolute inset-x-4 bottom-4 z-20 rounded-[1.6rem] border border-white/10 bg-zinc-950/55 p-5 backdrop-blur-md">
                          <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{activeProject.category}</p>
                              <h2 className="vt-title mt-2 text-xl font-semibold text-white md:text-3xl" style={transitionVars}>
                                {activeProject.title}
                              </h2>
                            </div>
                            <ViewTransitionLink
                              href={`/projects/${activeProject.slug}`}
                              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-cyan-100 hover:text-cyan-50"
                            >
                              <Sparkles size={13} />
                              Open Case Study
                            </ViewTransitionLink>
                          </div>
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-200 md:leading-7">{activeProject.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {activeProject.highlights.slice(0, 2).map((item) => (
                              <span key={`${activeProject.slug}-${item}-hero`} className="hero-project-pill">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        </div>
                      </>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="order-1 grid gap-4 xl:order-1">
                <motion.div className="hero-support-card mx-auto w-full max-w-[20rem] rounded-[2rem] p-4 text-center md:max-w-none md:p-5" style={reduceMotion ? undefined : { y: portraitY }}>
                    <div className="relative mx-auto w-[160px] sm:w-[180px] md:w-[200px]">
                    <div className="absolute inset-[-16px] rounded-full border border-cyan-300/12 opacity-70" />
                    <div className="hero-portrait-shell relative overflow-hidden rounded-full border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(59,130,246,0.12),rgba(2,6,23,0.88))] p-2.5">
                      <div className="relative aspect-square overflow-hidden rounded-full border border-white/20">
                        <Image
                          src={PROFILE.avatar}
                          alt={`${PROFILE.name} portrait`}
                          fill
                          className="object-cover object-[center_10%] scale-[1.02]"
                          priority
                          sizes="220px"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.24),transparent_42%),linear-gradient(180deg,transparent_42%,rgba(2,6,23,0.64)_100%)]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Alden Jay Centino</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">Full-stack engineer focused on premium UI, frontend craft, and conversion-aware execution.</p>
                  </div>
                </motion.div>

                {activeProject ? (
                  <AnimatePresence mode="wait">
                <motion.article
                  key={`${activeProject.slug}-logic`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.32 }}
                      className="hero-support-card rounded-[2rem] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Launch Logic</p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Goal</p>
                          <p className="mt-2 text-sm leading-7 text-zinc-300">{activeProject.goal}</p>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Solution</p>
                          <p className="mt-2 text-sm leading-7 text-zinc-300">{activeProject.solution}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeProject.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="hero-project-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  </AnimatePresence>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36 }}
          className="xl:col-span-2"
        >
          <div className="grid gap-4 xl:grid-cols-[0.9fr_0.76fr_1.34fr] xl:items-start">
            <article className="hero-support-card rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Experience Direction</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Designed to feel closer to a product launch than a standard portfolio home.</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                The first screen is built to communicate trust, motion quality, and real live output before the viewer needs to scroll.
              </p>
            </article>

            <article className="hero-support-card rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Launch Sequence</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Reveal", "Ambient light, text, and stage settle in together.", "72%"],
                  ["Morph", "Device layers shift with depth instead of appearing flat.", "84%"],
                  ["Browse", "Live projects rotate into view as the experience opens.", "96%"],
                ].map(([title, copy, width], index) => (
                  <div key={title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">0{index + 1}</span>
                    </div>
                    <div className="hero-progress-rail mt-3">
                      <span className="hero-progress-fill" style={{ width }} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{copy}</p>
                  </div>
                ))}
              </div>
            </article>

            {activeProject ? (
              <AnimatePresence mode="wait">
                <motion.article
                  key={`${activeProject.slug}-highlights`}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hero-support-card rounded-[1.8rem] p-5"
                >
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Featured Build Logic</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">{activeProject.title}</h2>
                    </div>
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-400/[0.08] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                      {activeProject.category}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {activeProject.highlights.slice(0, 3).map((item) => (
                      <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-sm leading-7 text-zinc-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Goal</p>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">{activeProject.goal}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Outcome</p>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">{activeProject.industryNotes}</p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            ) : null}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Scroll to explore</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="h-10 w-[1px] bg-gradient-to-b from-cyan-200/0 via-cyan-200/70 to-cyan-200/0"
        />
      </motion.div>
    </section>
  );
}
