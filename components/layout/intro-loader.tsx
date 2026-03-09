"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "ajc-intro-seen";

export function IntroLoader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const hasSeenIntro = window.sessionStorage.getItem(STORAGE_KEY);
    if (hasSeenIntro) return;

    window.sessionStorage.setItem(STORAGE_KEY, "1");
    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1350);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro-loader"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[rgba(3,6,15,0.9)] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_72%_28%,rgba(59,130,246,0.12),transparent_34%)]"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: -8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-20 w-20 overflow-hidden rounded-[1.6rem] border border-cyan-300/20 bg-cyan-400/[0.06] shadow-[0_0_40px_rgba(34,211,238,0.18)]"
            >
              <Image src="/brand/logo-mark.svg" alt="AJ Centino logo mark" fill className="object-cover" sizes="80px" priority />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-[0.34em] text-cyan-200">AJ Centino</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-zinc-400">Premium digital product portfolio</p>
            </motion.div>

            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
