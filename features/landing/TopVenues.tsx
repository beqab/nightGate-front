import SectionWrapper from "@/components/ui/SectionWrapper";
import VenueCard from "@/components/cards/VenueCard";
import { featuredVenues } from "@/data/venues";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TopVenues() {
  return (
    <SectionWrapper
      id="venues"
      label="Best In The City"
      title="Top"
      titleHighlight="Venues"
      subtitle="Spaces with personality. These aren't just clubs — they're experiences."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {featuredVenues.map((venue, i) => (
          <VenueCard key={venue.id} venue={venue} variant="featured" index={i} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/venues"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#ea6390] hover:text-white border border-[#ea6390]/20 hover:border-[#ea6390]/60 px-6 py-3 rounded-xl hover:bg-[#ea6390]/10 transition-all duration-300"
        >
          Explore all venues
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
