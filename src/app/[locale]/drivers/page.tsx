'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Star, Shield, Globe, Car, ArrowRight, Users } from 'lucide-react';
import { driversData, driversDataFr } from '@/data/drivers';
import PageBanner from '../components/PageBanner';

interface DriversPageProps {
  params: Promise<{ locale: string }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DriversPage({ params }: DriversPageProps) {
  const { locale } = use(params);
  const t = useTranslations('driversPage');
  const drivers = locale === 'fr' ? driversDataFr : driversData;

  return (
    <main className="min-h-screen bg-background">
      {/* Standard full-width page banner */}
      <PageBanner
        image="/images/heroes/drivers-hero.webp"
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      {/* Drivers grid */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <motion.span variants={cardVariants} className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
              {t('label')}
            </motion.span>
            <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C]">
              {t('titleStart')} <span className="text-secondary-dark font-serif italic">{t('titleAccent')}</span>
            </motion.h2>
            <motion.p variants={cardVariants} className="mt-3 text-sm text-text-secondary leading-relaxed">
              {t('subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {drivers.map(driver => (
              <motion.article
                key={driver.id}
                variants={cardVariants}
                className="group flex flex-col bg-white border border-border rounded-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/${locale}/drivers/${driver.id}`} className="flex flex-1 flex-col">
                  {/* Header: portrait + identity */}
                  <div className="p-7 flex items-center gap-5 border-b border-border-light">
                    <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-background-cream shadow-md">
                      <Image
                        src={driver.image}
                        alt={driver.name}
                        fill
                        sizes="96px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-text-primary font-serif group-hover:text-primary transition-colors">
                        {driver.name}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1 font-bold text-text-primary">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          {driver.rating.toFixed(1)}
                        </span>
                        <span className="text-text-tertiary">·</span>
                        <span className="inline-flex items-center gap-1.5 text-text-secondary">
                          <Shield className="w-3.5 h-3.5 text-secondary-dark" />
                          {t('years', { years: driver.experienceYears })}
                        </span>
                      </div>
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-text-tertiary">
                        <Globe className="mt-0.5 w-3.5 h-3.5 shrink-0 text-secondary-dark" />
                        <span className="leading-snug">{driver.languages.join(' · ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="px-7 pt-5 flex flex-wrap gap-2">
                    {driver.specialties.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-background border border-border rounded-sm text-[10px] font-black uppercase tracking-[0.12em] text-text-secondary">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* His fleet */}
                  <div className="px-7 pt-5">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary mb-3 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-secondary-dark" />
                      {t('hisFleet')}
                    </span>
                    <div className={`grid gap-3 ${driver.fleet.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {driver.fleet.map(v => (
                        <div key={v.name} className="border border-border-light rounded-sm overflow-hidden">
                          <div className="relative aspect-[16/10] overflow-hidden bg-background-cream">
                            <Image
                              src={v.image}
                              alt={v.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 220px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="px-2.5 py-2">
                            {/* names wrap rather than truncate — "Volkswagen Crafter" must stay readable */}
                            <span className="block text-[11px] font-bold leading-tight text-text-primary">{v.name}</span>
                            <span className="mt-0.5 flex items-center gap-1 text-[10px] text-text-tertiary">
                              <Users className="w-3 h-3" />
                              {v.pax} pax
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer: one full-width CTA — drivers are quoted per trip, not per day */}
                  <div className="mx-7 mb-7 mt-auto pt-6 border-t border-border-light">
                    <span className="flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-white transition-colors rounded-sm group-hover:bg-primary-dark">
                      {t('viewProfile')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
