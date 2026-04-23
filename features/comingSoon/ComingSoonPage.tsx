"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Mail,
  Phone,
  QrCode,
  Shield,
  Star,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function InView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DashboardMockup() {
  const t = useTranslations("comingSoon.dashboard");

  const events = [
    {
      name: t("events.first.name"),
      venue: t("events.first.venue"),
      tickets: 340,
      capacity: 400,
      status: "live",
      statusLabel: t("events.first.status"),
    },
    {
      name: t("events.second.name"),
      venue: t("events.second.venue"),
      tickets: 180,
      capacity: 300,
      status: "upcoming",
      statusLabel: t("events.second.status"),
    },
    {
      name: t("events.third.name"),
      venue: t("events.third.venue"),
      tickets: 95,
      capacity: 200,
      status: "draft",
      statusLabel: t("events.third.status"),
    },
  ];

  const sidebarItems = [
    { label: t("sidebar.overview"), active: true },
    { label: t("sidebar.events"), active: false },
    { label: t("sidebar.guestList"), active: false },
    { label: t("sidebar.tickets"), active: false },
    { label: t("sidebar.analytics"), active: false },
  ];

  const stats = [
    {
      label: t("stats.ticketsSold.label"),
      value: t("stats.ticketsSold.value"),
      delta: t("stats.ticketsSold.delta"),
    },
    {
      label: t("stats.revenue.label"),
      value: t("stats.revenue.value"),
      delta: t("stats.revenue.delta"),
    },
    {
      label: t("stats.attendance.label"),
      value: t("stats.attendance.value"),
      delta: t("stats.attendance.delta"),
    },
  ];

  return (
    <div className="glass-strong rounded-2xl overflow-hidden neon-border shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ea6390]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#9e4280]/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-2 text-[10px] text-white/30 font-mono">
          nightgate.io/dashboard
        </span>
      </div>

      <div className="flex">
        <div className="hidden sm:flex flex-col gap-1 w-36 p-3 border-r border-white/5 bg-white/[0.015]">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                item.active
                  ? "bg-[#ea6390]/15 text-[#ea6390]"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {item.active && (
                <div className="w-1 h-1 rounded-full bg-[#ea6390]" />
              )}
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex-1 p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] rounded-xl p-3 border border-white/5"
              >
                <p className="text-[9px] text-white/40 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-base font-black text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                  {stat.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">
              {t("activeEvents")}
            </p>
            {events.map((event) => {
              const pct = Math.round((event.tickets / event.capacity) * 100);

              return (
                <div
                  key={event.name}
                  className="flex items-center gap-3 bg-white/[0.03] rounded-lg px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white truncate">
                      {event.name}
                    </p>
                    <p className="text-[9px] text-white/30">{event.venue}</p>
                  </div>
                  <div className="hidden sm:block w-16">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ea6390] to-[#9e4280] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[8px] text-white/30 mt-0.5">
                      {t("percentSold", { percent: pct })}
                    </p>
                  </div>
                  <span
                    className={`text-[8px] font-bold uppercase px-2 py-1 rounded-full ${
                      event.status === "live"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : event.status === "upcoming"
                        ? "bg-[#ea6390]/15 text-[#ea6390]"
                        : "bg-white/5 text-white/30"
                    }`}
                  >
                    {event.statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadForm() {
  const t = useTranslations("comingSoon.form");
  const [form, setForm] = useState({
    venue: "",
    contact: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong neon-border rounded-2xl p-10 text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-[#ea6390]/15 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#ea6390]" />
        </div>
        <h3
          className="text-2xl font-black text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("success.title")}
        </h3>
        <p className="text-white/50 text-sm max-w-sm mx-auto">
          {t("success.description")}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            {t("fields.venueName.label")}
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              required
              type="text"
              placeholder={t("fields.venueName.placeholder")}
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#ea6390]/50 focus:bg-white/[0.06] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            {t("fields.contactPerson.label")}
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              required
              type="text"
              placeholder={t("fields.contactPerson.placeholder")}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#ea6390]/50 focus:bg-white/[0.06] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            {t("fields.email.label")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              required
              type="email"
              placeholder={t("fields.email.placeholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#ea6390]/50 focus:bg-white/[0.06] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            {t("fields.phone.label")}
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="tel"
              placeholder={t("fields.phone.placeholder")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#ea6390]/50 focus:bg-white/[0.06] transition-colors"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        glow
        loading={loading}
        icon={<ArrowRight className="w-4 h-4" />}
        iconPosition="right"
        className="w-full mt-2"
      >
        {t("submit")}
      </Button>

      <p className="text-center text-xs text-white/25 flex items-center justify-center gap-1.5">
        <Shield className="w-3 h-3" />
        {t("helper")}
      </p>
    </form>
  );
}

export default function ComingSoonPage() {
  const t = useTranslations("comingSoon");

  const problems = [
    {
      icon: Instagram,
      title: t("problem.items.instagram.title"),
      desc: t("problem.items.instagram.description"),
    },
    {
      icon: AlertCircle,
      title: t("problem.items.guestList.title"),
      desc: t("problem.items.guestList.description"),
    },
    {
      icon: TrendingUp,
      title: t("problem.items.revenue.title"),
      desc: t("problem.items.revenue.description"),
    },
  ];

  const features = [
    {
      icon: Ticket,
      title: t("features.items.tickets.title"),
      desc: t("features.items.tickets.description"),
    },
    {
      icon: Users,
      title: t("features.items.guestList.title"),
      desc: t("features.items.guestList.description"),
    },
    {
      icon: QrCode,
      title: t("features.items.qr.title"),
      desc: t("features.items.qr.description"),
    },
    {
      icon: BarChart3,
      title: t("features.items.analytics.title"),
      desc: t("features.items.analytics.description"),
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t("benefits.items.attendance.title"),
      desc: t("benefits.items.attendance.description"),
      metric: t("benefits.items.attendance.metric"),
      metricLabel: t("benefits.items.attendance.metricLabel"),
    },
    {
      icon: Zap,
      title: t("benefits.items.operations.title"),
      desc: t("benefits.items.operations.description"),
      metric: t("benefits.items.operations.metric"),
      metricLabel: t("benefits.items.operations.metricLabel"),
    },
    {
      icon: Star,
      title: t("benefits.items.revenue.title"),
      desc: t("benefits.items.revenue.description"),
      metric: t("benefits.items.revenue.metric"),
      metricLabel: t("benefits.items.revenue.metricLabel"),
    },
  ];

  const bullets = [
    t("solution.bullets.one"),
    t("solution.bullets.two"),
    t("solution.bullets.three"),
  ];

  const partnerVenues = [
    t("socialProof.venues.one"),
    t("socialProof.venues.two"),
    t("socialProof.venues.three"),
    t("socialProof.venues.four"),
    t("socialProof.venues.five"),
    t("socialProof.venues.six"),
  ];

  return (
    <div className="min-h-screen bg-[#080514] text-white overflow-x-hidden">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 border-b border-white/5 glass"
      >
        <div className="flex items-center justify-between gap-4 px-6 md:px-12 py-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea6390] to-[#9e4280] flex items-center justify-center shadow-[0_0_16px_rgba(234,99,144,0.5)] group-hover:shadow-[0_0_24px_rgba(234,99,144,0.7)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-[#ea6390] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-white mt-2.5"
              style={{ fontFamily: "var(--font-display, inherit)" }}
            >
              Night<span className="gradient-text">Gate</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#ea6390]/10 border border-[#ea6390]/25 text-[#ea6390] hover:bg-[#ea6390]/20 hover:border-[#ea6390]/50 transition-colors"
            >
              <span className="hidden sm:inline">
                {t("header.requestDemo")}
              </span>
              <span className="sm:hidden">{t("header.demoShort")}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.header>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#080514]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 65% at 50% 0%, #31146d 0%, #1a0a3d 50%, #080514 85%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,99,144,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(234,99,144,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234,99,144,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(158,66,128,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ top: "-2px" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/30 to-transparent pointer-events-none z-10"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-6 max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#ea6390]/20 text-xs font-bold text-[#ea6390] tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-current" />
              {t("hero.badge")}
              <Zap className="w-3 h-3 fill-current" />
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2">
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("hero.titleFirst")}
            </h1>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter gradient-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("hero.titleSecond")}
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#apply">
              <Button
                variant="primary"
                size="xl"
                glow
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {t("hero.primaryCta")}
              </Button>
            </a>
            <a href="#demo">
              <Button variant="ghost" size="xl">
                {t("hero.secondaryCta")}
              </Button>
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xs text-white/25 flex items-center justify-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            {t("hero.helper")}
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding px-6 relative">
        <div className="neon-divider mb-16" />
        <div className="max-w-5xl mx-auto">
          <InView className="space-y-12">
            <motion.div
              variants={fadeUp}
              className="text-center space-y-3 max-w-2xl mx-auto"
            >
              <span className="text-xs font-bold text-[#ea6390] uppercase tracking-widest">
                {t("problem.eyebrow")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("problem.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <motion.div
                  key={problem.title}
                  variants={fadeUp}
                  className="glass neon-border rounded-2xl p-6 space-y-4 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ea6390]/10 flex items-center justify-center">
                    <problem.icon className="w-5 h-5 text-[#ea6390]" />
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {problem.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </InView>
        </div>
      </section>

      <section id="demo" className="section-padding px-6 relative">
        <div className="max-w-6xl mx-auto">
          <InView className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <motion.span
                variants={fadeUp}
                className="inline-block text-xs font-bold text-[#ea6390] uppercase tracking-widest"
              >
                {t("solution.eyebrow")}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-black text-white leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("solution.title")}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/45 leading-relaxed"
              >
                {t("solution.description")}
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-3">
                {bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#ea6390] shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div variants={fadeUp}>
              <DashboardMockup />
            </motion.div>
          </InView>
        </div>
      </section>

      <section className="section-padding px-6 relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, #1a0a3d 0%, transparent 80%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <InView className="space-y-12">
            <motion.div
              variants={fadeUp}
              className="text-center space-y-3 max-w-xl mx-auto"
            >
              <span className="text-xs font-bold text-[#ea6390] uppercase tracking-widest">
                {t("features.eyebrow")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("features.title")}
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="group glass neon-border rounded-2xl p-6 space-y-4 hover:bg-white/[0.06] hover:border-[#ea6390]/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ea6390]/20 to-[#9e4280]/10 flex items-center justify-center shrink-0 group-hover:from-[#ea6390]/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-[#ea6390]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </InView>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <InView className="space-y-12">
            <motion.div
              variants={fadeUp}
              className="text-center space-y-3 max-w-xl mx-auto"
            >
              <span className="text-xs font-bold text-[#ea6390] uppercase tracking-widest">
                {t("benefits.eyebrow")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("benefits.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="relative glass-strong neon-border rounded-2xl p-7 space-y-5 text-center overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(234,99,144,0.4), transparent)",
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-[#ea6390]/10 flex items-center justify-center mx-auto">
                    <benefit.icon className="w-6 h-6 text-[#ea6390]" />
                  </div>
                  <div>
                    <p
                      className="text-4xl font-black gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {benefit.metric}
                    </p>
                    <p className="text-xs text-white/35 mt-1">
                      {benefit.metricLabel}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-white">{benefit.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </InView>
        </div>
      </section>

      <section className="section-padding px-6 relative">
        <div className="neon-divider mb-16" />
        <div className="max-w-4xl mx-auto">
          <InView className="space-y-10 text-center">
            <motion.div variants={fadeUp} className="space-y-3">
              <span className="text-xs font-bold text-[#ea6390] uppercase tracking-widest">
                {t("socialProof.eyebrow")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("socialProof.title")}
              </h2>
              <p className="text-white/45 max-w-xl mx-auto">
                {t("socialProof.description")}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {partnerVenues.map((name) => (
                <div
                  key={name}
                  className="glass neon-border rounded-xl px-5 py-3 text-sm font-semibold text-white/40 hover:text-white/70 hover:border-[#ea6390]/25 transition-colors"
                >
                  {name}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass-strong neon-border rounded-2xl p-8 max-w-xl mx-auto space-y-4"
            >
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 fill-[#ea6390] text-[#ea6390]"
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic">
                &ldquo;{t("socialProof.testimonial.quote")}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ea6390] to-[#9e4280]" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">
                    {t("socialProof.testimonial.author")}
                  </p>
                  <p className="text-xs text-white/35">
                    {t("socialProof.testimonial.role")}
                  </p>
                </div>
              </div>
            </motion.div>
          </InView>
        </div>
      </section>

      <section id="apply" className="section-padding px-6 relative">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #31146d 0%, transparent 80%)",
          }}
        />
        <div className="max-w-xl mx-auto relative z-10">
          <InView className="space-y-8">
            <motion.div variants={fadeUp} className="text-center space-y-3">
              <span className="text-xs font-bold text-[#ea6390] uppercase tracking-widest">
                {t("lead.eyebrow")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("lead.title")}
              </h2>
              <p className="text-white/45">{t("lead.description")}</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass-strong neon-border rounded-2xl p-8"
            >
              <LeadForm />
            </motion.div>
          </InView>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea6390] to-[#9e4280] flex items-center justify-center shadow-[0_0_16px_rgba(234,99,144,0.5)] group-hover:shadow-[0_0_24px_rgba(234,99,144,0.7)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-[#ea6390] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display, inherit)" }}
            >
              Night<span className="gradient-text">Gate</span>
            </span>
          </Link>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} NightGate · {t("footer.tagline")}
          </p>
          <a
            href="mailto:hello@nightgate.io"
            className="text-xs text-white/35 hover:text-[#ea6390] transition-colors"
          >
            hello@nightgate.io
          </a>
        </div>
      </footer>
    </div>
  );
}
