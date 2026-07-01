# Summit X — Build Progress

## Status: Phases 1–5 complete — ready for Phase 6 (deploy to Vercel)

---

## What's been done

### Phase 1 ✅ Phase 2 ✅ Phase 3 ✅

### Phase 4 — Homepage ✅
- `src/config/site.ts` rewritten for Summit X (name, tagline, nav, email, social)
- `src/components/Footer.astro` rewritten — Summit X branding, collections nav
- `src/pages/index.astro` — full homepage: Hero, Featured Chalet, Destinations, Expeditions & Heli-Ski, The Edit, Enquiry form
- JSON-LD: `TravelAgency` + `parentOrganization: Icon Private Collection`

### Phase 5 — Visual refinement ✅
- **Font pairing:** Cormorant Garamond (display) + Josefin Sans (body/UI)
- `@fontsource/josefin-sans` installed; `@sanity/astro` removed from package.json (was causing install conflict with Astro 7)
- Phase 5 interactions: card title ember on hover, nav underline slide-in, detail hero slow Ken Burns zoom

### siteSettings schema ✅
- `studio/schemas/siteSettings.ts` — heroImage, featuredChalet (ref), featuredDestination (ref)
- Studio redeployed — hero image uploaded and showing on homepage

### Phase 5b — SEO ✅
- **Structured data (JSON-LD)** on every page type:
  - Homepage → `TravelAgency`
  - Chalets + Lodges → `LodgingBusiness` (bedrooms, amenities, location)
  - Expeditions + Heli-ski → `TouristTrip` (destination, duration, provider)
  - The Edit → `Article` (author, publisher, OG type: article)
  - Destinations → `TouristDestination`
- **Rich meta descriptions** — pull destination, bedrooms, season from real Sanity data
- **OG images** — each detail page passes its hero photo as the social share image
- **`public/llms.txt`** — AI crawler file (ChatGPT, Perplexity, etc.)
- **Sitemap** — `@astrojs/sitemap` auto-generates at build time from all pages

### Gallery + Hero ✅
- **Hero depth increased** — `82svh / min 560px` (was 70svh / 480px)
- **Lightbox gallery** — `src/components/LightboxGallery.astro`
  - "N photos" frosted-glass button on hero (bottom-right) — only appears if 2+ images
  - Gallery grid thumbnails are clickable buttons with zoom-on-hover
  - Full-screen lightbox: prev/next arrows, keyboard ← → ESC, image counter, click-outside to close
  - Used on all 5 detail page types (chalet, lodge, expedition, heli-ski, the-edit)

### Lodge schema fix ✅
- Added `bedrooms`, `sleeps`, `priceOnRequest`, `priceRange` fields to `studio/schemas/lodge.ts`
- Lodge detail page updated to query and display those fields

---

## Pending actions (user must run)

### 1. Redeploy Studio (picks up lodge schema fix)
```bash
cd ~/Downloads/ombra-main/studio
npx sanity deploy
```

### 2. Phase 6 — Deploy to Vercel
- Sign up / log in at vercel.com
- Import the `ombra-main` folder as a new project
- Set environment variables (from `.env`):
  - `PUBLIC_SANITY_PROJECT_ID` = w7t6epfm
  - `PUBLIC_SANITY_DATASET` = production
  - `PUBLIC_SANITY_API_VERSION` = 2024-01-01
- Add CNAME for `summitx.iconprivatecollection.com` pointing to Vercel

### 3. Sanity webhook (auto-rebuild on publish)
- After Vercel deploy, create a Vercel Deploy Hook URL
- In Sanity Studio → API → Webhooks: add the Vercel URL, trigger on `create/update/delete`
- This keeps sitemap and content current every time you publish in Studio

---

## Key files

| File | Purpose |
|---|---|
| `SUMMIT-X-BUILD-BRIEF_1.md` | Full project brief |
| `studio/` | Sanity Studio — redeploy after schema changes |
| `studio/schemas/siteSettings.ts` | Homepage hero image + featured picks |
| `studio/schemas/lodge.ts` | Updated with bedrooms, sleeps, pricing fields |
| `src/lib/sanity.ts` | Sanity client |
| `src/config/site.ts` | Summit X site config |
| `src/components/LightboxGallery.astro` | Lightbox used on all detail pages |
| `src/components/NavSummitX.astro` | Summit X navigation |
| `src/pages/index.astro` | Homepage |
| `src/pages/destinations/[slug].astro` | Destination hub page |
| `src/pages/chalets/[slug].astro` | Chalet detail — LodgingBusiness JSON-LD |
| `src/pages/lodges/[slug].astro` | Lodge detail — LodgingBusiness JSON-LD |
| `src/pages/expeditions/[slug].astro` | Expedition detail — TouristTrip JSON-LD |
| `src/pages/heli-ski/[slug].astro` | Heli-ski detail — TouristTrip JSON-LD |
| `src/pages/the-edit/[slug].astro` | Article detail — Article JSON-LD |
| `public/llms.txt` | AI search crawler file |
| `.env` | Credentials (gitignored) — Project ID: w7t6epfm |

---

## Open decisions
- All confirmed. Font: Josefin Sans + Cormorant Garamond ✓
- Hosting: Vercel free tier ✓
