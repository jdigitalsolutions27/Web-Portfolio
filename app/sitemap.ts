import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getAllCaseStudies } from "@/lib/mdx";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getAllCaseStudies();
  const staticRoutes = ["", "/projects", "/showcase", "/case-studies", "/about", "/contact"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyEntries = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: new Date(study.date || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries, ...caseStudyEntries];
}

