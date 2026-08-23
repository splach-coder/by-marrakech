import type { Metadata } from 'next';

/**
 * Per-page metadata builder.
 *
 * Before this existed, only five files in the app defined metadata, so nine out
 * of ten pages shipped the same title and description from the root layout —
 * including a 3,300-word guide published under the generic homepage title. No
 * search or AI surface could tell those pages apart.
 *
 * Every route now calls `pageMetadata()` from a sibling layout.tsx (needed
 * because most pages are client components, and generateMetadata is
 * server-only).
 */

export const SITE_URL = 'https://xhosengate.com';
export const SITE_NAME = 'Xhosen Gate';

const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export interface PageMetaInput {
    locale: string;
    /** Page title WITHOUT the brand — the root template appends " | Xhosen Gate" */
    title: string;
    description: string;
    /** Path without locale prefix, e.g. "/fleet" or "/guides/my-slug" */
    path: string;
    /** Absolute or root-relative image for social cards */
    image?: string;
    /** 'article' for guides, 'website' for everything else */
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
}

/**
 * Canonical + hreflang for one page across both locales. Google needs the
 * alternates to understand EN/FR are the same page, not duplicates.
 */
const alternatesFor = (path: string) => ({
    canonical: `${SITE_URL}/{LOCALE}${path}`,
    languages: Object.fromEntries([
        ...LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ['x-default', `${SITE_URL}/en${path}`],
    ]),
});

export function pageMetadata({
    locale,
    title,
    description,
    path,
    image = '/images/og-image.webp',
    type = 'website',
    publishedTime,
    modifiedTime,
}: PageMetaInput): Metadata {
    const lang = LOCALES.includes(locale as Locale) ? locale : 'en';
    const url = `${SITE_URL}/${lang}${path}`;
    const alternates = alternatesFor(path);

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: alternates.languages,
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            siteName: SITE_NAME,
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type,
            images: [{ url: image.startsWith('http') ? image : `${SITE_URL}${image}`, width: 1200, height: 630, alt: title }],
            ...(type === 'article' && publishedTime ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${SITE_NAME}`,
            description,
            images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
        },
    };
}

/** Trim a long body of text down to a clean meta description. */
export function toDescription(text: string, max = 158): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max);
    const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(', '), cut.lastIndexOf(' '));
    return `${cut.slice(0, lastStop > max * 0.6 ? lastStop : max).trim()}…`;
}
