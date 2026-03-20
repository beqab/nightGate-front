"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import GlowOrb from "@/components/ui/GlowOrb";
import { Link } from "@/i18n/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const floatingCards = [
    {
      top: "18%",
      left: "6%",
      title: t("floatingCards.card1.title"),
      sub: t("floatingCards.card1.sub"),
      tag: t("floatingCards.card1.tag"),
      gradient: "linear-gradient(135deg, #3f1b70, #ea6390)",
      delay: 0,
    },
    {
      top: "22%",
      right: "5%",
      title: t("floatingCards.card2.title"),
      sub: t("floatingCards.card2.sub"),
      tag: t("floatingCards.card2.tag"),
      gradient: "linear-gradient(135deg, #ea6390, #9e4280)",
      delay: 1.5,
    },
    {
      bottom: "28%",
      left: "4%",
      title: t("floatingCards.card3.title"),
      sub: t("floatingCards.card3.sub"),
      tag: t("floatingCards.card3.tag"),
      gradient: "linear-gradient(135deg, #6e2e80, #c84d77)",
      delay: 0.8,
    },
  ];
  const statsData = [
    { value: "1,200+", label: t("stats.eventsThisMonth") },
    { value: "340+", label: t("stats.premiumVenues") },
    { value: "98K+", label: t("stats.nightOwls") },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#080514]" />

      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #31146d 0%, #1a0a3d 45%, #080514 80%)",
        }}
      />

      {/* Glow orbs */}
      <GlowOrb
        size={700}
        color="#ea6390"
        opacity={0.12}
        className="-top-40 left-1/2 -translate-x-1/2"
        delay={0}
      />
      <GlowOrb
        size={500}
        color="#9e4280"
        opacity={0.14}
        className="top-1/3 -left-40"
        delay={2}
      />
      <GlowOrb
        size={400}
        color="#6e2e80"
        opacity={0.12}
        className="top-1/4 -right-20"
        delay={1}
      />
      <GlowOrb
        size={600}
        color="#3f1b70"
        opacity={0.18}
        className="bottom-0 left-1/4"
        delay={3}
        animate={false}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(234,99,144,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(234,99,144,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated scan line */}
      <motion.div
        initial={{ top: "-2px" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/30 to-transparent pointer-events-none z-10"
      />

      {/* ── Floating preview cards ── */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.85, 1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 + card.delay },
            scale: { duration: 0.8, delay: 0.6 + card.delay },
            y: {
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
          className="absolute hidden lg:block z-20"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            bottom: card.bottom,
            width: 200,
          }}
        >
          <div className="glass-strong rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/10">
            <div
              className="h-20 w-full"
              style={{ background: card.gradient }}
            />
            <div className="p-3 space-y-1">
              <span className="text-xs font-bold text-[#ea6390] tracking-wider">
                {card.tag}
              </span>
              <p className="text-xs font-bold text-white leading-tight">{card.title}</p>
              <p className="text-xs text-white/40">{card.sub}</p>
              <div className="flex items-center gap-1 pt-1">
                <Star className="w-3 h-3 fill-[#ea6390] text-[#ea6390]" />
                <span className="text-xs text-white/50">{t("tonight")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Pill badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#ea6390]/20 text-xs font-semibold text-[#ea6390] tracking-wider uppercase">
              <Zap className="w-3 h-3 fill-current" />
              {t("badge")}
              <Zap className="w-3 h-3 fill-current" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black leading-none tracking-tighter text-white"
              style={{ fontFamily: "var(--font-display, inherit)" }}
            >
              {t("titleFirst")}
            </h1>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black leading-none tracking-tighter gradient-text"
              style={{ fontFamily: "var(--font-display, inherit)" }}
            >
              {t("titleSecond")}
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/events">
              <Button
                variant="primary"
                size="xl"
                glow
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {t("exploreEvents")}
              </Button>
            </Link>
            <Link href="/venues">
              <Button
                variant="ghost"
                size="xl"
                icon={<Play className="w-4 h-4 fill-current" />}
                iconPosition="left"
              >
                {t("discoverVenues")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-px pt-6"
          >
            {statsData.map((stat, i) => (
              <div key={i} className="flex items-center">
                <div className="px-6 py-4 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-white gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/35 mt-1">{stat.label}</p>
                </div>
                {i < statsData.length - 1 && (
                  <div className="w-px h-10 bg-white/10" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/25 tracking-widest uppercase">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[#ea6390]/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
