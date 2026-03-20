"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import { Event } from "@/data/events";
import { formatDate, getAttendancePercent } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
};

export default function EventCard({ event, variant = "default", index = 0 }: EventCardProps) {
  const attendancePct = getAttendancePercent(event.attendees, event.capacity);
  const isSoldOut = attendancePct >= 100;

  if (variant === "featured") {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ minHeight: 420 }}
      >
        {/* Gradient image area */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: event.gradient }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ea6390]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            {/* Category badge */}
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md border border-white/10 text-white">
              {event.category}
            </span>
            {/* Price */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${
              event.price === 0
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                : "bg-[#ea6390]/20 border-[#ea6390]/30 text-[#ea6390]"
            }`}>
              {event.priceLabel}
            </span>
          </div>

          <div className="space-y-4">
            {event.dj && (
              <p className="text-xs font-semibold tracking-widest uppercase text-[#ea6390]/80">
                {event.dj}
              </p>
            )}
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
              {event.title}
            </h3>
            <p className="text-sm text-white/60 line-clamp-2">{event.description}</p>

            <div className="flex flex-wrap gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#ea6390]" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#ea6390]" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ea6390]" />
                {event.venue}
              </span>
            </div>

            {/* Attendance bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.attendees.toLocaleString()} attending
                </span>
                <span>{attendancePct}% full</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(attendancePct, 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    attendancePct > 80
                      ? "bg-gradient-to-r from-[#ea6390] to-[#c84d77]"
                      : "bg-gradient-to-r from-[#9e4280] to-[#ea6390]"
                  }`}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                isSoldOut
                  ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white shadow-[0_4px_24px_rgba(234,99,144,0.4)] hover:shadow-[0_4px_40px_rgba(234,99,144,0.6)]"
              }`}
              disabled={isSoldOut}
            >
              <Ticket className="w-4 h-4" />
              {isSoldOut ? "Sold Out" : "Get Tickets"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative glass neon-border rounded-2xl overflow-hidden cursor-pointer hover:border-[#ea6390]/40 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: event.gradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
          {event.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-black/50 backdrop-blur-sm text-white/70 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
        {/* Category */}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-black/50 backdrop-blur-sm border border-[#ea6390]/20 text-[#ea6390]">
          {event.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        {event.dj && (
          <p className="text-xs font-semibold tracking-wider uppercase text-[#ea6390]/70">
            {event.dj}
          </p>
        )}
        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#ea6390] transition-colors duration-200">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-white/45">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#9e4280]" />
            {formatDate(event.date)} · {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9e4280]" />
            {event.venue}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className={`text-sm font-bold ${
            event.price === 0 ? "text-emerald-400" : "text-[#ea6390]"
          }`}>
            {event.priceLabel}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/40">
            <Users className="w-3 h-3" />
            {event.attendees.toLocaleString()}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#ea6390]/10 border border-[#ea6390]/20 text-[#ea6390] hover:bg-[#ea6390]/20 hover:border-[#ea6390]/40 hover:shadow-[0_0_16px_rgba(234,99,144,0.2)] transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <Ticket className="w-3.5 h-3.5" />
          {isSoldOut ? "Sold Out" : "View Event"}
        </motion.button>
      </div>
    </motion.div>
  );
}
