import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, Info, Lightbulb } from "lucide-react";
import type { ContentBlock } from "@/data/blog-posts";

const calloutStyles = {
  tip: { icon: Lightbulb, wrap: "bg-leaf/10 ring-leaf/25", iconWrap: "bg-leaf/20 text-leaf" },
  warn: { icon: AlertTriangle, wrap: "bg-coral-soft ring-coral/25", iconWrap: "bg-coral/20 text-coral" },
  info: { icon: Info, wrap: "bg-sky-soft ring-sky/25", iconWrap: "bg-sky/25 text-foreground/80" },
} as const;

function parseInternalLink(to: string): { path: string; hash?: string } {
  const [path, hash] = to.split("#");
  return { path: path || "/", hash };
}

export function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-28 pt-4 text-2xl font-bold leading-snug sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={i} id={block.id} className="scroll-mt-28 pt-2 text-xl font-bold leading-snug">
                {block.text}
              </h3>
            );

          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-base leading-relaxed text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="space-y-4">
                {block.items.map((item, idx) => (
                  <li key={item} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-soft font-display text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 text-base leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "callout": {
            const style = calloutStyles[block.variant];
            const Icon = style.icon;
            return (
              <div key={i} className={`flex gap-3 rounded-2xl p-5 ring-1 ${style.wrap}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconWrap}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{block.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
                </div>
              </div>
            );
          }

          case "stats":
            return (
              <dl key={i} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {block.items.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-secondary px-3 py-4 text-center">
                    <dt className="font-display text-xl font-bold leading-none">{s.value}</dt>
                    <dd className="mt-1.5 text-xs leading-tight text-muted-foreground">{s.label}</dd>
                  </div>
                ))}
              </dl>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl ring-1 ring-border">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      {block.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 1 ? "bg-secondary/40" : ""}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-4 py-3 align-top leading-relaxed ${
                              ci === 0 ? "font-bold" : "text-muted-foreground"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "link": {
            const { path, hash } = parseInternalLink(block.to);
            return (
              <Link
                key={i}
                to={path}
                hash={hash}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-sun-soft px-5 py-4 text-sm font-bold transition-transform duration-300 hover:scale-[1.01]"
              >
                <span className="leading-relaxed">{block.text}</span>
                <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                  {block.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          }

          case "image":
            return (
              <figure key={i} className="overflow-hidden rounded-2xl">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
