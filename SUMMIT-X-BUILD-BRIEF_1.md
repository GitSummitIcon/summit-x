# Summit X — Build Brief for Claude Code

## Project overview

Summit X is a luxury alpine/expedition sub-brand of Icon Private Collection. This site is a standalone Astro + Sanity build, starting from the purchased "Ombra" theme (Lexington Themes), deployed on a subdomain of iconprivatecollection.com.

**Brand tagline:** "Alpine elegance and adventure. Untamed. Impeccable."

**Design direction:** Ombra's dark, cinematic, editorial aesthetic as the visual foundation, with the content architecture and listing/detail page patterns inspired by Fantastic Frank (fantasticfrank.com) — a design-led real estate site with strong editorial curation, clean property listings, and a Journal/Press content culture.

**Font direction:** Replace Ombra's default typefaces. Target pairing: a high-contrast serif for display/headings (e.g. Cormorant Garamond, Playfair Display, or similar) + a clean grotesque for body/UI (e.g. Suisse Int'l, Inter, GT America). Final selection TBC during Phase 5 — flag this as an open decision, don't hardcode a final choice without confirming.

---

## Phase 1 — Foundation setup

1. Confirm the Ombra codebase runs locally (`npm install`, `npm run dev`).
2. Install and configure Sanity Studio alongside the existing Astro project.
   - Create `sanity.config.ts` at project root (or `/studio` if keeping Studio in a subfolder — confirm convention used by Ombra's existing Sanity variant if one exists).
   - Connect to a new Sanity project (free tier).
   - Set up `@sanity/client` or `astro-sanity` integration for querying from Astro pages.
3. Set up environment variables (`.env`) for Sanity project ID, dataset, API version.
4. Confirm Astro's content collections vs Sanity boundary: all six collections below live in Sanity (not local MDX), since content editors will manage them without code access.

---

## Phase 2 — Sanity schemas

Six collections total. Destinations is a relational hub referenced by the four product collections and optionally by The Edit.

### 1. Destination
- `name` (string)
- `slug` (slug)
- `region` (string) — e.g. "Antarctica", "British Columbia", "The Alps"
- `heroImage` (image)
- `gallery` (array of images)
- `intro` (text/portable text) — short intro copy
- `description` (portable text) — longer body copy

### 2. Chalet
- `name` (string)
- `slug` (slug)
- `destination` (reference → Destination)
- `bedrooms` (number)
- `sleeps` (number)
- `priceRange` (object: `min` number, `max` number, currency string) — used when a price range is set
- `priceOnRequest` (boolean) — when true, display "Price on request" instead of the range; UI logic should check this flag first
- `amenities` (array of strings — flexible tag list, not a fixed checklist; allows new amenities to be added per-property without a schema change)
- `gallery` (array of images)
- `description` (portable text)
- `enquiryCTA` (handled by a shared enquiry form component, not a per-document field)

### 3. Expedition
- `name` (string)
- `slug` (slug)
- `destination` (reference → Destination) — e.g. Antarctica lodges
- `lodgeType` (string)
- `season` (string)
- `duration` (string)
- `gallery` (array of images)
- `description` (portable text)

### 4. HeliSki
- `name` (string)
- `slug` (slug)
- `destination` (reference → Destination)
- `terrainType` (string)
- `season` (string)
- `groupSize` (string or number range)
- `gallery` (array of images)
- `description` (portable text)

### 5. Lodge
- `name` (string)
- `slug` (slug)
- `destination` (reference → Destination)
- `style` (string)
- `amenities` (array of strings — flexible tag list)
- `gallery` (array of images)
- `description` (portable text)

### 6. The Edit (journal/editorial)
- `title` (string)
- `slug` (slug)
- `category` (string — e.g. "Interview", "Guide", "Feature", "News")
- `author` (string or reference to an Author document if multi-author is wanted later)
- `body` (portable text)
- `images` (array of images)
- `relatedDestination` (reference → Destination, **optional**) — when set, the article surfaces on that Destination's page

**URL/slug convention:** The Edit articles live at `/the-edit/[slug]`. The collection index page is `/the-edit`. Confirm this routing convention before scaffolding — it affects nav labels vs URL paths (display name "The Edit", but URL segment should stay lowercase/hyphenated).

---

## Phase 3 — Page templates

For each of the four product collections (Chalet, Expedition, HeliSki, Lodge):

- **Index/listing page** — grid layout, Frank-style cards (image-led, minimal spec line beneath: e.g. bedrooms · sleeps · destination), styled in Ombra's dark palette and typography.
- **Detail page** (`[slug].astro`, dynamic route via `getStaticPaths` querying Sanity) — full-bleed gallery, spec block, description, enquiry form, related items (e.g. other chalets in the same destination).

For Destination:
- **Index/listing page** — `/destinations` grid of all destinations.
- **Detail page** (`/destinations/[slug]`) — hero, intro copy, then aggregated sections pulling in: chalets at this destination, expeditions at this destination, heli-ski at this destination, lodges at this destination, and any tagged Edit articles. This is the cross-cutting hub page — build the query to fetch all five reference types filtered by destination ID.

For The Edit:
- **Index/listing page** — `/the-edit`, editorial grid, optionally filterable by category.
- **Detail page** (`/the-edit/[slug]`) — long-form article layout, image-rich, related articles or related destination link if tagged.

---

## Phase 4 — Homepage assembly

Curated sections in Ombra's hero/section visual language, e.g.:
- Hero (cinematic, dark, brand tagline)
- Featured chalet / this week's pick
- Destinations overview (visual grid linking into the hub pages)
- Latest from The Edit (3–4 article cards)
- Heli-ski / expeditions teaser section

Exact section order and count TBC — start with a reasonable v1 and iterate.

---

## Phase 5 — Visual refinement

- Font pairing finalisation and implementation (Tailwind config + Astro layout head).
- Any interaction/motion details inspired by Otello (hover states, transitions) layered onto existing Ombra components — don't rebuild Ombra's motion system, extend it.

---

## Phase 5b — SEO and structured data updates (Ombra-specific cleanup)

Ombra ships configured for its original restaurant/hospitality use case. Two things need auditing and changing before launch:

### JSON-LD structured data
- Locate Ombra's existing JSON-LD implementation (likely in the base `Layout.astro` or a dedicated `SEO`/`StructuredData` component — search for `Restaurant`, `@type`, or `schema.org` in the codebase).
- Replace the `Restaurant` schema type with the correct type(s) for Summit X. Likely candidates:
  - `TravelAgency` or `Organization` at the site-wide level.
  - `LodgingBusiness` (or a more specific subtype if one fits better) on Chalet/Lodge detail pages — this is the closest Schema.org type to a bookable property listing.
  - `TouristTrip` or `Event`-adjacent types may suit Expedition/HeliSki detail pages — worth checking what fits best, since Schema.org doesn't have a clean native type for "heli-ski trip." `Product` with custom properties is a reasonable fallback if nothing fits precisely.
  - `Article` for The Edit entries (standard for editorial/blog content), with `mainEntityOfPage`, `author`, `datePublished` etc.
- Remove any restaurant-specific fields that won't apply (e.g. `servesCuisine`, `menu`, `acceptsReservations` in the literal OpenTable sense) and replace with relevant fields per type (e.g. `LodgingBusiness` supports `amenityFeature`, `numberOfRooms`-style equivalents — map these to the Sanity schema fields from Phase 2).
- Test output with Google's Rich Results Test tool once implemented per page type.

### Sitemap generation
- Ombra likely uses `@astrojs/sitemap` or a custom sitemap integration scoped to its original page/collection structure (static pages + restaurant-specific collections like menu items).
- Update the sitemap config (`astro.config.mjs` or wherever the integration is registered) to:
  - Remove any restaurant-specific collection routes no longer in use.
  - Ensure all six Sanity-backed collections generate sitemap entries correctly: `/destinations/[slug]`, `/chalets/[slug]`, `/expeditions/[slug]`, `/heli-ski/[slug]`, `/lodges/[slug]`, `/the-edit/[slug]`, plus their index pages.
  - Since collection data lives in Sanity rather than local content files, confirm the sitemap integration can read dynamic routes generated via `getStaticPaths` querying Sanity — some sitemap integrations only pick up local file-based routes by default and need an explicit custom URL list or a build-time fetch step to include CMS-driven dynamic pages.
- Re-generate and spot-check `sitemap-index.xml` / `sitemap-0.xml` after the collection build-out in Phase 3 is complete (this step depends on Phase 3 being done first, so sequence it after rather than before).



## Phase 6 — Deployment

- Deploy to Vercel/Netlify/Cloudflare Pages.
- Configure `summitx` subdomain CNAME pointing at the deployment (separate from the main iconprivatecollection.com WordPress/Astro migration work — fully decoupled).

---

## Open decisions to confirm during build (don't assume silently)

1. Final font pairing (Phase 5).
2. Whether The Edit needs multi-author support (separate Author document) or a simple string field is sufficient for now.
3. Exact homepage section order/count.

## Decisions already confirmed

- **Pricing:** Chalets use either a price range (`priceRange`: min, max, currency) or "price on request" (`priceOnRequest` boolean flag). Build the listing/detail UI to check `priceOnRequest` first and fall back to the range display.
- **Amenities:** Flexible tag list (array of strings) across Chalet and Lodge schemas — not a fixed checklist. This allows new amenity tags to be added per-property without a schema migration. Consider a simple autocomplete/suggested-tags UX in Sanity Studio (e.g. via a custom input component or a list of common suggestions) to reduce duplicate near-identical tags (e.g. "Hot tub" vs "Hottub" vs "Jacuzzi") — worth a lightweight content governance note for editors rather than a hard schema constraint.
