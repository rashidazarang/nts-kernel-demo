import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newspaper } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { CategoryNav } from "@/components/blog/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts, presentCategories } from "@/lib/blog";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.blog.title,
    description: dict.blog.subtitle,
    path: "/blog",
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const posts = await getPosts(l);
  const categories = presentCategories(posts);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${siteConfig.domain}/${l}` },
          { name: dict.blog.title, url: `${siteConfig.domain}/${l}/blog` },
        ])}
      />

      <section className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <Container className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {dict.blog.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {dict.blog.subtitle}
          </p>
          {categories.length > 0 && (
            <div className="mt-8">
              <CategoryNav locale={l} dict={dict} categories={categories} />
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-12 text-center">
              <Newspaper className="h-10 w-10 text-slate-400" />
              <p className="mt-4 text-lg font-medium text-slate-600">
                {dict.blog.empty}
              </p>
            </div>
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
