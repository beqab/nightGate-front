"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1",
        className
      )}
      aria-label={t("select")}
    >
      {routing.locales.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => handleLocaleChange(item)}
            disabled={isPending}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
              isActive
                ? "bg-[#ea6390] text-white shadow-[0_0_16px_rgba(234,99,144,0.35)]"
                : "text-white/55 hover:text-white"
            )}
          >
            {item === "ka" ? t("kaShort") : t("enShort")}
          </button>
        );
      })}
    </div>
  );
}
