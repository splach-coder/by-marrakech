import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuide, getGuideContent, getCategoryLabel } from '@/data/guidesData';
import { pageMetadata, toDescription, SITE_URL } from '@/lib/seo';
import { articleSchema, breadcrumbSchema, absolute } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
    const { locale, slug } = await params;
    const guide = getGuide(slug);
    if (!guide) return {};
    const content = getGuideContent(guide, locale);

    return pageMetadata({
        locale,
        path: `/guides/${slug}`,
        title: content.title,
        description: toDescription(content.excerpt),
        image: guide.image,
        type: 'article',
        publishedTime: guide.date,
    });
}

/**
 * Guides carry Article schema with real dates. Freshness is one of the
 * strongest AI-citation signals — content under three months old is ~3x more
 * likely to be cited — and until now the site published no dates at all, so
 * every article read as undated.
 */
export default async function GuideLayout({ children, params }: Props) {
    const { locale, slug } = await params;
    const guide = getGuide(slug);
    if (!guide) notFound();

    const content = getGuideContent(guide, locale);
    const url = `${SITE_URL}/${locale}/guides/${slug}`;

    return (
        <>
            <JsonLd
                data={articleSchema({
                    headline: content.title,
                    description: toDescription(content.excerpt, 300),
                    url,
                    image: absolute(guide.image),
                    datePublished: guide.date,
                    section: getCategoryLabel(guide.category, locale),
                })}
            />
            <JsonLd
                data={breadcrumbSchema([
                    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `${SITE_URL}/${locale}` },
                    { name: 'Guides', url: `${SITE_URL}/${locale}/guides` },
                    { name: content.title, url },
                ])}
            />
            {children}
        </>
    );
}
