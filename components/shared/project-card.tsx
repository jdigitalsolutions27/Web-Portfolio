import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-white/12 p-0 transition duration-300 hover:border-cyan-300/40 hover:shadow-[0_16px_70px_rgba(34,211,238,0.2)]">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.screenshot}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="neutral">{project.category}</Badge>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm text-cyan-200 transition hover:text-cyan-100"
            aria-label={`Open ${project.title}`}
          >
            Details <ArrowUpRight size={15} />
          </Link>
        </div>
        <CardTitle className="mt-3 text-xl">{project.title}</CardTitle>
        <CardDescription className="leading-6">{project.shortDescription}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="neutral" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t border-white/10 px-6 pb-6 pt-4">
        <a
          className="text-sm text-zinc-300 hover:text-white"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
        >
          Live Demo
        </a>
        <a
          className="text-sm text-zinc-300 hover:text-white"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </CardFooter>
    </Card>
  );
}

