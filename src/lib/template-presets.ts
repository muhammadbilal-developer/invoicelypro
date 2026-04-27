export type TemplatePreset = {
  id: string;
  name: string;
  accent: string;
  soft: string;
  dark: string;
  layout: "split" | "banner" | "classic";
};

const NAMES = [
  "Agency Service Invoice",
  "Hotel Booking Invoice",
  "Restaurant Bill Invoice",
  "Freelancer Invoice",
  "Hospital Invoice",
  "IT Service Invoice",
  "Bus Booking Invoice",
  "Photography Invoice",
  "Domain Hosting Invoice",
  "University Invoice",
  "Student Billing Invoice",
  "General Invoice",
  "Taxi Booking Invoice",
  "Movie Booking Invoice",
  "Money Exchange Invoice",
  "Recharge Invoice",
  "Product Purchase Invoice",
  "Student Admission Invoice",
  "Zoo Ticket Invoice",
  "Stadium Seat Booking Invoice",
  "House Contract Invoice",
  "Roofing Services Invoice",
  "Photostudio Invoice",
  "Plumbing Invoice",
  "Real Estate Invoice",
  "Restaurant Color Invoice",
  "Pakistan FBR Invoice",
  "Electronics Shop Invoice",
  "Train Booking Invoice",
  "Clinic Billing Invoice",
];

const COLORS = [
  ["#1D4ED8", "#DBEAFE", "#0F172A"],
  ["#7C3AED", "#EDE9FE", "#111827"],
  ["#F59E0B", "#FEF3C7", "#111827"],
  ["#0EA5E9", "#E0F2FE", "#0C4A6E"],
  ["#10B981", "#DCFCE7", "#064E3B"],
  ["#EC4899", "#FCE7F3", "#831843"],
];

export const TEMPLATE_PRESETS: TemplatePreset[] = NAMES.map((name, index) => {
  const [accent, soft, dark] = COLORS[index % COLORS.length];
  const layout = index % 3 === 0 ? "split" : index % 3 === 1 ? "banner" : "classic";
  return {
    id: `template-${index + 1}`,
    name,
    accent,
    soft,
    dark,
    layout,
  };
});

export const DEFAULT_TEMPLATE_ID = TEMPLATE_PRESETS[0].id;
