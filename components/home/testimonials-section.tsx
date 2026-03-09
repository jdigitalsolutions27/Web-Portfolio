import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/lib/data/testimonials";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Clients Say"
          description="Short feedback samples from collaborative projects across web, dashboard, and advocacy initiatives."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <Card className="h-full border-white/12">
                <p className="text-sm leading-7 text-zinc-200">{item.quote}</p>
                <div className="mt-6 text-sm">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-zinc-400">{item.role}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

