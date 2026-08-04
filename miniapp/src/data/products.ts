export type Product = {
  id: string;
  name: string;
  tagline: string;
  dose: string;
  capsules: string;
  price: number;
  oldPrice?: number;
  image: string;
  accent: "sun" | "sky" | "coral";
  highlights: { value: string; label: string }[];
  benefits: string[];
  intake: string;
  composition: string;
};

const LOVABLE = "https://fontevita-vitality-hub.lovable.app";

export const products: Product[] = [
  {
    id: "collagen",
    name: "Коллаген",
    tagline: "Упругость кожи, крепкие волосы и ногти",
    dose: "2000 мг коллагена + 160 мг витамина C",
    capsules: "120 капсул",
    price: 1490,
    oldPrice: 1890,
    image: `${LOVABLE}/__l5e/assets-v1/cdcddfb7-2c0a-4e84-8f05-9b44e84e6318/collagen-bottle.png`,
    accent: "coral",
    highlights: [
      { value: "2000 мг", label: "коллаген гидролизованный" },
      { value: "160 мг", label: "витамин C" },
      { value: "60 дней", label: "курс приёма" },
    ],
    benefits: [
      "2000 мг гидролизованного коллагена — поддерживает эластичность и упругость кожи",
      "160 мг витамина C — необходим для усвоения всех компонентов",
      "Улучшает силу и координацию, поддерживает суставы",
      "Улучшает концентрацию и внимание",
    ],
    intake: "По 2 капсулы 2 раза в день во время еды.",
    composition: "Коллаген гидролизованный, аскорбиновая кислота, желатиновая капсула.",
  },
  {
    id: "magnesium",
    name: "Магний + B6",
    tagline: "Для защиты от стресса и здорового сна",
    dose: "2010 мг хелата магния + 6 мг витамина B6",
    capsules: "120 капсул",
    price: 1190,
    oldPrice: 1490,
    image: `${LOVABLE}/__l5e/assets-v1/8708d59b-eff1-4935-b125-2faafd214ea2/magnesium-bottle.png`,
    accent: "sky",
    highlights: [
      { value: "2010 мг", label: "хелат магния" },
      { value: "6 мг", label: "витамин B6" },
      { value: "40 дней", label: "курс приёма" },
    ],
    benefits: [
      "Уменьшает мигрени и снижает давление",
      "Предотвращает спазмы мышц",
      "Улучшает эмоциональное состояние",
      "Снижает утомляемость и способствует нормализации сна",
    ],
    intake: "По 1 капсуле 3 раза в день во время еды.",
    composition: "Магния хелат (бисглицинат), пиридоксина гидрохлорид (B6), желатиновая капсула.",
  },
  {
    id: "omega",
    name: "Омега 3",
    tagline: "Липидный комплекс из 3 источников",
    dose: "3000 мг в сутки",
    capsules: "180 капсул",
    price: 1690,
    oldPrice: 2090,
    image: `${LOVABLE}/__l5e/assets-v1/7a62c490-31a6-4603-8620-fc18b1c8b48d/omega-bottle.png`,
    accent: "sky",
    highlights: [
      { value: "3000 мг", label: "в сутки" },
      { value: "17,94", label: "тотох-индекс при норме 26" },
      { value: "60 дней", label: "курс приёма" },
    ],
    benefits: [
      "Высокая концентрация полиненасыщенных жирных кислот",
      "Оптимальная биодоступность — хорошо и быстро усваивается",
      "Уровень свежести тотох-индекс 17,94 единиц при норме до 26",
      "Комплекс полезных и незаменимых жирных кислот из 3 источников",
    ],
    intake: "По 1 капсуле 3 раза в день во время еды.",
    composition: "Рыбий жир, льняное масло, масло водорослей, витамин E, желатиновая капсула.",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";
