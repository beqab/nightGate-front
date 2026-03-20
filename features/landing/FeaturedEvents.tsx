import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCard from "@/components/cards/EventCard";
import { featuredEvents } from "@/data/events";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedEvents() {
  return (
    <SectionWrapper
      id="events"
      label="Tonight & This Weekend"
      title="Featured"
      titleHighlight="Events"
      subtitle="The most anticipated nights, handpicked for those who know how to live."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {featuredEvents.map((event, i) => (
          <EventCard key={event.id} event={event} variant="featured" index={i} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#ea6390] hover:text-white border border-[#ea6390]/20 hover:border-[#ea6390]/60 px-6 py-3 rounded-xl hover:bg-[#ea6390]/10 transition-all duration-300"
        >
          View all events
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
