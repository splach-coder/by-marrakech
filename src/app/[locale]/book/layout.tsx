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
        path: '/book',
        title: fr ? 'Réservez Votre Transfert ou Circuit' : 'Book Your Transfer or Tour',
        description: fr
            ? 'Envoyez vos dates et le nombre de voyageurs : nous revenons avec un prix fixe tout compris — sans acompte, confirmation sur WhatsApp.'
            : 'Send your dates and party size and we come back with a fixed, all-in price — no deposit, no card details, confirmation on WhatsApp.',
    });
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
