"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export default function GlowOrb({
  size = 400,
  color = "#ea6390",
  opacity = 0.15,
  className,
  animate = true,
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        animate
          ? {
              opacity: [opacity * 0.6, opacity, opacity * 0.7, opacity],
              scale: [1, 1.08, 0.97, 1],
            }
          : { opacity, scale: 1 }
      }
      transition={
        animate
          ? {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
          : { duration: 1 }
      }
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}
