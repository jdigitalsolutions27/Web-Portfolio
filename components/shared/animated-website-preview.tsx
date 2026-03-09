"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedWebsitePreviewProps = {
  src: string;
  alt: string;
  sizes: string;
  active?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  mode?: "hero" | "stage" | "card";
  onError?: () => void;
  onLoad?: () => void;
};

const motionMap = {
  hero: {
    scale: [1, 1.035, 1.015] as number[],
    y: [0, -18, -8] as number[],
    duration: 8.5,
  },
  stage: {
    scale: [1, 1.04, 1.018] as number[],
    y: [0, -14, -6] as number[],
    duration: 7.2,
  },
  card: {
    scale: [1, 1.028, 1.01] as number[],
    y: [0, -10, -4] as number[],
    duration: 6.4,
  },
} as const;

export function AnimatedWebsitePreview({
  src,
  alt,
  sizes,
  active = true,
  priority,
  quality = 92,
  unoptimized,
  className,
  imageClassName,
  overlayClassName,
  mode = "stage",
  onError,
  onLoad,
}: AnimatedWebsitePreviewProps) {
  const reducedMotion = useReducedMotion();
  const motionSpec = motionMap[mode];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        animate={
          reducedMotion || !active
            ? { scale: 1, y: 0 }
            : {
                scale: motionSpec.scale,
                y: motionSpec.y,
              }
        }
        transition={
          reducedMotion || !active
            ? undefined
            : {
                duration: motionSpec.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          unoptimized={unoptimized}
          className={cn("object-cover object-top", imageClassName)}
          onError={onError}
          onLoad={onLoad}
        />
      </motion.div>
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_18%,transparent_72%,rgba(2,6,23,0.14))]",
          overlayClassName,
        )}
        animate={reducedMotion || !active ? { opacity: 0.16 } : { opacity: [0.12, 0.22, 0.12] }}
        transition={reducedMotion || !active ? undefined : { duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
