import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Zap } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/hero";
import { ProofBand } from "@/components/home/proof-band";
import { SignatureStage } from "@/components/home/signature-stage";
import { EditorialShowcase } from "@/components/home/editorial-showcase";
import { CapabilitiesStory } from "@/components/home/capabilities-story";
import { LaunchReel } from "@/components/reel/LaunchReel";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { Button } from "@/components/ui/button";
import { featuredProjects, projectStats } from "@/lib/projects";

export const metadata: Metadata = createMetadata({
  title: "Alden Jay A. Centino | Full-Stack Web Developer",
  description:
    "Cinematic full-stack developer portfolio showcasing 23 live deployments built for performance, SEO, and conversion.",
  path: "/",
});

const process = [
  {
    step: "01",
    title: "Discovery",
    detail: "Business goals, audience, and conversion priorities are defined upfront.",
  },
  {
    step: "02",
    title: "Design",
    detail: "Premium visual direction and wireframe flow are crafted for clarity and trust.",
  },
  {
    step: "03",
    title: "Development",
    detail: "Frontend and backend are engineered with responsive, scalable architecture.",
  },
  {
    step: "04",
    title: "QA",
    detail: "Cross-device testing, accessibility checks, and performance validation are completed.",
  },
  {
    step: "05",
    title: "Launch",
    detail: "Deployment, analytics setup, and post-launch iteration support are delivered.",
  },
];

const executionCards = [
  {
    title: "Mobile-First",
    detail: "Interfaces engineered to feel deliberate on desktop, tablet, and phone.",
    points: ["Fluid layouts", "Touch-safe controls", "Responsive motion"],
    metric: "All breakpoints",
  },
  {
    title: "SEO + Speed",
    detail: "Performance-aware architecture built for discoverability and lower friction.",
    points: ["Structured metadata", "Lean assets", "Fast first impressions"],
    metric: "Performance-aware",
  },
] as const;

const openingSignals = [
  {
    title: "23 Live Deployments",
    detail: "Production websites shipped across restaurants, healthcare, hospitality, real estate, agency, and service businesses.",
    points: ["Restaurants", "Healthcare", "Hospitality"],
    metric: "Multi-industry",
  },
  {
    title: "12+ Industry Contexts",
    detail: "Layouts and conversion paths adapted to different buying behaviors, information needs, and trust signals.",
    points: ["Booking flows", "Inquiry funnels", "Trust-building UX"],
    metric: "Context-led",
  },
  {
    title: "Premium Frontend Layer",
    detail: "Motion, hierarchy, responsiveness, and brand presentation treated as part of the product system.",
    points: ["Motion systems", "Hierarchy", "Brand polish"],
    metric: "Presentation-ready",
  },
] as const;

const ctaPoints = [
  "Premium UI direction aligned with business positioning",
  "Fast, mobile-first build quality with clear UX paths",
  "Conversion-focused launch structure from day one",
] as const;

const recruiterSignals = [
  {
    title: "Design + Engineering",
    detail: "Interface thinking, frontend execution, backend structure, and launch quality handled as one workflow.",
    focus: "Strategy to deployment",
  },
  {
    title: "Client-Facing Polish",
    detail: "Presentation-ready work built for trust, clarity, and stronger first impressions with international clients.",
    focus: "Trust and presentation",
  },
  {
    title: "Production Mindset",
    detail: "Responsive delivery, SEO-aware structure, clean component systems, and maintainable architecture.",
    focus: "Maintainable systems",
  },
  {
    title: "Commercial Focus",
    detail: "Work is framed around inquiries, bookings, lead quality, and business outcomes rather than visual styling alone.",
    focus: "Business outcomes",
  },
] as const;

const hiringSnapshot = [
  { value: "23", label: "Live launches" },
  { value: "12+", label: "Industry contexts" },
  { value: "Full-stack", label: "Frontend to launch" },
  { value: "Design-led", label: "UI and conversion" },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBand />

      <section className="px-6 pb-12">
        <div className="layout-wide grid gap-4 xl:grid-cols-[1.2fr_0.8fr_0.8fr] xl:items-start">
          <SectionReveal>
            <article className="editorial-panel scene-shell rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Portfolio Snapshot</p>
                  <h2 className="mt-3 max-w-3xl text-balance text-4xl font-semibold text-white md:text-5xl">
                    A broader delivery system, not just a visual portfolio.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-zinc-300">
                  Full-stack execution built around premium presentation, fast-loading interfaces, and conversion-aware information
                  architecture.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-[0.9fr_0.9fr_1.2fr]">
                <div className="ui-surface-main rounded-[1.6rem] px-5 py-5">
                  <p className="text-6xl font-semibold text-white md:text-7xl">{projectStats.liveWebsites}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-zinc-300">Live deployments</p>
                </div>
                <div className="ui-surface-main rounded-[1.6rem] px-5 py-5">
                  <p className="text-6xl font-semibold text-white md:text-7xl">{projectStats.industries}+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-zinc-300">Industries served</p>
                </div>
                <div className="ui-surface-main rounded-[1.6rem] px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Positioning</p>
                  <p className="mt-3 text-base leading-8 text-zinc-200">
                    Modern full-stack delivery with a premium frontend layer: brand-forward visuals, responsive systems, and
                    conversion-focused structure tuned for real business use.
                  </p>
                </div>
              </div>
            </article>
          </SectionReveal>

          {[...executionCards, ...openingSignals.slice(0, 1)].map((card, index) => (
            <SectionReveal key={card.title} delay={0.05 + index * 0.05}>
              <article className="ui-surface-card rounded-[2rem] p-6">
                <div className="flex h-full flex-col">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{index < executionCards.length ? "Execution Layer" : "Proof Layer"}</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{card.detail}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.points.map((item) => (
                      <span key={item} className="hero-project-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300">{card.metric}</p>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200">
                      <Zap size={18} />
                    </span>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        <div className="layout-wide mt-4 grid gap-4 xl:grid-cols-3">
          {openingSignals.slice(1).map((item, index) => (
            <SectionReveal key={item.title} delay={0.08 + index * 0.05}>
              <article className="ui-surface-main rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Signal 0{index + 2}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{item.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.points.map((point) => (
                    <span key={point} className="hero-project-pill">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
          <SectionReveal delay={0.18}>
            <article className="editorial-panel rounded-[1.8rem] p-5 xl:col-span-1">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Approach</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Sharper first impression, cleaner trust signals, stronger action paths.</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                The design direction is intentionally editorial: larger visual scenes, fewer generic blocks, and more emphasis on how the work is presented and navigated.
              </p>
            </article>
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="layout-wide grid gap-6 xl:grid-cols-[0.84fr_1.16fr] xl:items-start">
          <SectionReveal>
            <article className="editorial-panel rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Recruiter Snapshot</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold text-white md:text-5xl">
                What employers and clients should understand within the first minute.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300">
                This portfolio is designed to make capability, execution quality, and commercial value obvious without forcing a long read.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {hiringSnapshot.map((item) => (
                  <div key={item.label} className="ui-surface-main rounded-[1.5rem] px-4 py-4">
                    <p className="text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </article>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-2">
            {recruiterSignals.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.05}>
                <article className="ui-surface-card rounded-[1.8rem] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Signal 0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.detail}</p>
                  <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{item.focus}</p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <SignatureStage />
      <LaunchReel projects={featuredProjects} />
      <EditorialShowcase />

      <CapabilitiesStory />

      <section id="build-process" className="px-6 py-[120px]">
        <div className="layout-wide">
          <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <SectionReveal>
              <article className="editorial-panel rounded-[2rem] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Build Process</p>
                <h2 className="mt-3 text-balance text-4xl font-semibold text-white md:text-5xl">
                  A delivery system built to look premium and perform like a product.
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  The process is structured to reduce ambiguity, preserve quality, and keep visual polish connected to business goals from discovery through launch.
                </p>
              </article>
            </SectionReveal>

            <div className="process-rail grid gap-4 xl:grid-cols-5">
            {process.map((item, index) => (
              <SectionReveal key={item.step} delay={index * 0.05}>
                <article className="ui-surface-card relative h-full rounded-[1.7rem] p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Step {item.step}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{item.detail}</p>
                </article>
              </SectionReveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cta-home" className="px-6 pb-24 pt-8">
        <div className="home-cta-surface editorial-panel layout-wide rounded-[2rem] border border-cyan-300/25 bg-[linear-gradient(120deg,rgba(34,211,238,0.2),rgba(59,130,246,0.15),rgba(2,6,23,0.88))] p-10 shadow-[0_0_100px_rgba(34,211,238,0.22)]">
          <SectionReveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-1.5 text-xs uppercase tracking-[0.17em] text-cyan-100">
              <CheckCircle2 size={14} />
              Available for New Projects
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">
              Need a premium website that actually converts?
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-100">
              Let&apos;s build a high-performance digital experience tailored to your business goals, audience behavior, and growth targets.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-zinc-100 md:grid-cols-3">
              {ctaPoints.map((item) => (
                <div key={item} className="ui-surface-main rounded-2xl px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/projects">View Project Explorer</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
