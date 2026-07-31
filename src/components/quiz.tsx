import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { products, formatPrice } from "@/data/products";

type Answer = "collagen" | "magnesium" | "omega";

const questions: { q: string; options: { label: string; value: Answer }[] }[] = [
  {
    q: "Что беспокоит вас чаще всего?",
    options: [
      { label: "Тусклая кожа, ломкие волосы и ногти", value: "collagen" },
      { label: "Тревога, раздражительность, плохой сон", value: "magnesium" },
      { label: "Нет энергии, частые простуды", value: "omega" },
    ],
  },
  {
    q: "Как проходит ваш обычный день?",
    options: [
      { label: "Много зеркал, встреч и фотографий", value: "collagen" },
      { label: "Стресс, дедлайны, поздние засыпания", value: "magnesium" },
      { label: "Работа за экраном и мало рыбы в рационе", value: "omega" },
    ],
  },
  {
    q: "Какой результат хотите увидеть через 2 месяца?",
    options: [
      { label: "Упругая кожа и крепкие суставы", value: "collagen" },
      { label: "Спокойствие и лёгкое засыпание", value: "magnesium" },
      { label: "Ясная голова и крепкий иммунитет", value: "omega" },
    ],
  },
];

export function Quiz() {
  const { add, setOpen } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const results = useMemo(() => {
    if (answers.length < questions.length) return null;
    const tally = answers.reduce<Record<string, number>>((acc, a) => {
      acc[a] = (acc[a] ?? 0) + 1;
      return acc;
    }, {});
    const picked = Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => products.find((p) => p.id === id))
      .filter((p): p is (typeof products)[number] => Boolean(p));
    return picked.length ? picked : [products[0]];
  }, [answers]);

  const total = results?.reduce((sum, p) => sum + p.price, 0) ?? 0;

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const progress = (Math.min(step, questions.length) / questions.length) * 100;

  return (
    <div className="soft-card overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-sun-soft px-3 py-1.5 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            Мини-подбор за 30 секунд
          </span>

          {!result ? (
            <>
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Вопрос {step + 1} из {questions.length}
              </p>
              <h3 key={step} className="mt-2 animate-rise-in text-2xl font-bold sm:text-3xl">
                {questions[step].q}
              </h3>
              <div className="mt-6 grid gap-3">
                {questions[step].options.map((o, i) => (
                  <button
                    key={o.value + i}
                    onClick={() => {
                      setAnswers((prev) => [...prev, o.value]);
                      setStep((s) => s + 1);
                    }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
                  >
                    {o.label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-rise-in">
              <h3 className="mt-6 text-2xl font-bold sm:text-3xl">
                Ваш продукт — {result.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {result.tagline}. {result.dose}. {result.intake}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    add(result.id);
                    setOpen(true);
                  }}
                  className="rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-95"
                >
                  Добавить в корзину · {formatPrice(result.price)}
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 rounded-full border-2 border-border px-5 py-3 text-sm font-extrabold transition-colors hover:bg-secondary"
                >
                  <RotateCcw className="h-4 w-4" />
                  Пройти заново
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-soft to-sun-soft p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute h-56 w-56 rounded-full bg-card/60 blur-3xl"
          />
          <img
            src={(result ?? products[1]).image}
            alt={`${(result ?? products[1]).name} FonteVita`}
            className="relative h-56 w-auto animate-float-soft object-contain drop-shadow-[0_24px_30px_rgba(60,70,90,0.2)] sm:h-72"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
