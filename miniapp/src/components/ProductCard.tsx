import { useRef, useState } from "react";
import { ChevronDown, ShoppingBag, Check, Zap } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useTelegram } from "@/hooks/useTelegram";
import { formatPrice, type Product } from "@/data/products";

const tint: Record<Product["accent"], string> = {
  sun: "from-sun-soft to-card",
  sky: "from-sky-soft to-card",
  coral: "from-coral-soft to-card",
};

export function ProductCard({ product }: { product: Product }) {
  const { add, lines } = useCart();
  const { haptic, hapticSuccess } = useTelegram();
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);
  const [flying, setFlying] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [fly, setFly] = useState({ x: 0, y: 0, left: 0, top: 0, w: 0, h: 0 });

  const inCart = lines.find((l) => l.product.id === product.id)?.qty ?? 0;

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

  const handleBuyNow = () => {
    haptic("heavy");
    add(product.id);
    hapticSuccess();
    setBuying(true);
    setTimeout(() => {
      setBuying(false);
      // Navigate to cart
      const navBtns = document.querySelectorAll("[data-tab]");
      navBtns.forEach((btn) => {
        if ((btn as HTMLElement).dataset.tab === "cart") {
          (btn as HTMLElement).click();
        }
      });
    }, 800);
  };

  const toggleExpanded = () => {
    haptic("light");
    setExpanded((v) => !v);
  };

  return (
    <article className="soft-card flex h-full flex-col overflow-hidden">
      <div
        className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-b ${tint[product.accent]} px-4 pt-8 sm:px-6 sm:pt-10`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-6 h-40 w-40 -translate-x-1/2 rounded-full bg-card/70 blur-2xl sm:h-44 sm:w-44"
        />
        <img
          ref={imgRef}
          src={product.image}
          alt={`${product.name} FonteVita — ${product.capsules}`}
          className="relative h-48 w-auto object-contain drop-shadow-[0_22px_28px_rgba(60,70,90,0.18)] sm:h-56"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-4 sm:top-4">
          <span className="rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-bold shadow-soft sm:text-xs">
            {product.capsules}
          </span>
          {product.oldPrice && (
            <span className="rounded-full bg-coral/90 px-2.5 py-1 text-[11px] font-extrabold text-card shadow-soft sm:text-xs">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <div>
          <h3 className="text-lg font-bold sm:text-xl">{product.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{product.tagline}</p>
        </div>

        <dl className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {product.highlights.map((h) => (
            <div key={h.label} className="flex flex-col items-center rounded-xl bg-secondary px-1 py-2 text-center sm:rounded-2xl sm:px-2 sm:py-2.5">
              <dt className="font-display text-xs font-bold leading-none sm:text-sm">{h.value}</dt>
              <dd className="mt-0.5 line-clamp-2 text-[8px] leading-[1.2] text-muted-foreground sm:text-[10px] sm:leading-tight">{h.label}</dd>
            </div>
          ))}
        </dl>

        <button
          onClick={toggleExpanded}
          aria-expanded={expanded}
          className="flex items-center gap-1 self-start text-xs font-bold text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          {expanded ? "Свернуть" : "Подробнее"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 sm:h-4 sm:w-4 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pb-1 pt-1 sm:space-y-4">
              <ul className="space-y-1.5 sm:space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-xs leading-relaxed sm:text-sm">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf sm:h-4 sm:w-4" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 rounded-2xl bg-secondary/70 p-3 text-xs sm:space-y-2 sm:p-4 sm:text-sm">
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

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold sm:text-2xl">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through sm:text-sm">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-extrabold shadow-soft transition-all duration-300 active:scale-95 sm:flex-initial sm:px-5 sm:py-3 sm:text-sm ${
                added || inCart > 0
                  ? "bg-leaf text-white"
                  : "bg-secondary text-foreground hover:brightness-105"
              }`}
            >
              {added ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {added
                ? "Добавлено!"
                : inCart > 0
                  ? `В корзине (${inCart})`
                  : "В корзину"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={buying}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95 disabled:opacity-60 sm:flex-initial sm:px-5 sm:py-3 sm:text-sm"
            >
              {buying ? (
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
              {buying ? "Готово!" : "Купить"}
            </button>
          </div>
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
