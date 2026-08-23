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
        path: '/booking',
        title: fr ? 'Composer Votre Itinéraire' : 'Build Your Itinerary',
        description: fr
            ? 'Assemblez transferts, excursions et activités en un seul itinéraire, puis confirmez sur WhatsApp avec un prix fixe.'
            : 'Assemble transfers, excursions and activities into one itinerary, then confirm on WhatsApp with a fixed price.',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
