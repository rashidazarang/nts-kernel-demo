"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Compact EN | ES toggle that preserves the current path when switching. */
export function LanguageSwitcher({
  locale,
  tone = "dark",
}: {
  locale: Locale;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname();

  function pathForLocale(target: Locale): string {
    const segments = pathname.split("/");
    segments[1] = target; // segments[0] is the leading "" before the locale
    return segments.join("/") || `/${target}`;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-xs font-semibold",
        tone === "light" ? "bg-white/10" : "bg-slate-100",
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathForLocale(l)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-600 text-white shadow-sm"
                : tone === "light"
                  ? "text-white/80 hover:text-white"
                  : "text-slate-500 hover:text-ink",
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
