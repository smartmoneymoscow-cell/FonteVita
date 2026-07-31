import { Star } from "lucide-react";

const reviews = [
  {
    name: "Анна",
    text: "Пью магний уже месяц — сплю как младенец! Раньше просыпалась по 3 раза за ночь, сейчас засыпаю моментально.",
    product: "Магний + B6",
    stars: 5,
  },
  {
    name: "Екатерина",
    text: "Коллаген реально работает. Через 3 недели ногти перестали ломаться, а кожа стала более упругой. Рекомендую!",
    product: "Коллаген",
    stars: 5,
  },
  {
    name: "Дмитрий",
    text: "Омега 3 — must have для всей семьи. Детям даю для иммунитета, сам пью для суставов. Качество отличное.",
    product: "Омега 3",
    stars: 5,
  },
  {
    name: "Ольга",
    text: "Заказала комплекс из трёх банок — удобно, что всё в одном месте. Доставка быстрая, упаковка надёжная.",
    product: "Комплекс",
    stars: 5,
  },
];

export function Reviews() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.name} className="soft-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sun-soft text-sm font-bold">
              {r.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.product}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-0.5">
            {Array.from({ length: r.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-sun text-sun" />
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
