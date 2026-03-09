"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { animatedStats } from "@/lib/data/testimonials";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) return;

    let frame = 0;
    const totalFrames = 38;

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * Math.min(eased, 1)));
      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="text-4xl font-semibold text-white md:text-5xl">
      {shouldReduceMotion ? value : display}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-3">
        {animatedStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-zinc-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

