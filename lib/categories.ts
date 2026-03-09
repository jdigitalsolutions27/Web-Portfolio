export type Category =
  | "Restaurants & Food"
  | "Resorts & Hotels"
  | "Healthcare & Clinics"
  | "Automotive"
  | "Real Estate"
  | "Fitness & Gym"
  | "Pets & Veterinary"
  | "Beauty & Wellness"
  | "Rentals"
  | "Agency / Corporate"
  | "Affiliate / Marketing"
  | "Systems / Other";

export const CATEGORIES: Category[] = [
  "Restaurants & Food",
  "Resorts & Hotels",
  "Healthcare & Clinics",
  "Automotive",
  "Real Estate",
  "Fitness & Gym",
  "Pets & Veterinary",
  "Beauty & Wellness",
  "Rentals",
  "Agency / Corporate",
  "Affiliate / Marketing",
  "Systems / Other",
];

export const FILTER_CATEGORIES = ["All", ...CATEGORIES] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export type SortMode = "featured" | "newest" | "az" | "category";
export type ViewMode = "grid" | "explorer" | "compact";

