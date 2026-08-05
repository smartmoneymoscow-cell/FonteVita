import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/components/cart-context";
import logo from "@/assets/logo-mark.png.asset.json";


const links = [
  { href: "#top", label: "Главная" },
  { href: "#products", label: "Продукты" },
  { href: "#quiz", label: "Подбор" },
  { href: "#quality", label: "Качество" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "Вопросы" },
];


export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:h-[4.5rem] sm:px-10">
        <a href="#top" className="flex shrink-0 items-center" aria-label="FonteVita — на главную">
          <img
            src={logo.url}
            alt="Логотип FonteVita"
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95 active:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="relative rounded-full px-3.5 py-2 text-sm font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95"
          >
            Блог
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            aria-label="Войти в аккаунт"
            className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3.5 py-2 text-sm font-bold text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-sun-soft active:scale-95"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Войти</span>
          </button>

          <button
            id="cart-button"
            onClick={() => setOpen(true)}
            aria-label={`Открыть корзину, товаров: ${count}`}
            className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-lift hover:brightness-110 active:scale-95 active:brightness-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Корзина</span>
            {count > 0 && (
              <span
                className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[11px] font-extrabold text-card ${
                  bump ? "animate-pop-badge" : ""
                }`}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sun-soft">
              <User className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-lg font-extrabold">Личный кабинет</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Вход в аккаунт скоро будет доступен — здесь появятся ваши заказы, бонусы и история покупок.
            </p>
            <button
              onClick={() => setAuthOpen(false)}
              className="mt-5 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      </div>
      {/* blurred fade-out at the bottom of the header */}
      {scrolled && (
        <div
          aria-hidden
          className="pointer-events-none h-8 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-xl sm:h-10"
        />
      )}
    </header>
  );
}
