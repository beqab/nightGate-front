"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  noTopPad?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function SectionWrapper({
  children,
  className,
  id,
  label,
  title,
  titleHighlight,
  subtitle,
  centered = false,
  noTopPad = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className={cn(
        "relative w-full",
        noTopPad ? "pb-20 md:pb-28" : "section-padding",
        className
      )}
    >
      {/* Background subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(234,99,144,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(234,99,144,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(label || title || subtitle) && (
          <motion.div
            variants={headerVariants}
            className={cn("mb-12 md:mb-16", centered && "text-center")}
          >
            {label && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#ea6390] mb-3">
                <span className="w-6 h-px bg-[#ea6390]" />
                {label}
                <span className="w-6 h-px bg-[#ea6390]" />
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2">
                {title}{" "}
                {titleHighlight && (
                  <span className="gradient-text">{titleHighlight}</span>
                )}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
