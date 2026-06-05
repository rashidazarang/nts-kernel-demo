import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { CategoryNav } from "@/components/blog/category-nav";
import { getPosts, getPostsByCategory, presentCategories } from "@/lib/blog";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { blogCategories, type BlogCategory } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogCategories.map((category) => ({ locale, category })),
  );
}

function isCategory(value: string): value is BlogCategory {
  return (blogCategories as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) return {};
  const dict = await getDictionary(locale);
  const label = dict.blog.categories[category];
  return buildMetadata({
    locale,
    title: `${label} · ${dict.blog.title}`,
    description: dict.blog.subtitle,
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  const [posts, allPosts] = await Promise.all([
    getPostsByCategory(l, category),
    getPosts(l),
  ]);
  const categories = presentCategories(allPosts);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <Container className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {dict.blog.categories[category]}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {dict.blog.subtitle}
          </p>
          <div className="mt-8">
            <CategoryNav
              locale={l}
              dict={dict}
              categories={categories}
              active={category}
            />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-lg text-slate-500">{dict.blog.empty}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} locale={l} dict={dict} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
