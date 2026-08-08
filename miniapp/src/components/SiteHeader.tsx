import { useEffect, useState } from "react";

export function SiteHeader({ title }: { title?: string }) {
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
      <div className="mx-auto flex w-full max-w-lg items-center justify-center px-4 py-3">
        <span className="text-sm font-bold text-foreground">
          {title || "Каталог"}
        </span>
      </div>
    </header>
  );
}
