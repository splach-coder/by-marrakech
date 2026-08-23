'use client';

/**
 * /explore — the site's single catalogue page.
 *
 * Layout (editorial catalogue, top to bottom):
 *   1  Hero              full-bleed photograph + two-tone display title
 *   2  Trust bar         four reassurance marks on a cream strip
 *   3  Collection nav    sticky, four collections, active one underlined
 *   4  Featured journey  split photo/panel card for the flagship tour
 *   5  Collections       Journeys · Escapes · Moments · Services, one grid each
 *   6  Journey band      full-bleed "one country, your route" breath
 *   7  Concierge process four numbered steps
 *   8  Finale            closing CTA on brand red
 *
 * /tours, /experiences, /activities and /services redirect into the four
 * collection anchors, so this is the only catalogue URL on the site.
 *
 * All copy lives in ./content.ts (EN/FR); every item comes straight from
 * siteData, so the page cannot drift from the detail pages it links to.
 */

import './explore.css';

import { useLocale } from 'next-intl';
import { getSiteData } from '@/data/siteData';
import { type CollectionId, type ExploreItem } from './content';
import ExploreHero from './components/ExploreHero';
import TrustBar from './components/TrustBar';
import CollectionNav from './components/CollectionNav';
import FeaturedJourney from './components/FeaturedJourney';
import CollectionSection from './components/CollectionSection';
import JourneyBand from './components/JourneyBand';
import ConciergeProcess from './components/ConciergeProcess';
import FinaleCTA from './components/FinaleCTA';

export default function ExplorePage() {
    const locale = useLocale();
    const data = getSiteData(locale);

    const journeys = (data.tours ?? []) as unknown as ExploreItem[];
    const escapes = (data.excursions ?? []) as unknown as ExploreItem[];
    const moments = (data.activities ?? []) as unknown as ExploreItem[];
    const services = (data.services ?? []) as unknown as ExploreItem[];

    // The flagship tour headlines the page; the rest of its collection follows
    // below, so it is shown once at the top and once in Journeys on purpose —
    // the featured card is a poster, the grid is the index.
    const featured = journeys[0];

    const counts: Record<CollectionId, number> = {
        journeys: journeys.length,
        escapes: escapes.length,
        moments: moments.length,
        services: services.length,
    };

    // Running numerals continue across the four grids rather than restarting
    const offsets = {
        journeys: 1,
        escapes: 1 + journeys.length,
        moments: 1 + journeys.length + escapes.length,
        services: 1 + journeys.length + escapes.length + moments.length,
    };

    return (
        <main className="min-h-screen bg-background">
            <ExploreHero locale={locale} />

            <TrustBar locale={locale} />

            <CollectionNav locale={locale} counts={counts} />

            {featured && <FeaturedJourney locale={locale} item={featured} collection="journeys" />}

            <CollectionSection
                locale={locale}
                id="journeys"
                items={journeys}
                tone="cream"
                numberFrom={offsets.journeys}
            />

            <CollectionSection
                locale={locale}
                id="escapes"
                items={escapes}
                tone="paper"
                numberFrom={offsets.escapes}
            />

            <CollectionSection
                locale={locale}
                id="moments"
                items={moments}
                tone="cream"
                numberFrom={offsets.moments}
            />

            <CollectionSection
                locale={locale}
                id="services"
                items={services}
                tone="paper"
                numberFrom={offsets.services}
            />

            <JourneyBand locale={locale} />

            <ConciergeProcess locale={locale} />

            <FinaleCTA locale={locale} />
        </main>
    );
}
