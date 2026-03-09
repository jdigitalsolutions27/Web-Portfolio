"use client";

import { Command as CommandMenu } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HOME_SECTIONS, NAV_LINKS } from "@/lib/constants";
import { liveProjects } from "@/lib/projects";

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const pages = useMemo(
    () => NAV_LINKS.map((item) => ({ label: item.label, value: `page-${item.href}`, href: item.href })),
    [],
  );
  const projectCommands = useMemo(
    () => liveProjects.map((project) => ({ label: project.title, slug: project.slug })),
    [],
  );

  return (
    <>
      <button
        className="fixed bottom-5 left-4 z-40 hidden rounded-full border border-white/10 bg-zinc-950/80 px-3 py-2 text-xs text-zinc-300 backdrop-blur-lg hover:text-white md:block"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        Press Ctrl/Cmd + K
      </button>

      <CommandMenu.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global command menu"
        className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_20px_100px_rgba(0,0,0,0.55)]"
      >
        <CommandMenu.Input
          className="w-full border-b border-white/10 bg-transparent px-4 py-4 text-sm text-white outline-none"
          placeholder="Search pages or sections..."
        />

        <CommandMenu.List className="max-h-[350px] overflow-y-auto p-2">
          <CommandMenu.Empty className="p-4 text-sm text-zinc-400">No results found.</CommandMenu.Empty>

          <CommandMenu.Group heading="Pages" className="mb-2 text-xs text-zinc-500">
            {pages.map((item) => (
              <CommandMenu.Item
                key={item.value}
                value={item.value}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none data-[selected=true]:bg-cyan-500/20"
                onSelect={() => {
                  router.push(item.href);
                  setOpen(false);
                }}
              >
                {item.label}
              </CommandMenu.Item>
            ))}
          </CommandMenu.Group>

          <CommandMenu.Group heading="Home Sections" className="text-xs text-zinc-500">
            {HOME_SECTIONS.map((section) => (
              <CommandMenu.Item
                key={section.id}
                value={`section-${section.id}`}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none data-[selected=true]:bg-cyan-500/20"
                onSelect={() => {
                  if (pathname !== "/") {
                    router.push(`/#${section.id}`);
                    setOpen(false);
                    return;
                  }

                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setOpen(false);
                }}
              >
                {section.label}
              </CommandMenu.Item>
            ))}
          </CommandMenu.Group>

          <CommandMenu.Group heading="Projects" className="mt-2 text-xs text-zinc-500">
            {projectCommands.map((project) => (
              <CommandMenu.Item
                key={project.slug}
                value={`project-${project.slug}`}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none data-[selected=true]:bg-cyan-500/20"
                onSelect={() => {
                  router.push(`/projects#${project.slug}`);
                  setOpen(false);
                }}
              >
                {project.label}
              </CommandMenu.Item>
            ))}
          </CommandMenu.Group>
        </CommandMenu.List>
      </CommandMenu.Dialog>
    </>
  );
}

