import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events } from "@/data/events";
import { venues } from "@/data/venues";
import EventDetailView from "@/features/events/EventDetailView";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
    },
  };
}

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const venue = venues.find((v) => v.id === event.venueId);

  return <EventDetailView event={event} venue={venue} />;
}
