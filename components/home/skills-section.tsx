"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillCloud, skillsByCategory, type SkillCategory } from "@/lib/data/skills";

gsap.registerPlugin(ScrollTrigger);

const categories = Object.keys(skillsByCategory) as SkillCategory[];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current || !pinRef.current) return;

    const section = sectionRef.current;
    const pin = pinRef.current;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=80",
        end: "bottom bottom",
        pin,
        pinSpacing: false,
      });

      gsap.to("[data-cloud-item]", {
        y: -14,
        repeat: -1,
        yoyo: true,
        stagger: 0.08,
        ease: "sine.inOut",
        duration: 2.2,
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [shouldReduceMotion]);

  return (
    <section id="skills" className="px-6 py-24" ref={sectionRef}>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_1.45fr]">
        <div ref={pinRef}>
          <SectionHeading
            eyebrow="Skills"
            title="Interactive Stack Overview"
            description="Modern front-end, robust back-end, data systems, and design-production tools for complete project execution."
            className="text-left"
          />
          <Card className="mt-6 flex flex-wrap gap-2">
            {skillCloud.map((skill, index) => (
              <motion.span
                key={skill}
                data-cloud-item
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                <Badge variant="neutral" className="px-3 py-1.5 text-xs">
                  {skill}
                </Badge>
              </motion.span>
            ))}
          </Card>
        </div>

        <div>
          <Tabs defaultValue="Front-end">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {skillsByCategory[category].map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 transition hover:border-cyan-300/30"
                      >
                        <p className="font-medium text-white">{skill.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-cyan-200">{skill.level}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

