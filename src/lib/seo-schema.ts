import { products, formatPrice } from "@/data/products";
import logoAsset from "@/assets/logo-mark.png.asset.json";

const SITE_URL = "https://fontevita.ru";

/** Organization schema — site-wide */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FonteVita",
    url: SITE_URL,
    logo: `${SITE_URL}${logoAsset.url}`,
    description:
      "Российский бренд витаминов и биологически активных добавок для всей семьи. Коллаген, магний + B6, омега 3 в честных дозировках.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Russian",
    },
  };
}

/** Product schema — one per product */
export function productSchema() {
  return products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `FonteVita ${p.name}`,
    description: p.tagline,
    image: `${SITE_URL}${p.image}`,
    brand: {
      "@type": "Brand",
      name: "FonteVita",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#products`,
      priceCurrency: "RUB",
      price: p.price,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "FonteVita",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
    },
    category: "БАДы и витамины",
    sku: `FV-${p.id.toUpperCase()}`,
  }));
}

/** WebSite schema with SearchAction */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FonteVita",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** FAQPage schema */
export function faqSchema() {
  const faqItems = [
    {
      q: "Чем FonteVita отличается от других БАДов?",
      a: "Мы указываем реальные рабочие дозировки прямо на упаковке, не разбавляем формулы вспомогательными веществами и проверяем каждую партию в лаборатории. Все продукты промаркированы в системе «Честный знак».",
    },
    {
      q: "Можно ли принимать продукты вместе?",
      a: "Да, формулы совместимы. Омега 3 хорошо сочетается с витамином D3, магний с B6 лучше принимать вечером, а коллаген с витамином C — во время еды.",
    },
    {
      q: "Когда будет заметен результат?",
      a: "Первые изменения самочувствия обычно ощущаются на 3–4 неделе регулярного приёма. Полный курс — от 2 месяцев.",
    },
    {
      q: "Подходят ли добавки детям и беременным?",
      a: "Продукты рассчитаны на взрослых. Для детей, беременных и кормящих женщин дозировку должен подобрать специалист.",
    },
    {
      q: "Как проходит доставка и оплата?",
      a: "Отправляем по всей России в течение 1–2 рабочих дней. Доставка бесплатна при заказе от 3000 ₽. Оплата — картой онлайн или при получении.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Продукты",
        item: `${SITE_URL}/#products`,
      },
    ],
  };
}
