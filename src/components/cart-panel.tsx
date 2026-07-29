import { Minus, Plus, ShoppingBag, Trash2, X, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/data/products";

export function CartPanel() {
  const { lines, total, count, open, setOpen, inc, dec, remove, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  const checkout = () => {
    setOrdered(true);
    clear();
    setTimeout(() => setOrdered(false), 4000);
  };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Корзина"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[420px] flex-col bg-card shadow-lift transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-l-3xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary-foreground/70" />
            <h2 className="text-lg font-semibold">Корзина</h2>
            <span className="rounded-full bg-sun-soft px-2 py-0.5 text-xs font-bold">{count}</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть корзину"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {ordered && (
            <div className="mb-4 flex items-start gap-3 rounded-2xl bg-sky-soft px-4 py-3 text-sm animate-rise-in">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              <p>Заказ оформлен! Мы свяжемся с вами для подтверждения доставки.</p>
            </div>
          )}
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="sun-blob flex h-16 w-16 items-center justify-center rounded-full">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <p className="text-sm text-muted-foreground">
                Пока пусто. Добавьте витамины для всей семьи.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-2xl border border-border bg-background p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-bold">{product.name}</p>
                      <button
                        onClick={() => remove(product.id)}
                        aria-label={`Удалить ${product.name}`}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.capsules}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                        <button
                          onClick={() => dec(product.id)}
                          aria-label="Уменьшить количество"
                          className="rounded-full bg-card p-1 transition-transform hover:scale-110"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => inc(product.id)}
                          aria-label="Увеличить количество"
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
          )}
        </div>

        <footer className="space-y-3 border-t border-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Доставка</span>
            <span className="font-semibold text-leaf">Бесплатно от 3000 ₽</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Итого</span>
            <span className="font-display text-2xl font-bold">{formatPrice(total)}</span>
          </div>
          <button
            onClick={checkout}
            disabled={lines.length === 0}
            className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Оформить заказ
          </button>
        </footer>
      </aside>
    </>
  );
}
