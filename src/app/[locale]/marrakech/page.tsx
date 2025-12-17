'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteData, siteData } from '@/data/siteData';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  MapPin,
  Star,
  Sun,
  Camera,
  Utensils,
  Landmark,
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function MarrakechPage() {
  const locale = useLocale();
  const t = useTranslations('marrakechPage');

  // Get localized data
  const localizedSiteData = getSiteData(locale);
  const toursData = localizedSiteData.tours || siteData.tours;
  const excursionsData = localizedSiteData.excursions || siteData.excursions;
  const activitiesData = localizedSiteData.activities || siteData.activities;

  // Filter data for Marrakech
  const marrakechTours = toursData.filter(t =>
    t.locations?.some(l => typeof l === 'string' ? l === "Marrakech" : l.name === "Marrakech") ||
    t.itinerary?.some(day => day.location === "Marrakech" || day.description.includes("Marrakech"))
  ).slice(0, 3); // Top 3 tours

  const marrakechExcursions = excursionsData.filter(e =>
    e.locations?.some(l => typeof l === 'string' ? l === "Marrakech" : l.name === "Marrakech")
  ).slice(0, 4); // Top 4 excursions

  const marrakechActivities = activitiesData.filter(a =>
    a.locations?.includes("Marrakech") || a.title.includes("Marrakech")
  ).slice(0, 4);

  const highlights = [
    { icon: Landmark, title: t('intro.highlights.medina.title'), desc: t('intro.highlights.medina.desc') },
    { icon: Utensils, title: t('intro.highlights.food.title'), desc: t('intro.highlights.food.desc') },
    { icon: Sun, title: t('intro.highlights.sun.title'), desc: t('intro.highlights.sun.desc') },
    { icon: Camera, title: t('intro.highlights.photo.title'), desc: t('intro.highlights.photo.desc') }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* 1. CINEMA HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/marrakech/marrakech12.jpg"
            alt={t('hero.title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-white/90 text-sm font-medium tracking-[0.2em] mb-6 backdrop-blur-sm bg-white/5 uppercase">
              {t('hero.tag')}
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-medium tracking-tight mb-8">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 2. INTRODUCTORY EDITORIAL */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
              {t.rich('intro.title', {
                span: (chunks) => <span className="italic text-primary">{chunks}</span>
              })}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
              {t('intro.desc1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
              {t('intro.desc2')}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#faf9f6] flex items-center justify-center text-primary">
                    <h.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{h.title}</h4>
                    <p className="text-sm text-gray-500">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/marrakech/marrakech13.jpg"
                alt="Marrakech Riad"
                fill
                className="object-cover"
              />
            </div>
            {/* Playful Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
              <p className="font-serif text-lg italic text-gray-800">
                &quot;{t('intro.quote')}&quot;
              </p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-wide font-bold">
                — {t('intro.author')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SIGNATURE TOURS (Starting from Marrakech) */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <motion.div {...fadeInUp}>
              <span className="text-primary uppercase tracking-widest font-bold text-sm mb-3 block">{t('tours.tag')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900">{t('tours.title')}</h2>
            </motion.div>
            <Link href="/tours" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group">
              <span className="uppercase tracking-wider font-medium text-sm">{t('tours.viewAll')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {marrakechTours.map((tour) => (
              <motion.div
                key={tour.id}
                variants={fadeInUp}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Link href={`/${locale}/tours/${tour.id}`} className="block h-full">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={tour.image?.url}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary rounded-full">
                      {tour.duration}
                    </div>
                  </div>
                  <div className="relative -mt-20 p-6 z-10">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-primary-300 transition-colors">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.locations?.length || 0} {t('tours.stops')}</span>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 h-full mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tour.highlights?.slice(0, 2).map((h, i) => (
                          <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-gray-900">5.0</span>
                        </div>
                        <span className="flex items-center gap-1 text-primary font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all">
                          {t('tours.details')} <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/tours" className="btn-primary inline-flex items-center gap-2">
              {t('tours.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. DAY TRIPS & EXCURSIONS */}
      <section className="py-24 bg-white">
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-3 block">{t('dayTrips.tag')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">{t('dayTrips.title')}</h2>
            <p className="text-gray-600 font-light text-lg">
              {t('dayTrips.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marrakechExcursions.map((excursion, idx) => (
              <motion.div
                key={excursion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <Link href={`/${locale}/excursions/${excursion.id}`} className="block h-full w-full">
                  <Image
                    src={excursion.image?.url}
                    alt={excursion.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                      {excursion.duration}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4 group-hover:translate-x-2 transition-transform">
                      {excursion.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span>{t('dayTrips.discover')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCES (Activities) */}
      <section className="py-24 bg-primary text-white">
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">{t('activities.title')}</h2>
              <p className="text-white/60 font-light max-w-xl text-lg">
                {t('activities.subtitle')}
              </p>
            </div>
            {/* Decorative element */}
            <div className="w-24 h-1 bg-secondary text-white hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {marrakechActivities.map((activity) => (
              <Link href={`/${locale}/activities/${activity.id}`} key={activity.id} className="block group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 transition-all duration-500">
                  <Image
                    src={activity.image?.url}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20">
                      <h4 className="text-lg font-serif font-bold text-white leading-tight">
                        {activity.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
            {t.rich('cta.title', {
              br: () => <br />
            })}
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto mb-12">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span>{t('cta.whatsapp')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center gap-3"
            >
              <span>{t('cta.contact')}</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}