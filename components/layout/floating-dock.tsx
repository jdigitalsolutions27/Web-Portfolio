"use client";

import Link from "next/link";
import { Mail, Download, Briefcase, Github, Copy } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const dockItems = [
  {
    label: "Email",
    icon: Mail,
    href: `mailto:${PROFILE.email}`,
  },
  {
    label: "GitHub",
    icon: Github,
    href: PROFILE.links.github,
    external: true,
  },
  {
    label: "Download CV",
    icon: Download,
    href: PROFILE.resumePath,
    download: true,
  },
  {
    label: "Hire Me",
    icon: Briefcase,
    href: "/contact",
  },
];

export function FloatingDock() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast.success("Email copied.");
    } catch {
      toast.error("Unable to copy email.");
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 hidden md:block">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {dockItems.map((item) => {
          const Icon = item.icon;

          if (item.href.startsWith("/")) {
            return (
              <Button key={item.label} variant="secondary" size="icon" asChild>
                <Link href={item.href} aria-label={item.label}>
                  <Icon size={16} />
                </Link>
              </Button>
            );
          }

          return (
            <Button key={item.label} variant="secondary" size="icon" asChild>
              <a
                href={item.href}
                aria-label={item.label}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                download={item.download}
              >
                <Icon size={16} />
              </a>
            </Button>
          );
        })}

        <Button variant="outline" size="icon" onClick={copyEmail} aria-label="Copy email">
          <Copy size={16} />
        </Button>
      </div>
    </div>
  );
}

