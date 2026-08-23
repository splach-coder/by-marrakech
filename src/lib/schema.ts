/**
 * JSON-LD builders.
 *
 * The site shipped with zero structured data. For a local transfer business
 * that is the largest single entity-signal gap: LocalBusiness, Service,
 * FAQPage and BreadcrumbList are exactly what AI search systems read to
 * establish what a business is, where it operates and what it sells.
 *
 * Deliberately NOT included: AggregateRating. The review count on the site is
 * placeholder data, and marking up invented ratings breaches Google's
 * structured-data policy. Add it once real Google Business Profile numbers are
 * in — see docs/GEO-ANALYSIS.md.
 */

import { SITE_NAME, SITE_URL } from './seo';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212672958587';
const EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@xhosengate.com';

/**
 * The organisation itself. Emitted once, sitewide, from the root layout.
 *
 * streetAddress is omitted on purpose — the value in the environment is still
 * the placeholder "123 Medina Avenue". Locality and country are true, so the
 * entity is honest and the schema stays valid; add the street when it is real.
 */
export function localBusinessSchema(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        description:
            locale === 'fr'
                ? 'Transferts privés, circuits et excursions au départ de Marrakech, avec chauffeurs professionnels et prix fixes.'
                : 'Private transfers, tours and excursions from Marrakech with professional chauffeurs and fixed prices.',
        url: SITE_URL,
        telephone: PHONE,
        email: EMAIL,
        image: `${SITE_URL}/images/heroes/fleet-hero.webp`,
        logo: `${SITE_URL}/images/logo-red.webp`,
        priceRange: '€€',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Marrakech',
            addressRegion: 'Marrakech-Safi',
            addressCountry: 'MA',
        },
        areaServed: [
            'Marrakech',
            'Agadir',
            'Casablanca',
            'Fes',
            'Essaouira',
            'Ouarzazate',
            'Merzouga',
            'Zagora',
            'Chefchaouen',
        ].map((name) => ({ '@type': 'City', name })),
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        availableLanguage: ['en', 'fr', 'ar', 'es'].map((l) => ({ '@type': 'Language', name: l })),
    };
}

/** A bookable transfer / chauffeur service. */
export function serviceSchema(input: {
    name: string;
    description: string;
    url: string;
    image?: string;
    price?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: input.name,
        description: input.description,
        url: input.url,
        ...(input.image ? { image: input.image } : {}),
        serviceType: 'Private transfer',
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'Country', name: 'Morocco' },
        ...(input.price ? { offers: { '@type': 'Offer', priceCurrency: 'EUR', description: input.price } } : {}),
    };
}

/** A multi-day tour, day excursion or activity. */
export function tripSchema(input: {
    name: string;
    description: string;
    url: string;
    image?: string;
    price?: string;
    locations?: string[];
}) {
    const numeric = input.price?.match(/[\d.]+/)?.[0];
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: input.name,
        description: input.description,
        url: input.url,
        ...(input.image ? { image: input.image } : {}),
        provider: { '@id': `${SITE_URL}/#business` },
        ...(input.locations?.length
            ? { itinerary: input.locations.map((name) => ({ '@type': 'City', name })) }
            : {}),
        ...(numeric
            ? { offers: { '@type': 'Offer', price: numeric, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: input.url } }
            : {}),
    };
}

/** A guide article. Dates are what make freshness legible to AI surfaces. */
export function articleSchema(input: {
    headline: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    section?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: input.headline,
        description: input.description,
        url: input.url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
        ...(input.image ? { image: input.image } : {}),
        datePublished: input.datePublished,
        dateModified: input.dateModified ?? input.datePublished,
        ...(input.section ? { articleSection: input.section } : {}),
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo-red.webp` },
        },
    };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}

export function breadcrumbSchema(trail: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);
