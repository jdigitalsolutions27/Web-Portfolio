"use client";

import Image from "next/image";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getProjectStageImage, type Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(project.url);
      toast.success("Live demo link copied.");
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={getProjectStageImage(project)}
              alt={`${project.title} desktop preview`}
              width={1200}
              height={780}
              className="h-auto w-full object-cover object-top"
              quality={90}
            />
          </div>
          <div className="ui-surface-card space-y-3 rounded-2xl p-4">
            <p className="text-sm text-zinc-300">{project.goal}</p>
            <p className="text-sm text-zinc-300">{project.solution}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="ui-surface-card rounded-2xl p-4">
          <p className="text-sm font-medium text-cyan-200">Highlights</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            {project.highlights.map((item) => (
              <li key={item} className="list-inside list-disc leading-7">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button asChild>
            <a href={project.url} target="_blank" rel="noreferrer">
              Live Demo <ExternalLink size={15} className="ml-2" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <ViewTransitionLink href={`/projects/${project.slug}`}>Case Study</ViewTransitionLink>
          </Button>
          <Button variant="outline" onClick={copyLink}>
            Copy Link <Copy size={15} className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
