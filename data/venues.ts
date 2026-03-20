export type VenueType =
  | "Nightclub"
  | "Rooftop Bar"
  | "Lounge"
  | "Underground"
  | "Beach Club"
  | "Warehouse";

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  rating: number;
  reviews: number;
  neighborhood: string;
  city: string;
  capacity: number;
  gradient: string;
  accentColor: string;
  tags: string[];
  description: string;
  openTil: string;
  featured: boolean;
  musicGenres: string[];
  dressCode: string;
  minAge: number;
}

export const venues: Venue[] = [
  {
    id: "ven-001",
    name: "Fabric Underground",
    type: "Underground",
    rating: 4.9,
    reviews: 2847,
    neighborhood: "Farringdon",
    city: "London",
    capacity: 1000,
    gradient: "linear-gradient(135deg, #080514 0%, #1a0a3d 50%, #3f1b70 100%)",
    accentColor: "#9e4280",
    tags: ["Techno", "Drum & Bass", "Dark"],
    description:
      "Legendary multi-room underground club. Dark corridors, pounding sound systems, and iconic resident DJs make this a pilgrimage for clubbers worldwide.",
    openTil: "07:00",
    featured: true,
    musicGenres: ["Techno", "D&B", "Experimental"],
    dressCode: "Smart casual, no sportswear",
    minAge: 21,
  },
  {
    id: "ven-002",
    name: "Rooftop 42",
    type: "Rooftop Bar",
    rating: 4.7,
    reviews: 1563,
    neighborhood: "Shoreditch",
    city: "London",
    capacity: 400,
    gradient: "linear-gradient(135deg, #31146d 0%, #6e2e80 50%, #ea6390 100%)",
    accentColor: "#ea6390",
    tags: ["House", "Views", "Cocktails"],
    description:
      "Perched on the 42nd floor with panoramic city views. Craft cocktails, deep house, and sunsets that hit different when you're above it all.",
    openTil: "04:00",
    featured: true,
    musicGenres: ["House", "Disco", "Afro"],
    dressCode: "Smart",
    minAge: 18,
  },
  {
    id: "ven-003",
    name: "The Grand",
    type: "Nightclub",
    rating: 4.8,
    reviews: 3102,
    neighborhood: "Mayfair",
    city: "London",
    capacity: 600,
    gradient:
      "linear-gradient(135deg, #1a0a3d 0%, #6e2e80 40%, #c84d77 100%)",
    accentColor: "#c84d77",
    tags: ["VIP", "Luxury", "Hip-Hop"],
    description:
      "The city's most exclusive address. Gold-plated bathrooms, celebrity spotting, and a sound system that costs more than your car.",
    openTil: "06:00",
    featured: true,
    musicGenres: ["Hip-Hop", "R&B", "Pop"],
    dressCode: "Dress to impress",
    minAge: 21,
  },
  {
    id: "ven-004",
    name: "Arena Zero",
    type: "Warehouse",
    rating: 4.6,
    reviews: 891,
    neighborhood: "Hackney",
    city: "London",
    capacity: 1500,
    gradient: "linear-gradient(135deg, #31146d 0%, #3f1b70 50%, #9e4280 100%)",
    accentColor: "#9e4280",
    tags: ["Rave", "Electronic", "Massive"],
    description:
      "A converted industrial warehouse with Europe's largest indoor LED installation. Raw, massive, and absolutely relentless.",
    openTil: "08:00",
    featured: false,
    musicGenres: ["Electronic", "Techno", "Hard Techno"],
    dressCode: "None",
    minAge: 18,
  },
  {
    id: "ven-005",
    name: "Club Noir",
    type: "Lounge",
    rating: 4.5,
    reviews: 724,
    neighborhood: "Soho",
    city: "London",
    capacity: 250,
    gradient: "linear-gradient(135deg, #6e2e80 0%, #9e4280 50%, #ea6390 100%)",
    accentColor: "#ea6390",
    tags: ["Intimate", "Chic", "Pop"],
    description:
      "Velvet walls, low lighting, and curated playlists. The kind of place where you whisper secrets and the music reads your mood.",
    openTil: "03:00",
    featured: false,
    musicGenres: ["Pop", "Indie", "Neo-Soul"],
    dressCode: "Chic",
    minAge: 18,
  },
  {
    id: "ven-006",
    name: "Palacio",
    type: "Nightclub",
    rating: 4.7,
    reviews: 1876,
    neighborhood: "Brixton",
    city: "London",
    capacity: 550,
    gradient: "linear-gradient(135deg, #c84d77 0%, #9e4280 50%, #3f1b70 100%)",
    accentColor: "#c84d77",
    tags: ["Latin", "Salsa", "Reggaeton"],
    description:
      "A palace of Latin rhythms. Salsa classes start at 10pm, the reggaeton takes over at midnight, and the energy never drops.",
    openTil: "05:00",
    featured: false,
    musicGenres: ["Latin", "Salsa", "Reggaeton"],
    dressCode: "Smart casual",
    minAge: 18,
  },
  {
    id: "ven-007",
    name: "Skyline Club",
    type: "Rooftop Bar",
    rating: 4.4,
    reviews: 432,
    neighborhood: "Canary Wharf",
    city: "London",
    capacity: 300,
    gradient: "linear-gradient(135deg, #31146d 0%, #ea6390 60%, #ffd4e5 100%)",
    accentColor: "#ea6390",
    tags: ["Finance crowd", "Cocktails", "Views"],
    description:
      "Where the city's movers and shakers unwind above the financial district. Craft cocktails and ambient soundscapes.",
    openTil: "02:00",
    featured: false,
    musicGenres: ["Ambient", "House", "Lounge"],
    dressCode: "Smart",
    minAge: 18,
  },
  {
    id: "ven-008",
    name: "VOID",
    type: "Underground",
    rating: 4.8,
    reviews: 1241,
    neighborhood: "Bermondsey",
    city: "London",
    capacity: 600,
    gradient: "linear-gradient(135deg, #080514 0%, #31146d 100%)",
    accentColor: "#6e2e80",
    tags: ["Dark Techno", "Industrial", "Cult"],
    description:
      "No phone policy. No frills. No mercy. VOID is for the true believers — those who come to lose themselves completely in the music.",
    openTil: "08:00",
    featured: false,
    musicGenres: ["Dark Techno", "Industrial", "EBM"],
    dressCode: "Black preferred",
    minAge: 21,
  },
];

export const featuredVenues = venues.filter((v) => v.featured);

export const getVenuesByType = (type: VenueType) =>
  venues.filter((v) => v.type === type);

export const venueTypes: VenueType[] = [
  "Nightclub",
  "Rooftop Bar",
  "Lounge",
  "Underground",
  "Beach Club",
  "Warehouse",
];
