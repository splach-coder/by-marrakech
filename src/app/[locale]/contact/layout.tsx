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
        path: '/contact',
        title: fr ? 'Nous Contacter — WhatsApp, Téléphone & E-mail' : 'Contact Us — WhatsApp, Phone & Email',
        description: fr
            ? 'Contactez Xhosen Gate 24h/24 pour vos transferts, circuits et itinéraires sur mesure à Marrakech. WhatsApp pour une réponse immédiate, ou envoyez une demande.'
            : 'Reach Xhosen Gate 24/7 for Marrakech transfers, tours and custom itineraries. WhatsApp for an instant reply, or send a request and we answer within two hours.',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
