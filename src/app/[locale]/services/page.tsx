import { redirect } from 'next/navigation';

/**
 * /services no longer has its own index page — the whole catalogue (tours,
 * excursions, activities and services) lives on /explore as one scroll story.
 * This route stays alive so old links, bookmarks and printed cards land on the
 * right chapter instead of a 404. Detail pages (/services/[id]) are untouched.
 */

interface ServicesIndexRedirectProps {
    params: Promise<{ locale: string }>;
}

export default async function ServicesIndexRedirect({ params }: ServicesIndexRedirectProps) {
    const { locale } = await params;
    redirect(`/${locale}/explore#services`);
}
