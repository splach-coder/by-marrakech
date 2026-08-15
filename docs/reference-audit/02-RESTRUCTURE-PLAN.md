# Restructure Plan — Xhosen Gate (by-marrakech)

> Goal: adopt justluxurytransfers.com's **architecture + content model**, keep
> by-marrakech's **design** (cream `#f8f6f2`, burgundy `#912b2b`, gold `#D4AF37`,
> Nohemi display font), and base everything on **Marrakech** instead of Agadir.

---

## 1. Gap analysis

| Reference feature | Xhosen Gate today | Action |
|---|---|---|
| Hero **instant quote widget** (From/To/Date/Pax → SEE PRICES) | Passive hero image + one CTA | **Build** quote widget into hero |
| "Choose Your Journey" category cards | — (About section instead) | **Build** JourneySection (Transfers · Fleet · Excursions) |
| **Popular Transfer Routes** w/ fixed prices | — (transfers buried as 2 of 4 "services") | **Build** RoutesSection + `routes.ts` data (Marrakech routes) |
| **Fleet** (section + `/fleet` + 8 detail pages) | **Missing entirely** (client's explicit complaint) | **Build** `fleet.ts` data + FleetSection + `/fleet` page |
| Partner logo marquee | — | Later (needs client's partner logos) |
| Excursions grid + LOAD MORE | ExperiencesSection (4 cards) | Extend to grid + load-more |
| **Why Choose Us** 4 pillars | — | **Build** WhyUsSection |
| **FAQ accordion** (home + every page) | **Missing entirely** | **Build** FAQSection + `faq.ts` |
| CTA band before reviews | CTASection exists ✓ | Reposition |
| **Google Reviews on every page** (5.0★, count, Maps link) | TestimonialsSection (homepage only, generic) | **Build** GoogleReviewsSection, mount site-wide |
| Fixed transparent pricing everywhere | "From €25" strings, "Custom Quote" | Route/vehicle price data with real numbers |
| `/transfers` index + route detail pages | `/services/421` (airport transfer) only | **Build** (phase 2) |
| `/private-driver-agadir` SEO landing | `/services/501` private driver exists | Rework as `/private-driver-marrakech` (phase 2) |
| Guides/blog | — | Phase 3 |
| WhatsApp-first CTAs | ✓ already WhatsApp-based | Keep |

## 2. New homepage section order

| # | Section | Component | Status |
|---|---|---|---|
| 1 | Hero + instant quote widget | `Hero` + **`QuoteWidget`** | rebuild |
| 2 | Choose Your Journey (3 cards) | **`JourneySection`** | new |
| 3 | Popular Transfer Routes (6 priced cards) | **`RoutesSection`** | new |
| 4 | Our Fleet (vehicle showcase) | **`FleetSection`** | new |
| 5 | Curated Experiences (grid + load more) | `ExperiencesSection` | extend |
| 6 | Signature Tours (multi-day — kept, it's a Marrakech differentiator) | `ToursSection` | keep |
| 7 | Why Choose Us (4 pillars) | **`WhyUsSection`** | new |
| 8 | FAQ | **`FAQSection`** | new |
| 9 | CTA band | `CTASection` | reposition |
| 10 | Google Reviews | **`GoogleReviewsSection`** | new, replaces TestimonialsSection |

Removed from homepage (pages remain reachable via nav/footer): AboutSection,
ServicesSection, ActivitiesSection, EventsSection — they diluted the funnel and
caused the "order/visibility" complaint.

## 3. Marrakech content mapping (Agadir → Marrakech)

**Transfer routes** (from Marrakech Menara Airport RAK / Marrakech city):

| Route | ~Distance / time | From-price (per vehicle) |
|---|---|---|
| RAK Airport → Marrakech Medina / City Center | 6 km · 15 min | €15 |
| RAK Airport → Palmeraie & resort hotels | 12 km · 25 min | €20 |
| Marrakech → Essaouira | 190 km · 2h45 | €95 |
| Marrakech → Agadir / Taghazout | 250 km · 3h | €130 |
| Marrakech → Casablanca (CMN) | 240 km · 2h45 | €140 |
| Marrakech → Ouarzazate (Atlas / Aït Ben Haddou) | 200 km · 3h30 | €120 |

**Fleet** (mirrors reference categories; client can rename/swap):
Skoda Superb (SEDAN, 3 pax, from €20) · Mercedes E-Class (VIP, 3 pax, from €80) ·
Skoda Kodiaq (SUV, 4 pax, from €25) · Mercedes Vito (VAN, 7 pax, from €35) ·
Ford Tourneo (VAN, 8 pax, from €35) · Mercedes Sprinter (MINIBUS, 17 pax, from €60) ·
Toyota Land Cruiser (4X4 desert, 6 pax, from €45)

**Excursions from Marrakech** — already in `siteData.excursions` ✓ (Ourika, Ouzoud,
Essaouira, Agafay/Zagora, Casablanca, Fes, Ouarzazate…) — resurfaced in grid.

**FAQ** — same 7 objections, Marrakech-flavoured (RAK airport, riad pickups in the
medina — walking-access note, child seats, cash/EUR/MAD, flight tracking).

**Google reviews** — component ships with the client's real reviews to be pasted in
`src/data/reviews.ts`; rating/count/Maps-link configurable.

## 4. Build phases

- **Phase 1 ✅ (done): homepage restructure** — `transferData.ts` (fleet, routes, FAQ,
  reviews), 7 new components, homepage rewired, `/fleet` index page,
  GoogleReviews mounted globally via layout, i18n keys EN+FR.
- **Phase 1.5 ✅ (done): design-fidelity pass + guides**
  - Footer rebuilt to reference architecture: brand col → Navigation → Transfer
    Routes → Contact (icon rows + 24/7), full-width "Excursions from Marrakech"
    link grid, payment strip, legal bar.
  - Hero → split layout (headline + Google badge + dual CTAs left, quote widget right).
  - QuoteWidget → reference behaviour: free **From/To** inputs w/ swap button &
    place-matching for instant prices, date/time, add-return, passengers,
    gold SEE PRICES, 2×2 trust ticks. Excursions tab keeps the excursion picker.
  - Card UIs rebuilt to reference anatomy: route cards (route-line + ✈ + chips +
    STARTING FROM + BOOK), fleet cards (overlay name/category/specs/price+DETAILS,
    scroll-snap carousel w/ arrows), journey cards (portrait, kicker + underline),
    experience cards (editorial: image, title+gold price, excerpt, EXPLORE link).
  - **Guides**: all 18 reference blog articles extracted
    (`docs/reference-audit/guides-extracted/`), adapted to Marrakech EN+FR in
    `src/data/guides/*.json`; new `/guides` index (category filters + featured
    Marrakech city-guide banner → `/marrakech`) and `/guides/[slug]` article pages;
    nav "Marrakech" → "Guides"; sitemap updated.
- **Phase 2: transfers funnel** — `/transfers` index + `/transfers/[slug]` details
  w/ per-vehicle price tables; `/fleet/[slug]` details; `/book` instant-quote page;
  private-driver-marrakech landing.
- **Phase 3: polish** — partner logos, per-page FAQ variants, dead-code cleanup
  (unused folders listed in codebase map), stale docs rewrite.
