import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PROFILE } from "@/lib/constants";
import { experienceTimeline } from "@/lib/data/experience";
import { skillCloud } from "@/lib/data/skills";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { RouteHero } from "@/components/shared/route-hero";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Background, delivery philosophy, and multidisciplinary full-stack capability of Alden Jay A. Centino.",
  path: "/about",
});

const narrativeScenes = [
  {
    title: "Design-minded engineering",
    copy: "The work starts with composition, clarity, and audience behavior. Code is used to preserve that intent through the final build rather than flatten it.",
  },
  {
    title: "Practical full-stack delivery",
    copy: "Frontend craft is supported by backend thinking, form logic, APIs, launch setup, and systems that hold up in real production use.",
  },
  {
    title: "Conversion-aware execution",
    copy: "Every project is framed around trust, readability, responsiveness, and clearer next-step action for users and stakeholders.",
  },
] as const;

const positioningCards = [
  ["Visual judgment", "Hierarchy, rhythm, and motion are treated as part of product value, not visual garnish."],
  ["Client-facing polish", "Outputs are designed to look presentation-ready and business-ready from the first screen."],
  ["Build discipline", "Responsive behavior, maintainability, and performance stay part of the process from the start."],
  ["Commercial awareness", "The work is aligned with bookings, inquiries, lead quality, trust, and stronger decision-making."],
] as const;

const values = [
  "Clear user journeys and strategic interface hierarchy",
  "Performance-first engineering with measurable outcomes",
  "Accessible, maintainable systems for long-term reliability",
  "Design quality aligned with business conversion goals",
] as const;

const recruiterSignals = [
  ["Best fit", "Service businesses, advocacy platforms, dashboards, and premium frontend-heavy websites that need stronger trust and conversion clarity."],
  ["Delivery range", "From interface direction and responsive frontend execution to backend-backed workflows, QA, and launch support."],
  ["Working style", "Structured communication, practical recommendations, and output designed to look strong in front of clients, recruiters, and teams."],
] as const;

export default function AboutPage() {
  return (
    <main className="layout-wide px-6 py-32">
      <RouteHero
        eyebrow="About"
        title={PROFILE.name}
        description="A multidisciplinary full-stack developer who combines interface quality, practical engineering, and conversion-aware structure for live client-facing products."
        stats={[
          { value: "Summa", label: "Cum Laude" },
          { value: "2021+", label: "Build experience" },
          { value: "Full-Stack", label: "Design to launch" },
        ]}
        aside={
          <article className="editorial-panel flex h-full flex-col overflow-hidden rounded-[2rem] p-4">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12">
              <div className="relative aspect-[4/5] w-full">
                <Image src={PROFILE.avatar} alt={`${PROFILE.name} portrait`} fill className="object-cover object-top" sizes="(max-width: 1280px) 100vw, 520px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_44%,rgba(2,6,23,0.78)_100%)]" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/12 bg-zinc-950/45 p-4 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200">Positioning</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">
                    Premium interface execution supported by full-stack delivery, responsive polish, and conversion-aware structure.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="neutral">Full-Stack Engineer</Badge>
              <Badge variant="neutral">UI/UX + Conversion</Badge>
              <Badge variant="neutral">SEO & Performance</Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Leyte based", "Remote-ready and structured for client communication."],
                ["Production ready", "From interface systems to backend-backed delivery."],
                ["Design aware", "Hierarchy and polish stay part of the engineering process."],
                ["Launch focused", "Responsive, fast, and presentation-ready across devices."],
              ].map(([title, copy]) => (
                <div key={title} className="ui-surface-main rounded-[1.25rem] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
          </article>
        }
      />

      <section className="mt-12 grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <SectionReveal>
          <article className="editorial-panel rounded-[2.4rem] p-7 md:sticky md:top-28 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Recruiter Positioning</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-semibold text-white md:text-5xl">
              A full-stack developer with design judgment, launch discipline, and business-facing polish.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">
              The value is not just implementation. It is the ability to shape visual direction, structure user journeys, engineer the
              product correctly, and present the final build like a premium release instead of a basic website handoff.
            </p>
            <div className="mt-8 space-y-4 border-l border-white/10 pl-4">
              {[
                "Interfaces are designed to build trust quickly.",
                "Implementation stays responsive, clean, and scalable.",
                "Every output is framed to support action and business clarity.",
              ].map((line) => (
                <p key={line} className="text-lg leading-8 text-zinc-200">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Design-minded"],
                ["02", "Build-ready"],
                ["03", "Launch-aware"],
              ].map(([index, label]) => (
                <div key={label} className="ui-surface-main rounded-[1.35rem] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{index}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="journal-action-chip">
                Start a Conversation
              </Link>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="journal-action-chip journal-action-chip-muted">
                Review GitHub
              </a>
            </div>
          </article>
        </SectionReveal>

        <div className="grid gap-4">
          <SectionReveal>
            <article className="launch-stage-shell rounded-[2.4rem] p-5 md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Operating Model</p>
                  <h3 className="max-w-3xl text-balance text-3xl font-semibold text-white md:text-[2.35rem]">
                    The process combines brand sensitivity, frontend precision, backend practicality, and conversion thinking.
                  </h3>
                  <p className="max-w-3xl text-sm leading-7 text-zinc-300">
                    The strongest results happen when design quality and technical execution are treated as one system. That is how the
                    work is structured from concept through launch.
                  </p>
                </div>
                <div className="grid gap-3">
                  {narrativeScenes.map((scene, index) => (
                    <div key={scene.title} className="ui-surface-main rounded-[1.45rem] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Scene 0{index + 1}</p>
                      <h4 className="mt-3 text-xl font-semibold text-white">{scene.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-zinc-300">{scene.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-2">
            {positioningCards.map(([title, copy], index) => (
              <SectionReveal key={title} delay={index * 0.05}>
                <article className="capability-scene rounded-[2rem] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Positioning {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{copy}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="project-exhibition-band mt-12 rounded-[2.4rem] p-6 md:p-8">
        <SectionReveal>
          <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">What Teams Get</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-5xl">A premium digital product should feel clear, intentional, and commercially useful.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                Good work should not rely on decoration alone. It should feel composed, easy to trust, responsive in every context, and
                connected to a real business objective.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={value} className="ui-surface-main rounded-[1.5rem] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Value 0{index + 1}</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-200">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <SectionReveal>
          <article className="editorial-panel rounded-[2.4rem] p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Hiring Snapshot</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-5xl">A profile designed to handle brand, interface, implementation, and launch in one continuous workflow.</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-300">
              The value is not limited to writing code. It comes from combining interface quality, technical implementation, business awareness, and presentation polish into one delivery style.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Summa Cum Laude", "Academic distinction"],
                ["2021+", "Years in active project work"],
                ["23 live builds", "Published digital launches"],
                ["Full-stack", "Design to deployment range"],
              ].map(([value, label]) => (
                <div key={label} className="ui-surface-main rounded-[1.5rem] px-4 py-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-300">{label}</p>
                </div>
              ))}
            </div>
          </article>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="showcase-copy-shell rounded-[2.4rem] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Why Teams Hire This Profile</p>
            <div className="mt-5 space-y-4">
              {recruiterSignals.map(([title, detail], index) => (
                <article key={title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Signal 0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{detail}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Frontend to launch", "Can own layout quality, responsive execution, and deployment-ready output."],
                ["Client-facing communication", "Able to explain decisions clearly to stakeholders, recruiters, and non-technical clients."],
              ].map(([title, detail]) => (
                <div key={title} className="ui-surface-main rounded-[1.35rem] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <SectionReveal>
          <article className="editorial-panel rounded-[2.2rem] p-7 md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Career Timeline</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold text-white">A multidisciplinary path across development, support, design, analytics, and content production.</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-300">
              The timeline matters because the delivery style is shaped by more than coding alone. Technical support, design work, analytics, and communication all influence the final product quality.
            </p>
          </article>
        </SectionReveal>

        <div className="space-y-4">
          {experienceTimeline.map((item, index) => (
            <SectionReveal key={`${item.title}-${item.start}`} delay={index * 0.04}>
              <article className="signature-story-card rounded-[2rem] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">
                      {item.start} - {item.end}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-zinc-300">{item.org}</p>
                  </div>
                  <span className="launch-stage-chip">Career Line</span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">{item.details}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <SectionReveal>
          <article className="editorial-panel rounded-[2.4rem] p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Capabilities</p>
            <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Tool stack</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              The stack is selected for maintainability, speed, responsive polish, and how well it supports premium interface execution
              from concept through launch.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ["Frontend systems", "React, Next.js, modern CSS structure, accessible interaction patterns, and responsive interface logic."],
                ["Backend workflows", "PHP, Laravel, Python, API integration, and practical full-stack delivery discipline."],
                ["Design production", "Figma, Adobe tools, layout composition, and presentation polish for real client-facing output."],
              ].map(([title, copy]) => (
                <div key={title} className="ui-surface-main rounded-[1.45rem] p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
          </article>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <article className="showcase-copy-shell rounded-[2.4rem] p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Active Stack</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {skillCloud.map((skill) => (
                <Badge key={skill} variant="neutral">
                  {skill}
                </Badge>
              ))}
            </div>
          </article>
        </SectionReveal>
      </section>
    </main>
  );
}
