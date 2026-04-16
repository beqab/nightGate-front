"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { categories, EventCategory } from "@/data/events";
import { getEventCategoryLabel } from "@/lib/localized-content";
import { cn } from "@/lib/utils";

interface EventFiltersProps {
  selectedCategory: EventCategory | "All";
  onCategoryChange: (cat: EventCategory | "All") => void;
  selectedPrice: "all" | "free" | "paid";
  onPriceChange: (p: "all" | "free" | "paid") => void;
  sortBy: "date" | "price" | "popularity";
  onSortChange: (s: "date" | "price" | "popularity") => void;
  resultCount: number;
  onClear: () => void;
}

export default function EventFilters({
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  resultCount,
  onClear,
}: EventFiltersProps) {
  const t = useTranslations();
  const hasActiveFilters =
    selectedCategory !== "All" || selectedPrice !== "all";
  const priceFilters = [
    { value: "all", label: t("eventFilters.prices.all") },
    { value: "free", label: t("eventFilters.prices.free") },
    { value: "paid", label: t("eventFilters.prices.paid") },
  ] as const;
  const sortOptions = [
    { value: "date", label: t("eventFilters.sort.date") },
    { value: "price", label: t("eventFilters.sort.price") },
    { value: "popularity", label: t("eventFilters.sort.popularity") },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex md:items-center justify-between flex-col md:flex-row  ">
        <div className="flex items-center gap-2 mb-3 md:mb-0">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <SlidersHorizontal className="w-4 h-4 text-[#ea6390]" />
            <span>{t("eventFilters.found", { count: resultCount })}</span>
          </div>
          {/* {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-[#ea6390] hover:text-white border border-[#ea6390]/20 hover:border-[#ea6390]/50 px-3 py-1.5 rounded-full transition-all"
            >
              <X className="w-3 h-3" />
              {t("eventFilters.clear")}
            </motion.button>
          )} */}
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="flex items-center gap-1 glass rounded-xl px-1 py-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
                  sortBy === opt.value
                    ? "bg-[#ea6390]/20 text-[#ea6390] border border-[#ea6390]/20"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("All")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
            selectedCategory === "All"
              ? "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white border-transparent shadow-[0_4px_16px_rgba(234,99,144,0.3)]"
              : "bg-white/4 text-white/50 border-white/10 hover:text-white hover:border-white/20"
          )}
        >
          {t("eventFilters.all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
              selectedCategory === cat
                ? "bg-gradient-to-r from-[#ea6390] to-[#9e4280] text-white border-transparent shadow-[0_4px_16px_rgba(234,99,144,0.3)]"
                : "bg-white/4 text-white/50 border-white/10 hover:text-white hover:border-white/20"
            )}
          >
            {getEventCategoryLabel(t, cat)}
          </button>
        ))}
      </div>

      {/* Price filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/30 uppercase tracking-wider">
          {t("eventFilters.price")}:
        </span>
        <div className="flex gap-2">
          {priceFilters.map((pf) => (
            <button
              key={pf.value}
              onClick={() => onPriceChange(pf.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                selectedPrice === pf.value
                  ? "bg-[#ea6390]/20 text-[#ea6390] border-[#ea6390]/30"
                  : "bg-white/3 text-white/40 border-white/8 hover:text-white/70 hover:border-white/20"
              )}
            >
              {pf.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex  gap-2">
          <span className="text-xs text-white/30 whitespace-nowrap mt-1">
            {t("eventFilters.activeFilter")}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategory !== "All" && (
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-[#ea6390]/10 border border-[#ea6390]/20 text-[#ea6390]">
                {getEventCategoryLabel(t, selectedCategory)}
                <button
                  onClick={() => onCategoryChange("All")}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPrice !== "all" && (
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-[#ea6390]/10 border border-[#ea6390]/20 text-[#ea6390]">
                {priceFilters.find((pf) => pf.value === selectedPrice)?.label}
                <button
                  onClick={() => onPriceChange("all")}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="neon-divider" />
    </div>
  );
}
