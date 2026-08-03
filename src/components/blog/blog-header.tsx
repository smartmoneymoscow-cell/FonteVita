import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import logo from "@/assets/logo-mark.png.asset.json";

export function BlogHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-background/85 shadow-soft backdrop-blur-md" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="FonteVita — на главную">
          <img
            src={logo.url}
            alt="Логотип FonteVita"
            className="h-11 w-auto object-contain sm:h-14"
            width={160}
            height={112}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className="text-base font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            Главная
          </Link>
          <a
            href="/#products"
            className="text-base font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            Продукты
          </a>
          <Link
            to="/blog"
            className="text-base font-bold text-foreground transition-colors hover:text-foreground"
          >
            Блог
          </Link>
          <a
            href="/#faq"
            className="text-base font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            Вопросы
          </a>
        </nav>

        <a
          href="/#products"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">В каталог</span>
        </a>
      </div>
    </header>
  );
}
