import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EventsGrid from "@/features/events/EventsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "eventsPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function EventsPage() {
  const t = await getTranslations("eventsPage");

  return (
    <div className="relative min-h-screen pt-24">
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

        <EventsGrid />
      </div>
    </div>
  );
}
