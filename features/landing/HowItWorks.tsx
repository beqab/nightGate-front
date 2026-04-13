"use client";

import { motion } from "framer-motion";
import { Search, Ticket, Zap, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = [
    {
      icon: Search,
      step: "01",
      title: t("steps.discover.title"),
      description: t("steps.discover.description"),
      color: "#ea6390",
      glow: "rgba(234, 99, 144, 0.2)",
    },
    {
      icon: Ticket,
      step: "02",
      title: t("steps.book.title"),
      description: t("steps.book.description"),
      color: "#9e4280",
      glow: "rgba(158, 66, 128, 0.2)",
    },
    {
      icon: Zap,
      step: "03",
      title: t("steps.experience.title"),
      description: t("steps.experience.description"),
      color: "#6e2e80",
      glow: "rgba(110, 46, 128, 0.2)",
    },
    {
      icon: Shield,
      step: "04",
      title: t("steps.trust.title"),
      description: t("steps.trust.description"),
      color: "#ea6390",
      glow: "rgba(234, 99, 144, 0.2)",
    },
  ];

  return (
    <SectionWrapper
      id="how-it-works"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      subtitle={t("subtitle")}
      centered
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative group glass neon-border rounded-2xl p-6 text-center hover:border-[#ea6390]/40 transition-[background,box-shadow,border-color,opacity] duration-300"
              style={{
                boxShadow: `0 0 0 1px transparent`,
              }}
            >
              {/* Connecting line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-2.5 w-5 h-px bg-gradient-to-r from-[#ea6390]/30 to-transparent z-10" />
              )}

              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-black text-white/10">
                {step.step}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center relative"
                style={{
                  background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
                  border: `1px solid ${step.color}30`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />
                <Icon
                  className="w-6 h-6 relative z-10"
                  style={{ color: step.color }}
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
