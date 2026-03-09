import type { Metadata } from "next";
import { ProjectExplorerClient } from "@/components/projects/ProjectExplorerClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Project Explorer",
  description:
    "Project Explorer featuring 23 live deployments across multiple industries, presented with premium UI, motion, and conversion-focused structure.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectExplorerClient />;
}

