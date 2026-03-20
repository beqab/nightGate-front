export type EventCategory =
  | "Electronic"
  | "Hip-Hop"
  | "House"
  | "Techno"
  | "R&B"
  | "Pop"
  | "Latin"
  | "VIP";

export interface Event {
  id: string;
  title: string;
  venue: string;
  venueId: string;
  date: string;
  time: string;
  endTime: string;
  price: number;
  priceLabel: string;
  category: EventCategory;
  tags: string[];
  gradient: string;
  featured: boolean;
  attendees: number;
  capacity: number;
  dj?: string;
  description: string;
  ageRestriction: number;
}

export const events: Event[] = [
  {
    id: "evt-001",
    title: "NEON CATHEDRAL",
    venue: "Fabric Underground",
    venueId: "ven-001",
    date: "2026-03-28",
    time: "23:00",
    endTime: "07:00",
    price: 25,
    priceLabel: "from €25",
    category: "Techno",
    tags: ["Techno", "Dark", "Underground"],
    gradient: "linear-gradient(135deg, #3f1b70 0%, #6e2e80 50%, #ea6390 100%)",
    featured: true,
    attendees: 820,
    capacity: 1000,
    dj: "BLAWAN + Special Guests",
    description:
      "An immersive audio-visual journey through dark techno landscapes. Six rooms, twelve artists, one cathedral of sound.",
    ageRestriction: 21,
  },
  {
    id: "evt-002",
    title: "PINK FREQUENCY",
    venue: "Rooftop 42",
    venueId: "ven-002",
    date: "2026-03-29",
    time: "20:00",
    endTime: "04:00",
    price: 18,
    priceLabel: "€18",
    category: "House",
    tags: ["House", "Disco", "Funky"],
    gradient: "linear-gradient(135deg, #ea6390 0%, #9e4280 60%, #3f1b70 100%)",
    featured: true,
    attendees: 340,
    capacity: 400,
    dj: "Nina Kraviz",
    description:
      "Rooftop house music as the city glitters below. Deep, funky house cuts under an open sky.",
    ageRestriction: 18,
  },
  {
    id: "evt-003",
    title: "BABYLON NIGHTS",
    venue: "The Grand",
    venueId: "ven-003",
    date: "2026-04-04",
    time: "22:00",
    endTime: "06:00",
    price: 35,
    priceLabel: "€35",
    category: "R&B",
    tags: ["R&B", "Hip-Hop", "VIP"],
    gradient: "linear-gradient(135deg, #1a0a3d 0%, #9e4280 50%, #c84d77 100%)",
    featured: true,
    attendees: 560,
    capacity: 600,
    dj: "DJ Khaled",
    description:
      "The most exclusive R&B night in the city. VIP tables, champagne service, and the hottest vibes.",
    ageRestriction: 21,
  },
  {
    id: "evt-004",
    title: "ULTRA VIOLET",
    venue: "Arena Zero",
    venueId: "ven-004",
    date: "2026-04-05",
    time: "00:00",
    endTime: "08:00",
    price: 30,
    priceLabel: "€30",
    category: "Electronic",
    tags: ["Electronic", "Rave", "Lights"],
    gradient: "linear-gradient(135deg, #31146d 0%, #6e2e80 50%, #ea6390 100%)",
    featured: false,
    attendees: 1200,
    capacity: 1500,
    dj: "Charlotte de Witte",
    description:
      "UV-lit warehouse rave with full LED production. Lose yourself in the ultraviolet frequency.",
    ageRestriction: 18,
  },
  {
    id: "evt-005",
    title: "VELVET LOUNGE",
    venue: "Club Noir",
    venueId: "ven-005",
    date: "2026-04-11",
    time: "21:00",
    endTime: "03:00",
    price: 15,
    priceLabel: "€15",
    category: "Pop",
    tags: ["Pop", "Cocktails", "Chic"],
    gradient: "linear-gradient(135deg, #6e2e80 0%, #ea6390 50%, #ffd4e5 100%)",
    featured: false,
    attendees: 180,
    capacity: 250,
    dj: "Resident DJ Mira",
    description:
      "Intimate velvet-draped lounge with curated pop sets, signature cocktails and a killer view.",
    ageRestriction: 18,
  },
  {
    id: "evt-006",
    title: "LATIN HEAT",
    venue: "Palacio",
    venueId: "ven-006",
    date: "2026-04-12",
    time: "22:00",
    endTime: "05:00",
    price: 20,
    priceLabel: "€20",
    category: "Latin",
    tags: ["Latin", "Salsa", "Reggaeton"],
    gradient: "linear-gradient(135deg, #c84d77 0%, #ea6390 40%, #ff8c42 100%)",
    featured: false,
    attendees: 480,
    capacity: 550,
    dj: "J Balvin & Friends",
    description:
      "The hottest Latin night this side of the equator. Reggaeton, salsa, and merengue til sunrise.",
    ageRestriction: 18,
  },
  {
    id: "evt-007",
    title: "MIDNIGHT GOSPEL",
    venue: "Fabric Underground",
    venueId: "ven-001",
    date: "2026-04-18",
    time: "23:00",
    endTime: "07:00",
    price: 22,
    priceLabel: "€22",
    category: "Techno",
    tags: ["Techno", "Minimal", "Deep"],
    gradient: "linear-gradient(135deg, #080514 0%, #31146d 50%, #9e4280 100%)",
    featured: false,
    attendees: 700,
    capacity: 1000,
    dj: "Aphex Twin",
    description:
      "A spiritual experience. Minimal techno meets experimental sound design in this late-night sermon.",
    ageRestriction: 21,
  },
  {
    id: "evt-008",
    title: "DEEP SPACE",
    venue: "Rooftop 42",
    venueId: "ven-002",
    date: "2026-04-19",
    time: "20:00",
    endTime: "04:00",
    price: 0,
    priceLabel: "Free",
    category: "House",
    tags: ["House", "Deep", "Afro"],
    gradient: "linear-gradient(135deg, #3f1b70 0%, #6e2e80 50%, #9e4280 100%)",
    featured: false,
    attendees: 310,
    capacity: 400,
    dj: "Black Coffee",
    description:
      "Afro and deep house on the rooftop as the stars come out. Free entry before midnight.",
    ageRestriction: 18,
  },
  {
    id: "evt-009",
    title: "HIP HOP SANCTUARY",
    venue: "The Grand",
    venueId: "ven-003",
    date: "2026-04-25",
    time: "22:00",
    endTime: "05:00",
    price: 28,
    priceLabel: "€28",
    category: "Hip-Hop",
    tags: ["Hip-Hop", "Trap", "Culture"],
    gradient: "linear-gradient(135deg, #1a0a3d 0%, #3f1b70 40%, #ea6390 100%)",
    featured: false,
    attendees: 500,
    capacity: 600,
    dj: "A$AP Rocky",
    description:
      "The ultimate hip-hop experience. From boom bap classics to current trap bangers.",
    ageRestriction: 21,
  },
];

export const featuredEvents = events.filter((e) => e.featured);

export const getEventsByCategory = (category: EventCategory) =>
  events.filter((e) => e.category === category);

export const categories: EventCategory[] = [
  "Electronic",
  "Hip-Hop",
  "House",
  "Techno",
  "R&B",
  "Pop",
  "Latin",
  "VIP",
];
