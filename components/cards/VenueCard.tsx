"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Venue } from "@/data/venues";
import { getVenueCopy } from "@/lib/localized-content";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
  variant?: "default" | "featured";
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
      delay: i * 0.1,
    },
  }),
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3 h-3",
            star <= Math.floor(rating)
              ? "fill-[#ea6390] text-[#ea6390]"
              : star - 0.5 <= rating
              ? "fill-[#ea6390]/50 text-[#ea6390]/50"
              : "fill-white/10 text-white/10"
          )}
        />
      ))}
    </div>
  );
}

export default function VenueCard({ venue, variant = "default", index = 0 }: VenueCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const copy = getVenueCopy(t, venue);

  if (variant === "featured") {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative glass neon-border rounded-2xl overflow-hidden cursor-pointer hover:border-[#ea6390]/40 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(234,99,144,0.12)]"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: venue.gradient }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {/* Type badge */}
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white">
            {copy.typeLabel}
          </span>
          {/* Capacity */}
          <span className="absolute top-3 right-3 flex items-center gap-1 text-xs text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            <Users className="w-3 h-3" />
            {formatNumber(venue.capacity, locale)}
          </span>
          {/* Venue name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {copy.name}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RatingStars rating={venue.rating} />
              <span className="text-sm font-bold text-white">{venue.rating}</span>
              <span className="text-xs text-white/35">
                ({formatNumber(venue.reviews, locale)})
              </span>
            </div>
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {t("venueCard.until", { time: venue.openTil })}
            </span>
          </div>

          <p className="text-sm text-white/50 line-clamp-2">{copy.description}</p>

          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <MapPin className="w-3.5 h-3.5 text-[#9e4280]" />
            {venue.neighborhood}, {venue.city}
          </div>

          {/* Music genres */}
          <div className="flex flex-wrap gap-1.5">
            {venue.musicGenres.map((genre) => (
              <span
                key={genre}
                className="px-2.5 py-1 text-xs rounded-full bg-[#9e4280]/15 border border-[#9e4280]/20 text-[#9e4280]"
              >
                {genre}
              </span>
            ))}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#ea6390]/10 to-[#9e4280]/10 border border-[#ea6390]/15 text-[#ea6390] text-sm font-medium group-hover:border-[#ea6390]/30 group-hover:bg-[#ea6390]/15 transition-all duration-200">
            <span>{t("venueCard.explore")}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Default compact card
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative glass neon-border rounded-2xl overflow-hidden cursor-pointer hover:border-[#ea6390]/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(234,99,144,0.1)]"
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: venue.gradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70">
          {copy.typeLabel}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white group-hover:text-[#ea6390] transition-colors duration-200 leading-snug">
            {copy.name}
          </h3>
          <span className="text-sm font-bold text-[#ea6390] shrink-0">{venue.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <RatingStars rating={venue.rating} />
          <span className="text-xs text-white/30 ml-1">
            ({formatNumber(venue.reviews, locale)})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <MapPin className="w-3 h-3 text-[#9e4280]" />
          {venue.neighborhood}
        </div>
        <div className="flex flex-wrap gap-1">
          {venue.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/8 text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
