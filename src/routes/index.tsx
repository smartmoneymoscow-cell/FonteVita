import { createFileRoute } from "@tanstack/react-router";
import {
  Baby,
  BadgeCheck,
  Leaf,
  Lock,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Truck,
  Droplets,
  Package,
  CheckCircle2,
} from "lucide-react";
import { CartProvider } from "@/components/cart-context";
import { CartPanel } from "@/components/cart-panel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Quiz } from "@/components/quiz";
import { Reviews } from "@/components/reviews";
import { Faq } from "@/components/faq";
import { products } from "@/data/products";
import {
  organizationSchema,
  productSchema,
  websiteSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo-schema";
import logo from "@/assets/logo-mark.png.asset.json";
import collagenBottle from "@/assets/collagen-bottle.png.asset.json";
import magnesiumBottle from "@/assets/magnesium-bottle.png.asset.json";
import omegaBottle from "@/assets/omega-bottle.png.asset.json";
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
      { property: "og:url", content: "https://fontevita.ru/" },
      { property: "og:image", content: "https://fontevita.ru/__l5e/assets-v1/ace176ff-1b22-489c-a209-196f67f2c7b6/logo-mark.png" },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FonteVita — витамины и БАДы для всей семьи" },
      {
        name: "twitter:description",
        content:
          "Коллаген, магний + B6 и омега 3 в честных дозировках. Сертифицированное качество FonteVita.",
      },
      { name: "twitter:image", content: "https://fontevita.ru/__l5e/assets-v1/ace176ff-1b22-489c-a209-196f67f2c7b6/logo-mark.png" },
    ],
    links: [{ rel: "canonical", href: "https://fontevita.ru/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema()),
      },
      ...productSchema().map((schema) => ({
        type: "application/ld+json" as const,
        children: JSON.stringify(schema),
      })),
    ],
  }),
});

const advantages = [
  { icon: ShieldCheck, title: "Сертифицировано", text: "Каждая партия проходит контроль качества" },
  { icon: Leaf, title: "Честный состав", text: "Без лишних добавок и красителей" },
  { icon: Sparkles, title: "Рабочие дозировки", text: "Дозировки указаны прямо на упаковке" },
  { icon: Truck, title: "Быстрая доставка", text: "По всей России, бесплатно от 3000 ₽" },
];

const qualityPoints = [
  {
    icon: Baby,
    title: "Крышка с защитой от детей",
    text: "Открывается только с нажатием — банка безопасна дома, где есть малыши.",
  },
  {
    icon: Lock,
    title: "Защитная мембрана",
    text: "Герметичная фольга под крышкой подтверждает, что банку никто не вскрывал.",
  },
  {
    icon: Droplets,
    title: "Непрозрачная банка",
    text: "Плотный пластик не пропускает свет и сохраняет активность формулы до конца курса.",
  },
  {
    icon: Package,
    title: "Термоусадочная плёнка",
    text: "Заводская плёнка на крышке — гарантия целостности при доставке.",
  },
];

const authSteps = [
  { icon: QrCode, title: "Найдите код", text: "Код Data Matrix напечатан на упаковке продукта." },
  {
    icon: ScanLine,
    title: "Отсканируйте",
    text: "Наведите камеру в бесплатном приложении «Честный знак».",
  },
  {
    icon: BadgeCheck,
    title: "Проверьте статус",
    text: "Приложение покажет производителя, партию и срок годности.",
  },
];

const stats = [
  { value: "12 000+", label: "семей уже с нами" },
  { value: "4,9", label: "средняя оценка покупателей" },
  { value: "100%", label: "партий с лабораторным протоколом" },
];

function Index() {
  return (
    <CartProvider>
      <div id="top" className="min-h-dvh overflow-x-hidden">
        <SiteHeader />
        <CartPanel />

        <main>
          {/* Hero */}
          <section className="relative bg-gradient-to-b from-sand via-background to-background">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-sun-soft blur-3xl sm:h-[26rem] sm:w-[26rem]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-52 h-72 w-72 rounded-full bg-sky-soft blur-3xl"
            />
            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-8 pt-8 sm:px-6 sm:pt-12 md:grid-cols-[0.95fr_1.05fr] md:pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pb-16 lg:pt-16">
              <div className="animate-rise-in flex h-full flex-col justify-center text-center md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold shadow-soft sm:text-sm">
                  <Sparkles className="h-4 w-4 text-coral" />
                  Витамины для всей семьи
                </span>
                <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
                  Забота, которая
                  <span className="sun-blob mx-2 inline-block px-2">чувствуется</span>
                  каждый день
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                  Коллаген, магний с витамином B6 и омега 3 в честных дозировках. Спокойный сон,
                  крепкий иммунитет и энергия для родителей и детей.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <a
                    href="#products"
                    className="rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
                  >
                    Выбрать продукт
                  </a>
                  <a
                    href="#quiz"
                    className="rounded-full border-2 border-border px-7 py-3 text-sm font-extrabold transition-colors duration-300 hover:bg-secondary"
                  >
                    Подобрать за 30 секунд
                  </a>
                </div>

                <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 md:mx-0">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center lg:text-left">
                      <dt className="font-display text-2xl font-bold sm:text-3xl">{s.value}</dt>
                      <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Bottle composition */}
              <div className="relative mx-auto flex w-full max-w-[44rem] items-end justify-center gap-1 sm:gap-3 md:gap-0.5 lg:gap-2">
                <div
                  aria-hidden
                  className="absolute bottom-8 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sun/15 blur-2xl sm:bottom-10 sm:h-[38rem] sm:w-[38rem] md:bottom-8 md:h-[32rem] md:w-[32rem] lg:bottom-12 lg:h-[46rem] lg:w-[46rem]"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div aria-hidden className="absolute -inset-10 rounded-full bg-orange-400/3 blur-xl sm:-inset-14 md:-inset-10 lg:-inset-16" />
                    <img
                      src={collagenBottle.url}
                      alt="Коллаген FonteVita, 120 капсул"
                      className="relative h-[30rem] w-auto animate-float-soft object-contain drop-shadow-[0_40px_50px_rgba(60,70,90,0.28)] sm:h-[44rem] md:h-[38rem] lg:h-[54rem]"
                      style={{ animationDelay: "0.6s" }}
                    />

                  </div>
                </div>
                <div className="relative z-20 flex flex-col items-center">
                  <div className="relative">
                    <div aria-hidden className="absolute -inset-10 rounded-full bg-orange-400/3 blur-xl sm:-inset-14 md:-inset-10 lg:-inset-16" />
                    <img
                      src={omegaBottle.url}
                      alt="Омега 3 FonteVita, 180 капсул"
                      className="relative h-[30rem] w-auto animate-float-soft object-contain drop-shadow-[0_40px_50px_rgba(60,70,90,0.28)] sm:h-[44rem] md:h-[38rem] lg:h-[54rem]"
                    />
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div aria-hidden className="absolute -inset-10 rounded-full bg-orange-400/3 blur-xl sm:-inset-14 md:-inset-10 lg:-inset-16" />
                    <img
                      src={magnesiumBottle.url}
                      alt="Магний + B6 FonteVita, 120 капсул"
                      className="relative h-[30rem] w-auto animate-float-soft object-contain drop-shadow-[0_40px_50px_rgba(60,70,90,0.28)] sm:h-[44rem] md:h-[38rem] lg:h-[54rem]"
                      style={{ animationDelay: "1.2s" }}
                    />
                  </div>
                </div>
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

          {/* Quiz */}
          <section id="quiz" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="mx-auto mb-10 max-w-2xl text-center">
                  <h2 className="text-3xl font-bold sm:text-4xl">Какой БАД вам подойдёт</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Три вопроса о самочувствии — и мы подскажем формулу, с которой стоит начать.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <Quiz />
              </Reveal>
            </div>
          </section>

          {/* Quality */}
          <section id="quality" className="scroll-mt-24 bg-sand py-16 sm:py-20">
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

              <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <Reveal>
                  <div className="soft-card h-full p-6 sm:p-8">
                    <h3 className="text-xl font-bold">Четыре уровня защиты банки</h3>
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                      {qualityPoints.map((p) => (
                        <li key={p.title} className="flex gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-soft">
                            <p.icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold">{p.title}</span>
                            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                              {p.text}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <div className="soft-card h-full p-6 sm:p-8">
                    <h3 className="text-xl font-bold">Проверьте подлинность за 10 секунд</h3>
                    <ol className="mt-6 space-y-5">
                      {authSteps.map((s, i) => (
                        <li key={s.title} className="flex gap-4">
                          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun-soft font-display text-base font-bold">
                            {i + 1}
                            {i < authSteps.length - 1 && (
                              <span
                                aria-hidden
                                className="absolute left-1/2 top-full h-5 w-px -translate-x-1/2 bg-border"
                              />
                            )}
                          </span>
                          <span>
                            <span className="flex items-center gap-2 text-sm font-bold">
                              <s.icon className="h-4 w-4" />
                              {s.title}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                              {s.text}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-6 flex items-start gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                      Все продукты FonteVita зарегистрированы и промаркированы в государственной
                      системе «Честный знак».
                    </p>
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

          {/* Reviews */}
          <section id="reviews" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold sm:text-4xl">Отзывы покупателей</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Более 12 000 семей уже принимают FonteVita. Вот что они рассказывают.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10">
                <Reveal delay={100}>
                  <Reviews />
                </Reveal>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="scroll-mt-24 bg-sand py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <div className="soft-card grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
                <Reveal>
                  <div className="relative flex items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute h-40 w-40 rounded-full bg-sun-soft blur-2xl"
                    />
                    <img
                      src={logo.url}
                      alt="Логотип FonteVita"
                      className="relative w-full max-w-[180px] animate-float-soft object-contain"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div>
                    <h2 className="text-3xl font-bold sm:text-4xl">О бренде FonteVita</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      Мы делаем добавки, которые не стыдно поставить на общий стол: понятные формулы,
                      честные дозировки и упаковка, нарисованная про настоящую семейную жизнь —
                      рыбалку, утреннюю йогу и сборы в школу.
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      Каждый продукт производится на сертифицированной площадке, проходит
                      лабораторный контроль и получает маркировку «Честный знак». Мы не обещаем
                      чудес — мы даём рабочие дозировки и прозрачный состав.
                    </p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        "Сырьё европейских поставщиков",
                        "Лабораторный протокол на партию",
                        "Никаких скрытых наполнителей",
                        "Поддержка до конца курса",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm leading-relaxed">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold sm:text-4xl">Частые вопросы</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Коротко о составах, сочетаниях и доставке.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10">
                <Reveal delay={100}>
                  <Faq />
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </CartProvider>
  );
}
