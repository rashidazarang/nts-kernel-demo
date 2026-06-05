import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { NotionContent, NotionImage } from "notion-to-site/next";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getAllPostSlugs } from "@/lib/blog";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(locale, slug);
  if (!post) return {};
  const meta = post.frontmatter.meta;
  return buildMetadata({
    locale,
    title: meta.seo_title || meta.title,
    description: meta.description || "",
    path: `/blog/${slug}`,
    images: meta.cover_image ? [meta.cover_image] : undefined,
  });
}

function formatDate(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const post = await getPost(l, slug);
  if (!post) notFound();

  const meta = post.frontmatter.meta;
  const date = formatDate(post.frontmatter.created, l);
  const url = `${siteConfig.domain}${localePath(l, `/blog/${slug}`)}`;
  const cat = meta.category?.[0]?.toLowerCase();
  const catLabel =
    cat && cat in dict.blog.categories
      ? dict.blog.categories[cat as keyof typeof dict.blog.categories]
      : meta.main_tag;

  return (
    <article className="py-12 lg:py-16">
      <JsonLd
        data={articleJsonLd({
          title: meta.seo_title || meta.title,
          description: meta.description || "",
          url,
          datePublished: post.frontmatter.created,
          dateModified: post.frontmatter.last_updated,
          author: meta.author,
          image: meta.cover_image ? `${siteConfig.domain}${meta.cover_image}` : undefined,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${siteConfig.domain}/${l}` },
          { name: dict.blog.title, url: `${siteConfig.domain}/${l}/blog` },
          { name: meta.title, url },
        ])}
      />

      <Container className="max-w-3xl">
        <Link
          href={localePath(l, "/blog")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.blog.backToList}
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {catLabel && (
              <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">
                {catLabel}
              </span>
            )}
            {date && <time className="text-slate-500">{date}</time>}
            {meta.reading_time ? (
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {meta.reading_time} {dict.blog.minRead}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {meta.title}
          </h1>
          {meta.author && (
            <p className="mt-3 text-sm text-slate-500">
              {dict.blog.by} {meta.author}
            </p>
          )}
        </header>

        {meta.cover_image && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <NotionImage
              src={meta.cover_image}
              alt={meta.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <NotionContent body={post.content} className="prose mt-10 max-w-none" />
      </Container>
    </article>
  );
}
