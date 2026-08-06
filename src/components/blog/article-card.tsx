import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import { formatDate } from "@/data/blog-posts";
import { getCategoryBySlug } from "@/data/blog-categories";
import { ArticleCover } from "@/components/blog/article-cover";
import { CategoryPill } from "@/components/blog/category-pill";

export function ArticleCard({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.categorySlug);
  if (!category) return null;

  return (
    <article className="soft-card flex h-full flex-col overflow-hidden">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block" tabIndex={-1}>
        <ArticleCover category={category} imageUrl={post.coverImage} />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <CategoryPill category={category} />
        <h3 className="text-lg font-bold leading-snug sm:text-xl">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-bold text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} мин чтения
          </span>
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-extrabold text-foreground transition-colors hover:text-primary"
        >
          Читать статью →
        </Link>
      </div>
    </article>
  );
}
