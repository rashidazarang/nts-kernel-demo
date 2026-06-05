import type { Metadata } from "next";
import { siteConfig } from "./site";
import { locales, defaultLocale, type Locale, type Dictionary } from "./i18n";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_MX",
};

/**
 * Build per-page Metadata with canonical + hreflang alternates, Open Graph,
 * and Twitter cards. `path` is the locale-less route (e.g. "/services").
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = "/",
  images,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  images?: string[];
}): Metadata {
  const clean = path === "/" ? "" : path;
  const canonical = `/${locale}${clean}`;

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${clean}`;
  languages["x-default"] = `/${defaultLocale}${clean}`;

  // When no explicit image is given, omit it so the generated opengraph-image
  // (app/opengraph-image.tsx) is used as the default OG/Twitter card.
  const ogImages = images?.map((url) => ({ url }));

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale],
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/** Organization + local business schema for the site root. */
export function organizationJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/brand/icon-192.png`,
    description: dict.site.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "MX",
    },
    areaServed: ["US", "CA", "MX"],
    sameAs: [siteConfig.social.linkedin],
  };
}

/** WebSite schema (enables sitelinks search box eligibility). */
export function websiteJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: dict.site.description,
    inLanguage: locales,
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
    areaServed: ["US", "CA", "MX"],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": author ? "Person" : "Organization", name: author || siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.domain}/brand/icon-192.png` },
    },
    ...(image ? { image } : {}),
  };
}
