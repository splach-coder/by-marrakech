'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  image: string;
  duration: string;
  price: string;
  description?: string;
  rating?: number;
  guests?: number;
  featured?: boolean;
  notForChildren?: boolean;
}

interface ExperiencesSectionProps {
  label?: string;
  title?: string;
  experiences?: Experience[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Editorial card grid modeled on the reference "Curated Experiences" section:
// image, then title + gold price row, short description, EXPLORE link.
export default function ExperiencesSection({ label, title, experiences }: ExperiencesSectionProps) {
  const locale = useLocale();
  const t = useTranslations('experiences');

  const headerLabel = label || t('label');
  const headerTitle = title || t('title');
  const data = (experiences || []).slice(0, 6);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <motion.span variants={cardVariants} className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
            {headerLabel}
          </motion.span>
          <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif">
            {headerTitle}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {data.map(experience => (
            <motion.article key={experience.id} variants={cardVariants} className="group">
              <Link href={`/${locale}/experiences/${experience.id}`} className="block">
                {/* Image */}
                <div className="relative h-56 rounded-md overflow-hidden mb-5">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  {experience.duration && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-[10px] font-black uppercase tracking-[0.15em]">
                      {experience.duration}
                    </span>
                  )}
                </div>

                {/* Title + price */}
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h3 className="text-xl font-bold text-text-primary font-serif leading-snug group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <span className="shrink-0 text-secondary-dark font-bold font-serif text-lg">
                    {experience.price}
                  </span>
                </div>

                {/* Description */}
                {experience.description && (
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {experience.description}
                  </p>
                )}

                {/* Explore link */}
                <span className="inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.2em] border-b border-primary/30 pb-1 group-hover:border-primary group-hover:gap-3 transition-all">
                  {t('explore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 text-center"
        >
          <Link
            href={`/${locale}/explore#escapes`}
            className="inline-flex items-center gap-3 px-8 py-4 border border-border-dark text-text-primary rounded-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
