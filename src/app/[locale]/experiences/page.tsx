import { redirect } from 'next/navigation';

/**
 * /experiences no longer has its own index page — the whole catalogue (tours,
 * excursions, activities and services) lives on /explore as one scroll story.
 * This route stays alive so old links, bookmarks and printed cards land on the
 * right chapter instead of a 404. Detail pages (/experiences/[id]) are untouched.
 */

interface ExperiencesIndexRedirectProps {
    params: Promise<{ locale: string }>;
}

export default async function ExperiencesIndexRedirect({ params }: ExperiencesIndexRedirectProps) {
    const { locale } = await params;
    redirect(`/${locale}/explore#escapes`);
}
