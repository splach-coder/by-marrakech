import { use, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ExperiencesSection from './components/ExperiencesSection';
import Hero from './components/Hero';
import ToursSection from './components/ToursSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import ServicesSection from './components/ServicesSection';
import ActivitiesSection from './components/ActivitiesSection';
import { getSiteData } from '@/data/siteData';
import { getHomeData } from '@/lib/i18n-data';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  const t = useTranslations('home');
  const homeData = getHomeData(locale as 'en' | 'fr');
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
  const experiences = useMemo(() => (localizedSiteData.excursions || []).slice(0, 4).map(excursion => ({
    id: String(excursion.id),
    title: excursion.title,
    image: excursion.image.url,
    duration: excursion.duration,
    price: excursion.price,
    rating: 5,
    guests: 15,
    featured: false,
    notForChildren: false
  })), [localizedSiteData]);

  // Map services from siteData
  const services = useMemo(() => (localizedSiteData.services || []).slice(0, 3).map(service => ({
    id: String(service.id),
    title: service.title,
    description: service.description,
    image: service.image.url,
    price: service.price,
    highlights: service.highlights
  })), [localizedSiteData]);

  // Map activities from siteData
  const activities = useMemo(() => (localizedSiteData.activities || []).slice(0, 6).map(activity => ({
    id: String(activity.id),
    title: activity.title,
    image: activity.image.url,
    description: activity.description,
    locations: activity.locations
  })), [localizedSiteData]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
      />

      {/* About Xhosen Section */}
      <AboutSection
        label={homeData.about.label}
        title={homeData.about.title}
        description1={homeData.about.description1}
        description2={homeData.about.description2}
        stats={homeData.about.stats}
      />

      {/* Tours Section */}
      <ToursSection tours={tours} />

      {/* Excursions/Experiences Section */}
      <ExperiencesSection experiences={experiences} />

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Activities Section */}
      <ActivitiesSection activities={activities} />

      {/* Events Section */}
      <EventsSection events={homeData.events} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={homeData.testimonials} />

      {/* CTA Section */}
      <CTASection />

    </main>
  );
}