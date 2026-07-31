import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Check } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useTelegram } from "@/hooks/useTelegram";
import { formatPrice } from "@/data/products";

export function CartPage() {
  const { lines, total, count, inc, dec, remove, clear } = useCart();
  const { haptic, hapticSuccess } = useTelegram();
  const [ordered, setOrdered] = useState(false);

  const checkout = () => {
    hapticSuccess();
    setOrdered(true);
    clear();
    if (window.Telegram?.WebApp?.initData) {
      console.log("Checkout with initData:", window.Telegram.WebApp.initData);
    }
    setTimeout(() => setOrdered(false), 4000);
  };

  if (lines.length === 0 && !ordered) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="sun-blob flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <p className="text-base font-semibold text-muted-foreground">
          Корзина пуста
        </p>
        <p className="text-sm text-muted-foreground/70">
          Добавьте витамины из каталога
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">
      {ordered && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-sky-soft px-4 py-3 text-sm animate-rise-in">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
          <p>Заказ оформлен! Мы свяжемся с вами для подтверждения доставки.</p>
        </div>
      )}

      <h2 className="mb-4 text-lg font-bold">
        Корзина <span className="text-muted-foreground">({count})</span>
      </h2>

      <ul className="space-y-3">
        {lines.map(({ product, qty }) => (
          <li
            key={product.id}
            className="flex gap-3 rounded-2xl border border-border bg-card p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 shrink-0 rounded-xl bg-secondary object-contain"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-bold">{product.name}</p>
                <button
                  onClick={() => {
                    haptic("light");
                    remove(product.id);
                  }}
                  aria-label={`Удалить ${product.name}`}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {product.capsules}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                  <button
                    onClick={() => {
                      haptic("light");
                      dec(product.id);
                    }}
                    className="rounded-full bg-card p-1 transition-transform hover:scale-110"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      haptic("light");
                      inc(product.id);
                    }}
                    className="rounded-full bg-card p-1 transition-transform hover:scale-110"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-extrabold">
                  {formatPrice(product.price * qty)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Доставка</span>
          <span className="font-semibold text-leaf">
            {total >= 3000 ? "Бесплатно" : "350 ₽"}
          </span>
        </div>
        {total < 3000 && (
          <div className="text-xs text-muted-foreground/70">
            Бесплатная доставка от 3 000 ₽ · осталось{" "}
            <span className="font-bold">{formatPrice(3000 - total)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Итого</span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(total + (total < 3000 ? 350 : 0))}
          </span>
        </div>
        <button
          onClick={checkout}
          disabled={lines.length === 0}
          className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
