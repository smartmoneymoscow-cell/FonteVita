import type { CategoryAccent } from "@/data/blog-categories";

export const accentClasses: Record<
  CategoryAccent,
  { soft: string; ring: string; gradient: string; blob: string }
> = {
  coral: {
    soft: "bg-coral-soft",
    ring: "ring-coral/30",
    gradient: "from-coral-soft via-card to-card",
    blob: "bg-coral/25",
  },
  sky: {
    soft: "bg-sky-soft",
    ring: "ring-sky/30",
    gradient: "from-sky-soft via-card to-card",
    blob: "bg-sky/25",
  },
  sun: {
    soft: "bg-sun-soft",
    ring: "ring-sun/40",
    gradient: "from-sun-soft via-card to-card",
    blob: "bg-sun/30",
  },
  leaf: {
    soft: "bg-leaf/15",
    ring: "ring-leaf/30",
    gradient: "from-leaf/15 via-card to-card",
    blob: "bg-leaf/25",
  },
};
