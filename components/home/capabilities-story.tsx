"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Gauge, Layers3, Radar, Sparkles, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilityScenes = [
  {
    title: "Premium UI Systems",
    copy:
      "Interfaces are designed like products: strong hierarchy, deliberate spacing, elegant motion, and conversion-aware call-to-action flow.",
    detail:
      "The visual system is treated as infrastructure, not decoration. That means reusable components, sharper composition, and cleaner trust signals across every screen.",
    tags: ["Design systems", "Interaction pacing", "Responsive polish"],
    icon: Sparkles,
  },
  {
    title: "Frontend Engineering",
    copy:
      "Modern frontend architecture built with clean composition, stable states, and performance-aware rendering for production use.",
    detail:
      "The delivery balances motion, responsiveness, and maintainability so the final experience feels premium without collapsing under complexity.",
    tags: ["Next.js", "React", "TypeScript"],
    icon: Code2,
  },
  {
    title: "Backend-Ready Delivery",
    copy:
      "Forms, admin flows, APIs, content structures, and launch pathways are engineered to support real use, not static presentation.",
    detail:
      "The work extends beyond landing pages into data-backed systems, operational tools, and scalable delivery logic where the frontend and backend behave like one product.",
    tags: ["Laravel / PHP", "APIs", "Data workflows"],
    icon: Workflow,
  },
  {
    title: "Performance and Conversion",
    copy:
      "Speed, SEO, and conversion structure are integrated into the build from the start so the site works commercially, not just visually.",
    detail:
      "Every major screen is tuned for first impression, information clarity, and decisive action paths that support inquiries, bookings, and client trust.",
    tags: ["Core Web Vitals", "SEO", "Lead-focused UX"],
    icon: Gauge,
  },
] as const;

export function CapabilitiesStory() {
  const reduced = useReducedMotion();
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const next = Number(visible.target.getAttribute("data-index"));
        if (!Number.isNaN(next)) setActiveIndex(next);
      },
      { threshold: [0.3, 0.5, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = useMemo(() => capabilityScenes[activeIndex], [activeIndex]);
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="px-6 py-[120px] md:py-[140px]">
      <div className="layout-wide grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="xl:sticky xl:top-32 xl:h-fit">
          <div className="editorial-panel rounded-[2.2rem] p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Capabilities Story</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-semibold text-white md:text-5xl">
              A premium delivery stack told as a sequence, not a feature list.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300">
              The work moves from visual direction to implementation, then into production quality and commercial outcomes. This section is structured like a narrative because the process itself is part of the value.
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200">
                <ActiveIcon size={20} />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-cyan-200">Active Scene</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{active.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{active.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className="hero-project-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4 xl:grid-cols-4">
              {capabilityScenes.map((scene, index) => (
                <button
                  key={scene.title}
                  type="button"
                  onClick={() => cardsRef.current[index]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })}
                  className={cn(
                    "rounded-[1.2rem] border px-3 py-3 text-left text-xs uppercase tracking-[0.18em] transition",
                    index === activeIndex
                      ? "border-cyan-300/35 bg-cyan-400/[0.08] text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                  )}
                >
                  0{index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {capabilityScenes.map((scene, index) => {
            const Icon = scene.icon;
            const isActive = index === activeIndex;
            return (
              <motion.article
                key={scene.title}
                ref={(node) => {
                  cardsRef.current[index] = node;
                }}
                data-index={index}
                className={cn(
                  "capability-scene rounded-[2.2rem] p-6 md:p-8",
                  isActive && "border-cyan-300/35 shadow-[0_24px_80px_rgba(34,211,238,0.12)]",
                )}
                animate={{
                  opacity: isActive ? 1 : 0.76,
                  scale: isActive ? 1 : 0.985,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex flex-col gap-8">
                    <div>
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200">
                        <Icon size={20} />
                      </div>
                      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cyan-200">Scene 0{index + 1}</p>
                      <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{scene.title}</h3>
                      <p className="mt-5 max-w-xl text-base leading-8 text-zinc-200">{scene.copy}</p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {scene.tags.map((tag) => (
                        <div key={tag} className="ui-surface-main rounded-[1.2rem] px-4 py-3 text-sm text-zinc-200">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Capability Depth</p>
                      <p className="mt-4 text-sm leading-7 text-zinc-300">{scene.detail}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          label: "Composition",
                          copy: index === 0 ? "Interfaces feel intentional, not assembled from blocks." : "Section rhythm and interaction hierarchy stay clean under scale.",
                          icon: Layers3,
                        },
                        {
                          label: "Outcome",
                          copy: index === capabilityScenes.length - 1 ? "Traffic and trust are guided toward action." : "The output remains commercially useful, not just visually strong.",
                          icon: Radar,
                        },
                      ].map((item) => {
                        const SideIcon = item.icon;
                        return (
                          <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                              <SideIcon size={18} />
                            </div>
                            <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                            <p className="mt-2 text-sm leading-7 text-zinc-300">{item.copy}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
