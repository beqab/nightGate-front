"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  ArrowLeft,
  Tag,
  Shield,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Event } from "@/data/events";
import { Venue } from "@/data/venues";
import { formatDate, getAttendancePercent } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import GlowOrb from "@/components/ui/GlowOrb";
import InfoRow from "@/components/ui/InfoRow";
import StickyTicketCard from "@/features/events/StickyTicketCard";
import LineupList, { LineupArtist } from "@/features/events/LineupList";
import GalleryGrid, { GalleryItem } from "@/features/shared/GalleryGrid";

interface EventDetailViewProps {
  event: Event;
  venue?: Venue;
}

// ── Mock lineup data per event ──────────────────────────────────────────────
const lineupMap: Record<string, LineupArtist[]> = {
  "evt-001": [
    { name: "BLAWAN", role: "Techno · Industrial · Headliner", time: "03:00–07:00", isHeadliner: true },
    { name: "SPECIAL GUEST TBA", role: "Dark Techno · Support", time: "02:00–03:00" },
    { name: "OBJECT BLUE", role: "Hard Techno · Bass", time: "01:00–02:00" },
    { name: "SHACKLETON", role: "Dub Techno · Opener", time: "23:00–01:00" },
  ],
  "evt-002": [
    { name: "NINA KRAVIZ", role: "Deep House · Disco · Headliner", time: "01:00–04:00", isHeadliner: true },
    { name: "HUNEE", role: "Eclectic House · Support", time: "23:30–01:00" },
    { name: "PALMS TRAX", role: "Balearic · Opener", time: "20:00–23:30" },
  ],
  "evt-003": [
    { name: "DJ KHALED", role: "Hip-Hop · R&B · Headliner", time: "01:00–06:00", isHeadliner: true },
    { name: "VIP GUEST", role: "R&B · Support", time: "00:00–01:00" },
    { name: "RESIDENT DJ", role: "Urban · Opener", time: "22:00–00:00" },
  ],
  "evt-004": [
    { name: "CHARLOTTE DE WITTE", role: "Techno · Electronic · Headliner", time: "04:00–08:00", isHeadliner: true },
    { name: "AMELIE LENS", role: "Techno · Support", time: "02:00–04:00" },
    { name: "REBEKAH", role: "Hard Techno · Support", time: "00:00–02:00" },
  ],
  "evt-005": [
    { name: "RESIDENT DJ MIRA", role: "Pop · Chic · Host", time: "23:00–03:00", isHeadliner: true },
    { name: "GUEST DJ TBA", role: "Indie Pop · Support", time: "21:00–23:00" },
  ],
  "evt-006": [
    { name: "J BALVIN", role: "Reggaeton · Latin · Headliner", time: "01:00–05:00", isHeadliner: true },
    { name: "SALSA FRIENDS", role: "Salsa · Merengue · Support", time: "00:00–01:00" },
    { name: "DJ LATINUS", role: "Latin House · Opener", time: "22:00–00:00" },
  ],
  "evt-007": [
    { name: "APHEX TWIN", role: "Experimental · Minimal · Headliner", time: "03:00–07:00", isHeadliner: true },
    { name: "BURIAL", role: "Dubstep · Ambient · Support", time: "01:30–03:00" },
    { name: "ACTRESS", role: "Abstract Techno · Opener", time: "23:00–01:30" },
  ],
  "evt-008": [
    { name: "BLACK COFFEE", role: "Afro House · Deep · Headliner", time: "00:00–04:00", isHeadliner: true },
    { name: "THEMBA", role: "Afro Tech · Support", time: "22:00–00:00" },
    { name: "ENOO NAPA", role: "Afro Deep · Opener", time: "20:00–22:00" },
  ],
  "evt-009": [
    { name: "A$AP ROCKY", role: "Hip-Hop · Trap · Headliner", time: "01:00–05:00", isHeadliner: true },
    { name: "PLAYBOI CARTI", role: "Trap · Support", time: "00:00–01:00" },
    { name: "KILLA FONIC", role: "Urban · Opener", time: "22:00–00:00" },
  ],
};

// ── Mock gallery gradients ────────────────────────────────────────────────
const galleryOverrides = [
  "linear-gradient(135deg, #080514 0%, #1a0a3d 50%, #3f1b70 100%)",
  "linear-gradient(135deg, #3f1b70 0%, #ea6390 60%, #c84d77 100%)",
  "linear-gradient(135deg, #1a0a3d 0%, #6e2e80 50%, #9e4280 100%)",
  "linear-gradient(135deg, #31146d 0%, #ea6390 80%, #ffd4e5 100%)",
  "linear-gradient(135deg, #080514 0%, #c84d77 55%, #ea6390 100%)",
  "linear-gradient(135deg, #3f1b70 0%, #1a0a3d 50%, #ea6390 100%)",
];
const galleryLabels = ["Main Floor", "Stage Setup", "VIP Area", "Entrance", "Bar Zone", "Backstage"];

function buildGallery(eventGradient: string): GalleryItem[] {
  const gradients = [eventGradient, ...galleryOverrides.slice(1)];
  return gradients.map((gradient, i) => ({
    id: i + 1,
    gradient,
    label: galleryLabels[i] ?? `Photo ${i + 1}`,
    span: i === 0 ? "wide" : i === 3 ? "tall" : "normal",
  }));
}

// ── Section animation variants ────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function EventDetailView({ event, venue }: EventDetailViewProps) {
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const lineup = lineupMap[event.id] ?? [
    { name: event.dj ?? "TBA", role: event.category, time: event.time, isHeadliner: true },
  ];
  const gallery = buildGallery(event.gradient);
  const attendancePct = getAttendancePercent(event.attendees, event.capacity);

  return (
    <div className="relative">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-[95vh] min-h-[640px] overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 origin-center"
        >
          <div className="absolute inset-0" style={{ background: event.gradient }} />
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080514] via-[#080514]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080514]/60 via-transparent to-[#080514]/20" />

        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#ea6390]/12 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#9e4280]/18 rounded-full blur-[80px] animate-pulse-glow pointer-events-none"
          style={{ animationDelay: "1.8s" }}
        />

        {/* Animated scan line */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/18 to-transparent pointer-events-none"
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-24 left-6 md:left-12 z-10"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-[#ea6390] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            All Events
          </Link>
        </motion.div>

        {/* Category pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute top-24 left-0 right-0 flex justify-center z-10"
        >
          <span className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-black/35 backdrop-blur-lg border border-[#ea6390]/30 text-[#ea6390]">
            {event.category} · {event.tags.slice(0, 3).join(" · ")}
          </span>
        </motion.div>

        {/* Main hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center"
        >
          <div className="max-w-5xl w-full space-y-6">
            {/* DJ */}
            {event.dj && (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-[#ea6390] glow-neon-text"
              >
                {event.dj}
              </motion.p>
            )}

            {/* Event title */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3.5rem,12vw,9.5rem)] font-black leading-[0.92] tracking-tighter text-white font-display"
            >
              {event.title}
            </motion.h1>

            {/* Date / time / venue row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/55"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ea6390]" />
                {formatDate(event.date, locale)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ea6390]" />
                {event.time} – {event.endTime}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ea6390]" />
                {event.venue}
              </span>
            </motion.div>

            {/* Hero CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white font-bold text-base flex items-center gap-3 shadow-[0_0_50px_rgba(234,99,144,0.5),0_0_100px_rgba(234,99,144,0.2)] hover:shadow-[0_0_80px_rgba(234,99,144,0.65),0_0_140px_rgba(234,99,144,0.3)] transition-shadow duration-300"
              >
                <Ticket className="w-5 h-5" />
                Get Tickets
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080514] to-transparent pointer-events-none" />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative bg-[#080514]">
        {/* Ambient background */}
        <GlowOrb
          size={700}
          color="#ea6390"
          opacity={0.04}
          className="top-0 left-1/4"
          animate={false}
        />
        <GlowOrb
          size={500}
          color="#9e4280"
          opacity={0.05}
          className="top-1/3 -right-32"
          animate={false}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-16 items-start">
            {/* ── LEFT COLUMN ──────────────────────────────────────── */}
            <div className="space-y-16">
              {/* About section */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <SectionLabel>About This Event</SectionLabel>
                <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass neon-border text-white/60 hover:text-[#ea6390] hover:border-[#ea6390]/40 transition-colors duration-200 cursor-default"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Quick stats row */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Capacity", value: event.capacity.toLocaleString() },
                    { label: "Attendance", value: `${attendancePct}%` },
                    { label: "Age", value: `${event.ageRestriction}+` },
                    { label: "Price", value: event.price === 0 ? "Free" : `€${event.price}` },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -3, borderColor: "rgba(234,99,144,0.4)" }}
                      className="glass neon-border rounded-2xl p-4 text-center transition-all duration-300 hover:bg-[#ea6390]/5"
                    >
                      <p className="text-xl font-black text-white font-display">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-0.5">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Neon divider */}
              <div className="neon-divider" />

              {/* Lineup section */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <SectionLabel>Lineup</SectionLabel>
                <div className="mt-5">
                  <LineupList artists={lineup} />
                </div>
              </motion.section>

              {/* Neon divider */}
              <div className="neon-divider" />

              {/* Gallery section */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <SectionLabel>Gallery</SectionLabel>
                <p className="mt-2 mb-6 text-sm text-white/30">
                  A glimpse of what awaits
                </p>
                <GalleryGrid items={gallery} />
              </motion.section>

              {/* Venue info (if available) */}
              {venue && (
                <>
                  <div className="neon-divider" />
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <SectionLabel>The Venue</SectionLabel>
                    <motion.div
                      whileHover={{ borderColor: "rgba(234,99,144,0.4)" }}
                      className="mt-5 glass neon-border rounded-2xl p-6 flex gap-5 items-start transition-all duration-300 hover:bg-[#ea6390]/4"
                    >
                      {/* Venue color dot */}
                      <div
                        className="w-12 h-12 rounded-2xl flex-shrink-0 border border-white/10"
                        style={{ background: venue.gradient }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-white">{venue.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#ea6390]/15 text-[#ea6390] border border-[#ea6390]/25">
                            {venue.type}
                          </span>
                        </div>
                        <p className="text-sm text-white/40 mt-1 line-clamp-2">{venue.description}</p>
                        <div className="flex gap-4 mt-3 text-xs text-white/35">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#9e4280]" />
                            {venue.neighborhood}, {venue.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#9e4280]" />
                            Cap. {venue.capacity.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-[#9e4280]" />
                            {venue.dressCode}
                          </span>
                        </div>
                        <Link
                          href={`/venues/${venue.id}`}
                          className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#ea6390] hover:text-white transition-colors duration-200"
                        >
                          View venue →
                        </Link>
                      </div>
                    </motion.div>
                  </motion.section>
                </>
              )}
            </div>

            {/* ── RIGHT COLUMN: Sticky Ticket Card ─────────────────── */}
            <div className="lg:sticky lg:top-24 self-start">
              <StickyTicketCard event={event} />

              {/* Additional info below card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-6 glass neon-border rounded-2xl p-5 space-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/25 mb-3">
                  Event Details
                </p>
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Date" value={formatDate(event.date, locale)} highlight />
                <InfoRow icon={<Clock className="w-4 h-4" />} label="Hours" value={`${event.time} – ${event.endTime}`} />
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="Location" value={`${event.venue}${venue ? `, ${venue.neighborhood}` : ""}`} />
                <InfoRow icon={<Tag className="w-4 h-4" />} label="Genre" value={event.category} />
                <InfoRow icon={<Shield className="w-4 h-4" />} label="Age restriction" value={`${event.ageRestriction}+`} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small internal helper ────────────────────────────────────────────────
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
