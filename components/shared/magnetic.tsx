"use client";

import * as React from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = React.ComponentProps<typeof motion.div> & {
  children: React.ReactNode;
  strength?: number;
  rotate?: boolean;
};

export function Magnetic({ className, children, strength = 0.24, rotate = false, ...props }: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const springR = useSpring(r, { stiffness: 260, damping: 18 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * strength);
    y.set(offsetY * strength);
    if (rotate) {
      r.set(offsetX * 0.03);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    r.set(0);
  };

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={rotate ? { x: springX, y: springY, rotate: springR } : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

