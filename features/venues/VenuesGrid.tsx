"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import VenueCard from "@/components/cards/VenueCard";
import { venues, venueTypes, VenueType } from "@/data/venues";
import { getVenueTypeLabel } from "@/lib/localized-content";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

export default function VenuesGrid() {
  const locale = useLocale();
  const t = useTranslations();
  const [selectedType, setSelectedType] = useState<VenueType | "All">("All");
  const [sortBy, setSortBy] = useState<"rating" | "capacity" | "name">(
    "rating"
  );

  const filteredVenues = useMemo(() => {
    let result = [...venues];
    if (selectedType !== "All") {
      result = result.filter((v) => v.type === selectedType);
    }
    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "capacity") return b.capacity - a.capacity;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [selectedType, sortBy]);

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="space-y-4">
        <div className="flex md:items-center justify-between flex-col md:flex-row">
          <div className="flex items-center gap-2 mb-3 md:mb-0 text-white/50 text-sm">
            <SlidersHorizontal className="w-4 h-4 text-[#ea6390]" />
            <span>
              {t("venuesGrid.count", {
                count: formatNumber(filteredVenues.length, locale),
              })}
            </span>
          </div>
          <div className="flex items-center gap-1 glass rounded-xl px-1 py-1">
            {(["rating", "capacity", "name"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200",
                  sortBy === opt
                    ? "bg-[#ea6390]/20 text-[#ea6390] border border-[#ea6390]/20"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {t(`venuesGrid.sort.${opt}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Type pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType("All")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
              selectedType === "All"
                ? "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white border-transparent shadow-[0_4px_16px_rgba(234,99,144,0.3)]"
                : "bg-white/4 text-white/50 border-white/10 hover:text-white hover:border-white/20"
            )}
          >
            {t("venuesGrid.allTypes")}
          </button>
          {venueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                selectedType === type
                  ? "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white border-transparent shadow-[0_4px_16px_rgba(234,99,144,0.3)]"
                  : "bg-white/4 text-white/50 border-white/10 hover:text-white hover:border-white/20"
              )}
            >
              {getVenueTypeLabel(t, type)}
            </button>
          ))}
        </div>

        {selectedType !== "All" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">
              {t("venuesGrid.activeFilter")}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-[#ea6390]/10 border border-[#ea6390]/20 text-[#ea6390]">
              {getVenueTypeLabel(t, selectedType)}
              <button
                onClick={() => setSelectedType("All")}
                className="hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        <div className="neon-divider" />
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredVenues.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <MapPin className="w-12 h-12 text-white/15 mb-4" />
            <h3 className="text-lg font-bold text-white/40 mb-2">
              {t("venuesGrid.emptyTitle")}
            </h3>
            <p className="text-sm text-white/25">
              {t("venuesGrid.emptyDescription")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedType}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
          >
            {filteredVenues.map((venue, i) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                variant="featured"
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
