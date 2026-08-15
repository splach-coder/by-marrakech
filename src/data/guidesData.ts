// ============================================================
// Travel guides — Marrakech adaptations of the reference site's
// blog architecture (justluxurytransfers.com/blog).
// Content JSONs live in src/data/guides/*.json (EN + FR).
// ============================================================

import g01 from './guides/marrakech-to-agadir-transfer-guide.json';
import g02 from './guides/marrakech-3-day-itinerary.json';
import g03 from './guides/marrakech-airport-arrival-guide.json';
import g04 from './guides/marrakech-with-kids-family-guide.json';
import g05 from './guides/sahara-desert-trips-from-marrakech.json';
import g06 from './guides/best-time-to-visit-marrakech.json';
import g07 from './guides/is-marrakech-worth-visiting.json';
import g08 from './guides/things-to-do-in-marrakech.json';
import g09 from './guides/where-to-stay-in-marrakech.json';
import g10 from './guides/marrakech-airport-transfer-vs-taxi.json';
import g11 from './guides/best-day-trips-from-marrakech.json';
import g12 from './guides/is-taxi-from-marrakech-airport-safe.json';
import g13 from './guides/marrakech-airport-transfers-guide.json';
import g14 from './guides/marrakech-to-essaouira-day-trip-guide.json';
import g15 from './guides/marrakech-to-ourika-valley-guide.json';
import g16 from './guides/top-excursions-from-marrakech.json';
import g17 from './guides/getting-around-marrakech-transport-guide.json';
import g18 from './guides/best-time-to-visit-ourika-valley.json';

export interface GuideSection {
    heading: string;
    paragraphs: string[];
    list?: string[];
}

export interface GuideContent {
    title: string;
    excerpt: string;
    sections: GuideSection[];
}

export interface Guide {
    slug: string;
    category: string;
    date: string;
    image: string;
    en: GuideContent;
    fr: GuideContent;
}

const ALL_GUIDES = [
    g01, g02, g03, g04, g05, g06, g07, g08, g09,
    g10, g11, g12, g13, g14, g15, g16, g17, g18,
] as Guide[];

// FR display names for categories (EN names come straight from the data)
const CATEGORY_FR: Record<string, string> = {
    'TRANSFER GUIDES': 'GUIDES TRANSFERTS',
    'EXCURSION GUIDES': 'GUIDES EXCURSIONS',
    'MARRAKECH & MOROCCO TIPS': 'CONSEILS MARRAKECH & MAROC',
};

export function getGuides(): Guide[] {
    return [...ALL_GUIDES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getGuide(slug: string): Guide | undefined {
    return ALL_GUIDES.find(g => g.slug === slug);
}

export function getGuideContent(guide: Guide, locale: string): GuideContent {
    return locale === 'fr' ? guide.fr : guide.en;
}

export function getCategoryLabel(category: string, locale: string): string {
    return locale === 'fr' ? (CATEGORY_FR[category] || category) : category;
}

export function getRelatedGuides(slug: string, count = 3): Guide[] {
    const current = getGuide(slug);
    if (!current) return getGuides().slice(0, count);
    const sameCategory = getGuides().filter(g => g.slug !== slug && g.category === current.category);
    const others = getGuides().filter(g => g.slug !== slug && g.category !== current.category);
    return [...sameCategory, ...others].slice(0, count);
}

export function formatGuideDate(date: string, locale: string): string {
    try {
        return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
        }).format(new Date(date));
    } catch {
        return date;
    }
}
