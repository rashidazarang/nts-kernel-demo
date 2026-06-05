# notion-to-site starter

A free, open starter for a fast, **bilingual marketing site + blog** where the
content lives in **Notion**. Write posts in Notion, push, and your site updates.

Built with [Next.js 16](https://nextjs.org) and
[`notion-to-site`](https://github.com/rashidazarang/notion-to-site). MIT licensed.

- **Live demo:** https://notion-to-site-starter.vercel.app
- **Stack:** Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4
- Bilingual (EN/ES), SEO out of the box (metadata, hreflang, JSON-LD, sitemap,
  generated OG image), a Notion-powered blog, and a working contact form.

---

## Deploy your own in 3 steps

### 1. Create the GitHub repo
Click **Use this template** at the top of this repo (or the Deploy button below,
which forks it for you).

### 2. Create the Notion blog database
Create an internal integration at
[notion.so/my-integrations](https://www.notion.so/my-integrations), share a
Notion page with it, then run:

```bash
npx notion-to-site template create --parent <your-notion-page-id>
```

That scaffolds a correctly-shaped blog database, seeds a few sample posts, and
prints the **database id**.

### 3. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frashidazarang%2Fnotion-to-site-starter&env=NOTION_API_KEY,NOTION_DATABASE_ID&envDescription=Notion%20integration%20token%20and%20blog%20database%20id&project-name=my-notion-site&repository-name=my-notion-site)

Add the environment variables (below) and deploy. The Notion sync runs at build
time. A missing `NOTION_API_KEY` only disables the blog, never the build.

---

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000  (redirects to /en)
```

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NOTION_API_KEY` | for the blog | Notion internal-integration token. |
| `NOTION_DATABASE_ID` | for the blog | Your blog database id. |
| `RESEND_API_KEY` | for email | [Resend](https://resend.com) key for the contact form. Optional: without it the form logs submissions. |
| `CONTACT_TO` | optional | Where contact submissions are emailed. |
| `CONTACT_FROM` | optional | A Resend-verified sender, e.g. `Acme <noreply@yourdomain.com>`. |

## Make it yours

Everything brandable is in a handful of places:

- **Colors:** `src/app/globals.css` — change `--color-brand-*` and `--color-ink`.
- **Logo + name:** `src/components/site/logo.tsx` and `siteConfig.name` in `src/lib/site.ts`.
- **Copy (all of it):** `src/i18n/en.json` and `src/i18n/es.json`.
- **Contact details, services, nav:** `src/lib/site.ts`.
- **Social card:** `src/app/[locale]/opengraph-image.tsx`.

The page sections are generic and read from the dictionaries, so most rebrands
are just editing JSON.

## How the blog works

Posts live in one Notion database. On every build, `withNotion()` (in
`next.config.mjs`) syncs them, downloads images, and the pages read typed content
via `notion-to-site`. Posts are split per locale by a `Language` property.
Database shape: Title, Slug, Status, Category, Tags, Language, Author, SEO Title,
Description, Date, Cover. See the
[`notion-to-site` docs](https://github.com/rashidazarang/notion-to-site).

## Project structure

```
src/
  app/[locale]/   home, services, about, contact, blog, generated OG image
  app/api/contact contact form handler (Resend)
  components/     UI primitives, header/footer, page sections, blog
  i18n/           en.json / es.json (all copy)
  lib/            i18n, SEO (metadata + JSON-LD), blog data, site config
  proxy.ts        locale negotiation + redirect
```

## License

MIT. Use it for anything.
