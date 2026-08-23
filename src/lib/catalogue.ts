// Formatting helpers for catalogue items (tours, excursions, activities,
// services). These live outside the /explore page because the driver profiles
// render the same items and must clean them up the same way — our feed carries
// SEO tails in titles ("... Activity In Morocco") and "(s)" plurals in
// durations that are not fit to display.

export interface CatalogueItem {
    id: number;
    title: string;
    description: string;
    duration?: string;
    price?: string;
    trip_code?: string;
    image: { url: string; alt: string };
    banner_image?: { url: string; alt: string };
    locations?: Array<{ name: string } | string>;
    highlights?: string[];
    suitable_for?: string[];
    itinerary?: Array<{ day: number; title: string; description?: string }>;
    reviews?: Array<{ rating: number }>;
}

export const locationName = (loc: { name: string } | string): string =>
    typeof loc === 'string' ? loc : loc.name;

/* ------------------------------------------------------------------ *
 * Item formatting shared by the featured card and the collection grids
 * ------------------------------------------------------------------ */

/**
 * Strips the SEO tail our data carries in titles so cards can breathe:
 * "Cooking Class Activity In Morocco" → "Cooking Class"
 * "Service de Transfert Aéroport au Maroc" → "Service de Transfert Aéroport"
 */
export const cleanTitle = (title: string) =>
    title
        .replace(/\s+Activity\s+in\s+Morocco\s*$/i, '')
        .replace(/\s+Services?\s+in\s+Morocco\s*$/i, '')
        .replace(/\s+in\s+Morocco\s*$/i, '')
        .replace(/\s+Activité\s+au\s+Maroc\s*$/i, '')
        .replace(/\s+au\s+Maroc\s*$/i, '')
        .trim();

/**
 * Splits a title for the page's two-tone treatment: the opening in ink, the
 * remainder in gold italic. Normally that is the first word — but a title that
 * opens on a number or a two-letter word ("5 Days Tour From Marrakech") would
 * leave a stub in Black, so those take two words instead.
 */
export const splitTitle = (title: string): [string, string] => {
    const words = cleanTitle(title).split(/\s+/);
    if (words.length < 2) return [words[0] ?? '', ''];
    const leadCount = words[0].length <= 2 || /^\d/.test(words[0]) ? 2 : 1;
    return [words.slice(0, leadCount).join(' '), words.slice(leadCount).join(' ')];
};

/**
 * Our duration strings come from the tour operator's feed and are not written
 * for display: "3 Day(s) 2 Night(s)", or a whole sentence like
 * "Approximately 1 hour flight + breakfast". This resolves the (s) into real
 * singulars and plurals and keeps only the first clause.
 */
export const tidyDuration = (duration: string) => {
    const plural = (n: string, one: string, many: string) => `${n} ${Number(n) === 1 ? one : many}`;
    return duration
        .split(/\s+[-–—]\s+/)[0]
        .replace(/(\d+)\s*Day\(s\)/gi, (_, n) => plural(n, 'Day', 'Days'))
        .replace(/(\d+)\s*Night\(s\)/gi, (_, n) => plural(n, 'Night', 'Nights'))
        .replace(/(\d+)\s*Jour\(s\)/gi, (_, n) => plural(n, 'Jour', 'Jours'))
        .replace(/(\d+)\s*Nuit\(s\)/gi, (_, n) => plural(n, 'Nuit', 'Nuits'))
        .replace(/Day\(s\)/gi, 'Days')
        .replace(/Night\(s\)/gi, 'Nights')
        .trim();
};

/** Longest a single fact may be before it stops working as a wide-tracked caps line */
const META_PIECE_MAX = 30;

/** Durations that are really sentences get trimmed to their first fact, or dropped. */
const compactDuration = (duration: string) => {
    const piece = tidyDuration(duration)
        .split(/\s*[+,;]\s*/)[0]
        .replace(/^(approximately|approx\.?|around|about|environ)\s+/i, '')
        .trim();
    return piece.length > META_PIECE_MAX ? '' : piece;
};

/**
 * The tiny wide-tracked line under each card title. Prefers hard facts
 * (duration, region) and falls back to who it suits — so services, which
 * carry no duration, still get a line. Anything too long to set in caps is
 * dropped rather than truncated with an ellipsis.
 */
export const metaLine = (item: CatalogueItem): string => {
    const parts: string[] = [];

    if (item.duration) {
        const compact = compactDuration(item.duration);
        if (compact) parts.push(compact);
    }
    if (item.locations?.length) parts.push(locationName(item.locations[0]));
    if (!parts.length && item.suitable_for?.length) parts.push(item.suitable_for.slice(0, 2).join(' · '));
    if (!parts.length && item.highlights?.length) {
        const first = item.highlights[0];
        if (first.length <= META_PIECE_MAX) parts.push(first);
    }

    return parts.join(' · ');
};

/**
 * Prices in the feed are inconsistent — "€180", "From €25", "From €50/day".
 * The chip on a photograph already reads as a price, so the "From" is noise
 * there; the featured card supplies its own "from" label above the figure.
 */
export const priceLabel = (price?: string) =>
    price?.replace(/^\s*(from|dès|d.s|à partir de)\s+/i, '').trim() ?? '';

