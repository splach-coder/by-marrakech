import type { Metadata } from 'next';
import { getSiteData, siteData } from '@/data/siteData';
import { pageMetadata, toDescription, SITE_URL } from '@/lib/seo';
import { serviceSchema, breadcrumbSchema, absolute } from '@/lib/schema';
import { cleanTitle } from '@/lib/catalogue';
import JsonLd from '@/components/JsonLd';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string; id: string }>;
}

const find = (locale: string, id: string) => {
    const list = (getSiteData(locale).services ?? siteData.services) as Array<any>;
    return list.find((item) => String(item.id) === id);
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return {};

    return pageMetadata({
        locale,
        path: `/services/${id}`,
        title: `${cleanTitle(item.title)}`,
        description: toDescription(item.description),
        image: item.image?.url,
    });
}

/**
 * Transfer services are Service entities provided by the LocalBusiness.
 */
export default async function Layout({ children, params }: Props) {
    const { locale, id } = await params;
    const item = find(locale, id);
    if (!item) return children;

    const url = `${SITE_URL}/${locale}/services/${id}`;
    const name = cleanTitle(item.title);

    return (
        <>
            <JsonLd
                data={serviceSchema({
                    name,
                    description: toDescription(item.description, 300),
                    url,
                    image: item.image?.url ? absolute(item.image.url) : undefined,
                    price: item.price,
                })}
            />
            <JsonLd
                data={breadcrumbSchema([
                    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${SITE_URL}/${locale}` },
                    { name: 'Services', url: `${SITE_URL}/${locale}/explore#services` },
                    { name, url },
                ])}
            />
            {children}
        </>
    );
}
