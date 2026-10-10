# Sparkle Pros — website

Marketing website for **Sparkle Pros**, steam cleaning and deep cleaning specialists in Coimbatore
(_"Steam cleans better"_). Built with Next.js (App Router), TypeScript and Tailwind CSS, with a working
quote form that emails enquiries to the team.

- 8 service pages, each with its own photography, process, FAQs and quote form
- Quote form → `/api/quote` → Nodemailer (SMTP), with validation, rate limiting and spam protection
- Technical SEO: per-page metadata, canonical URLs, Open Graph, sitemap, robots, JSON-LD
- Accessible, responsive, reduced-motion aware; no 3D or WebGL

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Turbopack) |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS 4 — brand tokens in `src/app/globals.css` |
| Animation | CSS + [Motion](https://motion.dev) (`motion/react`, lazy-loaded DOM features) |
| Icons | lucide-react (+ inline WhatsApp/Instagram glyphs) |
| Forms | React Hook Form + Zod (one schema shared by browser and server) |
| Email | Nodemailer over SMTP, in a Next.js Route Handler |
| Tests | Vitest |
| Hosting | Vercel |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in your SMTP details
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm test` | Unit tests for validation, rate limiting, email and the API route |
| `npm run check` | All of the above, then a production build |
| `npm run images -- "<folder>"` | Rebuilds `src/assets/images` from the original photo exports |
| `npm run icons` / `npm run og` | Re-renders the app icons / the social share image |

## Project structure

```
src/
  app/                    Routes, metadata, sitemap, robots, manifest, icons
    api/quote/route.ts    Quote form endpoint
    services/[slug]/      Service page template (statically generated)
  components/
    home/                 Homepage sections
    layout/               Header, footer, mobile contact bar
    quote/                Quote form + quote section
    services/             Service card and icons
    ui/                   Buttons, headings, sparkle, accordion, reveal observer…
  content/                ← All business content lives here
    site.ts               Name, phone, email, address, hours, areas, commitments
    services.ts           The 8 services: copy, inclusions, equipment, FAQs, photos
    home.ts               Homepage process, booking steps and FAQs
  lib/                    Validation schema, email builder, mailer, rate limiter, SEO helpers
  assets/                 Optimised photographs and logos (imported, so Next.js optimises them)
public/                   Manifest icons and the social share image
scripts/                  Image, icon and share-image generators
```

## Editing content

Everything a non-developer is likely to change is in `src/content/`:

- **Phone, email, address, hours, service areas, Instagram** → `src/content/site.ts`
- **Service copy, inclusions, equipment, FAQs, photos** → `src/content/services.ts`
- **Homepage FAQs and steps** → `src/content/home.ts`

Pages, structured data, the footer and the form's service list all read from these files, so a change
there updates the whole site.

### Photographs

The originals are large PNG exports and are not committed. To regenerate the web versions (or after
replacing a photo with one of the same name):

```bash
npm run images -- "C:\path\to\sparkle pros Image\Image"
```

This writes high-quality JPEGs (and a few purposeful crops) to `src/assets/images/`. Next.js then serves
them as responsive AVIF/WebP. To add a new photo, add it to the script, run it, import it where needed and
write descriptive `alt` text.

## Quote form and email

```
 Browser form ──► POST /api/quote ──► validate ──► Nodemailer ──► your SMTP server ──► team inbox
 (RHF + Zod)     same-origin check    Zod schema    HTML + text
                 rate limit (5/10 min/IP)          Reply-To = customer
                 honeypot + fill-time check
```

- The API returns success **only after the SMTP server accepts the message**. If SMTP is not configured
  it returns `503` and the form tells the visitor to call or WhatsApp instead — it never fakes success.
- Credentials are read only on the server. Nothing SMTP-related is exposed to the browser.
- User input is length-limited, validated on both sides, HTML-escaped in the email and stripped of line
  breaks in headers. `Reply-To` is set to the customer's address only when they provide a valid one.

### Configure SMTP

Copy `.env.example` to `.env.local` (local) or add the same variables in Vercel (production):

| Variable | Example | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://sparklepros.in` | Canonical URLs, sitemap, Open Graph. No trailing slash. |
| `SMTP_HOST` | `smtp.gmail.com` | |
| `SMTP_PORT` | `465` | `465` (TLS) or `587` (STARTTLS) |
| `SMTP_SECURE` | `true` | `true` for 465, `false` for 587 |
| `SMTP_USER` | `sparkleprosbooking@gmail.com` | |
| `SMTP_PASS` | _app password_ | Never commit this |
| `QUOTE_TO_EMAIL` | `sparkleprosbooking@gmail.com` | Comma-separate multiple recipients |
| `QUOTE_FROM_EMAIL` | `Sparkle Pros Website <sparkleprosbooking@gmail.com>` | Must be an address the SMTP account may send as |

**Gmail / Google Workspace:** turn on 2-Step Verification for the account, create an
[App Password](https://myaccount.google.com/apppasswords), and use it as `SMTP_PASS` with
`smtp.gmail.com`, port `465`, `SMTP_SECURE=true`. Your normal Gmail password will not work.

**Other providers** (Zoho Mail, Hostinger, Brevo, Amazon SES, etc.) work the same way — use the SMTP host,
port and credentials from the provider's settings. A transactional provider with a verified
`sparklepros.in` domain (SPF/DKIM) gives the best deliverability.

**Test it:** run `npm run build && npm start`, submit the form at `/contact`, and confirm the email arrives
(check spam the first time). The server logs `[quote] Email delivery failed: …` with the SMTP error if
something is wrong.

### Rate limiting

Limits are kept in memory per server instance. That stops casual floods; on Vercel each instance keeps its
own counter. For a strict global limit, back `src/lib/rate-limit.ts` with a shared store such as Upstash
Redis.

## SEO

- Unique title, description and canonical URL on every page (`src/lib/seo.ts`)
- Open Graph/Twitter cards — service pages use their own photo; others use `public/og/sparkle-pros.jpg`
  (100 KB, small enough for WhatsApp link previews)
- `sitemap.xml`, `robots.txt` (API routes disallowed) and a web manifest
- JSON-LD: `LocalBusiness` and `WebSite` (home/contact), `Service` + `BreadcrumbList` + `FAQPage` (service
  pages), `BreadcrumbList` elsewhere
- Clean, keyword-led URLs carried over from the previous site, e.g. `/services/sofa-cleaning-coimbatore`

After launch, add the site to [Google Search Console](https://search.google.com/search-console), submit
`https://sparklepros.in/sitemap.xml`, and link the website from the Google Business Profile.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository. `vercel.json` pins the framework to Next.js, so the
   project builds correctly even if it was previously configured for the old Vite site.
3. Under **Settings → Environment Variables**, add every variable from the table above for the
   *Production* environment (and *Preview* if you want the form to work on preview URLs).
4. Deploy, then submit a test quote on the deployment URL and confirm the email arrives.
5. Under **Settings → Domains**, add `sparklepros.in` (and `www.sparklepros.in`, redirecting to the apex)
   and update DNS at your registrar as Vercel instructs.
6. Make sure `NEXT_PUBLIC_SITE_URL` matches the final domain, then redeploy so canonical URLs and the
   sitemap use it.

## Content to confirm before launch

All copy comes from the company's own content document and the previous site. A few items are stated on
the site and should be double-checked by the business:

- Opening hours: **9:00 AM – 7:00 PM, all 7 days**
- Typical durations quoted in FAQs (e.g. 2BHK 4–5 h, 3BHK 5–7 h, villas 6–9 h, sofas 1.5–2.5 h)
- The list of Coimbatore localities on the homepage
- Privacy policy and terms (reviewed for accuracy, but not legal advice)

Deliberately **not** carried over from the previous site because they couldn't be verified: customer
reviews, "1,200+ homes", "4.9★ Google rating", "25+ pincodes", Instagram view counts, prices, and the list
of 12 towns with arrival times. Add real, verifiable reviews or ratings (for example, embedded from the
Google Business Profile) when available.

## Performance notes

- Pages are statically generated; only `/api/quote` runs on the server per request.
- Photos are served by `next/image` as responsive AVIF/WebP; only the hero image is preloaded.
- Fonts: static Fraunces 600 (roman + italic) and Plus Jakarta Sans via `next/font` (~50 KB preloaded).
- The quote form's validation library (Zod) loads on first interaction, and Motion's animation features
  load with the form, so neither is on the initial render path. Header menus and the FAQ use CSS transitions.
- Long pages mark below-the-fold sections with `.defer-render` (`content-visibility: auto`).
  `AnchorScrollGuard` renders them for real before any `#anchor` jump, so in-page links stay accurate.
- Animations are transform/opacity only, sparkles pulse three times then rest, and everything respects
  `prefers-reduced-motion`.

Measure on the deployed site with [PageSpeed Insights](https://pagespeed.web.dev/) — local Lighthouse runs
depend heavily on the machine running them.

## Quality checks

```bash
npm run check
```

runs type checking, linting, unit tests and a production build.
