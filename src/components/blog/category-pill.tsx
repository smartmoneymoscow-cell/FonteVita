import { Link } from "@tanstack/react-router";
import type { BlogCategory } from "@/data/blog-categories";
import { accentClasses } from "@/components/blog/accent";

export function CategoryPill({ category, asLink = true }: { category: BlogCategory; asLink?: boolean }) {
  const accent = accentClasses[category.accent];
  const classes = `inline-flex items-center gap-1.5 rounded-full ${accent.soft} px-3 py-1.5 text-xs font-bold text-foreground/80 ring-1 ${accent.ring} transition-transform duration-300 hover:scale-105`;

  if (!asLink) {
    return (
      <span className={classes}>
        <category.icon className="h-3.5 w-3.5" />
        {category.shortName}
      </span>
    );
  }

  return (
    <Link to="/blog/category/$category" params={{ category: category.slug }} className={classes}>
      <category.icon className="h-3.5 w-3.5" />
      {category.shortName}
    </Link>
  );
}
