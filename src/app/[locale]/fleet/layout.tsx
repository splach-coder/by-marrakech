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
        title: fr ? 'Notre Flotte : 10 Véhicules avec Chauffeur à Marrakech' : 'Our Fleet: 10 Chauffeur-Driven Vehicles in Marrakech',
        description: fr
            ? 'Dix véhicules pour vos transferts et circuits à Marrakech — Ford Tourneo Custom, Fiat Scudo, Volkswagen Crafter et MAN TGE. De 7 à 17 places, prix fixes dès 130 €.'
            : 'Ten vehicles for Marrakech transfers and tours — Ford Tourneo Custom, Fiat Scudo, Volkswagen Crafter and MAN TGE. Seats 7 to 17, fixed prices from €130.',
        image: '/images/heroes/fleet-hero.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
