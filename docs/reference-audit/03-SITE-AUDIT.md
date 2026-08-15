# Site Audit — broken pages, broken images, image replacement

> Run on 2026-08-15 against the local production build (`npm run build` + `npm start`).

## 1. Broken-page crawl — ✅ CLEAN

Crawled **134 routes** (67 paths × EN/FR): every static page, every tour (3),
excursion (10), activity (5), service (4), event (8), driver (2) and guide (18)
detail page. **All return HTTP 200.** No broken pages.

## 2. Image-reference audit

Scanned every `/images/...` reference in `src/` + `messages/` (171 references)
against `public/images/` on disk.

### Fixed (live pages, wrong file extension → image 404'd)
| Page | Was | Now |
|---|---|---|
| `/services` banner | `hero-imgs/services.png` | `hero-imgs/services.webp` |
| `/events` banner | `marrakech/hero.jpg` | `marrakech/hero.webp` |
| `/sitemap` page | `marrakech/marrakech.jpg` | `marrakech/marrakech.webp` |
| `/services/501` (private driver) | `services/luxury_driver_service.png` | `.webp` |

### Remaining misses — all in DEAD CODE (no runtime impact)
27 missing references live only in unused files: `about/components/*`,
`contact/components/*`, `CartUpsell.tsx` (never imported),
`home-data.ts` `toursPreviewData`/`experiencesPreviewData` (no longer rendered)
and `places.ts` (zero importers). Cleaning these up is the Phase-3 dead-code task.

## 3. "YOU MOROCCO" poster removal — ✅ all 15 replaced

All 15 top-level destination images were branded posters from another company
(YOU MOROCCO). Replaced **in place** (same filenames → zero code changes,
guides/footer/cards all pick them up automatically):

| File | New image | Source |
|---|---|---|
| marrakech.webp | Koutoubia minaret through palms | Wikimedia Commons (CC BY 4.0) |
| Essaouira.webp | Skala fortress + blue boats | in-repo (essaouira/rigel…unsplash) |
| Ourika Valley.webp | riverside restaurants on the Ourika | in-repo (ourika/matthew-fainman…unsplash) |
| casablanca.webp | Hassan II Mosque at night | in-repo (casablanca/zakaria-zayane…unsplash) |
| ouarzazate.webp | Aït Benhaddou ksar | Commons (CC BY-SA 4.0) |
| Fes.webp | Chouara tannery | Commons (CC BY-SA 2.0) |
| Zagora.webp | Draa valley palmeraie + Jebel Kissane | Commons (CC BY-SA 4.0) |
| ouzoud.webp | Ouzoud Falls | Commons (CC BY 4.0) |
| camels.webp | camel caravan, Erg Chebbi | Commons (CC BY-SA 4.0) |
| quad.webp | quads on dunes | Commons (CC BY-SA 4.0) |
| rabat.webp | Kasbah of the Udayas walls | Commons (CC BY-SA 4.0) |
| marzouga-v2.webp | Erg Chebbi dunes | Commons (CC BY-SA 4.0) |
| cookingclass.webp | tagine pottery | Commons (CC BY-SA 4.0) |
| foodtour.webp | Jemaa el-Fna food stalls at dusk | Commons (CC BY-SA 4.0) |
| airballon.webp | balloon breakfast over Marrakech plains | Commons (CC BY-SA 3.0) |

- Originals backed up in [`old-poster-images/`](./old-poster-images/).
- Full source URLs + artists in [`new-images-manifest.json`](./new-images-manifest.json).
- ⚠️ **Licensing note for the client**: Commons images are free to use commercially
  but CC BY / BY-SA licenses require attribution (e.g. an image-credits line on the
  privacy or about page listing the artists in the manifest). Ideally replace with
  the client's own photography before launch — these are quality placeholders.
- Commons was used because no Pexels/Unsplash API keys exist on this machine
  (factory `.env` was never created from `.env.example`).
