"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import GlowOrb from "@/components/ui/GlowOrb";
import { Link as LocaleLink } from "@/i18n/navigation";

export default function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="relative overflow-hidden section-padding">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3f1b70]/40 via-[#1a0a3d] to-[#080514]" />
      <GlowOrb size={500} color="#ea6390" opacity={0.1} className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={false} />
      <GlowOrb size={300} color="#9e4280" opacity={0.12} className="-bottom-20 left-10" animate={false} />
      <GlowOrb size={300} color="#6e2e80" opacity={0.12} className="-bottom-20 right-10" animate={false} />

      {/* Border glow */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/50 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#9e4280]/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="space-y-6"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#ea6390]">
            {t("eyebrow")}
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
          >
            {t("titleBefore")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
            <br />
            {t("titleAfter")}
          </h2>
          <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <LocaleLink href="/events">
              <Button variant="primary" size="lg" glow icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                {t("browseEvents")}
              </Button>
            </LocaleLink>
            <LocaleLink href="/venues">
              <Button variant="outline" size="lg">
                {t("exploreVenues")}
              </Button>
            </LocaleLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
