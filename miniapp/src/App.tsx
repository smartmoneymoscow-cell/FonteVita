import { useState } from "react";
import { Sparkles, ShieldCheck, Leaf, Truck } from "lucide-react";
import { CartProvider } from "@/components/CartContext";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { CartPage } from "@/components/CartPage";
import { ProfilePage } from "@/components/ProfilePage";
import { BottomNav } from "@/components/BottomNav";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";

type Tab = "catalog" | "cart" | "profile";

const advantages = [
  { icon: ShieldCheck, title: "Сертифицировано", text: "Каждая партия проходит контроль качества" },
  { icon: Leaf, title: "Честный состав", text: "Без лишних добавок и красителей" },
  { icon: Sparkles, title: "Рабочие дозировки", text: "Дозировки указаны на упаковке" },
  { icon: Truck, title: "Быстрая доставка", text: "По России, бесплатно от 3000 ₽" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("catalog");

  return (
    <CartProvider>
      <div className="min-h-dvh overflow-x-hidden bg-background">
        {tab === "catalog" && <SiteHeader />}

        <main>
          {tab === "catalog" && <CatalogPage />}
          {tab === "cart" && <CartPage />}
          {tab === "profile" && <ProfilePage />}
        </main>

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </CartProvider>
  );
}

function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun-soft blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-40 h-56 w-56 rounded-full bg-sky-soft blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-lg px-4 pb-8 pt-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-bold shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            Витамины для всей семьи
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight">
            Забота, которая
            <span className="sun-blob mx-1 inline-block px-2">чувствуется</span>
            каждый день
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Коллаген, магний + B6 и омега 3 в честных дозировках
          </p>
        </div>

        {/* Bottles */}
        <div className="relative mx-auto flex w-full max-w-xs items-end justify-center gap-1 pb-6">
          <div
            aria-hidden
            className="absolute bottom-2 left-1/2 h-48 w-[90%] -translate-x-1/2 rounded-[2.5rem] bg-sky-soft/70"
          />
          <img
            src="./collagen.png"
            alt="Коллаген"
            className="relative z-10 h-32 w-auto animate-float-soft object-contain drop-shadow-lg"
            style={{ animationDelay: "0.6s" }}
          />
          <img
            src="./omega.png"
            alt="Омега 3"
            className="relative z-20 h-44 w-auto animate-float-soft object-contain drop-shadow-lg"
          />
          <img
            src="./magnesium.png"
            alt="Магний"
            className="relative z-10 h-32 w-auto animate-float-soft object-contain drop-shadow-lg"
            style={{ animationDelay: "1.2s" }}
          />
        </div>
      </section>

      {/* Advantages */}
      <section className="mx-auto w-full max-w-lg px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="soft-card flex flex-col items-center gap-1.5 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sun-soft">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold">{a.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-sand py-8">
        <div className="mx-auto w-full max-w-lg px-4">
          <Reveal>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">Наши продукты</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Раскройте карточку, чтобы увидеть состав
              </p>
            </div>
          </Reveal>
          <div className="space-y-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-sand py-6 pb-24 text-center">
        <img
          src="./logo.png"
          alt="FonteVita"
          className="mx-auto h-10 w-auto object-contain"
          loading="lazy"
        />
        <p className="mt-2 px-4 text-[11px] leading-relaxed text-muted-foreground">
          БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со
          специалистом.
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} FonteVita
        </p>
      </footer>
    </>
  );
}
