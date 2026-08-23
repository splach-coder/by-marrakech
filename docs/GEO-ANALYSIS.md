# GEO Analysis — xhosengate.com

Measured 23 Aug 2026 against the live site. Google's own position is that
optimising for AI search **is** SEO — so everything below is framed as SEO
fundamentals applied to AI-search surfaces, not a separate discipline.

## GEO Readiness Score: 46 / 100

| Criterion | Weight | Score | Note |
|---|---|---|---|
| Technical accessibility | 20% | **16 / 20** | SSR is excellent; robots.txt is empty, no schema |
| Structural readability | 20% | **15 / 20** | Clean heading trees, FAQ, comparison tables |
| Citability | 25% | **11 / 25** | Well-written but thin on hard facts and self-contained answers |
| Authority & brand signals | 20% | **2 / 20** | No dates, no author, no third-party presence, placeholder reviews |
| Multi-modal content | 15% | **2 / 15** | Images everywhere, no video, no tools, no charts |

### Platform breakdown

| Surface | Readiness | Why |
|---|---|---|
| Google AI Overviews | **Low** | 92% of citations come from top-10 ranking pages. Duplicate titles across 9 of 10 pages mean almost nothing can rank distinctly yet. |
| Google AI Mode | **Low–Medium** | Draws from a broader pool where freshness and entity authority matter more than position — but we publish no dates at all, so we read as undated. |
| ChatGPT search | **Very low** | Cites Wikipedia (47.9%) and Reddit (11.3%). Zero presence on either. |
| Perplexity | **Very low** | Cites Reddit (46.7%) heaviest. Zero presence. |

---

## Findings

### 🔴 1. Nine of ten pages share one title and one description

The single biggest problem. Measured live:

| URL | Title |
|---|---|
| `/en` | Xhosen Gate \| Authentic Marrakech Experiences & Tours |
| `/en/fleet` | *(identical)* |
| `/en/drivers` | *(identical)* |
| `/en/contact` | *(identical)* |
| `/en/about` | *(identical)* |
| `/en/guides` | *(identical)* |
| `/en/gallery` | *(identical)* |
| `/en/guides/marrakech-airport-transfers-guide` | *(identical)* |
| `/en/tours/465` | *(identical)* |
| `/en/explore` | Tours, Excursions… \| Xhosen Gate \| Xhosen Gate |

Root cause: `src/app/[locale]/layout.tsx` defines a `title.default` and
`template: '%s | Xhosen Gate'`, and only five files in the whole app define
their own metadata (`explore/layout.tsx`, `privacy`, `terms`, `sitemap`, plus
the root). Every other route falls through to the default.

A 3,337-word airport-transfer guide — genuinely the most citable asset on the
site — is published under a generic homepage title. No AI surface can tell what
that page is about from its metadata.

**`/explore` also double-appends the brand** because its title already ends in
"| Xhosen Gate" and the template adds it again.

### 🔴 2. Zero structured data on the entire site

No JSON-LD anywhere — checked homepage, explore, fleet, contact and a guide
article. For a local transfer business this is a large miss: `LocalBusiness`,
`Service`, `FAQPage` and `BreadcrumbList` are exactly the entity signals AI
systems use to establish what a business is, where it operates and what it sells.

### 🔴 3. No dates or authorship anywhere

`<time>` tags: **0**. No published or updated date on the guide articles, no
byline, no author credentials.

Content under 3 months old is ~3× more likely to be cited; pages that look stale
6+ months lose eligibility. Undated content can't benefit from either — the
freshness signal simply isn't there to read.

### 🟠 4. robots.txt is a 0-byte file

`https://xhosengate.com/robots.txt` returns 200 with **0 bytes**. It doesn't
*block* anything (no rules = allow all), so AI crawlers get through — but it
declares no sitemap and no explicit crawler policy.

Same class of bug as the empty `public/sitemap.xml` that was shadowing the
dynamic sitemap route until it was deleted earlier today.

### 🟠 5. Review data is placeholder

The homepage advertises "5.0 — 127 Google reviews" from hardcoded values in
`src/data/transferData.ts`. Publishing invented review counts is a real risk:
if it were ever marked up as `AggregateRating` schema it would breach Google's
structured-data policy, and it undermines the trust signal it's meant to create.

### 🟡 6. No third-party brand presence

Brand mentions correlate ~3× more strongly with AI citations than backlinks
(Ahrefs, 75k brands). YouTube mentions correlate strongest (~0.737); Domain
Rating barely at all (~0.266).

The domain went live today, so this is expected rather than a defect — but it is
the ceiling on ChatGPT and Perplexity visibility regardless of how good the
on-page work is. **Not independently measured here** — no DataForSEO key is
configured, so treat this as a structural observation, not a measurement.

### 🟡 7. Multi-modal is images-only

Multi-modal content sees ~156% higher selection rates. The site is rich in
photography but has no video, no charts, no calculators. The quote widget is the
closest thing to an interactive tool.

### ✅ What is already right

- **Server-side rendering.** 162 KB of fully-rendered HTML on `/en/fleet`, with
  all nine vehicle names present without executing JavaScript. AI crawlers do
  not run JS, so this is the foundation everything else builds on — and it is
  solid.
- **Clean heading hierarchy.** `/en/fleet`: 1× h1, 5× h2, 13× h3.
- **Comparison tables.** The fleet "At a Glance" table is exactly the shape AI
  systems extract well.
- **An FAQ section** on the homepage — genuine Q&A structure.
- **Correct hreflang** for EN/FR plus `x-default`, served as `Link` headers.
- **Substantial long-form content** — 18 guide articles, the airport-transfer
  one alone 3,337 words.

---

## Top 5 highest-impact changes

**1. Give every page its own title and description.** Unblocks everything else —
no page can be cited for a topic it doesn't declare. Add `generateMetadata` to
the guide, tour, activity, experience, service, fleet, drivers, contact and
about routes, and strip the duplicate brand from `/explore`.

**2. Add JSON-LD.** `LocalBusiness` + `Service` sitewide, `FAQPage` on the
homepage FAQ, `BreadcrumbList` on detail pages, `Article` with
`datePublished` / `dateModified` on guides.

**3. Publish dates and a byline on the guides.** Fixes the freshness signal and
the authorship gap in one change.

**4. Write a real robots.txt** declaring the sitemap and explicitly allowing
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot and PerplexityBot.

**5. Front-load a citable answer on each guide.** ~44% of AI citations come from
the first 30% of a page, and the optimal citable block is 134–167 words. Each
guide should open with a self-contained answer of about that length containing a
concrete fact — a price, a distance, a drive time.

### Recommended robots.txt

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: https://xhosengate.com/sitemap.xml
```

*(`CCBot` is training-data collection, not search visibility — blocking it costs
nothing in citations.)*

---

## On llms.txt

`/llms.txt` returns 404. **I am not recommending you add one.** Google's John
Mueller and Gary Illyes have both said it is not used, and neither a 300k-domain
SE Ranking study nor OtterlyAI's server-log audit found evidence that major AI
search systems fetch it. Reported for completeness; assigned no weight.

---

## What this needs from you

Items 1, 2, 4 and 5 above are all code changes I can make. Item 3 needs a
decision — whose byline goes on the guides, and do you want real authored dates
or a generic "last reviewed" date. The review counts need real Google Business
Profile numbers before that section should stay live.
