import { redirect } from 'next/navigation';

/**
 * /tours no longer has its own index page — the whole catalogue (tours,
 * excursions, activities and services) lives on /explore as one scroll story.
 * This route stays alive so old links, bookmarks and printed cards land on the
 * right chapter instead of a 404. Detail pages (/tours/[slug]) are untouched.
 */

interface ToursIndexRedirectProps {
    params: Promise<{ locale: string }>;
}

export default async function ToursIndexRedirect({ params }: ToursIndexRedirectProps) {
    const { locale } = await params;
    redirect(`/${locale}/explore#journeys`);
}
