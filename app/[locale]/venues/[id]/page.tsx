import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { venues } from "@/data/venues";
import { events } from "@/data/events";
import VenueDetailView from "@/features/venues/VenueDetailView";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);
  if (!venue) return { title: "Venue Not Found" };

  return {
    title: venue.name,
    description: venue.description,
    openGraph: {
      title: venue.name,
      description: venue.description,
    },
  };
}

export function generateStaticParams() {
  return venues.map((venue) => ({ id: venue.id }));
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    notFound();
  }

  const upcomingEvents = events.filter((e) => e.venueId === venue.id);

  return <VenueDetailView venue={venue} upcomingEvents={upcomingEvents} />;
}
