"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Clock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { events } from "@/data/events";
import { formatDate, getAttendancePercent } from "@/lib/utils";

const trendingEvents = events.slice(3, 7);

export default function PopularNow() {
  return (
    <SectionWrapper
      id="popular"
      label="Trending"
      title="Popular"
      titleHighlight="Now"
      subtitle="What everyone's talking about this week."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {trendingEvents.map((event, i) => {
          const pct = getAttendancePercent(event.attendees, event.capacity);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="group flex gap-4 glass neon-border rounded-2xl p-4 cursor-pointer hover:border-[#ea6390]/40 transition-all duration-300"
            >
              {/* Rank */}
              <div className="shrink-0 flex items-center justify-center w-10">
                <span className="text-2xl font-black text-white/10 group-hover:text-[#ea6390]/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Color swatch */}
              <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{ background: event.gradient }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#ea6390]/10 border border-[#ea6390]/20 text-[#ea6390]">
                    {event.category}
                  </span>
                  {pct > 75 && (
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <TrendingUp className="w-3 h-3" />
                      Hot
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-[#ea6390] transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-white/40 truncate">{event.venue}</p>
                <div className="flex items-center gap-3 text-xs text-white/35">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.attendees.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="shrink-0 flex flex-col items-end justify-between">
                <span className={`text-sm font-bold ${
                  event.price === 0 ? "text-emerald-400" : "text-[#ea6390]"
                }`}>
                  {event.priceLabel}
                </span>
                <div className="text-right">
                  <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#9e4280] to-[#ea6390]"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/30 mt-0.5 block">{pct}% full</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
