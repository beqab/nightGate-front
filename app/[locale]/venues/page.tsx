import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import VenuesGrid from "@/features/venues/VenuesGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "venuesPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function VenuesPage() {
  const t = await getTranslations("venuesPage");

  return (
    <div className="relative min-h-screen pt-24">
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GlowOrb
          size={600}
          color="#9e4280"
          opacity={0.08}
          className="-top-40 left-1/2 -translate-x-1/2"
          animate={false}
        />
        <GlowOrb
          size={400}
          color="#ea6390"
          opacity={0.07}
          className="top-1/3 -left-40"
          animate={false}
        />
      </div> */}

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#ea6390]">
            <span className="h-px w-6 bg-[#ea6390]" />
            {t("eyebrow")}
            <span className="h-px w-6 bg-[#ea6390]" />
          </span>
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h1>
          <p className="max-w-xl text-white/45">{t("description")}</p>
        </div>

        <VenuesGrid />
      </div>
    </div>
  );
}
