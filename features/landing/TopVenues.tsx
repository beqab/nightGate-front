import SectionWrapper from "@/components/ui/SectionWrapper";
import VenueCard from "@/components/cards/VenueCard";
import { featuredVenues } from "@/data/venues";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function TopVenues() {
  const t = await getTranslations("topVenues");

  return (
    <SectionWrapper
      id="venues"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      subtitle={t("subtitle")}
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
          {t("cta")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
