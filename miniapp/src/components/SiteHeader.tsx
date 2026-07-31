import { useEffect, useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";

export function SiteHeader() {
  const { haptic } = useTelegram();
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
        scrolled
          ? "bg-background/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-lg items-center justify-between px-4 py-3">
        <a
          href="#top"
          onClick={() => haptic("light")}
          className="flex items-center"
          aria-label="FonteVita — на главную"
        >
          <img
            src="./logo.png"
            alt="Логотип FonteVita"
            className="h-10 w-auto object-contain"
            width={140}
            height={100}
          />
        </a>

        <span className="text-xs font-bold text-muted-foreground/60">
          Каталог БАДов
        </span>
      </div>
    </header>
  );
}
