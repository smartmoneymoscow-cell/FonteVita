import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-muted-foreground sm:text-sm">
      <Link to="/" className="flex items-center gap-1 transition-colors hover:text-foreground" aria-label="Главная">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
          {item.to && i < items.length - 1 ? (
            <Link
              to={item.to}
              params={item.params}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

/** Builds a BreadcrumbList JSON-LD block matching the trail rendered above (relative URLs, consistent with the rest of the site's canonical/og:url convention). */
export function buildBreadcrumbJsonLd(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
