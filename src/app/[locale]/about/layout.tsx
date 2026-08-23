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
        path: '/about',
        title: fr ? 'À Propos de Xhosen Gate — Transferts & Circuits' : 'About Xhosen Gate — Marrakech Transfers & Tours',
        description: fr
            ? 'Qui nous sommes : un opérateur de transferts privés et de circuits basé à Marrakech, avec notre propre flotte et nos propres chauffeurs, à prix fixes.'
            : 'Who we are: a Marrakech-based private transfer and tour operator running our own fleet and our own chauffeurs, with fixed prices and no intermediaries.',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
