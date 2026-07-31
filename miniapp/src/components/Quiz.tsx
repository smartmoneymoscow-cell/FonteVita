import { useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { products } from "@/data/products";

const questions = [
  {
    q: "Что вас беспокоит больше всего?",
    options: [
      { label: "Стресс и тревожность", scores: { magnesium: 3, collagen: 0, omega: 1 } },
      { label: "Проблемы с кожей и волосами", scores: { magnesium: 0, collagen: 3, omega: 1 } },
      { label: "Усталость и слабый иммунитет", scores: { magnesium: 1, collagen: 0, omega: 3 } },
    ],
  },
  {
    q: "Какой у вас режим сна?",
    options: [
      { label: "Сплю плохо, часто просыпаюсь", scores: { magnesium: 3, collagen: 1, omega: 0 } },
      { label: "Сплю нормально", scores: { magnesium: 1, collagen: 1, omega: 1 } },
      { label: "Сплю хорошо, но не хватает энергии", scores: { magnesium: 0, collagen: 0, omega: 3 } },
    ],
  },
  {
    q: "Ваш возраст?",
    options: [
      { label: "До 30", scores: { magnesium: 1, collagen: 2, omega: 1 } },
      { label: "30–45", scores: { magnesium: 2, collagen: 2, omega: 2 } },
      { label: "Старше 45", scores: { magnesium: 2, collagen: 3, omega: 2 } },
    ],
  },
];

export function Quiz() {
  const { haptic, hapticSuccess } = useTelegram();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ magnesium: 0, collagen: 0, omega: 0 });
  const [done, setDone] = useState(false);

  const handleAnswer = (optionScores: typeof scores) => {
    haptic("medium");
    const newScores = {
      magnesium: scores.magnesium + optionScores.magnesium,
      collagen: scores.collagen + optionScores.collagen,
      omega: scores.omega + optionScores.omega,
    };
    setScores(newScores);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      hapticSuccess();
      setDone(true);
    }
  };

  const restart = () => {
    haptic("light");
    setStep(0);
    setScores({ magnesium: 0, collagen: 0, omega: 0 });
    setDone(false);
  };

  if (done) {
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const product = products.find((p) => p.id === winner)!;
    return (
      <div className="soft-card mx-auto max-w-lg p-6 text-center sm:p-8">
        <div className="sun-blob mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <span className="text-2xl">✨</span>
        </div>
        <h3 className="mt-4 text-xl font-bold">Рекомендуем: {product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="#products"
            onClick={() => haptic("light")}
            className="rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-soft transition-all hover:brightness-105 active:scale-95"
          >
            Подробнее
          </a>
          <button
            onClick={restart}
            className="rounded-full border-2 border-border px-6 py-3 text-sm font-extrabold transition-colors hover:bg-secondary"
          >
            Пройти ещё раз
          </button>
        </div>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="soft-card mx-auto max-w-lg p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">
          Вопрос {step + 1} из {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="text-lg font-bold">{current.q}</h3>
      <div className="mt-5 space-y-3">
        {current.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleAnswer(opt.scores)}
            className="w-full rounded-2xl border-2 border-border bg-card px-5 py-3.5 text-left text-sm font-bold transition-all duration-200 hover:border-primary hover:bg-sun-soft active:scale-[0.98]"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
