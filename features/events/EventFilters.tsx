"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, EventCategory } from "@/data/events";
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

const priceFilters = [
  { value: "all", label: "All Prices" },
  { value: "free", label: "Free Entry" },
  { value: "paid", label: "Paid" },
] as const;

const sortOptions = [
  { value: "date", label: "By Date" },
  { value: "price", label: "By Price" },
  { value: "popularity", label: "Popularity" },
] as const;

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
  const hasActiveFilters = selectedCategory !== "All" || selectedPrice !== "all";

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <SlidersHorizontal className="w-4 h-4 text-[#ea6390]" />
          <span>
            <span className="font-semibold text-white">{resultCount}</span> events found
          </span>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-[#ea6390] hover:text-white border border-[#ea6390]/20 hover:border-[#ea6390]/50 px-3 py-1.5 rounded-full transition-all"
            >
              <X className="w-3 h-3" />
              Clear filters
            </motion.button>
          )}
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
          All
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
            {cat}
          </button>
        ))}
      </div>

      {/* Price filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/30 uppercase tracking-wider">Price:</span>
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

      {/* Divider */}
      <div className="neon-divider" />
    </div>
  );
}
