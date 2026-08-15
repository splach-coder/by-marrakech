import { use, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Hero from './components/Hero';
import JourneySection from './components/JourneySection';
import RoutesSection from './components/RoutesSection';
import FleetSection from './components/FleetSection';
import ExperiencesSection from './components/ExperiencesSection';
import ToursSection from './components/ToursSection';
import WhyUsSection from './components/WhyUsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import { getSiteData } from '@/data/siteData';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Homepage architecture mirrors justluxurytransfers.com
// (see docs/reference-audit/02-RESTRUCTURE-PLAN.md):
// Hero+Quote → Journey → Routes → Fleet → Experiences → Tours →
// Why Us → FAQ → CTA → Google Reviews (mounted globally in layout)
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

  return (
    <main className="min-h-screen">
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

      {/* 3. Popular Transfer Routes (fixed prices per vehicle) */}
      <RoutesSection />

      {/* 4. Our Fleet */}
      <FleetSection />

      {/* 5. Curated Experiences (day trips from Marrakech) */}
      <ExperiencesSection experiences={experiences} />

      {/* 6. Signature multi-day Tours */}
      <ToursSection tours={tours} />

      {/* 7. Why Choose Us */}
      <WhyUsSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. CTA — 10. Google Reviews follows via layout */}
      <CTASection />
    </main>
  );
}
