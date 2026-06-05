import type { MetadataRoute } from "next";
import { siteConfig, blogCategories } from "@/lib/site";
import { locales } from "@/lib/i18n";
import { getAllPostSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.domain;
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/about",
    "/contact",
    "/blog",
    ...blogCategories.map((c) => `/blog/category/${c}`),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const languages: Record<string, string> = {};
    for (const lc of locales) languages[lc] = `${base}/${lc}${path}`;
    for (const lc of locales) {
      entries.push({
        url: `${base}/${lc}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
        alternates: { languages },
      });
    }
  }

  const slugs = await getAllPostSlugs();
  for (const { locale, slug } of slugs) {
    entries.push({
      url: `${base}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
