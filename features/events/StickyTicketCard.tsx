"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  AlertTriangle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Event } from "@/data/events";
import { formatDate, getAttendancePercent } from "@/lib/utils";
import InfoRow from "@/components/ui/InfoRow";

interface StickyTicketCardProps {
  event: Event;
}

export default function StickyTicketCard({ event }: StickyTicketCardProps) {
  const locale = useLocale();
  const attendancePct = getAttendancePercent(event.attendees, event.capacity);
  const spotsLeft = event.capacity - event.attendees;
  const isSoldOut = attendancePct >= 100;
  const isAlmostFull = attendancePct >= 75 && !isSoldOut;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Ambient glow behind card */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#ea6390]/12 via-[#9e4280]/8 to-transparent blur-2xl pointer-events-none" />

      <div className="relative rounded-3xl overflow-hidden glass-strong border border-[#ea6390]/25 shadow-[0_0_80px_rgba(234,99,144,0.08),0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Top gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#ea6390] via-[#c84d77] to-[#9e4280]" />

        <div className="p-6 space-y-5">
          {/* Price block */}
          <div className="text-center py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25 mb-2">
              Starting from
            </p>
            <div className="flex items-baseline justify-center gap-1.5">
              {event.price === 0 ? (
                <span className="text-5xl font-black font-display text-emerald-400 leading-none">
                  Free
                </span>
              ) : (
                <>
                  <span className="text-lg font-semibold text-white/30 self-start mt-2">€</span>
                  <span className="text-6xl font-black font-display text-white leading-none">
                    {event.price}
                  </span>
                </>
              )}
            </div>
            {event.price > 0 && (
              <p className="text-xs text-white/25 mt-1.5">per person · all taxes included</p>
            )}
          </div>

          {/* Neon divider */}
          <div className="neon-divider" />

          {/* Info rows */}
          <div className="divide-y divide-white/[0.05]">
            <InfoRow
              icon={<Calendar className="w-4 h-4" />}
              label="Date"
              value={formatDate(event.date, locale)}
              highlight
            />
            <InfoRow
              icon={<Clock className="w-4 h-4" />}
              label="Doors open"
              value={`${event.time} – ${event.endTime}`}
            />
            <InfoRow
              icon={<MapPin className="w-4 h-4" />}
              label="Venue"
              value={event.venue}
            />
            <InfoRow
              icon={<Users className="w-4 h-4" />}
              label="Age restriction"
              value={`${event.ageRestriction}+ only`}
            />
          </div>

          {/* Neon divider */}
          <div className="neon-divider" />

          {/* Capacity bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/35 flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                {event.attendees.toLocaleString()} attending
              </span>
              {isSoldOut && (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Sold Out
                </span>
              )}
              {isAlmostFull && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-amber-400 font-bold flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  {spotsLeft} spots left
                </motion.span>
              )}
              {!isSoldOut && !isAlmostFull && (
                <span className="text-white/25">{attendancePct}% full</span>
              )}
            </div>

            {/* Progress bar */}
            <div className="relative h-2 w-full rounded-full bg-white/6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(attendancePct, 100)}%` }}
                transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${
                  isSoldOut
                    ? "bg-red-500"
                    : isAlmostFull
                    ? "bg-gradient-to-r from-amber-500 to-[#ea6390]"
                    : "bg-gradient-to-r from-[#9e4280] to-[#ea6390]"
                }`}
              />
              {/* Glow on progress bar */}
              {!isSoldOut && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(attendancePct, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-60"
                  style={{
                    background: isAlmostFull
                      ? "linear-gradient(90deg, #f59e0b, #ea6390)"
                      : "linear-gradient(90deg, #9e4280, #ea6390)",
                  }}
                />
              )}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={!isSoldOut ? { scale: 1.02 } : {}}
            whileTap={!isSoldOut ? { scale: 0.97 } : {}}
            disabled={isSoldOut}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
              isSoldOut
                ? "bg-white/4 border border-white/10 text-white/20 cursor-not-allowed"
                : "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white shadow-[0_6px_36px_rgba(234,99,144,0.45)] hover:shadow-[0_8px_60px_rgba(234,99,144,0.65)] hover:from-[#c84d77] hover:to-[#7d3568]"
            }`}
          >
            <Ticket className="w-5 h-5" />
            {isSoldOut ? "Sold Out" : "Get Tickets Now"}
          </motion.button>

          {/* Trust badges */}
          {!isSoldOut && (
            <div className="flex items-center justify-center gap-4 text-[10px] text-white/20">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Secure checkout
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Instant e-ticket
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
