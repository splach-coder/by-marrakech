'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function JourneySection() {
  const locale = useLocale();
  const t = useTranslations('home.journey');

  const cards = [
    { key: 'transfers', kicker: t('transfers.kicker'), image: '/images/services/car_rental.jpeg', href: `/${locale}/services/421` },
    { key: 'fleet', kicker: t('fleet.kicker'), image: '/images/fleet/ford-tourneo-custom.webp', href: `/${locale}/fleet` },
    { key: 'excursions', kicker: t('excursions.kicker'), image: '/images/ouzoud.webp', href: `/${locale}/explore#escapes` },
  ] as const;

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="container-custom relative z-10">
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
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ key, kicker, image, href }) => (
            <motion.div key={key} variants={cardVariants} className="group relative h-[540px] rounded-md overflow-hidden">
              <Link href={href} className="block h-full w-full">
                <Image
                  src={image}
                  alt={t(`${key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="block text-secondary text-[11px] font-black uppercase tracking-[0.3em] mb-3">
                    {kicker}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-3 font-serif">{t(`${key}.title`)}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">{t(`${key}.description`)}</p>
                  <span className="block w-12 h-0.5 bg-secondary transition-all duration-500 group-hover:w-24" />
                  <span className="mt-5 inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.18em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    {t(`${key}.cta`)}
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
