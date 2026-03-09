"use client";
import type { CSSProperties, PointerEventHandler } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ExternalLink, FileText, Gauge, Sparkles } from "lucide-react";
import { getProjectThumbnail, type Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { AnimatedWebsitePreview } from "@/components/shared/animated-website-preview";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";

type ProjectCardProps = {
  project: Project;
  index?: number;
  onQuickView?: (project: Project) => void;
  layout?: "default" | "wide";
};

export function ProjectCard({ project, index = 0, onQuickView, layout = "default" }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const [frame, setFrame] = useState<0 | 1 | 2>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(0);
  const shadowX = useMotionValue(0);
  const shadowY = useMotionValue(0);
  const contentShift = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 240, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 240, damping: 20, mass: 0.5 });
  const shadowXSpring = useSpring(shadowX, { stiffness: 180, damping: 22, mass: 0.7 });
  const shadowYSpring = useSpring(shadowY, { stiffness: 180, damping: 22, mass: 0.7 });
  const contentShiftSpring = useSpring(contentShift, { stiffness: 180, damping: 22, mass: 0.7 });
  const glowXSpring = useSpring(glowX, { stiffness: 140, damping: 24 });
  const glowYSpring = useSpring(glowY, { stiffness: 140, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowXSpring}% ${glowYSpring}%, rgba(34,211,238,0.22), transparent 72%)`;
  const shadow = useMotionTemplate`0 16px 46px rgba(0,0,0,0.35), ${shadowXSpring}px ${shadowYSpring}px 44px rgba(34,211,238,0.14)`;

  const images = useMemo(
    () => [
      getProjectThumbnail(project, "desktop"),
      getProjectThumbnail(project, "tablet"),
      getProjectThumbnail(project, "mobile"),
    ],
    [project],
  );
  const transitionVars = {
    "--vt-image-name": `project-image-${project.slug}`,
    "--vt-title-name": `project-title-${project.slug}`,
  } as CSSProperties;

  useEffect(() => {
    if (!isHovering || reducedMotion) return;
    const id = window.setInterval(() => {
      setFrame((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 1200);
    return () => window.clearInterval(id);
  }, [isHovering, reducedMotion]);

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    glowX.set(x * 100);
    glowY.set(y * 100);
    rotateY.set((x - 0.5) * 10);
    rotateX.set((0.5 - y) * 9);
    shadowX.set((x - 0.5) * 22);
    shadowY.set((y - 0.5) * 18);
    contentShift.set(-4);
  };

  const resetCard = () => {
    setIsHovering(false);
    setFrame(0);
    rotateX.set(0);
    rotateY.set(0);
    shadowX.set(0);
    shadowY.set(0);
    contentShift.set(0);
    glowX.set(50);
    glowY.set(0);
  };

  return (
    <motion.article
      className={`ui-surface-card group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_16px_46px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_22px_70px_rgba(34,211,238,0.18)] ${
        layout === "wide" ? "xl:min-h-[34rem] xl:flex-row" : ""
      }`}
      style={reducedMotion ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1200, boxShadow: shadow }}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetCard}
      onFocus={() => setIsHovering(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          resetCard();
        }
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
    >
      {!reducedMotion ? <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glow }} /> : null}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border border-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-hover:[border-image:linear-gradient(135deg,rgba(34,211,238,0.85),rgba(59,130,246,0.5))_1]" />
      <motion.div
        className={`vt-image relative ${layout === "wide" ? "h-72 xl:h-auto xl:min-h-full xl:w-[48%] xl:shrink-0" : "h-56"}`}
        style={reducedMotion ? transitionVars : { ...transitionVars, y: contentShiftSpring }}
      >
        <div className="media-frame h-full p-2">
          <div className="media-frame-inner h-[calc(100%-0.8rem)]">
            {images.map((src, i) => (
              <AnimatedWebsitePreview
                key={`${project.slug}-${src}-${i}`}
                src={errors[i] ? "/thumbnails/fallback-showcase.svg" : src}
                alt={`${project.title} device preview`}
                className={`absolute transition duration-500 ${frame === i ? "opacity-100 scale-[1.02]" : "opacity-0 scale-[1.08]"}`}
                imageClassName="object-cover"
                sizes={layout === "wide" ? "(max-width: 1280px) 100vw, 48vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                quality={92}
                unoptimized
                active={frame === i && (isHovering || layout === "wide")}
                mode={layout === "wide" ? "stage" : "card"}
                onError={() => setErrors((prev) => ({ ...prev, [i]: true }))}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/8 to-transparent" />
            <div className="ui-surface-main absolute bottom-2 left-2 rounded-full px-2 py-1 text-[11px] text-zinc-200">
              {frame === 0 ? "Desktop" : frame === 1 ? "Tablet" : "Mobile"} Preview
            </div>
            <div className="ui-surface-main absolute bottom-2 right-2 flex gap-1 rounded-full px-2 py-1">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 w-4 rounded-full ${frame === item ? "bg-cyan-300" : "bg-white/20"}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`flex flex-1 flex-col p-5 ${layout === "wide" ? "xl:p-7" : ""}`}
        style={reducedMotion ? undefined : { y: contentShiftSpring }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="neutral">{project.category}</Badge>
            {layout === "wide" ? <span className="text-xs uppercase tracking-[0.18em] text-cyan-200">Signature Launch</span> : null}
          </div>
          <span className="text-xs uppercase tracking-wider text-cyan-200">{project.year}</span>
        </div>

        <h3 className={`vt-title font-semibold text-white ${layout === "wide" ? "text-3xl xl:text-[2rem]" : "text-2xl"}`} style={transitionVars}>
          {project.title}
        </h3>
        <p className={`mt-2 text-sm leading-7 text-zinc-300 ${layout === "wide" ? "line-clamp-4 xl:max-w-xl" : "line-clamp-3"}`}>{project.description}</p>

        {layout === "wide" ? (
          <>
            <div className="mt-4 rounded-2xl border border-cyan-300/18 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              Outcome: {project.highlights[0]}
            </div>
            <div className="mt-4 grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
              {project.highlights.slice(1, 3).map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  {highlight}
                </div>
              ))}
            </div>
          </>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <p className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-zinc-200">
            <Gauge size={12} className="text-cyan-200" />
            Fast UX
          </p>
          <p className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-zinc-200">
            <Sparkles size={12} className="text-cyan-200" />
            Conversion UI
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>

        <div
          className={`mt-auto flex flex-wrap gap-2 pt-5 ${
            layout === "wide" ? "opacity-100" : "opacity-100 md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100"
          }`}
        >
          <Magnetic strength={0.12}>
            <Button asChild size="sm">
              <a href={project.url} target="_blank" rel="noreferrer">
                Live Demo <ExternalLink size={14} className="ml-1.5" />
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="secondary" size="sm">
            <ViewTransitionLink href={`/projects/${project.slug}`}>
              Case Study <FileText size={14} className="ml-1.5" />
            </ViewTransitionLink>
          </Button>
          {onQuickView ? (
            <Button variant="outline" size="sm" onClick={() => onQuickView(project)}>
              Quick View
            </Button>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}
