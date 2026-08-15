'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Clock, UserCheck, Headphones } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const icons = { licensed: ShieldCheck, punctual: Clock, drivers: UserCheck, support: Headphones } as const;

export default function WhyUsSection() {
  const t = useTranslations('home.whyUs');

  return (
    <section className="py-24 bg-[#FAF9F6]">
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
          <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif">
            {t('title')}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(Object.keys(icons) as Array<keyof typeof icons>).map(key => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className="bg-white border border-border rounded-md p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-secondary/15 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-secondary-dark" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-text-primary mb-3">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{t(`items.${key}.description`)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
