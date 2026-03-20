"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import EventCard from "@/components/cards/EventCard";
import EventFilters from "./EventFilters";
import { events, EventCategory } from "@/data/events";

export default function EventsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "All">("All");
  const [selectedPrice, setSelectedPrice] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<"date" | "price" | "popularity">("date");

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (selectedCategory !== "All") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (selectedPrice === "free") {
      result = result.filter((e) => e.price === 0);
    } else if (selectedPrice === "paid") {
      result = result.filter((e) => e.price > 0);
    }

    result.sort((a, b) => {
      if (sortBy === "date") return a.date.localeCompare(b.date);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "popularity") return b.attendees - a.attendees;
      return 0;
    });

    return result;
  }, [selectedCategory, selectedPrice, sortBy]);

  const handleClear = () => {
    setSelectedCategory("All");
    setSelectedPrice("all");
    setSortBy("date");
  };

  return (
    <div className="space-y-8">
      <EventFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredEvents.length}
        onClear={handleClear}
      />

      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Calendar className="w-12 h-12 text-white/15 mb-4" />
            <h3 className="text-lg font-bold text-white/40 mb-2">No events found</h3>
            <p className="text-sm text-white/25">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedCategory}-${selectedPrice}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
          >
            {filteredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} variant="default" index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
