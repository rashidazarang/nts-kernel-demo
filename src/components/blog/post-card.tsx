import Link from "next/link";
import { NotionImage } from "notion-to-site/next";
import { Clock } from "lucide-react";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";
import type { Post } from "@/lib/blog";

function formatDate(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function PostCard({
  post,
  locale,
  dict,
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
}) {
  const meta = post.frontmatter.meta;
  const href = localePath(locale, `/blog/${post.slug}`);
  const date = formatDate(post.frontmatter.created, locale);
  const cat = meta.category?.[0]?.toLowerCase();
  const catLabel =
    cat && cat in dict.blog.categories
      ? dict.blog.categories[cat as keyof typeof dict.blog.categories]
      : meta.main_tag;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {meta.cover_image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <NotionImage
            src={meta.cover_image}
            alt={meta.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          {catLabel && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
              {catLabel}
            </span>
          )}
          {date && <span className="text-slate-500">{date}</span>}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
          {meta.title}
        </h3>
        {meta.description && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
            {meta.description}
          </p>
        )}
        {meta.reading_time ? (
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {meta.reading_time} {dict.blog.minRead}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
