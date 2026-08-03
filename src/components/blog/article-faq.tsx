import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/blog-posts";

export function ArticleFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">Частые вопросы</h2>
      <div className="mt-5 divide-y divide-border overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span className="text-base font-bold">{item.q}</span>
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
                  <p className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
