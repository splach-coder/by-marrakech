'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ChevronLeft, ChevronRight, Users, Briefcase } from 'lucide-react';
import { getFleet, FleetVehicle } from '@/data/transferData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FleetCard({ vehicle, locale, t }: { vehicle: FleetVehicle; locale: string; t: (k: string) => string }) {
  return (
    <Link
      href={`/${locale}/fleet`}
      className="group relative block h-[480px] rounded-md overflow-hidden bg-background-cream"
    >
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        fill
        sizes="(max-width: 768px) 90vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Name + category chip */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-2xl font-bold text-white font-serif leading-tight">{vehicle.name}</h3>
          <span className="shrink-0 px-2.5 py-1 bg-black/50 border border-secondary/40 text-secondary text-[10px] font-black uppercase tracking-[0.15em] rounded">
            {vehicle.category}
          </span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-5 text-white/80 text-sm pb-4 border-b border-white/15">
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4 text-secondary" />
            {vehicle.pax} {t('pax')}
          </span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-secondary" />
            {vehicle.luggage} {t('bags')}
          </span>
        </div>

        {/* Price + details */}
        <div className="pt-4 flex items-end justify-between">
          <div className="text-3xl font-bold text-white font-serif leading-none">
            €{vehicle.fromPrice}
            <span className="text-secondary text-base align-top ml-0.5">+</span>
          </div>
          <span className="text-secondary text-xs font-black uppercase tracking-[0.18em] border-b border-secondary/50 pb-0.5 group-hover:border-secondary transition-colors inline-flex items-center gap-1.5">
            {t('details')}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FleetSection() {
  const locale = useLocale();
  const t = useTranslations('home.fleetSection');
  const fleet = getFleet(locale);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector(':scope > div');
    const w = card ? card.getBoundingClientRect().width + 24 : 400;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#FFFBF5] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-14 text-center max-w-3xl mx-auto"
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

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Arrows */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous vehicles"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-text-primary hover:bg-secondary hover:border-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next vehicles"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-lg text-text-primary hover:bg-secondary hover:border-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scroller}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {fleet.map(vehicle => (
              <div key={vehicle.id} className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[31.5%]">
                <FleetCard vehicle={vehicle} locale={locale} t={t} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/fleet`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-sm font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
