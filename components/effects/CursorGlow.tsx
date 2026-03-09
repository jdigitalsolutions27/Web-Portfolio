"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const slowX = useSpring(x, { stiffness: 110, damping: 28, mass: 0.7 });
  const slowY = useSpring(y, { stiffness: 110, damping: 28, mass: 0.7 });
  const fastX = useSpring(x, { stiffness: 220, damping: 34, mass: 0.5 });
  const fastY = useSpring(y, { stiffness: 220, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-[120px] mix-blend-screen"
        style={{ x: slowX, y: slowY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] blur-2xl"
        style={{ x: fastX, y: fastY }}
      />
    </>
  );
}
