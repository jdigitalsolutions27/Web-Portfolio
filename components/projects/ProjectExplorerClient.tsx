"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FILTER_CATEGORIES, type FilterCategory, type SortMode, type ViewMode, type Category } from "@/lib/categories";
import { projectStats, projects, type Project } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectExplorerRows } from "@/components/projects/ProjectExplorerRows";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ProjectSpotlight } from "@/components/projects/ProjectSpotlight";
import { LaunchReel } from "@/components/reel/LaunchReel";
import { ViewTransitionLink } from "@/components/shared/view-transition-link";
import { RouteHero } from "@/components/shared/route-hero";

function normalizeView(value: string | null): ViewMode {
  if (value === "explorer" || value === "compact" || value === "grid") return value;
  return "grid";
}

export function ProjectExplorerClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

  const view = normalizeView(searchParams.get("view"));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>("All");
  const [activeTech, setActiveTech] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const setViewMode = (next: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((project) => {
      const inCategory = category === "All" || project.category === category;
      const inSearch =
        q.length === 0 ||
        `${project.title} ${project.category} ${project.tags.join(" ")} ${project.description}`.toLowerCase().includes(q);
      const inTech = activeTech.length === 0 || activeTech.every((tech) => project.tags.includes(tech));
      return inCategory && inSearch && inTech;
    });

    return list.sort((a, b) => {
      if (sortMode === "newest") return b.year - a.year || a.title.localeCompare(b.title);
      if (sortMode === "az") return a.title.localeCompare(b.title);
      if (sortMode === "category") return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      return Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);
    });
  }, [query, category, activeTech, sortMode]);

  const categoryCounts = useMemo(
    () =>
      projects.reduce(
        (acc, project) => {
          acc[project.category] = (acc[project.category] ?? 0) + 1;
          return acc;
        },
        {} as Record<Category, number>,
      ),
    [],
  );

  const featuredPool = useMemo(() => {
    const fromFilters = filtered.filter((project) => project.featured);
    if (fromFilters.length > 0) return fromFilters;
    return projects.filter((project) => project.featured);
  }, [filtered]);

  const openQuickView = (project: Project) => {
    setSelected(project);
    setModalOpen(true);
  };

  const counterVariants = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <div className="layout-wide px-6 pb-24 pt-32">
      <RouteHero
        eyebrow="Portfolio Showroom"
        title="Project Explorer"
        description="A curated view of 23 live deployments across multiple industries, presented with premium UI, fast structure, and conversion-aware thinking."
        aside={
          <article className="editorial-panel flex h-full flex-col rounded-[2rem] p-6">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-5">
              <div className="absolute -right-8 top-6 h-24 w-24 rounded-full bg-cyan-400/12 blur-3xl" aria-hidden />
              <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-cyan-200">Browse Modes</p>
              <div className="relative z-10 mt-5 grid gap-3">
                {[
                  ["Grid", "Premium overview with strong visual hierarchy and quick scanning."],
                  ["Explorer", "Category-based horizontal browsing designed for discovery and comparison."],
                  ["Compact", "Table-like view for recruiters who want faster review and decision support."],
                ].map(([title, copy], index) => (
                  <div
                    key={title}
                    className="ui-surface-main rounded-[1.4rem] border border-white/10 px-4 py-4 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">Mode 0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Search + Filters", "Title, category, and stack filtering update instantly without breaking flow."],
                ["Quick View", "Project highlights, stack, and direct actions stay close to the grid."],
                ["Featured First", "Lead launches are surfaced early to keep strongest work visible."],
                ["Hiring Review", "Compact comparison mode helps recruiters evaluate faster."],
              ].map(([title, copy]) => (
                <div key={title} className="ui-surface-main rounded-[1.4rem] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto grid gap-3 pt-5 md:grid-cols-3 xl:grid-cols-3">
              {[
                `${projects.length} Launches`,
                `${Object.keys(categoryCounts).length}+ Categories`,
                "Fast Discovery",
              ].map((item) => (
                <div key={item} className="rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-cyan-100">
                  {item}
                </div>
              ))}
            </div>
          </article>
        }
      />

      <section className="project-exhibition-band mt-8 grid gap-4 rounded-[2.2rem] p-5 xl:grid-cols-[1.05fr_0.95fr_0.9fr]">
        <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Collection Note</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">A curated exhibition of live work across service, hospitality, healthcare, and digital brands.</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            The explorer is built to show range without sacrificing quality. Featured projects lead, filters stay fast, and each mode adapts to a different kind of review behavior.
          </p>
        </article>

        <div className="grid gap-4">
          <article className="ui-surface-main rounded-[1.7rem] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Curation Logic</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Best-looking and most representative launches surface first, while search, category filters, and stack filters keep the page useful for both clients and recruiters.
            </p>
          </article>
          <article className="ui-surface-main rounded-[1.7rem] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Browsing Modes</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              `Grid` for visual scanning, `Explorer` for category browsing, and `Compact` for faster recruiter-style comparison.
            </p>
          </article>
        </div>

        <article className="editorial-panel rounded-[1.9rem] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Coverage</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
            {[
              "Restaurants",
              "Resorts",
              "Clinics",
              "Automotive",
              "Agency",
              "Real Estate",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="ui-surface-main mt-6 grid gap-3 rounded-[2rem] bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-cyan-400/[0.04] p-4 md:grid-cols-4">
        {[
          { count: projectStats.liveWebsites, suffix: "", label: "Live Websites" },
          { count: projectStats.industries, suffix: "+", label: "Industries" },
          { count: null, suffix: "", label: "Mobile-First" },
          { count: null, suffix: "", label: "SEO-Ready" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            {...counterVariants}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="ui-surface-card rounded-2xl p-4 text-sm font-medium text-zinc-100"
          >
            {item.count === null ? (
              item.label
            ) : (
              <p className="flex items-end gap-1">
                <AnimatedNumber value={item.count} reduced={!!reduced} />
                <span>{item.suffix}</span>
                <span>{item.label}</span>
              </p>
            )}
          </motion.div>
        ))}
      </section>

      <ProjectSpotlight projects={featuredPool} onQuickView={openQuickView} />

      <LaunchReel projects={projects.filter((project) => project.featured)} id="launch-reel-projects" />

      <ProjectFilters
        query={query}
        category={category}
        activeTech={activeTech}
        categoryCounts={categoryCounts}
        sort={sortMode}
        view={view}
        onQueryChange={setQuery}
        onCategoryChange={(value) => setCategory(value)}
        onTechChange={setActiveTech}
        onSortChange={setSortMode}
        onViewChange={setViewMode}
      />

      <div className="mt-6">
        <div className="project-results-shell mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Filtered Collection</p>
            <p className="mt-1 text-sm text-zinc-300">
              {filtered.length} project{filtered.length === 1 ? "" : "s"} matching your current search and filters.
            </p>
          </div>
          <ButtonCluster filteredCount={filtered.length} onReset={() => {
            setQuery("");
            setCategory("All");
            setActiveTech([]);
            setSortMode("featured");
          }} />
        </div>

        {view === "grid" ? (
          <ProjectGrid projects={filtered} onQuickView={openQuickView} />
        ) : null}

        {view === "explorer" ? (
          <ProjectExplorerRows
            projects={filtered}
            activeCategory={category === "All" ? "All" : (category as Category)}
            onQuickView={openQuickView}
            onViewCategory={(nextCategory) => {
              if (!FILTER_CATEGORIES.includes(nextCategory)) return;
              setCategory(nextCategory);
              setViewMode("grid");
            }}
          />
        ) : null}

        {view === "compact" ? (
          <div className="ui-surface-main overflow-hidden rounded-3xl">
            <table className="w-full border-collapse text-left">
              <thead className="bg-zinc-950/70 text-xs uppercase tracking-[0.14em] text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.slug} className="border-t border-white/10 bg-white/[0.02] text-sm text-zinc-200">
                    <td className="px-4 py-3">
                      <ViewTransitionLink href={`/projects/${project.slug}`} className="font-medium text-white hover:text-cyan-200">
                        {project.title}
                      </ViewTransitionLink>
                    </td>
                    <td className="px-4 py-3">{project.category}</td>
                    <td className="px-4 py-3">{project.year}</td>
                    <td className="px-4 py-3">
                      <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200 hover:text-cyan-100">
                        Live Demo <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <ProjectModal project={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}

function ButtonCluster({ filteredCount, onReset }: { filteredCount: number; onReset: () => void }) {
  if (filteredCount === projects.length) return null;

  return (
    <button
      type="button"
      onClick={onReset}
      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/35 hover:text-white"
    >
      Reset Filters
    </button>
  );
}

function AnimatedNumber({ value, reduced }: { value: number; reduced: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (reduced || !isInView) return;

    let frame = 0;
    const duration = 780;
    const started = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isInView, reduced, value]);

  return <span ref={ref}>{reduced ? value : display}</span>;
}
