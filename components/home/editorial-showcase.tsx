import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { featuredProjects, getProjectStageImage } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";

export function EditorialShowcase() {
  const [lead, ...supporting] = featuredProjects.slice(0, 3);

  if (!lead) return null;

  return (
    <section id="featured-projects" className="px-6 py-24">
      <div className="layout-wide">
        <SectionReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Signature Launches</p>
              <h2 className="mt-3 max-w-4xl text-balance text-4xl font-semibold text-white md:text-6xl">
                Real products presented like premium releases, not portfolio placeholders.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-300">
              Each project is framed as a launch: strong visual identity, clear business intent, and a conversion-ready interface engineered to perform on real devices.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
          <SectionReveal>
            <article className="editorial-panel group relative overflow-hidden rounded-[2rem] p-4 md:p-6">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={getProjectStageImage(lead)}
                    alt={`${lead.title} preview`}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1280px) 100vw, 62vw"
                    quality={92}
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,15,0.08),rgba(3,6,15,0.18),rgba(3,6,15,0.84))]" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <Badge>{lead.category}</Badge>
                    <Badge variant="neutral">Featured Build</Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Launch Focus</p>
                        <h3 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{lead.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200 md:text-base">
                          {lead.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {lead.tags.slice(0, 4).map((tag) => (
                            <Badge key={`${lead.slug}-${tag}`} variant="neutral">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="ui-surface-main rounded-2xl p-4">
                        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
                          <Sparkles size={13} />
                          Outcome Snapshot
                        </p>
                        <div className="mt-4 space-y-3">
                          {lead.highlights.slice(0, 3).map((highlight) => (
                            <p key={highlight} className="text-sm leading-6 text-zinc-200">
                              {highlight}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href={lead.url} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight size={14} className="ml-1.5" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <ViewTransitionLink href={`/projects/${lead.slug}`}>Open Case Study</ViewTransitionLink>
                </Button>
              </div>
            </article>
          </SectionReveal>

          <div className="grid gap-6">
            {supporting.map((project, index) => (
              <SectionReveal key={project.slug} delay={index * 0.06}>
                <article className="ui-surface-card group grid gap-4 overflow-hidden rounded-[2rem] p-4 sm:grid-cols-[180px_1fr]">
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-white/12">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={getProjectStageImage(project)}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 180px"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{project.category}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={`${project.slug}-support-${tag}`} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="secondary">
                        <a href={project.url} target="_blank" rel="noreferrer">
                          Live Demo <ArrowUpRight size={14} className="ml-1.5" />
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <ViewTransitionLink href={`/projects/${project.slug}`}>View Project</ViewTransitionLink>
                      </Button>
                    </div>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
