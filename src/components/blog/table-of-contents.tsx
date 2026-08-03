import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { ContentBlock } from "@/data/blog-posts";

export function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2");
  const [active, setActive] = useState<string | undefined>(headings[0]?.id);

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Оглавление статьи" className="soft-card p-5">
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
        <List className="h-3.5 w-3.5" />
        Содержание
      </p>
      <ul className="mt-3 space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block rounded-lg px-2.5 py-1.5 text-sm leading-snug transition-colors ${
                active === h.id
                  ? "bg-sun-soft font-bold text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
