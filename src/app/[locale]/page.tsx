import { use, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Hero from './components/Hero';
import JourneySection from './components/JourneySection';
import FleetSection from './components/FleetSection';
import ExperiencesSection from './components/ExperiencesSection';
import ToursSection from './components/ToursSection';
import WhyUsSection from './components/WhyUsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import { getSiteData } from '@/data/siteData';
import { getFaq } from '@/data/transferData';
import { pageMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import type { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Homepage architecture mirrors justluxurytransfers.com
// (see docs/reference-audit/02-RESTRUCTURE-PLAN.md):
// Hero+Quote → Journey → Fleet → Experiences → Tours →
// Why Us → FAQ → CTA → Google Reviews (mounted globally in layout)
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === 'fr';
  return pageMetadata({
    locale,
    path: '',
    title: fr
      ? 'Transferts Privés & Circuits à Marrakech'
      : 'Private Transfers & Tours in Marrakech',
    description: fr
      ? 'Transferts privés depuis l’aéroport de Marrakech Menara, excursions dans l’Atlas et circuits dans le désert. Prix fixes par véhicule, chauffeurs vérifiés, disponibles 24h/24.'
      : 'Private transfers from Marrakech Menara Airport, Atlas day trips and Sahara tours. Fixed prices per vehicle, verified chauffeurs, available 24/7.',
    image: '/images/heroes/fleet-hero.webp',
  });
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  const t = useTranslations('home');
  const localizedSiteData = getSiteData(locale);

  // Map tours from siteData
  const tours = useMemo(() => localizedSiteData.tours.slice(0, 2).map(tour => ({
    id: String(tour.id),
    slug: String(tour.id),
    title: tour.title,
    days: tour.duration,
    date: locale === 'fr' ? 'Tous les jours' : 'Daily',
    image: tour.image.url,
    featured: false,
    notForChildren: false
  })), [localizedSiteData, locale]);

  // Map excursions from siteData
  const experiences = useMemo(() => (localizedSiteData.excursions || []).slice(0, 6).map(excursion => ({
    id: String(excursion.id),
    title: excursion.title,
    image: excursion.image.url,
    duration: excursion.duration,
    price: excursion.price,
    description: excursion.description,
    rating: 5,
    guests: 15,
    featured: false,
    notForChildren: false
  })), [localizedSiteData]);

  const faq = getFaq(locale);

  return (
    <main className="min-h-screen">
      {/* The FAQ section below is genuine Q&A, so it earns FAQPage markup. */}
      <JsonLd data={faqSchema(faq)} />
      {/* 1. Hero + instant quote widget */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
        showQuoteWidget
      />

      {/* 2. Choose Your Journey — Transfers / Fleet / Excursions */}
      <JourneySection />

      {/* 3. Our Fleet */}
      <FleetSection />

      {/* 4. Curated Experiences (day trips from Marrakech) */}
      <ExperiencesSection experiences={experiences} />

      {/* 5. Signature multi-day Tours */}
      <ToursSection tours={tours} />

      {/* 6. Why Choose Us */}
      <WhyUsSection />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. CTA — 9. Google Reviews follows via layout */}
      <CTASection />
    </main>
  );
}
