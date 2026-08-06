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
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    try { setIsAuthed(localStorage.getItem("fontevita-authed") === "1"); } catch {}
    const onStorage = () => {
      try { setIsAuthed(localStorage.getItem("fontevita-authed") === "1"); } catch {}
    };
    window.addEventListener("storage", onStorage);
    // Also check on focus (same-tab changes)
    const onFocus = () => {
      try { setIsAuthed(localStorage.getItem("fontevita-authed") === "1"); } catch {}
    };
    window.addEventListener("focus", onFocus);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("focus", onFocus); };
  }, []);


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
        scrolled ? "bg-background/85 shadow-soft backdrop-blur-md" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center" aria-label="FonteVita — на главную">
          <img
            src={logo.url}
            alt="Логотип FonteVita"
            className="h-11 w-auto object-contain sm:h-14"
            width={160}
            height={112}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-base font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95 active:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="relative rounded-full px-3.5 py-2 text-base font-bold text-muted-foreground transition-all duration-200 hover:bg-sun-soft hover:text-foreground active:scale-95"
          >
            Блог
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
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

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            aria-label={isAuthed ? "Личный кабинет" : "Войти в аккаунт"}
            className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3.5 py-2 text-sm font-bold text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-sun-soft active:scale-95"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{isAuthed ? "Личный кабинет" : "Войти"}</span>
          </button>
        </div>
      </div>

      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sun-soft">
                <User className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-extrabold">{isAuthed ? "Личный кабинет" : "Вход в аккаунт"}</h3>
            </div>
            {isAuthed ? (
              <>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  Добро пожаловать! Здесь будут ваши заказы, бонусы и история покупок.
                </p>
                <button
                  onClick={() => {
                    try { localStorage.removeItem("fontevita-authed"); } catch {}
                    setIsAuthed(false);
                    setAuthOpen(false);
                  }}
                  className="mt-5 w-full rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:bg-border active:scale-95"
                >
                  Выйти
                </button>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  try { localStorage.setItem("fontevita-authed", "1"); } catch {}
                  setIsAuthed(true);
                  setAuthOpen(false);
                }}
                className="mt-4 space-y-3"
              >
                <div>
                  <label className="text-sm font-bold">Телефон или email</label>
                  <input
                    type="text"
                    placeholder="+7 900 123-45-67 или email"
                    autoComplete="username"
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold">Пароль</label>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground transition-all hover:brightness-110 hover:bg-leaf hover:text-white active:scale-95"
                >
                  Войти
                </button>
                <p className="text-center">
                  <button
                    type="button"
                    className="text-xs font-bold text-muted-foreground transition-colors hover:text-primary"
                  >
                    Восстановить пароль
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}



    </header>
  );
}
