import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-7 sm:px-10 sm:py-8">
        <a href="#top" className="flex shrink-0 items-center" aria-label="FonteVita — на главную">
          <img
            src={logo.url}
            alt="Логотип FonteVita"
            className="h-9 w-auto sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95 active:text-foreground sm:text-base"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="relative rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95 sm:text-base"
          >
            Блог
          </Link>
        </nav>

        <button
          id="cart-button"
          onClick={() => setOpen(true)}
          aria-label={`Открыть корзину, товаров: ${count}`}
          className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-lift hover:brightness-110 active:scale-95 active:brightness-95"
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
