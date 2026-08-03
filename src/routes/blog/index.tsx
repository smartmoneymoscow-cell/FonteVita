import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Sparkles, Clock, X } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCover } from "@/components/blog/article-cover";
import { CategoryPill } from "@/components/blog/category-pill";
import { Breadcrumbs, buildBreadcrumbJsonLd } from "@/components/blog/breadcrumbs";
import { getAllPosts, formatDate, type BlogPost } from "@/data/blog-posts";
import { blogCategories, getCategoryBySlug } from "@/data/blog-categories";
import { Link } from "@tanstack/react-router";

const allPosts = getAllPosts();

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Блог о витаминах и БАДах — статьи FonteVita" },
      {
        name: "description",
        content:
          "Блог FonteVita о витаминах и БАДах: коллаген, магний B6 и омега-3 — дозировки, совместимость, сроки эффекта и как выбрать качественную добавку.",
      },
      { property: "og:title", content: "Блог о витаминах и БАДах — статьи FonteVita" },
      {
        property: "og:description",
        content: "Практические статьи о коллагене, магнии B6 и омега-3: как принимать, сочетать и выбирать.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Блог FonteVita",
          description: "Статьи о витаминах и БАДах.",
          url: "/blog",
          blogPost: allPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `/blog/${p.slug}`,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildBreadcrumbJsonLd([
            { name: "Главная", url: "/" },
            { name: "Блог", url: "/blog" },
          ]),
        ),
      },
    ],
  }),
});

function FeedCard({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.categorySlug);
  if (!category) return null;

  return (
    <article className="soft-card flex flex-col overflow-hidden sm:flex-row">
      {/* Cover — left on desktop, top on mobile */}
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block shrink-0 sm:w-56 md:w-64"
        tabIndex={-1}
      >
        <ArticleCover category={category} />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:py-5 sm:pr-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryPill category={category} />
          <span className="text-xs font-bold text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readingTime} мин
          </span>
        </div>

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

        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-sm font-extrabold text-foreground transition-colors hover:text-primary"
        >
          Читать →
        </Link>
      </div>
    </article>
  );
}

function BlogIndex() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = allPosts;

    if (activeCategory) {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return result;
  }, [search, activeCategory]);

  const toggleCategory = (slug: string) => {
    setActiveCategory((prev) => (prev === slug ? null : slug));
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory(null);
  };

  const hasFilters = search.trim() || activeCategory;

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <BlogHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sand via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun-soft blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-4xl px-4 pb-8 pt-8 text-center sm:px-6 sm:pt-12">
            <Breadcrumbs items={[{ label: "Блог" }]} />
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold shadow-soft sm:text-sm">
              <Sparkles className="h-4 w-4 text-coral" />
              Блог FonteVita
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl">
              Витамины и БАДы — простыми словами
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Разбираем коллаген, магний B6 и омега-3: как принимать, сочетать и выбирать.
            </p>
          </div>
        </section>

        {/* Search + Chips */}
        <section className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-4 sm:px-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по статьям..."
                className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Очистить поиск"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  !activeCategory
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                Все
              </button>
              {blogCategories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => toggleCategory(c.slug)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                    activeCategory === c.slug
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <c.icon className="h-3.5 w-3.5" />
                  {c.shortName}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          {filtered.length > 0 ? (
            <div className="space-y-5">
              {filtered.map((post) => (
                <FeedCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sun-soft">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-lg font-bold">Ничего не найдено</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Попробуйте изменить запрос или выбрать другую категорию.
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all hover:brightness-105"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          {hasFilters && filtered.length > 0 && (
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Найдено: {filtered.length} {filtered.length === 1 ? "статья" : filtered.length < 5 ? "статьи" : "статей"}
            </p>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
