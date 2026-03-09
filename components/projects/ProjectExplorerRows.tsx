"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/categories";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";

type ProjectExplorerRowsProps = {
  projects: Project[];
  activeCategory: "All" | Category;
  onQuickView: (project: Project) => void;
  onViewCategory: (category: Category) => void;
};

export function ProjectExplorerRows({
  projects,
  activeCategory,
  onQuickView,
  onViewCategory,
}: ProjectExplorerRowsProps) {
  const categories = useMemo(
    () => (activeCategory === "All" ? CATEGORIES : ([activeCategory] as Category[])),
    [activeCategory],
  );

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <CategoryRow
          key={category}
          category={category}
          projects={projects.filter((project) => project.category === category)}
          onQuickView={onQuickView}
          onViewCategory={onViewCategory}
        />
      ))}
    </div>
  );
}

function CategoryRow({
  category,
  projects,
  onQuickView,
  onViewCategory,
}: {
  category: Category;
  projects: Project[];
  onQuickView: (project: Project) => void;
  onViewCategory: (category: Category) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  if (projects.length === 0) return null;

  const slide = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = direction === "left" ? -420 : 420;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">{category}</h2>
          <p className="text-sm text-zinc-400">{projects.length} projects • Drag to explore</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="secondary" onClick={() => slide("left")} aria-label={`Scroll ${category} left`}>
            <ChevronLeft size={16} />
          </Button>
          <Button size="icon" variant="secondary" onClick={() => slide("right")} aria-label={`Scroll ${category} right`}>
            <ChevronRight size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onViewCategory(category)}>
            View all in category
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[var(--surface-muted)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[var(--surface-muted)] to-transparent" />
      <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project, index) => (
          <div key={project.slug} className="w-[86vw] shrink-0 snap-start md:w-[380px]">
            <ProjectCard project={project} index={index} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}

