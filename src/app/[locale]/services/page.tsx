import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { services, siteConfig } from "@/lib/site";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

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
    title: dict.services.title,
    description: dict.services.subtitle,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${siteConfig.domain}/${l}` },
          { name: dict.services.title, url: `${siteConfig.domain}/${l}/services` },
        ])}
      />

      <section className="bg-gradient-to-b from-brand-50/70 to-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow={dict.services.eyebrow}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        </Container>
      </section>

      <div className="divide-y divide-slate-100">
        {services.map((service, index) => {
          const copy = dict.services.items[service.key];
          const reversed = index % 2 === 1;
          return (
            <section
              key={service.key}
              id={service.slug}
              className="scroll-mt-24 py-16 lg:py-24"
            >
              <JsonLd
                data={serviceJsonLd({
                  name: copy.title,
                  description: copy.description,
                  url: `${siteConfig.domain}/${l}/services#${service.slug}`,
                })}
              />
              <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={reversed ? "lg:order-last" : ""}>
                  <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-900/5">
                    <Image
                      src={service.image}
                      alt={copy.title}
                      width={1000}
                      height={750}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {copy.title}
                  </h2>
                  <p className="mt-3 text-lg font-semibold text-brand-700">
                    {copy.tagline}
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">
                    {copy.description}
                  </p>
                  <div className="mt-7">
                    <Button href={localePath(l, "/contact")} size="lg">
                      {dict.hero.ctaPrimary}
                    </Button>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <ContactCta locale={l} dict={dict} />
    </>
  );
}
