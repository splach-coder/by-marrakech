import type { Metadata } from 'next';
import { getSiteData, siteData } from '@/data/siteData';
import { pageMetadata, toDescription, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { cleanTitle } from '@/lib/catalogue';
import JsonLd from '@/components/JsonLd';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string; id: string }>;
}

const find = (locale: string, id: string) => {
    const list = ((getSiteData(locale) as Record<string, unknown>).events ??
        (siteData as Record<string, unknown>).events ??
        []) as Array<{ id: number | string; title: string; description?: string; image?: { url: string } }>;
    return list.find((item) => String(item.id) === id);
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return {};

    return pageMetadata({
        locale,
        path: `/events/${id}`,
        title: cleanTitle(item.title),
        description: toDescription(item.description ?? item.title),
        image: item.image?.url,
    });
}

export default async function EventLayout({ children, params }: Props) {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return children;

    return (
        <>
            <JsonLd
                data={breadcrumbSchema([
                    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${SITE_URL}/${locale}` },
                    { name: locale === 'fr' ? 'Événements' : 'Events', url: `${SITE_URL}/${locale}/events` },
                    { name: cleanTitle(item.title), url: `${SITE_URL}/${locale}/events/${id}` },
                ])}
            />
            {children}
        </>
    );
}
