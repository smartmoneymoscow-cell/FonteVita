import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";

const faqs = [
  {
    q: "Можно ли принимать все три продукта одновременно?",
    a: "Да, коллаген, магний и омега-3 прекрасно сочетаются. Рекомендуем начать с одного продукта и постепенно добавлять остальные.",
  },
  {
    q: "Подходят ли продукты для детей?",
    a: "Омега-3 можно давать детям с 3 лет (по 1 капсуле в день). Магний и коллаген — с 14 лет. Обязательно проконсультируйтесь с педиатром.",
  },
  {
    q: "Как быстро заметен эффект?",
    a: "Первые изменения (сон, энергия) обычно заметны через 1–2 недели. Для кожи и волос — через 3–4 недели регулярного приёма.",
  },
  {
    q: "Есть ли побочные эффекты?",
    a: "Продукты изготовлены из натурального сырья и хорошо переносятся. При индивидуальной непереносимости компонентов проконсультируйтесь с врачом.",
  },
  {
    q: "Как хранить добавки?",
    a: "Хранить в сухом месте при температуре до 25°C. После вскрытия — в течение 6 месяцев. Банка защищает от света и влаги.",
  },
];

export function Faq() {
  const { haptic } = useTelegram();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    haptic("light");
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className="soft-card overflow-hidden p-0">
          <button
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-bold transition-colors hover:bg-secondary/50 sm:text-base"
          >
            {f.q}
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className="grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
