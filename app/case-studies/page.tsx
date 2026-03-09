import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/seo";
import { getAllCaseStudies } from "@/lib/mdx";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { RouteHero } from "@/components/shared/route-hero";

export const metadata: Metadata = createMetadata({
  title: "Case Studies",
  description: "Selected case studies covering strategy, interface decisions, implementation, and launch outcomes.",
  path: "/case-studies",
});

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();
  const featured = caseStudies[0];
  const secondary = caseStudies.slice(1, 3);

  return (
    <main className="layout-wide px-6 py-32">
      <RouteHero
        eyebrow="Case Studies"
        title="Strategy, execution, and launch thinking behind selected projects."
        description="A closer look at the decisions behind selected live builds: what the project needed to achieve, how the interface was structured, and why the final release works."
        stats={[
          { value: `${caseStudies.length}`, label: "Published studies" },
          { value: "Real", label: "Live references" },
          { value: "Goal to launch", label: "Decision coverage" },
        ]}
        aside={
          featured ? (
            <article className="editorial-panel flex h-full flex-col overflow-hidden rounded-[2rem] p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12">
                <div className="relative aspect-[16/10]">
                  <Image src={featured.cover} alt={`${featured.title} feature`} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 38vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/12 to-transparent" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Featured Study</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{featured.title}</h2>
                <p className="mt-2 text-sm leading-7 text-zinc-300">{featured.description}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {featured.metrics.slice(0, 3).map((metric, index) => (
                  <div key={metric} className="ui-surface-main rounded-[1.2rem] p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200">Proof 0{index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-200">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/case-studies/${featured.slug}`} className="inline-flex items-center gap-1 text-sm text-cyan-200 hover:text-cyan-100">
                  Read Case Study <ArrowUpRight size={14} />
                </Link>
                {featured.liveUrl ? (
                  <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-zinc-200 hover:text-cyan-100">
                    <Globe size={14} />
                    Live Website
                  </a>
                ) : null}
              </div>
            </article>
          ) : null
        }
      />

      {featured ? (
        <section className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionReveal>
            <article className="launch-stage-shell rounded-[2.6rem] p-4 md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative overflow-hidden rounded-[1.9rem] border border-white/12">
                  <div className="relative aspect-[16/10]">
                    <Image src={featured.cover} alt={`${featured.title} preview`} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 56vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/82 via-zinc-950/16 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Lead Study</p>
                    <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold text-white md:text-5xl">{featured.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-200">{featured.description}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <article className="signature-story-card rounded-[1.8rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Reading Lens</p>
                    <p className="mt-4 text-sm leading-7 text-zinc-300">
                      These studies are written to show decision quality, not just surface polish. Each one links the business objective,
                      the chosen UX structure, and the launch-ready implementation approach.
                    </p>
                  </article>
                  <article className="showcase-copy-shell rounded-[1.8rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Coverage</p>
                    <div className="mt-4 grid gap-3">
                      {[
                        "Goal and business framing",
                        "Interface hierarchy and trust cues",
                        "Implementation choices and responsiveness",
                        "Launch readiness and action flow",
                      ].map((item) => (
                        <div key={item} className="ui-surface-main rounded-[1.2rem] px-4 py-3 text-sm text-zinc-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </article>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="grid gap-4">
              <article className="case-study-note-shell rounded-[2rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Featured Read</p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  The lead study sets the tone for the collection: stronger business framing, clearer execution logic, and a direct line
                  between interface decisions and the intended user action.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/case-studies/${featured.slug}`} className="inline-flex items-center gap-1 text-sm text-cyan-200 hover:text-cyan-100">
                    Read Case Study <ArrowUpRight size={14} />
                  </Link>
                  {featured.liveUrl ? (
                    <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-zinc-200 hover:text-cyan-100">
                      <Globe size={14} />
                      Live Website
                    </a>
                  ) : null}
                </div>
              </article>

              {secondary.map((study) => (
                <article key={study.slug} className="reel-selector-card rounded-[1.8rem] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{formatDate(study.date)}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{study.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{study.description}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {study.metrics.slice(0, 3).map((metric, index) => (
                      <div key={metric} className="ui-surface-main rounded-[1.15rem] p-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200">Proof 0{index + 1}</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">{metric}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/case-studies/${study.slug}`} className="inline-flex items-center gap-1 text-sm text-cyan-200 hover:text-cyan-100">
                      Read Case Study <ArrowUpRight size={14} />
                    </Link>
                    {study.liveUrl ? (
                      <a href={study.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-zinc-200 hover:text-cyan-100">
                        <Globe size={14} />
                        Live Website
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </SectionReveal>
        </section>
      ) : null}

      <section className="project-exhibition-band mt-12 rounded-[2.4rem] p-6 md:p-8">
        <SectionReveal>
          <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Published Collection</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold text-white md:text-5xl">
                A growing archive of strategy notes, interface decisions, and launch framing.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Journal style", "Written as launch notes, not captions."],
                ["Live context", "Built around real published work."],
                ["Practical depth", "Goal, solution, and outcome linked together."],
              ].map(([title, copy]) => (
                <div key={title} className="ui-surface-main rounded-[1.45rem] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="mt-12 space-y-6">
        {caseStudies.map((study, index) => (
          <SectionReveal key={study.slug} delay={index * 0.04}>
            <article className="journal-entry-shell group rounded-[2.4rem] p-4 md:p-5">
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={study.cover}
                      alt={`${study.title} cover`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1280px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/72 via-zinc-950/6 to-transparent" />
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{formatDate(study.date)}</p>
                    <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold text-white md:text-4xl">{study.title}</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-8 text-zinc-300">{study.description}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {study.metrics.slice(0, 3).map((metric, index) => (
                        <div key={metric} className="ui-surface-main rounded-[1.15rem] p-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200">Proof 0{index + 1}</p>
                          <p className="mt-2 text-sm leading-6 text-zinc-200">{metric}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 xl:min-w-[13rem]">
                    <Link href={`/case-studies/${study.slug}`} className="journal-action-chip">
                      <span>Read Study</span>
                      <ArrowUpRight size={14} />
                    </Link>
                    {study.liveUrl ? (
                      <a href={study.liveUrl} target="_blank" rel="noreferrer" className="journal-action-chip journal-action-chip-muted">
                        <span>Live Website</span>
                        <Globe size={14} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </main>
  );
}
