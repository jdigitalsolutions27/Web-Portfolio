import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

const caseStudiesDirectory = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  metrics: string[];
  tags: string[];
  cover: string;
  liveUrl?: string;
};

export type CaseStudySections = {
  overview?: string;
  objective?: string;
  solution?: string;
  solutionPoints: string[];
  implementation?: string;
  outcome?: string;
};

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 text-3xl font-semibold tracking-tight text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 text-2xl font-semibold text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-8 text-zinc-300" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="mt-6 border-l-2 border-cyan-400/70 pl-4 italic text-zinc-200" {...props} />
  ),
  img: ({ className, alt, src }: { className?: string; alt?: string; src?: string }) => {
    if (!src) return null;
    return (
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60">
        <Image
          className={cn("h-auto w-full object-cover", className)}
          src={src}
          alt={alt ?? "Case study image"}
          width={1400}
          height={900}
        />
      </div>
    );
  },
};

async function getAllFiles() {
  try {
    const files = await fs.readdir(caseStudiesDirectory);
    return files.filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function stripMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSectionBlock(source: string, heading: string) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`##\\s+${escapedHeading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function getSectionParagraph(source: string, heading: string) {
  const block = getSectionBlock(source, heading);
  const paragraph = block
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("-") && !line.startsWith("!"));

  return paragraph ? stripMarkdown(paragraph) : undefined;
}

function getSectionBullets(source: string, heading: string) {
  return getSectionBlock(source, heading)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => stripMarkdown(line.replace(/^-+\s*/, "")));
}

function extractSections(source: string): CaseStudySections {
  return {
    overview: getSectionParagraph(source, "Overview"),
    objective: getSectionParagraph(source, "Core Objective"),
    solution: getSectionParagraph(source, "Solution"),
    solutionPoints: getSectionBullets(source, "Solution"),
    implementation: getSectionParagraph(source, "Implementation Notes"),
    outcome: getSectionParagraph(source, "Outcome"),
  };
}

export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const files = await getAllFiles();

  const studies = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(caseStudiesDirectory, file), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        metrics: Array.isArray(data.metrics) ? data.metrics.map(String) : [],
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: String(data.cover ?? "/images/projects/project-01.svg"),
        liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
      };
    }),
  );

  return studies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCaseStudyBySlug(slug: string) {
  const filePath = path.join(caseStudiesDirectory, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(raw);

  const mdxResult = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  const frontmatter: CaseStudyFrontmatter = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    metrics: Array.isArray(data.metrics) ? data.metrics.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "/images/projects/project-01.svg"),
    liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
  };

  return {
    frontmatter,
    content: mdxResult.content,
    sections: extractSections(content),
  };
}

