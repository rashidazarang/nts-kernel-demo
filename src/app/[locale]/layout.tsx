import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  getDictionary,
  isLocale,
  locales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}`;
  languages["x-default"] = `/${defaultLocale}`;

  return {
    metadataBase: new URL(siteConfig.domain),
    title: { default: dict.site.title, template: dict.site.titleTemplate },
    description: dict.site.description,
    applicationName: siteConfig.name,
    // Favicon + apple-touch icon are auto-generated from app/icon.png and
    // app/apple-icon.png (Next file conventions).
    alternates: { canonical: `/${locale}`, languages },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_MX" : "en_US",
      url: `/${locale}`,
      // og:image comes from app/opengraph-image.tsx (generated, on-brand).
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={mulish.variable}>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        <JsonLd data={organizationJsonLd(dict)} />
        <JsonLd data={websiteJsonLd(dict)} />
        <Header locale={locale as Locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
