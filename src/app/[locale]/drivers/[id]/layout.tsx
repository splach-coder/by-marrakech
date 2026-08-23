import type { Metadata } from 'next';
import { driversData, driversDataFr } from '@/data/drivers';
import { pageMetadata, toDescription, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema, absolute } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string; id: string }>;
}

const find = (locale: string, id: string) =>
    (locale === 'fr' ? driversDataFr : driversData).find((d) => d.id === id);

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
    const { locale, id } = await params;
    const driver = find(locale, id);
    if (!driver) return {};
    const fr = locale === 'fr';

    return pageMetadata({
        locale,
        path: `/drivers/${id}`,
        title: fr
            ? `${driver.name} — Chauffeur Privé à Marrakech`
            : `${driver.name} — Private Driver in Marrakech`,
        description: toDescription(driver.bio),
        image: driver.image,
    });
}

/**
 * A driver is a Person employed by the business, with the vehicles he drives
 * listed as owned assets. This is the entity link that lets an AI surface
 * answer "who drives for Xhosen Gate" with names rather than a page title.
 */
export default async function DriverLayout({ children, params }: Props) {
    const { locale, id } = await params;
    const driver = find(locale, id);
    if (!driver) return children;

    const url = `${SITE_URL}/${locale}/drivers/${id}`;

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: driver.name,
                    description: driver.bio,
                    url,
                    image: absolute(driver.image),
                    jobTitle: locale === 'fr' ? 'Chauffeur privé' : 'Private chauffeur',
                    knowsLanguage: driver.languages,
                    worksFor: { '@id': `${SITE_URL}/#business` },
                    owns: driver.fleet.map((v) => ({
                        '@type': 'Vehicle',
                        name: v.name,
                        vehicleSeatingCapacity: v.pax,
                    })),
                    areaServed: driver.locations.map((name) => ({ '@type': 'City', name })),
                }}
            />
            <JsonLd
                data={breadcrumbSchema([
                    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${SITE_URL}/${locale}` },
                    { name: locale === 'fr' ? 'Chauffeurs' : 'Drivers', url: `${SITE_URL}/${locale}/drivers` },
                    { name: driver.name, url },
                ])}
            />
            {children}
        </>
    );
}
