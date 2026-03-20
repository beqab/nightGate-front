export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getIntlLocale(locale: string): string {
  return locale === "ka" ? "ka-GE" : "en-GB";
}

export function formatDate(dateStr: string, locale = "en"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(getIntlLocale(locale), {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatPrice(price: number, label?: string): string {
  if (label) return label;
  if (price === 0) return "Free";
  return `€${price}`;
}

export function formatNumber(value: number, locale = "en"): string {
  return new Intl.NumberFormat(getIntlLocale(locale)).format(value);
}

export function getAttendancePercent(attendees: number, capacity: number): number {
  return Math.round((attendees / capacity) * 100);
}

export function getRatingStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}
