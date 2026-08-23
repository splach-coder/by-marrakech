# Fleet vehicle image credits

Real photographs of each model, sourced from Wikimedia Commons because we do not
yet have shots of our own vehicles. Each is fitted whole into a 4:3 plate on a
white ground (no cropping — the entire vehicle is visible) and saved as WebP.

## Vehicle colour

The fleet is black, and three of the five models were available in black:

| Model | Colour in photo | File | Author | Licence | Source |
|---|---|---|---|---|---|
| Ford Tourneo Custom | Black | `ford-tourneo-custom.webp` | Vauxford | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:2018_Ford_Tourneo_Custom_Titanium_X_TDCi_2.0_Front.jpg |
| Fiat Scudo | Black | `fiat-scudo.webp` | Trop86 | CC0 | https://commons.wikimedia.org/wiki/File:Fiat_E-Scudo_080620044.jpg |
| Volkswagen Crafter | Graphite grey — no plain black example exists on Commons | `volkswagen-crafter.webp` | Vauxford | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:2017_Volkswagen_Crafter_CR35_Trendline_TD_2.0_Front.jpg |
| MAN TGE | White — no plain black example exists on Commons | `man-tge.webp` | Alexander Migl | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:MAN_TGE_3.140_IMG_3856.jpg |
| Skoda Kodiaq | Black | `skoda-kodiaq.webp` | Throwawayacc222 | CC0 | https://commons.wikimedia.org/wiki/File:2019_Skoda_Kodiaq_Hockey_Edition_black_front.jpg |

**Volkswagen Crafter and MAN TGE could not be sourced in black.** Wikimedia
Commons has no plain black example of either — the only black ones carry another
company's livery (a Koenigsegg-branded Crafter, a Würth-branded TGE), which would
be worse on our fleet page than the wrong colour. Those two need photos of our
own vans.

## Licences

The two black replacements are **CC0** (public domain dedication) — no
attribution required, no share-alike. The remaining three are CC BY-SA 4.0 /
CC BY 4.0, which **do** require attribution, and BY-SA asks that adaptations
(our crops) carry the same licence. Two ways to clear that:

1. **Preferred —** photograph our own vehicles and replace these files. Same
   filenames, same folder, nothing else to change: `src/data/transferData.ts`
   and `src/data/drivers.ts` both point at `public/images/fleet/`.
2. **Interim —** keep a visible credit line. Add a "Vehicle photography" note in
   the footer or on `/terms` naming the authors above.

## Fleet inventory

Eight vehicles, one card per vehicle on `/fleet`:

| # | Vehicle | Class | Pax | Luggage |
|---|---|---|---|---|
| 1 | Ford Tourneo Custom | Van | 8 | 8 |
| 2 | Ford Tourneo Custom | Van | 8 | 8 |
| 3 | Ford Tourneo Custom | Van | 8 | 8 |
| 4 | Fiat Scudo | Van | 8 | 6 |
| 5 | Volkswagen Crafter | Minibus | 16 | 16 |
| 6 | Volkswagen Crafter | Minibus | 16 | 16 |
| 7 | MAN TGE | Minibus | 19 | 19 |
| 8 | Skoda Kodiaq | SUV / 4x4 | 5 | 4 |

Passenger and luggage counts are sensible defaults per model — confirm them
against the actual vehicle specs before launch.
