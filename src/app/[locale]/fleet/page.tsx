'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Briefcase, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { getFleet, whatsappLink } from '@/data/transferData';
import CTASection from '../components/CTASection';
import PageBanner from '../components/PageBanner';

interface FleetPageProps {
  params: Promise<{ locale: string }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FleetPage({ params }: FleetPageProps) {
  const { locale } = use(params);
  const t = useTranslations('fleetPage');
  const fleet = getFleet(locale);

  return (
    <main className="min-h-screen bg-background">
      {/* Standard full-width page banner */}
      <PageBanner
        image="/images/services/luxury_driver_service.webp"
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      {/* Vehicle grid */}
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
              {t('gridLabel')}
            </motion.span>
            <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif">
              {t('gridTitle')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {fleet.map(vehicle => (
              <motion.article
                key={vehicle.id}
                variants={cardVariants}
                className="group bg-white border border-border rounded-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image with reference-style overlay: name + category chip + specs */}
                <div className="relative h-72 md:h-80 overflow-hidden bg-background-cream">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white font-serif leading-tight">{vehicle.name}</h3>
                      <span className="shrink-0 px-2.5 py-1 bg-black/50 border border-secondary/40 text-secondary text-[10px] font-black uppercase tracking-[0.15em] rounded">
                        {vehicle.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 text-white/85 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-secondary" />
                        {vehicle.pax} {locale === 'fr' ? 'pers.' : 'pax'}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-secondary" />
                        {vehicle.luggage} {locale === 'fr' ? 'bagages' : 'bags'}
                      </span>
                      <span className="ml-auto text-2xl font-bold text-white font-serif leading-none">
                        €{vehicle.fromPrice}
                        <span className="text-secondary text-sm align-top ml-0.5">+</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-sm text-text-secondary leading-relaxed">{vehicle.description}</p>

                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-secondary-dark shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-border-light">
                    <a
                      href={whatsappLink(`${t('waIntro')} ${vehicle.name} (${t('colPrice')} €${vehicle.fromPrice})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('bookVehicle')}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* At a glance — comparison table */}
      <section className="py-24 bg-[#FAF9F6] border-y border-border-light">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="mb-14 text-center max-w-3xl mx-auto"
          >
            <motion.span variants={cardVariants} className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
              {t('glanceLabel')}
            </motion.span>
            <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif">
              {t('glanceTitle')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto rounded-md border border-border bg-white"
          >
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-secondary">{t('colVehicle')}</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-secondary">{t('colCategory')}</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-secondary">{t('colPax')}</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-secondary">{t('colLuggage')}</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-secondary text-right">{t('colPrice')}</th>
                </tr>
              </thead>
              <tbody>
                {fleet.map((vehicle, i) => (
                  <tr key={vehicle.id} className={`border-b border-border-light last:border-0 ${i % 2 === 1 ? 'bg-background/50' : ''}`}>
                    <td className="px-6 py-4 font-bold text-text-primary">{vehicle.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-secondary/15 text-secondary-dark text-[10px] font-black uppercase tracking-wider rounded-sm">
                        {vehicle.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{vehicle.pax}</td>
                    <td className="px-6 py-4 text-text-secondary">{vehicle.luggage}</td>
                    <td className="px-6 py-4 text-right font-bold text-primary">€{vehicle.fromPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Not sure which vehicle? */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12 bg-white border border-border rounded-md p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary font-serif">{t('notSureTitle')}</h3>
              <p className="mt-2 text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">{t('notSureText')}</p>
            </div>
            <a
              href={whatsappLink(t('notSureTitle'))}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-[#3b2f2f] rounded-sm font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-secondary-dark hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              {t('notSureCta')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA — Google Reviews follows via layout */}
      <CTASection />
    </main>
  );
}
