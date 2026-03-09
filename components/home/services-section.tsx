import { Code2, Workflow, LayoutDashboard, Sparkles, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with strong architecture and scalability.",
    icon: Code2,
  },
  {
    title: "API Development",
    description: "RESTful API design and integration for secure data flow and extensible product ecosystems.",
    icon: Workflow,
  },
  {
    title: "Dashboard Systems",
    description: "Data-rich admin platforms focused on speed, clarity, and operational decision support.",
    icon: LayoutDashboard,
  },
  {
    title: "UI/UX Engineering",
    description: "User-centered interfaces with polished interactions, accessibility, and visual hierarchy.",
    icon: Sparkles,
  },
  {
    title: "Deployment & Optimization",
    description: "Production deployments with SEO, performance tuning, and maintainable release workflows.",
    icon: Rocket,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="End-to-End Product Delivery"
          description="I design and engineer premium digital experiences from idea to production deployment."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card className="h-full border-white/12">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-100">
                      <Icon size={18} />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="leading-7">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

