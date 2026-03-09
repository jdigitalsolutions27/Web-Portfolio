"use client";

import { motion } from "framer-motion";
import { Search, Grid3X3, Rows3, List } from "lucide-react";
import { CATEGORIES, FILTER_CATEGORIES, type Category, type FilterCategory, type SortMode, type ViewMode } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProjectFiltersProps = {
  query: string;
  category: FilterCategory;
  activeTech: string[];
  categoryCounts: Record<Category, number>;
  sort: SortMode;
  view: ViewMode;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: FilterCategory) => void;
  onTechChange: (value: string[]) => void;
  onSortChange: (value: SortMode) => void;
  onViewChange: (value: ViewMode) => void;
};

const techFilters = ["Next.js", "React", "Tailwind", "SEO", "Responsive", "UI/UX"] as const;

export function ProjectFilters({
  query,
  category,
  activeTech,
  categoryCounts,
  sort,
  view,
  onQueryChange,
  onCategoryChange,
  onTechChange,
  onSortChange,
  onViewChange,
}: ProjectFiltersProps) {
  const toggleTech = (tech: string) => {
    onTechChange(activeTech.includes(tech) ? activeTech.filter((item) => item !== tech) : [...activeTech, tech]);
  };

  return (
    <section className="ui-surface-main relative z-10 rounded-3xl p-4 shadow-[0_18px_46px_rgba(0,0,0,0.32)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Explore Controls</p>
        <p className="text-xs text-zinc-400">Search, filter, and switch view instantly</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_220px_340px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search name, category, or tags"
            className="pl-9"
            aria-label="Search projects"
          />
        </div>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortMode)}
          className="ui-surface-muted h-11 rounded-xl px-4 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          aria-label="Sort projects"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="az">A-Z</option>
          <option value="category">Category</option>
        </select>

        <div className="ui-surface-muted grid grid-cols-3 gap-2 rounded-xl p-1">
          <Button size="sm" variant={view === "grid" ? "default" : "ghost"} onClick={() => onViewChange("grid")}>
            <Grid3X3 size={14} className="mr-1.5" /> Grid
          </Button>
          <Button size="sm" variant={view === "explorer" ? "default" : "ghost"} onClick={() => onViewChange("explorer")}>
            <Rows3 size={14} className="mr-1.5" /> Explorer
          </Button>
          <Button size="sm" variant={view === "compact" ? "default" : "ghost"} onClick={() => onViewChange("compact")}>
            <List size={14} className="mr-1.5" /> Compact
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">Categories</p>
          <button
            type="button"
            className="text-xs text-zinc-400 transition hover:text-cyan-200"
            onClick={() => {
              onCategoryChange("All");
              onQueryChange("");
              onTechChange([]);
              onSortChange("featured");
            }}
          >
            Reset
          </button>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--surface-main)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--surface-main)] to-transparent" />
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTER_CATEGORIES.map((item) => (
              <motion.button
                key={item}
                type="button"
                className={cn(
                  "relative shrink-0 snap-start rounded-full border px-3 py-1.5 text-xs transition",
                  category === item
                    ? "border-cyan-300/45 bg-cyan-500/18 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.24)]"
                    : "border-white/14 bg-white/[0.06] text-zinc-200 hover:border-cyan-300/35 hover:text-white",
                )}
                whileTap={{ scale: 0.97 }}
                onClick={() => onCategoryChange(item)}
              >
                <span>{item}</span>
                {item !== "All" ? <span className="ml-1 text-[10px] opacity-70">({categoryCounts[item as Category] ?? 0})</span> : null}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <p className="mr-2 self-center text-[11px] uppercase tracking-[0.16em] text-zinc-400">Tech filters</p>
        {techFilters.map((tech) => (
          <button
            key={tech}
            type="button"
            className={cn(
              "rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition hover:border-cyan-300/35 hover:text-cyan-100",
              activeTech.includes(tech) && "border-cyan-300/45 bg-cyan-500/15 text-cyan-100",
            )}
            onClick={() => toggleTech(tech)}
          >
            {tech}
          </button>
        ))}
        {activeTech.length ? (
          <button
            type="button"
            className="rounded-full border border-cyan-300/35 bg-cyan-500/15 px-3 py-1 text-xs text-cyan-100 transition hover:bg-cyan-500/20"
            onClick={() => onTechChange([])}
          >
            Clear tech
          </button>
        ) : null}
      </div>
    </section>
  );
}

export const categoryList = CATEGORIES;
