import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { navItems, siteConfig } from "@/lib/site";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = navItems.map((item) => ({
    href: localePath(locale, item.href),
    label: dict.nav[item.key as keyof typeof dict.nav],
  }));
  const ctaHref = localePath(locale, "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link
          href={localePath(locale, "/")}
          className="flex shrink-0 items-center"
          aria-label={siteConfig.name}
        >
          <Logo className="text-ink" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-slate-700 transition-colors hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-semibold text-ink hover:text-brand-700 xl:flex"
          >
            <Phone className="h-4 w-4 text-brand-600" />
            {siteConfig.phone}
          </a>
          <LanguageSwitcher locale={locale} />
          <Button href={ctaHref} size="sm" className="hidden lg:inline-flex">
            {dict.nav.cta}
          </Button>
          <MobileNav
            links={links}
            ctaLabel={dict.nav.cta}
            ctaHref={ctaHref}
            locale={locale}
            openLabel={dict.common.openMenu}
            closeLabel={dict.common.closeMenu}
          />
        </div>
      </Container>
    </header>
  );
}
