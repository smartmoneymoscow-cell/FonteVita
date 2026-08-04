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
        scrolled ? "bg-background/85 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <a href="#top" className="flex items-center" aria-label="FonteVita — на главную">
          <img
            src={logo.url}
            alt="Логотип FonteVita"
            className="h-12 w-auto object-contain sm:h-16"
            width={176}
            height={128}
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
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
          className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
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
    </header>
  );
}
