import Link from "next/link";
import { Mail, Phone, Github, Globe, MessageCircle } from "lucide-react";
import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80 px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-white">{PROFILE.name}</p>
          <p className="max-w-xl text-sm text-zinc-300">
            Building premium, user-centered digital products with modern full-stack architecture, polished interfaces,
            and measurable performance.
          </p>
          <p className="text-xs text-zinc-400">{PROFILE.location}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-zinc-300">
          <a className="inline-flex items-center gap-2 hover:text-cyan-200" href={`mailto:${PROFILE.email}`}>
            <Mail size={14} /> {PROFILE.email}
          </a>
          <a className="inline-flex items-center gap-2 hover:text-cyan-200" href={`tel:${PROFILE.phone}`}>
            <Phone size={14} /> {PROFILE.phone}
          </a>
          <Link className="inline-flex items-center gap-2 hover:text-cyan-200" href={PROFILE.links.github} target="_blank">
            <Github size={14} /> GitHub
          </Link>
          <Link className="inline-flex items-center gap-2 hover:text-cyan-200" href={PROFILE.links.facebook} target="_blank">
            <Globe size={14} /> Facebook
          </Link>
          <Link className="inline-flex items-center gap-2 hover:text-cyan-200" href={PROFILE.links.whatsapp} target="_blank">
            <MessageCircle size={14} /> WhatsApp
          </Link>
          <Link className="inline-flex items-center gap-2 hover:text-cyan-200" href={PROFILE.links.portfolioOne} target="_blank">
            <Globe size={14} /> Legacy Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

