/**
 * Non-translatable site configuration: contact facts, routes, and the
 * structural metadata (slugs, images, icons) for services and nav.
 * Translatable strings live in src/i18n/{en,es}.json keyed by `key`.
 */

// Demo defaults for the starter. Replace these with your own brand + details.
export const siteConfig = {
  name: "Acme",
  legalName: "Acme Inc.",
  domain: "https://notion-to-site-starter.vercel.app",
  // Short, keyword-rich default description used as a metadata fallback.
  descriptionKey: "site.description",
  phone: "+1 (555) 010-0100",
  phoneHref: "+15550100100",
  email: "hello@example.com",
  hours: "Mon to Fri, 9 am to 6 pm",
  address: {
    street: "123 Market Street",
    region: "San Francisco, CA",
    postalCode: "94105",
    country: "USA",
    locality: "San Francisco",
  },
  locations: ["San Francisco", "New York", "Remote"],
  social: {
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export type ServiceKey = "strategy" | "design" | "engineering" | "support";

export interface ServiceMeta {
  key: ServiceKey;
  slug: string;
  image: string;
}

/** Order matters: this is the homepage + nav order. */
export const services: ServiceMeta[] = [
  { key: "strategy", slug: "strategy", image: "/images/service-recruitment.jpg" },
  { key: "design", slug: "design", image: "/images/service-software.jpg" },
  { key: "engineering", slug: "engineering", image: "/images/service-staffing.jpg" },
  { key: "support", slug: "support", image: "/images/service-sap.jpg" },
];

export interface NavItem {
  key: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

/** Blog post categories (slug is stable across locales; label is translated). */
export const blogCategories = ["business", "technology", "company"] as const;
export type BlogCategory = (typeof blogCategories)[number];
