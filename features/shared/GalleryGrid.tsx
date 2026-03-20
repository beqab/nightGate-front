"use client";

import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useState } from "react";

export interface GalleryItem {
  id: number;
  gradient: string;
  label: string;
  span?: "normal" | "wide" | "tall";
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[140px]"
    >
      {items.map((item, index) => {
        const isWide = item.span === "wide" || index === 0;
        const isTall = item.span === "tall" || index === 3;

        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            onHoverStart={() => setHovered(item.id)}
            onHoverEnd={() => setHovered(null)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              isWide ? "col-span-2" : ""
            } ${isTall ? "row-span-2" : ""}`}
          >
            {/* Gradient background */}
            <motion.div
              animate={hovered === item.id ? { scale: 1.12 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ background: item.gradient }}
            />

            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Hover overlay */}
            <motion.div
              animate={{ opacity: hovered === item.id ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
            />

            {/* Hover icon */}
            <motion.div
              animate={{
                opacity: hovered === item.id ? 1 : 0,
                scale: hovered === item.id ? 1 : 0.7,
              }}
              transition={{ duration: 0.25 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </motion.div>

            {/* Label */}
            <motion.div
              animate={{
                y: hovered === item.id ? 0 : 12,
                opacity: hovered === item.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-3"
            >
              <p className="text-xs font-semibold text-white/90 tracking-wide">
                {item.label}
              </p>
            </motion.div>

            {/* Neon border on hover */}
            <motion.div
              animate={{
                opacity: hovered === item.id ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 rounded-2xl border border-[#ea6390]/40 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 20px rgba(234,99,144,0.08)",
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
