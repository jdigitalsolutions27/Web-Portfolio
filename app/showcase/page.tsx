import type { Metadata } from "next";
import { ShowcaseViewer } from "@/components/showcase/ShowcaseViewer";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Showcase Mode",
  description: "Cinematic fullscreen viewer for featured live projects by Alden Jay A. Centino.",
  path: "/showcase",
});

export default function ShowcasePage() {
  return <ShowcaseViewer />;
}

