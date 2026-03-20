import { Metadata } from "next";
import VenuesGrid from "@/features/venues/VenuesGrid";
import GlowOrb from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: "Venues — NightGate",
  description: "Explore London's premium nightlife venues.",
};

export default function VenuesPage() {
  return (
    <div className="relative min-h-screen pt-24">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GlowOrb size={600} color="#9e4280" opacity={0.08} className="-top-40 left-1/2 -translate-x-1/2" animate={false} />
        <GlowOrb size={400} color="#ea6390" opacity={0.07} className="top-1/3 -left-40" animate={false} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#ea6390]">
            <span className="w-6 h-px bg-[#ea6390]" />
            Venues
            <span className="w-6 h-px bg-[#ea6390]" />
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Premium{" "}
            <span className="gradient-text">Spaces</span>
          </h1>
          <p className="text-white/45 max-w-xl">
            Not just clubs — experiences. Rooftops, underground bunkers, velvet lounges, and everything in between.
          </p>
        </div>

        <VenuesGrid />
      </div>
    </div>
  );
}
