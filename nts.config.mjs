/**
 * notion-to-site config — drives the bilingual blog.
 *
 * Expected Notion database properties (legacy schema mode):
 *   Title (title) · Slug (text, optional) · Status (select: Published/Draft)
 *   Description (text) · Category (multi-select: Business/Technology/Company)
 *   Tags (multi-select) · Language (select: en/es) · Author (text)
 *   SEO Title (text, optional) · Cover (files, optional) · Date (date)
 *
 * Both languages live in one database; posts are split per-locale at render
 * time via `meta.language` (see src/lib/blog.ts). No database yet? Run:
 *   npx notion-to-site template create --parent <your-notion-page-id>
 */
export default {
  database: process.env.NOTION_DATABASE_ID,
  output: "./content",
  adapter: "markdown",
  author: "Acme",
  linkPrefix: "/blog",
  images: {
    download: true,
    outputDir: "./public/images/blog",
    format: "webp",
    quality: 80,
    placeholder: true,
  },
  schema: { strict: false, mode: "legacy" },
  sync: { concurrency: 5, deletions: true },
  content: { stripBackLinks: true, toc: false },
};
