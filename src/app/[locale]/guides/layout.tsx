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
        path: '/guides',
        title: fr ? 'Guides de Voyage Marrakech : Transferts & Conseils' : 'Marrakech Travel Guides: Transfers, Trips & Tips',
        description: fr
            ? 'Dix-huit guides pratiques sur Marrakech — prix des transferts aéroport, excursions, meilleure période, se déplacer et le taxi vaut-il le coup.'
            : 'Eighteen practical guides to Marrakech — airport transfer prices, day-trip routes, when to visit, getting around and whether a taxi is worth it.',
        image: '/images/hero-imgs/tours.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
