import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/mdx";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = await getCaseStudyBySlug(slug);
    return createMetadata({
      title: frontmatter.title,
      description: frontmatter.description,
      path: `/case-studies/${slug}`,
    });
  } catch {
    return createMetadata({
      title: "Case Study Not Found",
      description: "This case study does not exist.",
      path: `/case-studies/${slug}`,
    });
  }
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);

  if (!study) {
    notFound();
  }

  const { frontmatter, content, sections } = study;

  return (
    <main className="layout-wide px-6 py-32">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/case-studies">
          <ArrowLeft className="mr-2" size={16} /> Back to Case Studies
        </Link>
      </Button>

      <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <article className="editorial-panel rounded-[2.5rem] p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{formatDate(frontmatter.date)}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold text-white md:text-6xl">{frontmatter.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{frontmatter.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="ui-surface-main rounded-[1.45rem] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Primary Goal</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {sections.objective ??
                  "Clarify the business objective, shape the interface around it, and reduce friction toward the main user action."}
              </p>
            </div>
            <div className="ui-surface-main rounded-[1.45rem] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Execution Lens</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {sections.implementation ??
                  "Show the reasoning behind hierarchy, conversion flow, responsive behavior, and launch-ready implementation."}
              </p>
            </div>
          </div>

          {frontmatter.liveUrl ? (
            <div className="mt-8">
              <Button asChild>
                <a href={frontmatter.liveUrl} target="_blank" rel="noreferrer">
                  <Globe size={14} className="mr-2" />
                  Visit Live Website <ArrowUpRight size={14} className="ml-2" />
                </a>
              </Button>
            </div>
          ) : null}
        </article>

        <article className="case-study-note-shell rounded-[2.5rem] p-4 md:p-5">
          <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10">
            <div className="relative aspect-[16/11]">
              <Image src={frontmatter.cover} alt={frontmatter.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 42vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/82 via-zinc-950/10 to-transparent" />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {frontmatter.metrics.map((metric, index) => (
              <div key={metric} className="ui-surface-main rounded-[1.3rem] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Proof 0{index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-200">{metric}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[0.74fr_1.26fr]">
        <aside className="space-y-4 xl:sticky xl:top-28 xl:self-start">
          <article className="showcase-copy-shell rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Study Summary</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Overview</p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  {sections.overview ??
                    "A launch-oriented build focused on stronger trust, cleaner navigation, and a more deliberate user path."}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Outcome</p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  {sections.outcome ??
                    "The final release improves clarity, visual confidence, and how quickly users reach the intended conversion action."}
                </p>
              </div>
            </div>
          </article>
          <article className="signature-story-card rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Decision Layer</p>
            <div className="mt-4 space-y-3">
              {(sections.solutionPoints.length
                ? sections.solutionPoints
                : ["Goal and business framing", "Solution and interface decisions", "Launch context and supporting metrics"]
              ).map((item) => (
                <div key={item} className="border-b border-white/10 pb-3 text-sm text-zinc-200 last:border-b-0 last:pb-0">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="case-study-note-shell rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Hiring Signal</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              This study shows how the work moves from business framing to visual hierarchy, then into responsive implementation and
              launch-ready output.
            </p>
          </article>
        </aside>

        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <article className="ui-surface-main rounded-[1.8rem] p-5 md:col-span-1">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Goal</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {sections.objective ??
                  "Align the build with a clear business goal and make the primary action easier to understand and complete."}
              </p>
            </article>
            <article className="ui-surface-main rounded-[1.8rem] p-5 md:col-span-1">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Solution</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {sections.solution ??
                  "Use hierarchy, trust signals, and responsive flow to support a stronger user journey from first screen to action."}
              </p>
            </article>
            <article className="ui-surface-main rounded-[1.8rem] p-5 md:col-span-1">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Outcome</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {sections.outcome ??
                  "Deliver a more credible, better-paced digital experience that supports trust, clarity, and conversion intent."}
              </p>
            </article>
          </section>

          <article className="reading-frame prose-invert max-w-none rounded-[2.4rem] p-7 md:p-10">{content}</article>
        </div>
      </section>
    </main>
  );
}
