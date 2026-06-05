import { withNotion } from "notion-to-site/next/plugin";

/**
 * withNotion syncs the Notion database (per nts.config.mjs) before each build /
 * dev start. With no NOTION_API_KEY it logs a warning and proceeds with the
 * cached/empty content, so the build never blocks on Notion.
 *
 * NOTE: this must be an ESM config (next.config.mjs), not next.config.ts —
 * notion-to-site is ESM-only (its exports map has no `require` condition), and
 * Next's TypeScript-config loader resolves it through a CJS path that fails.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Pin the project root to this app dir so Next doesn't infer it from a stray
  // parent lockfile.
  turbopack: { root: import.meta.dirname },
  // Ensure the OG route can read the isotype at runtime on Vercel.
  outputFileTracingIncludes: {
    "/[locale]/opengraph-image": ["./src/app/icon.png"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.notion.so" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
};

export default withNotion(nextConfig);
