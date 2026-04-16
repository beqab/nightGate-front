"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/events", label: t("events") },
    { href: "/venues", label: t("venues") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080514]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
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

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-[#ea6390]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ea6390]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm">
                {t("signIn")}
              </Button>
              <Button variant="primary" size="sm" glow>
                {t("getTickets")}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              aria-label={t("toggleMenu")}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {/* // */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-[#080514]/95 backdrop-blur-2xl border-b border-white/5 md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              <LanguageSwitcher className="mb-2 w-fit" />
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-all",
                      isActive
                        ? "text-[#ea6390] bg-[#ea6390]/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-center"
                >
                  {t("signIn")}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  glow
                >
                  {t("getTickets")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
