import { useRef, useState } from "react";
import { ChevronDown, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useTelegram } from "@/hooks/useTelegram";
import { formatPrice, type Product } from "@/data/products";

const tint: Record<Product["accent"], string> = {
  sun: "from-sun-soft to-card",
  sky: "from-sky-soft to-card",
  coral: "from-coral-soft to-card",
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { haptic, hapticSuccess } = useTelegram();
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const [flying, setFlying] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [fly, setFly] = useState({ x: 0, y: 0, left: 0, top: 0, w: 0, h: 0 });

  const handleAdd = () => {
    haptic("medium");
    const img = imgRef.current;
    const target = document.getElementById("cart-button");
    if (img && target) {
      const a = img.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      setFly({
        left: a.left,
        top: a.top,
        w: a.width,
        h: a.height,
        x: b.left + b.width / 2 - (a.left + a.width / 2),
        y: b.top + b.height / 2 - (a.top + a.height / 2),
      });
      setFlying(true);
      setTimeout(() => setFlying(false), 750);
    }
    add(product.id);
    hapticSuccess();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const toggleExpanded = () => {
    haptic("light");
    setExpanded((v) => !v);
  };

  return (
    <article className="soft-card flex h-full flex-col overflow-hidden">
      <div
        className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-b ${tint[product.accent]} px-6 pt-10`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-card/70 blur-2xl"
        />
        <img
          ref={imgRef}
          src={product.image}
          alt={`${product.name} FonteVita — ${product.capsules}`}
          className="relative h-44 w-auto object-contain drop-shadow-[0_22px_28px_rgba(60,70,90,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 sm:h-56"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-xs font-bold shadow-soft">
          {product.capsules}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">{product.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {product.highlights.map((h) => (
            <div key={h.label} className="rounded-2xl bg-secondary px-2 py-3 text-center">
              <dt className="font-display text-base font-bold leading-none">{h.value}</dt>
              <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">{h.label}</dd>
            </div>
          ))}
        </dl>

        <button
          onClick={toggleExpanded}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 self-start text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? "Свернуть" : "Подробнее"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 pb-1 pt-1">
              <ul className="space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 rounded-2xl bg-secondary/70 p-4 text-sm">
                <p>
                  <span className="font-bold">Дозировка: </span>
                  <span className="text-muted-foreground">{product.dose}</span>
                </p>
                <p>
                  <span className="font-bold">Приём: </span>
                  <span className="text-muted-foreground">{product.intake}</span>
                </p>
                <p>
                  <span className="font-bold">Состав: </span>
                  <span className="text-muted-foreground">{product.composition}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>

      {flying && (
        <img
          src={product.image}
          alt=""
          aria-hidden
          className="pointer-events-none fixed z-[60] object-contain"
          style={
            {
              left: fly.left,
              top: fly.top,
              width: fly.w,
              height: fly.h,
              "--fly-x": `${fly.x}px`,
              "--fly-y": `${fly.y}px`,
              animation: "fly-to-cart 0.7s cubic-bezier(0.5,0,0.75,0) forwards",
            } as React.CSSProperties
          }
        />
      )}
    </article>
  );
}
