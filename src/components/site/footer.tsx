import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { navItems, services, siteConfig } from "@/lib/site";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = 2026;
  const companyLinks = navItems.filter((n) =>
    ["about", "blog", "contact"].includes(n.key),
  );

  return (
    <footer className="bg-ink text-slate-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo className="text-white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-slate-400">
              {siteConfig.locations.join(" · ")}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`${localePath(locale, "/services")}#${s.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {dict.services.items[s.key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.companyTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.href)}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {dict.nav[item.key as keyof typeof dict.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-brand-400" />
                {siteConfig.hours}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.region},{" "}
                  {siteConfig.address.country} {siteConfig.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {siteConfig.name} {year}. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
