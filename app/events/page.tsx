import { Metadata } from "next";
import EventsGrid from "@/features/events/EventsGrid";
import GlowOrb from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: "Events — NightGate",
  description: "Browse all events. Filter by category, price, and date.",
};

export default function EventsPage() {
  return (
    <div className="relative min-h-screen pt-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GlowOrb size={600} color="#ea6390" opacity={0.07} className="-top-40 left-1/2 -translate-x-1/2" animate={false} />
        <GlowOrb size={400} color="#9e4280" opacity={0.08} className="top-1/2 -right-40" animate={false} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#ea6390]">
            <span className="w-6 h-px bg-[#ea6390]" />
            All Events
            <span className="w-6 h-px bg-[#ea6390]" />
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Discover{" "}
            <span className="gradient-text">Tonight</span>
          </h1>
          <p className="text-white/45 max-w-xl">
            Every event, every vibe, every night. Filter and find exactly what you&apos;re looking for.
          </p>
        </div>

        <EventsGrid />
      </div>
    </div>
  );
}
