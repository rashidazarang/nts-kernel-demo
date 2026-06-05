import {
  getAllPages,
  type ContentPage,
} from "notion-to-site/next";
import type { Locale } from "./i18n";
import { blogCategories, type BlogCategory } from "./site";

/**
 * Legacy-mode frontmatter shape emitted by notion-to-site (schema.mode:
 * "legacy"). Page metadata lives under `meta.*`.
 */
export interface PostMeta {
  title: string;
  seo_title?: string;
  author?: string;
  description?: string;
  category?: string[];
  main_tag?: string;
  tags?: string[];
  language?: string;
  reading_time?: number;
  word_count?: number;
  status?: string;
  cover_image?: string;
}

export interface PostFrontmatter {
  id?: string;
  created?: string;
  last_updated?: string;
  meta: PostMeta;
}

export type Post = ContentPage<PostFrontmatter>;

/**
 * Load every synced page. The content module only exists after `nts sync`
 * (run automatically by withNotion when NOTION_API_KEY + NOTION_DATABASE_ID
 * are set). Until then we degrade gracefully to an empty list so the blog
 * renders an empty state instead of crashing the build.
 */
async function safeGetAll(): Promise<Post[]> {
  try {
    return await getAllPages<PostFrontmatter>();
  } catch {
    return [];
  }
}

function isPublished(post: Post): boolean {
  const status = post.frontmatter?.meta?.status?.toLowerCase();
  return !status || status === "published";
}

/**
 * Match a post to a locale by its `meta.language`. Posts with no language set
 * fall back to the default (English) locale so a single-language database
 * still works out of the box.
 *
 * NOTE: this is deliberately done here rather than via the library's
 * `getPageBySlug`, which is language-blind and would collide when an EN and ES
 * post share a slug. Candidate hardening for notion-to-site: a language-aware
 * lookup (`getPageBySlug(slug, { language })`).
 */
function matchesLocale(post: Post, locale: Locale): boolean {
  const lang = post.frontmatter?.meta?.language?.toLowerCase();
  if (!lang) return locale === "en";
  return lang.startsWith(locale);
}

function byDateDesc(a: Post, b: Post): number {
  return (b.frontmatter?.created || "").localeCompare(a.frontmatter?.created || "");
}

export async function getPosts(locale: Locale): Promise<Post[]> {
  const all = await safeGetAll();
  return all
    .filter(isPublished)
    .filter((p) => matchesLocale(p, locale))
    .sort(byDateDesc);
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const posts = await getPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllPostSlugs(): Promise<{ locale: Locale; slug: string }[]> {
  const all = await safeGetAll();
  const out: { locale: Locale; slug: string }[] = [];
  for (const post of all.filter(isPublished)) {
    const lang = post.frontmatter?.meta?.language?.toLowerCase();
    const locale: Locale = lang?.startsWith("es") ? "es" : "en";
    out.push({ locale, slug: post.slug });
  }
  return out;
}

function postCategories(post: Post): string[] {
  return (post.frontmatter?.meta?.category ?? []).map((c) => c.toLowerCase());
}

export async function getPostsByCategory(
  locale: Locale,
  category: BlogCategory,
): Promise<Post[]> {
  const posts = await getPosts(locale);
  return posts.filter((p) => postCategories(p).includes(category));
}

/** Categories (from our canonical list) that actually have posts, in order. */
export function presentCategories(posts: Post[]): BlogCategory[] {
  const present = new Set(posts.flatMap(postCategories));
  return blogCategories.filter((c) => present.has(c));
}
