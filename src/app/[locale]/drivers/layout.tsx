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
        path: '/drivers',
        title: fr ? 'Nos Chauffeurs Privés à Marrakech' : 'Our Private Drivers in Marrakech',
        description: fr
            ? 'Rencontrez Fathallah, Ayoub et Hassan — trois chauffeurs privés vérifiés, de 10 à 22 ans d’expérience sur les routes marocaines, chacun avec ses propres véhicules.'
            : 'Meet Fathallah, Ayoub and Hassan — three verified private chauffeurs with 10 to 22 years on Moroccan roads, each driving his own vehicles. Pick your driver and book direct.',
        image: '/images/heroes/drivers-hero.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
