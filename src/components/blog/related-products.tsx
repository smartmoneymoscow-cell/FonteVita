import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/data/products";

export function RelatedProducts({ productIds }: { productIds: string[] }) {
  const items = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  if (items.length === 0) return null;

  return (
    <div className="soft-card p-5 sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
        Упомянутые продукты
      </p>
      <div className="mt-4 space-y-3">
        {items.map((p) => (
          <Link
            key={p.id}
            to="/"
            hash={`product-${p.id}`}
            className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3 transition-colors hover:bg-secondary"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-14 w-14 shrink-0 object-contain"
              loading="lazy"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{p.name}</span>
              <span className="block text-xs text-muted-foreground">{formatPrice(p.price)}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
