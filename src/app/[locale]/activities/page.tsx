import { redirect } from 'next/navigation';

/**
 * /activities no longer has its own index page — the whole catalogue (tours,
 * excursions, activities and services) lives on /explore as one scroll story.
 * This route stays alive so old links, bookmarks and printed cards land on the
 * right chapter instead of a 404. Detail pages (/activities/[id]) are untouched.
 */

interface ActivitiesIndexRedirectProps {
    params: Promise<{ locale: string }>;
}

export default async function ActivitiesIndexRedirect({ params }: ActivitiesIndexRedirectProps) {
    const { locale } = await params;
    redirect(`/${locale}/explore#moments`);
}
