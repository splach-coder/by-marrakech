'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import WhatsAppIcon, { WA_BUTTON } from '@/components/WhatsAppIcon';
import {
  getGuide, getGuideContent, getCategoryLabel, getRelatedGuides, formatGuideDate,
} from '@/data/guidesData';
import { whatsappLink } from '@/data/transferData';

interface GuidePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default function GuideArticlePage({ params }: GuidePageProps) {
  const { locale, slug } = use(params);
  const t = useTranslations('guidesPage');
  const guide = getGuide(slug);
  if (!guide) notFound();

  const content = getGuideContent(guide, locale);
  const related = getRelatedGuides(slug, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={guide.image}
            alt={content.title}
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        </motion.div>

        <div className="relative z-10 h-full flex items-end pb-14">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Link
                href={`/${locale}/guides`}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-[0.18em] mb-6 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('backToGuides')}
              </Link>
              <span className="block text-secondary text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                {getCategoryLabel(guide.category, locale)}
              </span>
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white font-serif leading-tight max-w-4xl">
                {content.title}
              </h1>
              <div className="mt-5 text-white/70 text-sm font-medium">
                {formatGuideDate(guide.date, locale)} · Xhosen Gate
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed border-l-4 border-secondary pl-6 mb-14"
            >
              {content.excerpt}
            </motion.p>

            <div className="space-y-12">
              {content.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary font-serif mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-[15px] md:text-base text-text-secondary leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.list && section.list.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item, k) => (
                        <li key={k} className="flex items-start gap-3 text-[15px] text-text-secondary leading-relaxed">
                          <Check className="w-4 h-4 text-secondary-dark shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Inline CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-[#FFFBF5] border border-border rounded-md p-8 md:p-10 text-center"
            >
              <h3 className="text-2xl font-bold text-text-primary font-serif mb-3">{t('ctaTitle')}</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-6">
                {t('ctaText')}
              </p>
              <a
                href={whatsappLink(t('ctaWa'))}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-sm font-black text-[13px] uppercase tracking-[0.15em] hover:shadow-lg hover:scale-105 ${WA_BUTTON}`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t('ctaButton')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="pb-24">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-primary font-serif mb-10 text-center">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {related.map(r => {
              const rc = getGuideContent(r, locale);
              return (
                <Link key={r.slug} href={`/${locale}/guides/${r.slug}`} className="group block">
                  <div className="relative h-44 rounded-md overflow-hidden mb-4">
                    <Image
                      src={r.image}
                      alt={rc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="block text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                    {getCategoryLabel(r.category, locale)}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary font-serif leading-snug group-hover:text-primary transition-colors">
                    {rc.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.18em] group-hover:gap-3 transition-all">
                    {t('readGuide')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
