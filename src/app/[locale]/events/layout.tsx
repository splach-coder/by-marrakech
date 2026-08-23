import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const fr = locale === 'fr';
    return pageMetadata({
        locale,
        path: '/events',
        title: fr ? 'Événements & Festivals à Marrakech' : 'Events & Festivals in Marrakech',
        description: fr
            ? 'Festivals, projections et concerts à Marrakech, avec transport privé aller-retour vers chaque lieu.'
            : 'Festivals, film screenings and music events in Marrakech, with private transport to and from each venue.',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
