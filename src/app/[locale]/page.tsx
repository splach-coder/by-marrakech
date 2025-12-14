import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ExperiencesSection from './components/ExperiencesSection';
import Hero from './components/Hero';
import { useTranslations } from 'next-intl';
import ToursSection from './components/ToursSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import { siteData } from '@/data/siteData';
import ServicesSection from './components/ServicesSection';
import ActivitiesSection from './components/ActivitiesSection';

export default function HomePage() {
  const t = useTranslations('home');

  // Map tours from siteData
  const tours = siteData.tours.slice(0, 2).map(tour => ({
    id: String(tour.id),
    slug: String(tour.id),
    title: tour.title,
    days: tour.duration,
    date: 'Daily',
    image: tour.image.url,
    featured: false,
    notForChildren: false
  }));

  // Map excursions from siteData
  const experiences = siteData.excursions.slice(0, 4).map(excursion => ({
    id: String(excursion.id),
    title: excursion.title,
    image: excursion.image.url,
    duration: excursion.duration,
    price: excursion.price,
    rating: 5,
    guests: 15,
    featured: false,
    notForChildren: false
  }));

  // Map services from siteData
  const services = siteData.services.slice(0, 3).map(service => ({
    id: String(service.id),
    title: service.title,
    description: service.description,
    image: service.image.url,
    price: service.price,
    highlights: service.highlights
  }));

  // Map activities from siteData
  const activities = siteData.activities.slice(0, 6).map(activity => ({
    id: String(activity.id),
    title: activity.title,
    image: activity.image.url,
    description: activity.description,
    locations: activity.locations
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
      />

      {/* About ByMarrakech Section */}
      <AboutSection />

      {/* Tours Section */}
      <ToursSection tours={tours} />

      {/* Excursions/Experiences Section */}
      <ExperiencesSection experiences={experiences} />

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Activities Section */}
      <ActivitiesSection activities={activities} />

      {/* Events Section */}
      <EventsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

    </main>
  );
}