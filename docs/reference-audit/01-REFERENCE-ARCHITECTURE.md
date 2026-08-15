# Reference Architecture Audit — justluxurytransfers.com

> Full crawl + DOM analysis performed 2026-08-14 (headless Chrome, 1440×900).
> Full-page screenshots in [`./screenshots/`](./screenshots/).
> Purpose: replicate this **architecture, section order and content model** on the
> Marrakech site (Xhosen Gate / by-marrakech) while keeping by-marrakech's **design**.

---

## 1. Site map

| Route | Purpose | Screenshot |
|---|---|---|
| `/` | Homepage (11 sections, quote widget in hero) | `01-home.jpeg` |
| `/transfers` | Transfer routes index (route finder + all routes) | `02-transfers.jpeg` |
| `/transfers/[route]` ×6 | Route detail w/ per-vehicle price table | `10-transfer-detail.jpeg` |
| `/fleet` | Fleet index — 8 vehicles, comparison table | `03-fleet.jpeg` |
| `/fleet/[vehicle]` ×8 | Vehicle detail w/ specs + booking CTA | `11-fleet-detail.jpeg` |
| `/excursions` | Excursions index — 20 items, featured + grid | `04-excursions.jpeg` |
| `/excursions/[slug]` ×20 | Excursion detail w/ sticky booking card | `12-excursion-detail.jpeg` |
| `/private-driver-agadir` | SEO landing page (hourly/daily driver hire) | `08-private-driver.jpeg` |
| `/blog` ("Guides" in nav) | Travel guides index | `09-blog-guides.jpeg` |
| `/about` | Story / mission / territory / accreditation | `05-about.jpeg` |
| `/contact` | Form + WhatsApp + FAQ | `06-contact.jpeg` |
| `/book` | Instant-quote booking flow (standalone page) | `07-book.jpeg` |
| `/privacy-policy`, `/terms`, `/sitemap` | Legal + HTML sitemap | — |
| Locales | `en` (default), `/fr`, `/es`, `/it`, `/de` | — |

**Nav order:** HOME · TRANSFERS · FLEET · EXCURSIONS · GUIDES · ABOUT · CONTACT · [lang] · **BOOK NOW** (accent button)

**Footer columns:** Brand blurb · NAVIGATION · AIRPORT & TRANSFER ROUTES (6 route deep-links) · CONTACT (address/phone/WhatsApp/email) · EXCURSIONS (deep-links)

---

## 2. Homepage — exact section order (the model to copy)

| # | Section id | Content | Key details |
|---|---|---|---|
| 1 | `#hero` | Full-screen hero + **instant quote widget** | H1 "Premium Private Transfers in Agadir". Widget: TRANSFERS / EXCURSIONS tabs → From / To / Date / Time / "Add return" / Passengers stepper → **SEE PRICES**. This is the #1 conversion element. |
| 2 | `#journey` | **"Choose Your Journey"** — 3 category cards | Airport Transfers · Our Elite Fleet · Private Excursions. Routes users into the 3 funnels. |
| 3 | `#routes` | **"Popular Transfer Routes"** — 6 route cards | Fixed price **per vehicle**, "meet & greet, flight tracking, 60 min free wait on every route". Each card links to its route detail page. |
| 4 | `#fleet` | **"Elite Fleet"** — vehicle carousel | 8 vehicles, arrows, per-car: category badge (SEDAN/VAN/VIP/MINIBUS/4X4), name, "Up to N pax", from-price, DETAILS link. |
| 5 | — | **Partner logo marquee** | "Trusted by Leading Travel Partners" — 12 logos, auto-scroll. Social proof. |
| 6 | `#experiences` | **"Curated Experiences"** — excursion grid | 6 cards shown + "LOAD MORE (14 more)". Card: image, title, price, VIEW DETAILS. |
| 7 | `#why-us` | **"Why Choose Us"** — 4 pillars | LICENSED & INSURED · PUNCTUAL ARRIVAL · EXPERT CHAUFFEURS · 24/7 SUPPORT. Icon + title + one-liner. |
| 8 | `#faq` | **FAQ accordion** — 7 questions | Price per vehicle or person? · Are transfers private? · Flight tracking? · Free waiting time? · Child seats? · Cash payment? · What vehicle will I get? |
| 9 | — | **CTA band** — "Ready to Arrive?" | "Secure your premium transfer or private excursion today" + book/WhatsApp buttons. |
| 10 | `#google-reviews-section` | **Google Reviews** | "What Our Clients Say" — **5.0 ★ (191 reviews on Google)** + "See all on Google Maps" link + carousel of real reviews (avatar initial, name, relative date, full quote). |

### Recurring global patterns (this is what makes the site convert)
1. **Google Reviews section appears at the bottom of EVERY page** — home, transfers, fleet, excursions, about, contact, detail pages. Always same component.
2. **FAQ accordion** on home, transfers index, every transfer/excursion detail, contact, private-driver.
3. **CTA band** ("Ready to Arrive?" / "Ready to Book?" / "Ready to Explore Morocco?") placed *before* the reviews on nearly every page.
4. **WhatsApp-first**: `wa.me` deep links in header, hero, booking, CTA bands, fleet details, floating position. Phone + email secondary.
5. **Transparent fixed pricing** everywhere: route cards show €, fleet cards show from-€, detail pages show per-vehicle price tables.
6. **Trust ticks** repeated: fixed all-in prices · flight delays covered · free cancellation · 5.0★ on Google.

---

## 3. Page templates

### 3.1 Transfers index (`/transfers`)
1. Hero — "Airport & City Transfers"
2. **Route finder** (From/To quick search)
3. SEO intro — "Transfers from Agadir Airport (AGA)" + flight-tracking pitch
4. **All Transfer Routes** grid (6 cards with prices)
5. Trust strip (certified vehicles/drivers)
6. FAQ
7. CTA band → 8. Google Reviews

### 3.2 Transfer detail (`/transfers/agadir-marrakech`)
1. Hero — "Agadir Airport → Marrakech" + fixed price (€130)
2. Route facts strip (distance, duration, price per vehicle)
3. Breadcrumbs + SEO content block ("Agadir to Marrakech Transfer" long-form)
4. **"Choose Your Vehicle"** — per-vehicle price table (Superb €130 → Sprinter €290)
5. "The Luxe Standard" (service pillars)
6. FAQ (route-specific)
7. Google Reviews

### 3.3 Fleet index (`/fleet`)
1. Hero — "OUR ELITE FLEET"
2. **"Select Your Machine"** — 8 vehicle cards: category badge, name, "Up to N pax", from-€ price
   - Ford Tourneo Custom (VAN, 8 pax, €40) · Mercedes E-Class (VIP, 3 pax, €100) · Mercedes Vito (VAN, 7 pax, €40) · Skoda Superb (SEDAN, 3 pax, €25) · Skoda Kodiaq (SUV, 4 pax, €30) · Mercedes Sprinter (MINIBUS, 18 pax, €70) · VW Crafter (MINIBUS, 18 pax, €70) · Toyota Land Cruiser (4X4, 6 pax, €45)
3. "Luxury Is Not a Category — It's a Standard" (brand statement)
4. "Not Sure Which Vehicle?" (concierge CTA)
5. **"At a Glance"** — comparison table (pax/luggage/class per vehicle)
6. Google Reviews

### 3.4 Fleet detail (`/fleet/mercedes-vito`)
1. Hero — vehicle name + spec chips (7 pax · 4 bags · AC · WiFi · water · chargers) + "STARTING FROM €40 / transfer" + BOOK THIS VEHICLE + WHATSAPP
2. Specs row — PASSENGERS / LUGGAGE / TRANSMISSION / CLIMATE / AMENITIES
3. "The Fleet Excellence" — feature checklist + gallery
4. "Perfect For Every Occasion" — use cases
5. CTA — "BOOK THE VITO TODAY"
6. Google Reviews

### 3.5 Excursions index (`/excursions`)
1. Hero — "CURATED JOURNEYS"
2. **Featured excursion** spotlight (Paradise Valley)
3. "Explore Our Collection" — full grid (19 imgs)
4. "Your Journey, Your Rules" (custom trips pitch)
5. "Our Concierge Process" (3-step how it works)
6. CTA — "READY TO EXPLORE MOROCCO?"
7. Google Reviews

### 3.6 Excursion detail (`/excursions/paradise-valley`)
1. Hero — title + price
2. "THE EXPERIENCE" — description
3. "JOURNEY ITINERARY" — timeline
4. "PREMIUM INCLUSIONS" — checklist
5. **Sticky booking card** (right rail): guests stepper · departure time slots · date picker · pickup hotel/riad field · TOTAL € · "5.0★ on Google · fixed price per vehicle"
6. FAQ (excursion-specific)
7. "OTHER JOURNEYS" — related cards
8. CTA → 9. Google Reviews

### 3.7 Book (`/book`) — instant quote
- "Get your fixed price — instant price, no details needed yet."
- FROM / TO / DATE / TIME / add return / passengers → **SEE PRICES**
- Trust ticks: fixed all-in prices · flight delays covered · free cancellation · 5.0★ Google (177 reviews) · "Book on WhatsApp — replies in minutes, 24/7"
- Fallback card: "Excursion or a specific vehicle? → SEND AN ENQUIRY"
- After SEE PRICES → vehicle choice → name/phone/email → WhatsApp confirm

### 3.8 About (`/about`)
Hero "Where Elegance Meets the Road" → stats strip → #story (founded, 2 imgs) →
values → "Pioneering Moroccan Excellence" (mission) → **"OUR TERRITORY"** (coverage map) →
partner logos → accreditation ("accredited by Moroccan Ministry of Tourism") →
CTA → Google Reviews

### 3.9 Contact (`/contact`)
Hero → form (name/email/phone/subject/message) + WhatsApp card → "Have Questions?" FAQ →
CTA "Ready to Book?" → Google Reviews.
Contacts: `wa.me/…`, `tel:…`, `mailto:…`

### 3.10 Private driver landing (`/private-driver-agadir`)
SEO page: hero → intro → hourly hire → "local expert at the wheel" →
pricing FAQ ("How much is a private driver per day?") → CTA → Google Reviews

---

## 4. Why this architecture works (what the client is asking for)

1. **Conversion-first hero** — a quote widget above the fold instead of a passive image.
2. **Category → price → proof funnel**: journey cards → priced routes → fleet → social proof → FAQ (objection handling) → CTA → reviews. Every scroll step answers the next natural question.
3. **Fleet as a first-class product** — its own index + detail pages, referenced from home, transfer details ("Choose Your Vehicle"), and the booking flow.
4. **Reviews as a site-wide footer ritual** — real Google reviews with count + rating on every single page.
5. **Fixed transparent prices** — removes the #1 booking hesitation.
6. **SEO landing pages** per route, per vehicle, per excursion + guides blog + private-driver page.
