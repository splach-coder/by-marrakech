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
        path: '/marrakech',
        title: fr ? 'Guide de Marrakech : Que Voir et Comment Circuler' : 'Marrakech Travel Guide: What to See & How to Get Around',
        description: fr
            ? 'Un aperçu pratique de Marrakech — la médina, Jemaa el-Fna, le jardin Majorelle, les excursions dans l’Atlas et comment circuler en ville.'
            : 'A practical overview of Marrakech — the medina, Jemaa el-Fnaa, the Majorelle garden, day trips into the Atlas, and how to move around the city.',
        image: '/images/marrakech/hero.webp',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
