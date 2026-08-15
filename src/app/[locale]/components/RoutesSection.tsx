'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Clock, MoveHorizontal, Send } from 'lucide-react';
import { getRoutes, whatsappLink } from '@/data/transferData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RoutesSection() {
  const locale = useLocale();
  const t = useTranslations('home.routes');
  const routes = getRoutes(locale);

  return (
    <section id="routes" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
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
          <motion.p variants={cardVariants} className="mt-3 text-sm text-text-secondary leading-relaxed">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {routes.map(route => (
            <motion.div
              key={route.id}
              variants={cardVariants}
              className="group relative h-[340px] rounded-md overflow-hidden"
            >
              {/* Destination photo + overlay */}
              <Image
                src={route.image}
                alt={`${route.from} → ${route.to}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

              {/* Top: route line — origin ●··✈··○ destination */}
              <div className="absolute top-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span className="flex-1 border-t border-dotted border-white/40 relative">
                    <Send className="w-3.5 h-3.5 text-secondary absolute left-1/2 -translate-x-1/2 -top-[8px] rotate-12" />
                  </span>
                  <span className="w-2 h-2 rounded-full border-2 border-secondary shrink-0" />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-white text-[13px] font-black uppercase tracking-wide leading-snug max-w-[48%]">
                    {route.from}
                  </span>
                  <span className="text-secondary text-[13px] font-black uppercase tracking-wide leading-snug text-right max-w-[48%]">
                    {route.to}
                  </span>
                </div>

                {/* Chips */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md text-white/90 text-[11px] font-bold uppercase tracking-wider">
                    <MoveHorizontal className="w-3 h-3" />
                    {route.distance}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md text-white/90 text-[11px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {route.duration}
                  </span>
                </div>
              </div>

              {/* Bottom: price + book */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">
                    {t('startingFrom')}
                  </div>
                  <div className="text-4xl font-bold text-secondary font-serif leading-none">
                    €{route.fromPrice}
                    <span className="text-[11px] font-sans font-medium text-white/70 ml-1.5">{t('perVehicle')}</span>
                  </div>
                </div>
                <a
                  href={whatsappLink(`${t('waIntro')} ${route.from} → ${route.to} (${t('startingFrom')} €${route.fromPrice})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-secondary/60 text-secondary rounded-sm text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 hover:bg-secondary hover:text-[#3b2f2f]"
                >
                  {t('book')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-text-tertiary"
        >
          {t('note')}
        </motion.p>
      </div>
    </section>
  );
}
