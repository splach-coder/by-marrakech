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
        path: '/gallery',
        title: fr ? 'Galerie Photo — Marrakech, l’Atlas & le Sahara' : 'Photo Gallery — Marrakech, the Atlas & the Sahara',
        description: fr
            ? 'Photographies des routes que nous parcourons : la médina de Marrakech, la vallée de l’Ourika, Essaouira, Aït Ben Haddou et les dunes de l’Erg Chebbi.'
            : 'Photographs from the routes we drive: Marrakech medina, the Ourika Valley, Essaouira, Ait Ben Haddou and the Erg Chebbi dunes at Merzouga.',
        image: '/images/hero-imgs/gallery.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
