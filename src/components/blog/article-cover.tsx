import type { BlogCategory } from "@/data/blog-categories";
import { accentClasses } from "@/components/blog/accent";

export function ArticleCover({
  category,
  size = "card",
  imageUrl,
}: {
  category: BlogCategory;
  size?: "card" | "hero";
  imageUrl?: string;
}) {
  const accent = accentClasses[category.accent];
  const Icon = category.icon;
  const height = size === "hero" ? "h-48 sm:h-64" : "h-56";
  const iconSize = size === "hero" ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11";

  if (imageUrl) {
    return (
      <div className={`relative ${height} w-full overflow-hidden`}>
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex ${height} w-full items-center justify-center overflow-hidden bg-gradient-to-br ${accent.gradient}`}
      aria-hidden
    >
      <div className={`absolute -left-8 -top-8 h-40 w-40 rounded-full ${accent.blob} blur-3xl`} />
      <div className={`absolute -right-6 bottom-0 h-28 w-28 rounded-full ${accent.blob} blur-2xl`} />
      <div
        className={`relative flex items-center justify-center rounded-full bg-card/90 shadow-soft ${
          size === "hero" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-20 w-20"
        }`}
      >
        <Icon className={`${iconSize} text-foreground/80`} strokeWidth={1.5} />
      </div>
    </div>
  );
}
