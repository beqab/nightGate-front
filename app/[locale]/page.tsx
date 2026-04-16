import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ComingSoonPage from "@/features/comingSoon/ComingSoonPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "comingSoon.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <ComingSoonPage />;
}
