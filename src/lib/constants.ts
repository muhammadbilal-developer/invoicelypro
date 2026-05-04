export const NAV_LINKS = [
  { label: "Templates", href: "/templates" },
  { label: "Generator", href: "/#generator" },
  { label: "Pricing", href: "/pricing" },
  { label: "Guide", href: "/guide" },
];

export const TEMPLATE_DEFINITIONS = [
  "restaurant",
  "photography",
  "it-service",
  "bus-booking",
  "hall-ticket",
  "electronics-shop",
  "train-booking",
  "hospital-clinic",
  "domain-hosting",
  "university",
  "zoo-ticket",
  "stadium-ticket",
  "hospital",
  "hotel-booking",
  "restaurant-bill-color",
  "bus-booking-v2",
  "taxi-booking",
  "train-booking-v2",
  "internet-bill",
  "movie-booking",
  "student-billing",
  "domain-hosting-v2",
  "general",
  "money-exchange",
  "recharge",
  "product-purchase",
  "student-admission",
  "zoo-ticket-v2",
  "stadium-seat-booking",
  "house-contract",
  "roofing-services",
  "photostudio",
  "plumbing",
  "real-estate",
  "restaurant-bill",
  "freelancer",
] as const;

export const NICHES = TEMPLATE_DEFINITIONS.map((value) => ({
  slug: value,
  title: `${value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")} Invoice Generator`,
}));
