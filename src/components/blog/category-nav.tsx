import Link from "next/link";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";
import type { BlogCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

function chip(active: boolean): string {
  return cn(
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    active
      ? "bg-brand-600 text-white"
      : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:text-brand-700 hover:ring-brand-200",
  );
}

export function CategoryNav({
  locale,
  dict,
  categories,
  active,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: BlogCategory[];
  active?: BlogCategory;
}) {
  if (categories.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link href={localePath(locale, "/blog")} className={chip(!active)}>
        {dict.blog.allCategories}
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={localePath(locale, `/blog/category/${c}`)}
          className={chip(active === c)}
        >
          {dict.blog.categories[c]}
        </Link>
      ))}
    </div>
  );
}
