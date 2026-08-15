'use client';

/**
 * /explore — the unified experience hub.
 * Tours, excursions and activities, told as one cinematic scroll story:
 *
 *   Scene 1  Hero          — "Choose Your Morocco" (layered parallax)
 *   Scene 2  Manifesto     — word-by-word scroll lighting
 *   Scene 3  Chapter I     — Grand Journeys   (multi-day tours)
 *   Scene 4  Chapter II    — Day Escapes      (pinned horizontal excursions)
 *   Scene 5  Chapter III   — Signature Moments (expanding activity panels)
 *   Scene 6  Finale        — "Weave them into one itinerary"
 *
 * All copy lives in ./content.ts (EN/FR) — nothing here touches the shared
 * messages/*.json files. All items come straight from siteData, so the page
 * stays in sync with the classic /tours, /experiences and /activities pages.
 */

import './explore.css';

import { useLocale } from 'next-intl';
import { getSiteData } from '@/data/siteData';
import { type ExploreItem } from './content';
import ExploreHero from './components/ExploreHero';
import Manifesto from './components/Manifesto';
import JourneysChapter from './components/JourneysChapter';
import EscapesChapter from './components/EscapesChapter';
import MomentsChapter from './components/MomentsChapter';
import FinaleCTA from './components/FinaleCTA';
import ChapterRail from './components/ChapterRail';

export default function ExplorePage() {
    const locale = useLocale();
    const data = getSiteData(locale);

    const tours = (data.tours ?? []) as unknown as ExploreItem[];
    const excursions = (data.excursions ?? []) as unknown as ExploreItem[];
    const activities = (data.activities ?? []) as unknown as ExploreItem[];

    // Aggregate traveller rating across everything shown on the page
    const allReviews = [...tours, ...excursions, ...activities].flatMap(
        (item) => item.reviews ?? []
    );
    const rating = allReviews.length
        ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
        : '5.0';

    return (
        <main className="min-h-screen bg-background">
            <ChapterRail locale={locale} />

            <ExploreHero
                locale={locale}
                counts={{
                    journeys: tours.length,
                    escapes: excursions.length,
                    moments: activities.length,
                }}
                rating={rating}
            />

            <Manifesto locale={locale} />

            <JourneysChapter locale={locale} tours={tours} />

            <EscapesChapter locale={locale} excursions={excursions} />

            <MomentsChapter locale={locale} activities={activities} />

            <FinaleCTA locale={locale} />
        </main>
    );
}
