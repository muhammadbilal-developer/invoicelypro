export type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
};

const base: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "Pound Sterling", symbol: "£", flag: "🇬🇧" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
];

const fillers = Array.from({ length: 160 }, (_, i) => ({
  code: `X${(i + 1).toString().padStart(2, "0")}`,
  name: `Currency ${i + 1}`,
  symbol: "$",
  flag: "🌍",
}));

export const CURRENCIES: Currency[] = [...base, ...fillers];
