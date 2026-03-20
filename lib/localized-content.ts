import { Event, EventCategory } from "@/data/events";
import { Venue, VenueType } from "@/data/venues";

type Translator = (key: string, values?: Record<string, string | number>) => string;

const eventCategoryKeyMap: Record<EventCategory, string> = {
  Electronic: "electronic",
  "Hip-Hop": "hipHop",
  House: "house",
  Techno: "techno",
  "R&B": "rnb",
  Pop: "pop",
  Latin: "latin",
  VIP: "vip",
};

const venueTypeKeyMap: Record<VenueType, string> = {
  Nightclub: "nightclub",
  "Rooftop Bar": "rooftopBar",
  Lounge: "lounge",
  Underground: "underground",
  "Beach Club": "beachClub",
  Warehouse: "warehouse",
};

export function getEventCategoryLabel(t: Translator, category: EventCategory) {
  return t(`events.categories.${eventCategoryKeyMap[category]}`);
}

export function getVenueTypeLabel(t: Translator, type: VenueType) {
  return t(`venues.types.${venueTypeKeyMap[type]}`);
}

export function getEventCopy(t: Translator, event: Event) {
  return {
    title: t(`events.items.${event.id}.title`),
    description: t(`events.items.${event.id}.description`),
    dj: event.dj ? t(`events.items.${event.id}.dj`) : undefined,
    priceLabel: t(`events.items.${event.id}.priceLabel`),
  };
}

export function getVenueCopy(t: Translator, venue: Venue) {
  return {
    name: t(`venues.items.${venue.id}.name`),
    description: t(`venues.items.${venue.id}.description`),
    typeLabel: getVenueTypeLabel(t, venue.type),
  };
}
