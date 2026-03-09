import type { ReactNode } from "react";
import { SectionReveal } from "@/components/effects/SectionReveal";

type RouteHeroStat = {
  value: string;
  label: string;
};

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: RouteHeroStat[];
  aside?: ReactNode;
};

const defaultSignals = [
  "Premium presentation",
  "Structured delivery",
  "Conversion-aware UI",
] as const;

export function RouteHero({ eyebrow, title, description, stats = [], aside }: RouteHeroProps) {
  const sceneItems = stats.length
    ? stats.slice(0, 2).map((stat) => ({
        title: stat.value,
        copy: stat.label,
      }))
    : defaultSignals.slice(0, 2).map((signal, index) => ({
        title: `Signal 0${index + 1}`,
        copy: signal,
      }));

  return (
    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
      <SectionReveal>
        <article className="editorial-panel route-hero-panel grid min-h-[18rem] content-start rounded-[2rem] p-6 md:min-h-[22rem] md:p-9">
          <div className="route-hero-orb route-hero-orb-a" aria-hidden />
          <div className="route-hero-orb route-hero-orb-b" aria-hidden />
          <div className="route-hero-watermark" aria-hidden>
            {eyebrow}
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-400/[0.08] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
              <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-200">{eyebrow}</p>
            </div>
            <div className="ui-surface-main hidden rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-zinc-300 md:inline-flex">
              Editorial route intro
            </div>
          </div>

          <div className="relative z-10 mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-end">
            <div className="max-w-5xl">
              <h1 className="text-balance text-[2.65rem] font-semibold leading-[0.95] text-white sm:text-[3.15rem] md:text-6xl xl:text-[4.4rem]">{title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 md:text-[1.05rem]">{description}</p>
            </div>

            <div className="route-hero-scene rounded-[1.8rem] p-5">
              <div className="route-hero-scanline" aria-hidden />
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">Scene Focus</p>
              <div className="mt-5 grid gap-3">
                {sceneItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="ui-surface-main route-hero-scene-card rounded-[1.3rem] px-4 py-4">
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{item.copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {defaultSignals.map((signal) => (
                  <span key={signal} className="route-hero-chip">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3">
            {defaultSignals.map((signal, index) => (
              <SectionReveal key={`${eyebrow}-${signal}`} delay={index * 0.03}>
                <div className="ui-surface-main rounded-[1.4rem] px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Signal 0{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{signal}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {stats.length ? (
            <div className="route-hero-stats relative z-10 mt-5 grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <SectionReveal key={`${stat.label}-${index}`} delay={index * 0.04}>
                  <div className="ui-surface-main rounded-[1.6rem] px-4 py-4">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300">{stat.label}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          ) : null}
        </article>
      </SectionReveal>

      {aside ? (
        <SectionReveal delay={0.08}>
          <div>{aside}</div>
        </SectionReveal>
      ) : null}
    </section>
  );
}
