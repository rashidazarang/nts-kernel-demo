import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site";
import type { Locale, Dictionary } from "@/lib/i18n";

export function ContactCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const contactPoints = [
    { icon: Phone, label: dict.contact.callUs, value: siteConfig.phone, href: `tel:${siteConfig.phoneHref}` },
    { icon: Mail, label: dict.contact.email, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    {
      icon: MapPin,
      label: dict.contact.location,
      value: `${siteConfig.address.street}, ${siteConfig.address.region}`,
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
              {dict.contact.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {dict.contact.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {dict.contact.subtitle}
            </p>

            <ul className="mt-8 space-y-5">
              {contactPoints.map((point) => {
                const Icon = point.icon;
                const content = (
                  <>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {point.label}
                      </span>
                      <span className="block font-semibold text-ink">
                        {point.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={point.label}>
                    {point.href ? (
                      <a
                        href={point.href}
                        className="flex items-center gap-4 transition-opacity hover:opacity-80"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-900/5 sm:p-8">
            <ContactForm labels={dict.contact.form} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
