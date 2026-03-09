import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Github, MessageCircle } from "lucide-react";
import { PROFILE } from "@/lib/constants";

export function Footer() {
  const portfolioOneLabel = PROFILE.links.portfolioOne.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const portfolioTwoLabel = PROFILE.links.portfolioTwo.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <footer className="px-6 pb-10 pt-16">
      <div className="editorial-panel mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr_0.9fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200">Closing Frame</p>
            <p className="mt-3 text-2xl font-semibold text-white">{PROFILE.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-300">
              Full-stack developer building premium, conversion-driven digital products with cleaner UX, stronger motion systems, and reliable execution from concept to launch.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="ui-surface-main rounded-full px-3 py-1 text-xs text-zinc-200">
                <MapPin size={13} className="mr-1 inline-block" /> {PROFILE.location}
              </span>
              <span className="ui-surface-main rounded-full px-3 py-1 text-xs text-zinc-200">Remote-ready workflow</span>
              <span className="ui-surface-main rounded-full px-3 py-1 text-xs text-zinc-200">Fast iteration</span>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-zinc-300">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-cyan-200">Connect</p>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Mail size={14} /> {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phone}`} className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Phone size={14} /> {PROFILE.phone}
            </a>
            <Link href={PROFILE.links.portfolioOne} target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Globe size={14} /> {portfolioOneLabel}
            </Link>
            <Link href={PROFILE.links.portfolioTwo} target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Globe size={14} /> {portfolioTwoLabel}
            </Link>
            <Link href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Github size={14} /> GitHub
            </Link>
            <Link href={PROFILE.links.facebook} target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-200">
              <Globe size={14} /> Facebook
            </Link>
            <Link href={PROFILE.links.whatsapp} target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-200">
              <MessageCircle size={14} /> WhatsApp
            </Link>
          </div>

          <div className="ui-surface-main rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Positioning</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Premium digital execution for businesses that need stronger online presentation, sharper trust signals, and conversion-focused user journeys.
            </p>
            <div className="mt-4 space-y-2 text-xs uppercase tracking-[0.18em] text-zinc-400">
              <p>Discovery</p>
              <p>Design Systems</p>
              <p>Frontend + Backend Delivery</p>
              <p>Launch Optimization</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-zinc-500">
          {new Date().getFullYear()} {PROFILE.name}. Crafted with Next.js, Tailwind, and performance-first standards.
        </div>
      </div>
    </footer>
  );
}
