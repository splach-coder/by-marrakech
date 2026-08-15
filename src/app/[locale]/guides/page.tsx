'use client';

import { use, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import { getGuides, getGuideContent, getCategoryLabel, formatGuideDate } from '@/data/guidesData';

interface GuidesPageProps {
  params: Promise<{ locale: string }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function GuidesPage({ params }: GuidesPageProps) {
  const { locale } = use(params);
  const t = useTranslations('guidesPage');
  const guides = useMemo(() => getGuides(), []);
  const categories = useMemo(() => [...new Set(guides.map(g => g.category))], [guides]);
  const [filter, setFilter] = useState<string | null>(null);

  const visible = filter ? guides.filter(g => g.category === filter) : guides;

  return (
    <main className="min-h-screen bg-background">
      {/* Standard full-width page banner */}
      <PageBanner
        image="/images/marrakech.webp"
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      {/* Featured: Marrakech city guide (merged from /marrakech) */}
      <section className="py-14">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href={`/${locale}/marrakech`}
              className="group relative block h-[300px] md:h-[340px] rounded-md overflow-hidden"
            >
              <Image
                src="/images/hero.jpeg"
                alt={t('featuredTitle')}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
              <div className="absolute inset-0 flex items-center">
                <div className="p-8 md:p-12 max-w-xl">
                  <span className="inline-flex items-center gap-2 text-secondary text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {t('featuredKicker')}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-3">{t('featuredTitle')}</h2>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-5">{t('featuredText')}</p>
                  <span className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em] border-b border-secondary/50 pb-1 group-hover:gap-3.5 transition-all">
                    {t('featuredCta')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-6">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFilter(null)}
              className={`px-5 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-[0.15em] border transition-colors ${
                !filter ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border hover:border-primary hover:text-primary'
              }`}
            >
              {t('allGuides')}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? null : cat)}
                className={`px-5 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-[0.15em] border transition-colors ${
                  filter === cat ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border hover:border-primary hover:text-primary'
                }`}
              >
                {getCategoryLabel(cat, locale)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides grid */}
      <section className="pb-24 pt-8">
        <div className="container-custom">
          <motion.div
            key={filter || 'all'}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          >
            {visible.map(guide => {
              const content = getGuideContent(guide, locale);
              return (
                <motion.article key={guide.slug} variants={cardVariants} className="group">
                  <Link href={`/${locale}/guides/${guide.slug}`} className="block">
                    <div className="relative h-52 rounded-md overflow-hidden mb-5">
                      <Image
                        src={guide.image}
                        alt={content.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <span className="block text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-2.5">
                      {getCategoryLabel(guide.category, locale)}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary font-serif leading-snug mb-2.5 group-hover:text-primary transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                      {content.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-tertiary">
                        {formatGuideDate(guide.date, locale)}
                      </span>
                      <span className="inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.18em] group-hover:gap-3 transition-all">
                        {t('readGuide')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
