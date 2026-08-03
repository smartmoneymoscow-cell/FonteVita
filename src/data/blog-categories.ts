import { Droplet, Moon, Fish, Compass, type LucideIcon } from "lucide-react";

export type CategoryAccent = "coral" | "sky" | "sun" | "leaf";

export type BlogCategory = {
  slug: string;
  /** Full display name, used as H1 on the category archive page. */
  name: string;
  /** Short label for pills/badges. */
  shortName: string;
  /** One-line description shown under the H1 on the category page. */
  description: string;
  /** Meta description for the category archive page (targets the broad, high-frequency keyword). */
  seoDescription: string;
  accent: CategoryAccent;
  icon: LucideIcon;
  /** Primary broad keyword this category page targets. */
  keyword: string;
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "kollagen",
    name: "Коллаген",
    shortName: "Коллаген",
    description: "Что такое коллаген, зачем он нужен коже и суставам и как принимать добавку с пользой.",
    seoDescription:
      "Коллаген: для чего нужен организму, какие типы бывают и как правильно принимать капсулы. Статьи на основе исследований и практики FonteVita.",
    accent: "coral",
    icon: Droplet,
    keyword: "коллаген",
  },
  {
    slug: "magniy",
    name: "Магний и витамин B6",
    shortName: "Магний",
    description: "Роль магния в нервной системе и сне, формы магния и правила совместного приёма с B6.",
    seoDescription:
      "Магний + B6: для чего нужен, какую форму магния выбрать и когда его лучше принимать. Практические статьи FonteVita.",
    accent: "sky",
    icon: Moon,
    keyword: "магний в6",
  },
  {
    slug: "omega-3",
    name: "Омега-3",
    shortName: "Омега-3",
    description: "Польза и вред омега-3, источники жирных кислот и как отличить свежий рыбий жир от окисленного.",
    seoDescription:
      "Омега-3: польза и вред, как выбрать качественный рыбий жир и сколько принимать в сутки. Разбор FonteVita.",
    accent: "sun",
    icon: Fish,
    keyword: "омега 3",
  },
  {
    slug: "guide",
    name: "Гид покупателя",
    shortName: "Гид",
    description: "Как выбирать БАДы, читать этикетки, проверять подлинность и сочетать добавки между собой.",
    seoDescription:
      "Как выбрать витамины и БАДы, проверить подлинность через «Честный знак» и понять, чем БАД отличается от лекарства.",
    accent: "leaf",
    icon: Compass,
    keyword: "как выбрать витамины",
  },
];

export const getCategoryBySlug = (slug: string) => blogCategories.find((c) => c.slug === slug);
