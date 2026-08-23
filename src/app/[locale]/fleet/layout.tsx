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
        path: '/fleet',
        title: fr ? 'Notre Flotte : 8 Véhicules avec Chauffeur à Marrakech' : 'Our Fleet: 8 Chauffeur-Driven Vehicles in Marrakech',
        description: fr
            ? 'Huit véhicules pour vos transferts et circuits à Marrakech — Ford Tourneo Custom, Fiat Scudo, Volkswagen Crafter, MAN TGE et Skoda Kodiaq. De 5 à 19 places, prix fixes dès 30 €.'
            : 'Eight vehicles for Marrakech transfers and tours — Ford Tourneo Custom, Fiat Scudo, Volkswagen Crafter, MAN TGE and Skoda Kodiaq. Seats 5 to 19, fixed prices from €30.',
        image: '/images/heroes/fleet-hero.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
