import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCard from "@/components/cards/EventCard";
import { featuredEvents } from "@/data/events";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function FeaturedEvents() {
  const t = await getTranslations("featuredEvents");

  return (
    <SectionWrapper
      id="events"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      subtitle={t("subtitle")}
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
          {t("cta")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
