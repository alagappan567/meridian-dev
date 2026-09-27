// ─── Site-wide constants ────────────────────────────────────────────────────

export const SITE = {
  name: "Meridian Development Group",
  tagline: "Where life is built to be lived in.",
  established: "Est. 1998",
  address: "12 Coastal Drive, Suite 800, Malibu, CA 90265",
  phone: "+1 (310) 555-0198",
  email: "inquiries@meridiandev.com",
};

// ─── Hero scroll phrases (tied to frame ranges 0–299) ───────────────────────
// Each phrase shows when scroll progress is within [start, end] (0–1)
export const HERO_PHRASES = [
  { text: "Where life\nis built to\nbe lived in.", start: 0,    end: 0.24 },
  { text: "The coastline\nis our canvas.",          start: 0.27, end: 0.50 },
  { text: "Crafted with intent.\nBuilt to endure.", start: 0.53, end: 0.76 },
  { text: "Meridian.\nEst. 1998.",                  start: 0.79, end: 1    },
];

// ─── Projects ───────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  location: string;
  year: string;
  type: string;
  units: string;
  area: string;
  image: string;        // path relative to /public
  galleryImages: string[];
  description: string;
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "cape-meridian",
    name: "Cape Meridian",
    location: "Malibu, California",
    year: "2023",
    type: "Beachfront Residences",
    units: "24 Units",
    area: "4,200 – 6,800 sq ft",
    image: "/images/projects/project-1.jpg",
    galleryImages: [
      "/images/projects/project-1.jpg",
      "/images/projects/project-1b.jpg",
      "/images/projects/project-1c.jpg",
    ],
    description:
      "A collection of 24 ultra-luxury beachfront residences perched above Malibu's most coveted stretch of coastline. Each home is a study in restraint — raw concrete and warm timber meeting the Pacific horizon.",
    features: [
      "Direct beach access",
      "Floor-to-ceiling ocean views",
      "Smart home automation",
      "Private rooftop terraces",
      "Three-car garages",
    ],
  },
  {
    id: "villa-solano",
    name: "Villa Solano",
    location: "Santa Barbara, California",
    year: "2022",
    type: "Clifftop Villas",
    units: "12 Villas",
    area: "5,500 – 9,200 sq ft",
    image: "/images/projects/project-2.jpg",
    galleryImages: [
      "/images/projects/project-2.jpg",
      "/images/projects/project-2b.jpg",
    ],
    description:
      "Twelve singular villas carved into the Santa Ynez foothills, each commanding 270-degree views across the Pacific. Mediterranean influences meet California modernism in every detail.",
    features: [
      "Infinity-edge pools",
      "Wine cellars & tasting rooms",
      "Chef's kitchen & scullery",
      "Private motor courts",
      "Guest suites",
    ],
  },
  {
    id: "the-meridian-residences",
    name: "The Meridian Residences",
    location: "Manhattan Beach, California",
    year: "2021",
    type: "Urban Coastal",
    units: "48 Units",
    area: "2,800 – 4,100 sq ft",
    image: "/images/projects/project-3.jpg",
    galleryImages: ["/images/projects/project-3.jpg"],
    description:
      "An urban coastal landmark — 48 residences woven into the Manhattan Beach strand. Interiors designed by Clément Courtin balance warmth with precision across every finish.",
    features: [
      "Rooftop pool & club lounge",
      "Concierge services",
      "Private beach cabanas",
      "EV charging in all units",
      "Spa & wellness centre",
    ],
  },
  {
    id: "pacific-point",
    name: "Pacific Point",
    location: "Laguna Beach, California",
    year: "2020",
    type: "Headland Estate",
    units: "8 Estates",
    area: "7,000 – 12,000 sq ft",
    image: "/images/projects/project-4.jpg",
    galleryImages: ["/images/projects/project-4.jpg"],
    description:
      "Eight estate residences at the point where land surrenders to sea. Designed by Studio Farallon, these homes are a dialogue between raw California geology and precise architectural craft.",
    features: [
      "Private coves",
      "Helicopter landing pads",
      "Home theatres",
      "Staff quarters",
      "Bespoke material finishes",
    ],
  },
  {
    id: "azure-shores",
    name: "Azure Shores",
    location: "Coronado, California",
    year: "2019",
    type: "Waterfront Terrace Homes",
    units: "32 Units",
    area: "3,200 – 5,600 sq ft",
    image: "/images/projects/project-5.jpg",
    galleryImages: ["/images/projects/project-5.jpg"],
    description:
      "Thirty-two terrace homes arranged in cascading tiers above Coronado Bay, each with uninterrupted water views and private outdoor spaces that dissolve the boundary between inside and out.",
    features: [
      "Bay-facing terraces",
      "Boat dock access",
      "Resort amenities",
      "Bespoke joinery",
      "Natural stone throughout",
    ],
  },
];

// ─── Process timeline ────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    stage: "01",
    title: "Land",
    subtitle: "Site Selection",
    description:
      "We identify parcels with irreplaceable natural attributes — the exact angle of morning light, the way a headland holds the wind.",
    image: "/images/process/process-1.jpg",
  },
  {
    stage: "02",
    title: "Foundation",
    subtitle: "Engineering",
    description:
      "Below grade, everything is overbuilt. Concrete, piling, and structure designed to last centuries on some of the world's most demanding coastline.",
    image: "/images/process/process-2.jpg",
  },
  {
    stage: "03",
    title: "Structure",
    subtitle: "Build",
    description:
      "Our master-build team holds tolerances that luxury joinery demands. We bring the architect's vision off the page with obsessive precision.",
    image: "/images/process/process-3.jpg",
  },
  {
    stage: "04",
    title: "Facade",
    subtitle: "Envelope",
    description:
      "Each facade is tuned to its environment — thermal mass, weather resistance, and the quality of light that enters every room.",
    image: "/images/process/process-4.jpg",
  },
  {
    stage: "05",
    title: "Interiors",
    subtitle: "Finish",
    description:
      "We collaborate with the world's finest interior studios. Every surface, threshold, and fitting is chosen for its ability to age beautifully.",
    image: "/images/process/process-5.jpg",
  },
  {
    stage: "06",
    title: "Handover",
    subtitle: "Delivery",
    description:
      "Our relationship with each homeowner doesn't end at settlement. We stand behind every Meridian home — for as long as it stands.",
    image: "/images/process/process-6.jpg",
  },
];

// ─── Statistics ──────────────────────────────────────────────────────────────
export const STATS = [
  { value: 312, suffix: "", label: "Homes delivered" },
  { value: 27, suffix: "+", label: "Years of excellence" },
  { value: 4.2, suffix: "M", label: "Square feet built", decimals: 1 },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

// ─── Testimonial ─────────────────────────────────────────────────────────────
export const TESTIMONIAL = {
  quote:
    "Meridian didn't build us a house. They gave us a place the family will fight over for generations.",
  author: "James & Catherine Whitmore",
  location: "Cape Meridian, Malibu",
  image: "/images/testimonial.jpg",
};

// ─── Navigation links ────────────────────────────────────────────────────────
export const NAV_LINKS: { label: string; href: string }[] = [];

export const PROJECT_INTERESTS = [
  "Beachfront Residences",
  "Clifftop Villas",
  "Urban Coastal",
  "Bespoke Commission",
  "Investment Inquiry",
];
