import type { Metadata } from 'next';
import { getExploreCopy } from './content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const meta = getExploreCopy(locale).meta;
    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            images: ['/images/merzouga/merzouga1.webp'],
        },
    };
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
    return children;
}
