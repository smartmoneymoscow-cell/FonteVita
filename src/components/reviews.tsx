import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getStoredReviews, type ReviewSubmission } from "@/lib/order-service";
import { products } from "@/data/products";
import { ReviewForm } from "@/components/review-form";

const base = import.meta.env.BASE_URL;

const defaultReviews = [
  {
    name: "Анна, 34",
    city: "Москва",
    product: "Коллаген",
    text: "Пью второй месяц вместе с витамином C. Кожа стала заметно ровнее, а ногти перестали слоиться. Отдельное спасибо за честную дозировку на банке.",
    avatar: `${base}anna-avatar.png`,
    rating: 5,
  },
  {
    name: "Дмитрий, 41",
    city: "Казань",
    product: "Омега 3",
    text: "Брал для всей семьи. Капсулы без рыбного послевкусия, дети пьют спокойно. Проверил маркировку в «Честном знаке» — всё сходится.",
    avatar: `${base}dmitry-avatar.png`,
    rating: 5,
  },
  {
    name: "Ольга, 29",
    city: "Санкт-Петербург",
    product: "Магний + B6",
    text: "Наконец-то засыпаю без пролистывания ленты до двух ночи. Стало меньше судорог в икрах после тренировок.",
    avatar: `${base}olga-avatar.png`,
    rating: 5,
  },
  {
    name: "Мария, 47",
    city: "Екатеринбург",
    product: "Коллаген",
    text: "Заказывала маме и себе. Упаковка приехала в плёнке, банка непрозрачная, мембрана целая — доверие с первой секунды.",
    avatar: `${base}maria-avatar.png`,
    rating: 5,
  },
];

type DisplayReview = {
  name: string;
  city: string;
  product: string;
  text: string;
  avatar?: string;
  rating: number;
};

function getProductName(productId: string): string {
  return products.find((p) => p.id === productId)?.name ?? productId;
}

export function Reviews() {
  const [userReviews, setUserReviews] = useState<DisplayReview[]>([]);

  useEffect(() => {
    const stored = getStoredReviews();
    setUserReviews(
      stored.map((r) => ({
        name: r.name,
        city: r.city,
        product: getProductName(r.productId),
        text: r.text,
        rating: r.rating,
      }))
    );
  }, []);

  const handleNewReview = () => {
    const stored = getStoredReviews();
    setUserReviews(
      stored.map((r) => ({
        name: r.name,
        city: r.city,
        product: getProductName(r.productId),
        text: r.text,
        rating: r.rating,
      }))
    );
  };

  const allReviews = [...defaultReviews, ...userReviews];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {allReviews.map((r) => (
          <figure
            key={r.name + r.product}
            className="soft-card flex h-full flex-col gap-4 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {r.avatar ? (
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sun-soft font-display text-base font-bold">
                    {r.name.charAt(0)}
                  </div>
                )}
                <div>
                  <figcaption className="text-sm font-bold">{r.name}</figcaption>
                  {r.city && (
                    <p className="text-xs text-muted-foreground">{r.city}</p>
                  )}
                </div>
              </div>
              <div
                className="flex gap-0.5"
                aria-label={`Оценка ${r.rating} из 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < r.rating
                        ? "fill-sun text-sun"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
            </div>
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              «{r.text}»
            </blockquote>
            <span className="mt-auto w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold">
              {r.product}
            </span>
          </figure>
        ))}
      </div>

      <div className="mx-auto max-w-xl">
        <ReviewForm onSubmitted={handleNewReview} />
      </div>
    </div>
  );
}
