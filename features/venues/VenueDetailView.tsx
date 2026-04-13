"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  Star,
  ArrowLeft,
  Music,
  Shield,
  CalendarDays,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { Venue } from "@/data/venues";
import { Event } from "@/data/events";
import { Link } from "@/i18n/navigation";
import GlowOrb from "@/components/ui/GlowOrb";
import InfoRow from "@/components/ui/InfoRow";
import GalleryGrid, { GalleryItem } from "@/features/shared/GalleryGrid";
import EventCard from "@/components/cards/EventCard";

interface VenueDetailViewProps {
  venue: Venue;
  upcomingEvents: Event[];
}

// ── Gallery data generator ─────────────────────────────────────────────────
const galleryLabels = [
  "Main Room",
  "Dance Floor",
  "VIP Lounge",
  "Bar Area",
  "Entrance",
  "Rooftop / Terrace",
];
const galleryVariantGradients = [
  "linear-gradient(135deg, #080514 0%, #1a0a3d 50%, #3f1b70 100%)",
  "linear-gradient(135deg, #3f1b70 0%, #ea6390 60%, #c84d77 100%)",
  "linear-gradient(135deg, #1a0a3d 0%, #6e2e80 50%, #9e4280 100%)",
  "linear-gradient(135deg, #31146d 0%, #ea6390 80%, #ffd4e5 100%)",
  "linear-gradient(135deg, #080514 0%, #c84d77 55%, #ea6390 100%)",
  "linear-gradient(135deg, #3f1b70 0%, #1a0a3d 50%, #ea6390 100%)",
];

function buildVenueGallery(venueGradient: string): GalleryItem[] {
  const gradients = [venueGradient, ...galleryVariantGradients.slice(1)];
  return gradients.map((gradient, i) => ({
    id: i + 1,
    gradient,
    label: galleryLabels[i] ?? `Photo ${i + 1}`,
    span: i === 0 ? "wide" : i === 3 ? "tall" : "normal",
  }));
}

// ── Section animation preset ──────────────────────────────────────────────
const sectionVariants = {
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

// ── Star rating renderer ──────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span
            key={star}
            className={`text-base leading-none ${
              filled
                ? "text-[#ea6390]"
                : half
                ? "text-[#ea6390]/50"
                : "text-white/15"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function VenueDetailView({
  venue,
  upcomingEvents,
}: VenueDetailViewProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const gallery = buildVenueGallery(venue.gradient);

  return (
    <div className="relative">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-[90vh] min-h-[620px] overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 origin-center"
        >
          <div
            className="absolute inset-0"
            style={{ background: venue.gradient }}
          />
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080514] via-[#080514]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080514]/55 via-transparent to-[#080514]/20" />

        {/* Ambient orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-[480px] h-[480px] rounded-full blur-[110px] animate-pulse-glow pointer-events-none opacity-15"
          style={{ backgroundColor: venue.accentColor }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] animate-pulse-glow pointer-events-none opacity-12"
          style={{ backgroundColor: venue.accentColor, animationDelay: "2s" }}
        />

        {/* Scan line */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/15 to-transparent pointer-events-none"
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-24 left-6 md:left-12 z-10"
        >
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-[#ea6390] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            All Venues
          </Link>
        </motion.div>

        {/* Type pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="absolute top-24 left-0 right-0 flex justify-center z-10"
        >
          <span className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-black/35 backdrop-blur-lg border border-white/15 text-white/55">
            {venue.type} · {venue.city}
          </span>
        </motion.div>

        {/* Main hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center"
        >
          <div className="max-w-5xl w-full space-y-5">
            {/* Venue name */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(3rem,11vw,8.5rem)] font-black leading-[0.9] tracking-tighter text-white font-display"
            >
              {venue.name}
            </motion.h1>

            {/* Rating + reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex items-center justify-center gap-3"
            >
              <StarRating rating={venue.rating} />
              <span className="text-white font-bold text-base">
                {venue.rating}
              </span>
              <span className="text-white/35 text-sm">
                ({venue.reviews.toLocaleString()} reviews)
              </span>
            </motion.div>

            {/* Location + capacity row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/50"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ea6390]" />
                {venue.neighborhood}, {venue.city}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ea6390]" />
                Capacity {venue.capacity.toLocaleString()}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ea6390]" />
                Open til {venue.openTil}
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="flex items-center justify-center gap-2 flex-wrap"
            >
              {venue.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-black/30 backdrop-blur-md border border-white/12 text-white/50"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#080514] to-transparent pointer-events-none" />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative bg-[#080514]">
        <GlowOrb
          size={600}
          color="#ea6390"
          opacity={0.04}
          className="top-0 left-1/4"
          animate={false}
        />
        <GlowOrb
          size={500}
          color="#9e4280"
          opacity={0.04}
          className="top-2/3 -right-40"
          animate={false}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
          {/* ── ABOUT + QUICK STATS ──────────────────────────────────── */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* About text */}
              <div>
                <SectionLabel>About the Venue</SectionLabel>
                <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">
                  {venue.description}
                </p>

                {/* Music genre pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {venue.musicGenres.map((genre) => (
                    <motion.span
                      key={genre}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass neon-border text-white/60 hover:text-[#ea6390] hover:border-[#ea6390]/40 transition-colors duration-200 cursor-default"
                    >
                      <Music className="w-3 h-3" />
                      {genre}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Venue info card */}
              <motion.div
                whileHover={{ borderColor: "rgba(234,99,144,0.4)" }}
                className="glass neon-border rounded-3xl p-6 space-y-1 transition-all duration-300 hover:bg-[#ea6390]/[0.03] hover:shadow-[0_0_40px_rgba(234,99,144,0.06)]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">
                  Venue Info
                </p>
                <div className="divide-y divide-white/[0.05]">
                  <InfoRow
                    icon={<Star className="w-4 h-4" />}
                    label="Rating"
                    value={`${
                      venue.rating
                    } / 5.0 · ${venue.reviews.toLocaleString()} reviews`}
                    highlight
                  />
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    label="Location"
                    value={`${venue.neighborhood}, ${venue.city}`}
                  />
                  <InfoRow
                    icon={<Users className="w-4 h-4" />}
                    label="Capacity"
                    value={`${venue.capacity.toLocaleString()} people`}
                  />
                  <InfoRow
                    icon={<Clock className="w-4 h-4" />}
                    label="Open until"
                    value={venue.openTil}
                  />
                  <InfoRow
                    icon={<Shield className="w-4 h-4" />}
                    label="Dress code"
                    value={venue.dressCode}
                  />
                  <InfoRow
                    icon={<Users className="w-4 h-4" />}
                    label="Minimum age"
                    value={`${venue.minAge}+`}
                  />
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Neon divider */}
          <div className="neon-divider" />

          {/* ── GALLERY ──────────────────────────────────────────────── */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <SectionLabel>Gallery</SectionLabel>
            <p className="mt-2 mb-6 text-sm text-white/30">
              Step inside before you arrive
            </p>
            <GalleryGrid items={gallery} />
          </motion.section>

          {/* Neon divider */}
          <div className="neon-divider" />

          {/* ── UPCOMING EVENTS ──────────────────────────────────────── */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center justify-between mb-8">
              <SectionLabel>Upcoming Events</SectionLabel>
              <Link
                href="/events"
                className="text-xs font-semibold text-white/30 hover:text-[#ea6390] transition-colors duration-200 flex items-center gap-1 group"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <AnimatePresence mode="wait">
              {upcomingEvents.length > 0 ? (
                <motion.div
                  key="events"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
                >
                  {upcomingEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="default"
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass neon-border rounded-2xl py-16 flex flex-col items-center gap-4 text-center"
                >
                  <CalendarDays className="w-8 h-8 text-white/20" />
                  <p className="text-sm text-white/30">
                    No upcoming events scheduled
                  </p>
                  <Link
                    href="/events"
                    className="text-xs font-semibold text-[#ea6390] hover:text-white transition-colors duration-200"
                  >
                    Browse all events →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Neon divider */}
          <div className="neon-divider" />

          {/* ── LOCATION ─────────────────────────────────────────────── */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <SectionLabel>Location</SectionLabel>
            <p className="mt-2 mb-6 text-sm text-white/30">
              {venue.neighborhood}, {venue.city}
            </p>

            {/* Map placeholder */}
            <motion.div
              whileHover={{ borderColor: "rgba(234,99,144,0.35)" }}
              className="relative glass neon-border rounded-3xl overflow-hidden h-72 md:h-96 transition-all duration-300 group"
            >
              {/* Decorative map grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(234,99,144,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(234,99,144,0.6) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Gradient fill */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${venue.accentColor}22 0%, transparent 70%)`,
                }}
              />

              {/* Center marker */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex flex-col items-center gap-3"
                >
                  {/* Ping rings */}
                  <div className="absolute w-20 h-20 rounded-full border border-[#ea6390]/20 animate-ping" />
                  <div
                    className="absolute w-32 h-32 rounded-full border border-[#ea6390]/10 animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Marker */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#ea6390] to-[#9e4280] shadow-[0_0_30px_rgba(234,99,144,0.6)] flex items-center justify-center z-10">
                    <MapPin className="w-5 h-5 text-white fill-current" />
                  </div>

                  {/* Label */}
                  <div className="glass-strong border border-[#ea6390]/25 rounded-xl px-4 py-2 text-center z-10">
                    <p className="text-sm font-bold text-white">{venue.name}</p>
                    <p className="text-xs text-white/40">
                      {venue.neighborhood}, {venue.city}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Get directions overlay */}
              <div className="absolute bottom-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-strong border border-[#ea6390]/25 rounded-xl px-4 py-2 text-xs font-semibold text-white/60 hover:text-[#ea6390] flex items-center gap-2 transition-colors duration-200"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </motion.button>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

// ── Small internal helper ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 max-w-8 bg-[#ea6390]" />
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#ea6390]">
        {children}
      </span>
    </div>
  );
}
