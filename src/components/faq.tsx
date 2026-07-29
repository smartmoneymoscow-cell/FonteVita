import { useState } from "react";
import { Plus } from "lucide-react";

const faq = [
  {
    q: "Чем FonteVita отличается от других БАДов?",
    a: "Мы указываем реальные рабочие дозировки прямо на упаковке, не разбавляем формулы вспомогательными веществами и проверяем каждую партию в лаборатории. Все продукты промаркированы в системе «Честный знак» — подлинность можно проверить телефоном за 10 секунд.",
  },
  {
    q: "Можно ли принимать продукты вместе?",
    a: "Да, формулы совместимы. Омега 3 хорошо сочетается с витамином D3, магний с B6 лучше принимать вечером, а коллаген с витамином C — во время еды. Если вы принимаете лекарства, посоветуйтесь с врачом.",
  },
  {
    q: "Когда будет заметен результат?",
    a: "Первые изменения самочувствия обычно ощущаются на 3–4 неделе регулярного приёма. Полный курс — от 2 месяцев: именно на такой срок рассчитаны наши банки на 120 и 180 капсул.",
  },
  {
    q: "Подходят ли добавки детям и беременным?",
    a: "Продукты рассчитаны на взрослых. Для детей, беременных и кормящих женщин дозировку должен подобрать специалист — напишите нам, и мы подскажем схему.",
  },
  {
    q: "Как проходит доставка и оплата?",
    a: "Отправляем по всей России в течение 1–2 рабочих дней. Доставка бесплатна при заказе от 3000 ₽. Оплата — картой онлайн или при получении.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-base font-bold sm:text-lg">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-soft transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
