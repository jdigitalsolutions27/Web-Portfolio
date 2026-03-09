"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14, filter: "blur(8px)", scale: 0.995 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)", scale: 0.995 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

