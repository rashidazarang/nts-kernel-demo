import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Stats } from "@/components/sections/stats";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
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
    title: dict.about.title,
    description: dict.about.intro.slice(0, 155),
    path: "/about",
    images: ["/images/about.jpg"],
  });
}

export default async function AboutPage({
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
          { name: dict.about.title, url: `${siteConfig.domain}/${l}/about` },
        ])}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
              {dict.about.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {dict.about.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {dict.about.intro}
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dict.about.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-900/5">
              <Image
                src="/images/about.jpg"
                alt={dict.about.title}
                width={1000}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Stats dict={dict} />

      <section className="py-20 lg:py-28">
        <Container>
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {dict.about.whyChooseTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.whyChoose.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta locale={l} dict={dict} />
    </>
  );
}
