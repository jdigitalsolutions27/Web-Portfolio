import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  onQuickView: (project: Project) => void;
};

export function ProjectGrid({ projects, onQuickView }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="ui-surface-main rounded-2xl p-6 text-sm text-zinc-300">
        No projects found for the current filters. Try another keyword or category.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className={
            index === 0
              ? "md:col-span-2 xl:col-span-4"
              : index <= 2
                ? "xl:col-span-2"
                : "xl:col-span-3"
          }
        >
          <ProjectCard
            project={project}
            index={index}
            onQuickView={onQuickView}
            layout={index === 0 ? "wide" : "default"}
          />
        </div>
      ))}
    </div>
  );
}
