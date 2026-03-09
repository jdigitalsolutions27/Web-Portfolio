import { experienceTimeline } from "@/lib/data/experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Timeline"
          description="Roles across full-stack development, technical support, social analytics, multimedia, and design."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-300/70 via-blue-400/30 to-transparent" />
          <div className="space-y-6">
            {experienceTimeline.map((item, index) => (
              <Reveal key={`${item.title}-${item.start}`} delay={index * 0.04}>
                <article className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 pl-10 backdrop-blur-md">
                  <span className="absolute left-1.5 top-7 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">
                    {item.start} - {item.end}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-300">{item.org}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{item.details}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

