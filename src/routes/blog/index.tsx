import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/blog/article-card";
import { CategoryPill } from "@/components/blog/category-pill";
import { Breadcrumbs, buildBreadcrumbJsonLd } from "@/components/blog/breadcrumbs";
import { getAllPosts } from "@/data/blog-posts";
import { blogCategories } from "@/data/blog-categories";

const posts = getAllPosts();

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
          description: "Статьи о витаминах и БАДах: коллаген, магний B6, омега-3 и советы по выбору добавок.",
          url: "/blog",
          blogPost: posts.map((p) => ({
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

function BlogIndex() {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <BlogHeader />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-sand via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun-soft blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-4xl px-4 pb-12 pt-8 text-center sm:px-6 sm:pt-12">
            <Breadcrumbs items={[{ label: "Блог" }]} />
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold shadow-soft sm:text-sm">
              <Sparkles className="h-4 w-4 text-coral" />
              Блог FonteVita
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl">
              Витамины и БАДы — простыми словами
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Разбираем, зачем нужны коллаген, магний B6 и омега-3, как их принимать и сочетать, и как
              выбрать добавку, которая действительно работает — без маркетинговых обещаний.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {blogCategories.map((c) => (
                <CategoryPill key={c.slug} category={c} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
