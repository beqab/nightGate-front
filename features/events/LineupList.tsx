"use client";

import { motion } from "framer-motion";
import { Music2, Star } from "lucide-react";

export interface LineupArtist {
  name: string;
  role: string;
  time?: string;
  isHeadliner?: boolean;
}

interface LineupListProps {
  artists: LineupArtist[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function LineupList({ artists }: LineupListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="space-y-2"
    >
      {artists.map((artist, index) => (
        <motion.div
          key={artist.name}
          variants={itemVariants}
          className={`group relative glass rounded-2xl px-5 py-4 flex items-center gap-4 cursor-default hover:translate-x-1.5 transition-[transform,background,border-color] duration-150 ease-out ${
            artist.isHeadliner
              ? "border border-[#ea6390]/35 hover:border-[#ea6390]/60 hover:bg-[#ea6390]/5 shadow-[0_0_30px_rgba(234,99,144,0.06)]"
              : "neon-border hover:border-[#ea6390]/30 hover:bg-white/[0.04]"
          }`}
        >
          {/* Left accent bar */}
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-[height] duration-150 ${
              artist.isHeadliner ? "h-10 bg-[#ea6390]" : "h-0 group-hover:h-6 bg-[#ea6390]/60"
            }`}
          />

          {/* Order number */}
          <span
            className={`font-black font-display w-8 flex-shrink-0 text-center leading-none transition-colors duration-300 ${
              artist.isHeadliner
                ? "text-lg text-[#ea6390]/40"
                : "text-xl text-white/8 group-hover:text-[#ea6390]/15"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-[background,border-color,color] duration-150 ${
              artist.isHeadliner
                ? "bg-[#ea6390]/20 border border-[#ea6390]/40 text-[#ea6390]"
                : "bg-white/5 border border-white/8 text-white/40 group-hover:bg-[#ea6390]/10 group-hover:border-[#ea6390]/25 group-hover:text-[#ea6390]"
            }`}
          >
            {artist.isHeadliner ? (
              <Star className="w-4 h-4 fill-current" />
            ) : (
              <Music2 className="w-4 h-4" />
            )}
          </div>

          {/* Artist info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p
                className={`text-sm font-bold leading-snug truncate transition-colors duration-200 ${
                  artist.isHeadliner
                    ? "text-white text-base"
                    : "text-white/85 group-hover:text-white"
                }`}
              >
                {artist.name}
              </p>
              {artist.isHeadliner && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ea6390]/20 text-[#ea6390] border border-[#ea6390]/30 flex-shrink-0">
                  Headliner
                </span>
              )}
            </div>
            <p className="text-xs text-white/35 mt-0.5 truncate">{artist.role}</p>
          </div>

          {/* Time badge */}
          {artist.time && (
            <span className="flex-shrink-0 text-xs font-mono text-white/25 bg-white/4 border border-white/8 px-2.5 py-1.5 rounded-lg group-hover:text-white/40 transition-colors duration-200">
              {artist.time}
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
