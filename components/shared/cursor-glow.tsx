"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!isFinePointer) return;

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 30, mass: 0.5 }}
      aria-hidden
    />
  );
}

