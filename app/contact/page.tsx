import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, MapPin, Mail, Phone, Clock3, Globe, MessageCircle, Github } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { createMetadata } from "@/lib/seo";
import { PROFILE } from "@/lib/constants";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { RouteHero } from "@/components/shared/route-hero";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Start a project conversation with Alden Jay A. Centino for premium websites, systems, and frontend-heavy digital products.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <RouteHero
        eyebrow="Contact"
        title="Let&apos;s plan a stronger digital presence."
        description="Share your goals, scope, and timeline. I&apos;ll respond with a practical recommendation on structure, delivery approach, and the fastest route to launch."
        stats={[
          { value: "24h", label: "Typical response" },
          { value: "Open", label: "Freelance and contract" },
          { value: "PH / Remote", label: "Client friendly setup" },
        ]}
        aside={
          <article className="editorial-panel flex h-full flex-col rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Direct Contact</p>
            <div className="mt-5 space-y-4 text-sm text-zinc-200">
              <p className="inline-flex items-center gap-2"><Mail size={15} /> {PROFILE.email}</p>
              <p className="inline-flex items-center gap-2"><Phone size={15} /> {PROFILE.phone}</p>
              <p className="inline-flex items-center gap-2"><MapPin size={15} /> {PROFILE.location}</p>
              <p className="inline-flex items-center gap-2"><CalendarClock size={15} /> Available for project-based and ongoing work.</p>
              <p className="inline-flex items-center gap-2"><Clock3 size={15} /> Structured communication and delivery updates included.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={PROFILE.links.facebook} target="_blank" className="ui-surface-main inline-flex items-center gap-2 rounded-[1.35rem] p-4 text-sm text-zinc-200">
                <Globe size={15} /> Facebook
              </Link>
              <Link href={PROFILE.links.whatsapp} target="_blank" className="ui-surface-main inline-flex items-center gap-2 rounded-[1.35rem] p-4 text-sm text-zinc-200">
                <MessageCircle size={15} /> WhatsApp
              </Link>
              <Link href={PROFILE.links.github} target="_blank" className="ui-surface-main inline-flex items-center gap-2 rounded-[1.35rem] p-4 text-sm text-zinc-200">
                <Github size={15} /> GitHub
              </Link>
              <a href={`mailto:${PROFILE.email}`} className="ui-surface-main inline-flex items-center gap-2 rounded-[1.35rem] p-4 text-sm text-zinc-200">
                <Mail size={15} /> Email
              </a>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Fast Reply", "Typical response window is within 24 hours for serious inquiries."],
                ["Remote Ready", "Built for project-based work, revisions, and ongoing support."],
                ["Clear Scope", "Discovery, timeline, and recommended build direction are defined early."],
                ["Delivery Updates", "Communication stays structured from planning through launch."],
              ].map(([title, copy]) => (
                <div key={title} className="ui-surface-main rounded-[1.35rem] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {["Freelance", "Contract", "Landing Pages", "Web Systems", "UI Refresh"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-cyan-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionReveal>
          <section className="editorial-panel rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Project Inquiry</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Tell me what needs to be built.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-zinc-300">
                Clear briefs help move faster. Share goals, timeline, current blockers, and the type of result you need.
              </p>
            </div>
            <ContactForm />
          </section>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <aside className="space-y-4">
            <div className="showcase-copy-shell rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Best Fit</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                <p>Best suited for businesses, agencies, advocacy groups, and teams that need a premium website or system with clear conversion flow.</p>
                <p>Good fit if you need both visual polish and practical implementation, not just a surface redesign.</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Agency sites", "Premium landing pages", "Dashboards", "Advocacy websites", "UI refresh"].map((item) => (
                  <span key={item} className="launch-stage-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="editorial-panel rounded-[2rem] p-6 text-sm text-zinc-200">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Engagement Flow</p>
              <div className="mt-5 space-y-3">
                {[
                  ["Step 01", "Discovery call or message review to clarify scope and constraints."],
                  ["Step 02", "Recommended structure, timeline, and technical approach."],
                  ["Step 03", "Design/build execution with updates, QA, and launch support."],
                ].map(([step, copy]) => (
                  <div key={step} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">{step}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ui-surface-main rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Response Window</p>
              <div className="mt-4 space-y-3 text-sm text-zinc-200">
                <p className="inline-flex items-center gap-2"><CalendarClock size={15} /> Availability: Open for freelance and contract work.</p>
                <p className="inline-flex items-center gap-2"><Clock3 size={15} /> Typical response: within 24 hours.</p>
                <p className="inline-flex items-center gap-2"><Mail size={15} /> {PROFILE.email}</p>
                <p className="inline-flex items-center gap-2"><Phone size={15} /> {PROFILE.phone}</p>
                <p className="inline-flex items-center gap-2"><MapPin size={15} /> {PROFILE.location}</p>
              </div>
            </div>

            <div className="ui-surface-main overflow-hidden rounded-[2rem] p-3">
              <iframe
                title="Leyte map"
                src="https://maps.google.com/maps?q=Alangalang%20Leyte&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                className="h-72 w-full rounded-2xl border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </SectionReveal>
      </div>
    </main>
  );
}
