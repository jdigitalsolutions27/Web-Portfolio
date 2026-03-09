import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { createMetadata } from "@/lib/seo";
import { getProjectBySlug, getProjectStageImage, getProjectThumbnail, projects } from "@/lib/projects";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: "Project Not Found",
      description: "This project does not exist.",
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : null;

  if (!project) {
    notFound();
  }
  const transitionVars = {
    "--vt-image-name": `project-image-${project.slug}`,
    "--vt-title-name": `project-title-${project.slug}`,
  } as CSSProperties;

  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="mr-2" size={16} /> Back to Projects
        </Link>
      </Button>

      <section className="editorial-panel rounded-[2rem] p-7 md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-4xl space-y-5">
            <Badge>{project.category}</Badge>
            <h1 className="vt-title text-balance text-4xl font-semibold text-white md:text-6xl" style={transitionVars}>
              {project.title}
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-zinc-300">{project.description}</p>
          </div>
          <div className="ui-surface-main min-w-[14rem] rounded-[1.6rem] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Project Positioning</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {project.goal}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={project.url} target="_blank" rel="noreferrer">
              Live Demo <ArrowUpRight className="ml-2" size={16} />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">
              Start Similar Project <ArrowUpRight className="ml-2" size={16} />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <ViewTransitionLink href={`/showcase?project=${project.slug}`}>Open Showcase Mode</ViewTransitionLink>
          </Button>
        </div>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="vt-image editorial-panel relative overflow-hidden rounded-[2rem] p-3" style={transitionVars}>
          <div className="rounded-[1.6rem] border border-white/10 bg-black/25 p-3">
            <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-zinc-400">Desktop Experience</span>
            </div>
            <Image
              src={getProjectStageImage(project)}
              alt={`${project.title} desktop preview`}
              width={1400}
              height={920}
              className="mt-3 h-auto w-full rounded-[1.5rem] object-cover object-top"
              quality={92}
              priority
            />
          </div>
        </div>
        <div className="grid gap-3">
          <div className="ui-surface-card rounded-[1.7rem] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Delivery Frame</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-2">
                <Image
                  src={getProjectThumbnail(project, "tablet")}
                  alt={`${project.title} tablet preview`}
                  width={1100}
                  height={820}
                  className="h-full w-full rounded-[1rem] object-cover object-top"
                  quality={88}
                />
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-2">
                <Image
                  src={getProjectThumbnail(project, "mobile")}
                  alt={`${project.title} mobile preview`}
                  width={620}
                  height={980}
                  className="h-full w-full rounded-[1rem] object-cover object-top"
                  quality={85}
                />
              </div>
            </div>
          </div>
          <div className="ui-surface-main rounded-[1.7rem] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Launch Signals</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Category", project.category],
                ["Year", String(project.year)],
                ["Primary focus", project.highlights[0] ?? "Premium execution"],
                ["Industry note", project.industryNotes],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">{label}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-200">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="ui-surface-card rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">Goal</h2>
          <p className="mt-3 leading-8 text-zinc-300">{project.goal}</p>
        </article>
        <article className="ui-surface-card rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">Solution</h2>
          <p className="mt-3 leading-8 text-zinc-300">{project.solution}</p>
        </article>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        {project.highlights.map((highlight) => (
          <div key={highlight} className="ui-surface-card rounded-xl p-4 text-sm text-zinc-200">
            <p className="inline-flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-200" />
              {highlight}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="neutral">
            {tag}
          </Badge>
        ))}
      </section>

      <section className="editorial-panel mt-8 rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-white">Industry Notes</h2>
        <p className="mt-3 leading-8 text-zinc-300">{project.industryNotes}</p>
      </section>

      {nextProject ? (
        <section className="editorial-panel mt-10 rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Next Project</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{nextProject.title}</h3>
          <p className="mt-2 text-sm text-zinc-300">{nextProject.description}</p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href={`/projects/${nextProject.slug}`}>View Next Project</Link>
          </Button>
        </section>
      ) : null}
    </main>
  );
}
