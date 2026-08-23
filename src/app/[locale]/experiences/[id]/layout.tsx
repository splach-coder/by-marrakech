import type { Metadata } from 'next';
import { getSiteData, siteData } from '@/data/siteData';
import { pageMetadata, toDescription, SITE_URL } from '@/lib/seo';
import { tripSchema, breadcrumbSchema, absolute } from '@/lib/schema';
import { cleanTitle } from '@/lib/catalogue';
import JsonLd from '@/components/JsonLd';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string; id: string }>;
}

const find = (locale: string, id: string) => {
    const list = (getSiteData(locale).excursions ?? siteData.excursions) as Array<any>;
    return list.find((item) => String(item.id) === id);
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return {};

    return pageMetadata({
        locale,
        path: `/experiences/${id}`,
        title: `${cleanTitle(item.title)} — Day Trip from Marrakech`,
        description: toDescription(item.description),
        image: item.image?.url,
    });
}

/**
 * Day excursions are TouristTrip entities, same shape as tours.
 */
export default async function Layout({ children, params }: Props) {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return children;

    const url = `${SITE_URL}/${locale}/experiences/${id}`;
    const name = cleanTitle(item.title);

    return (
        <>
            <JsonLd
                data={tripSchema({
                    name,
                    description: toDescription(item.description, 300),
                    url,
                    image: item.image?.url ? absolute(item.image.url) : undefined,
                    price: item.price,
                    locations: (item.locations ?? []).map((l: any) => (typeof l === 'string' ? l : l.name)),
                })}
            />
            <JsonLd
                data={breadcrumbSchema([
                    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${SITE_URL}/${locale}` },
                    { name: 'Excursions', url: `${SITE_URL}/${locale}/explore#escapes` },
                    { name, url },
                ])}
            />
            {children}
        </>
    );
}
