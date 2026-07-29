import { createFileRoute } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { CartProvider } from "@/components/cart-context";
import { CartPanel } from "@/components/cart-panel";
import { SiteHeader } from "@/components/site-header";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/data/products";
import logo from "@/assets/logo.jpeg.asset.json";
import omegaImg from "@/assets/omega.jpeg.asset.json";
import quality from "@/assets/quality.png.asset.json";
import authenticity from "@/assets/authenticity.png.asset.json";
import combo from "@/assets/combo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FonteVita — витамины и БАДы для всей семьи" },
      {
        name: "description",
        content:
          "FonteVita: коллаген, магний + B6 и омега 3 в проверенных дозировках. Сертифицированные БАДы для энергии, спокойствия и красоты. Доставка по России.",
      },
      { property: "og:title", content: "FonteVita — витамины и БАДы для всей семьи" },
      {
        property: "og:description",
        content:
          "Коллаген, магний + B6 и омега 3 в честных дозировках. Сертифицированное качество FonteVita.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "FonteVita",
          description: "Бренд витаминов и биологически активных добавок для всей семьи.",
          url: "/",
        }),
      },
    ],
  }),
});

const advantages = [
  { icon: ShieldCheck, title: "Сертифицировано", text: "Каждая партия проходит контроль качества" },
  { icon: Leaf, title: "Честный состав", text: "Без лишних добавок и красителей" },
  { icon: Sparkles, title: "Рабочие дозировки", text: "Дозировки указаны прямо на упаковке" },
  { icon: Truck, title: "Быстрая доставка", text: "По всей России, бесплатно от 3000 ₽" },
];

function Index() {
  return (
    <CartProvider>
      <div id="top" className="min-h-dvh overflow-x-hidden">
        <SiteHeader />
        <CartPanel />

        <main>
          {/* Hero */}
          <section className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-soft blur-2xl sm:h-96 sm:w-96"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-40 h-56 w-56 rounded-full bg-sun-soft blur-2xl"
            />
            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-16">
              <div className="animate-rise-in text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold shadow-soft sm:text-sm">
                  <Sparkles className="h-4 w-4 text-coral" />
                  Витамины для всей семьи
                </span>
                <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                  Забота, которая
                  <span className="sun-blob mx-2 inline-block px-2">чувствуется</span>
                  каждый день
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                  FonteVita — коллаген, магний с витамином B6 и омега 3 в честных дозировках.
                  Спокойный сон, крепкий иммунитет и энергия для родителей и детей.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <a
                    href="#products"
                    className="rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
                  >
                    Выбрать продукт
                  </a>
                  <a
                    href="#quality"
                    className="rounded-full border-2 border-border px-7 py-3 text-sm font-extrabold transition-colors duration-300 hover:bg-secondary"
                  >
                    Как мы проверяем качество
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-6 top-10 rounded-[3rem] bg-sky-soft"
                />
                <img
                  src={omegaImg.url}
                  alt="Омега 3 FonteVita — липидный комплекс, 180 капсул"
                  className="relative w-full animate-float-soft rounded-[2.5rem] object-contain"
                  width={960}
                  height={1280}
                />
              </div>
            </div>
          </section>

          {/* Advantages */}
          <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a, i) => (
                <Reveal key={a.title} delay={i * 90} className="h-full">
                  <div className="soft-card flex h-full flex-col items-center gap-2 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sun-soft">
                      <a.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Products */}
          <section id="products" className="scroll-mt-24 bg-sand py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold sm:text-4xl">Наши продукты</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Три формулы, которые закрывают базовые потребности организма. Раскройте карточку,
                    чтобы увидеть состав и схему приёма.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((p, i) => (
                  <Reveal key={p.id} delay={i * 110} className="h-full">
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Quality */}
          <section id="quality" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold sm:text-4xl">Качество и подлинность</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Мы бережём каждую капсулу: от непрозрачной банки до маркировки «Честный знак»,
                    которую вы можете проверить сами.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <Reveal>
                  <div className="soft-card overflow-hidden">
                    <img
                      src={quality.url}
                      alt="Сохранение качества и целостности витаминов FonteVita: надёжная крышка, защитная мембрана, непрозрачная банка, термоусадочная плёнка"
                      className="w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div className="soft-card overflow-hidden">
                    <img
                      src={authenticity.url}
                      alt="Как проверить подлинность продукта FonteVita через приложение Честный знак"
                      className="w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Combo */}
          <section className="bg-sky-soft py-16 sm:py-20">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
              <Reveal>
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold sm:text-4xl">Работают лучше вместе</h2>
                  <p className="mt-4 text-base leading-relaxed">
                    Для укрепления иммунитета сочетайте приём Омега-3 с витамином D3. Магний с B6
                    поддержит спокойствие, а коллаген — кожу, волосы и суставы.
                  </p>
                  <a
                    href="#products"
                    className="mt-7 inline-block rounded-full bg-card px-7 py-3.5 text-sm font-extrabold shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
                  >
                    Собрать комплекс
                  </a>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <img
                  src={combo.url}
                  alt="Омега 3 и витамин D3+K2 FonteVita рядом"
                  className="mx-auto w-full max-w-md rounded-[2rem] object-contain"
                  loading="lazy"
                />
              </Reveal>
            </div>
          </section>

          {/* About */}
          <section id="about" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
              <Reveal>
                <img
                  src={logo.url}
                  alt="Логотип FonteVita"
                  className="mx-auto h-16 w-auto rounded-xl sm:h-20"
                  loading="lazy"
                />
                <h2 className="mt-6 text-3xl font-bold sm:text-4xl">О бренде FonteVita</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Мы делаем добавки, которые не стыдно поставить на общий стол: понятные формулы,
                  честные дозировки и упаковка, нарисованная про настоящую семейную жизнь — рыбалку,
                  утреннюю йогу и сборы в школу. Каждый продукт сертифицирован и промаркирован.
                </p>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-sand py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
            <img src={logo.url} alt="FonteVita" className="h-10 w-auto rounded-lg" loading="lazy" />
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со
              специалистом.
            </p>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} FonteVita</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
