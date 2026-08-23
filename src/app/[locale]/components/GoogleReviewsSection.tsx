'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Star, ExternalLink } from 'lucide-react';
import { getGoogleReviews, googleReviewsConfig } from '@/data/transferData';
import GoogleIcon from '@/components/GoogleIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Pages where the global reviews band should NOT appear (checkout & legal flows)
const EXCLUDED_SEGMENTS = ['/booking', '/book', '/confetti', '/privacy', '/terms', '/sitemap'];

export default function GoogleReviewsSection() {
  const pathname = usePathname();
  const t = useTranslations('reviews');
  const reviews = getGoogleReviews();
  const { rating, reviewCount, mapsUrl } = googleReviewsConfig;

  if (EXCLUDED_SEGMENTS.some(seg => pathname?.includes(seg))) return null;

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-border-light">
      <div className="container-custom">
        {/* Header */}
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
          <motion.h2 variants={cardVariants} className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif">
            {t('title')}
          </motion.h2>

          <motion.div variants={cardVariants} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-text-primary">{rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
            </div>
            <span className="text-sm text-text-secondary">
              ({reviewCount} {t('onGoogle')})
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark border-b border-primary/30 hover:border-primary transition-colors"
            >
              {t('seeAll')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, i) => (
            <motion.figure
              key={i}
              variants={cardVariants}
              className="bg-white border border-border rounded-md p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <blockquote className="text-sm text-text-secondary leading-relaxed flex-1">
                “{review.text}”
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-border-light flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm">
                  {review.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-bold text-text-primary">{review.name}</div>
                  <div className="text-xs text-text-tertiary">{review.date}</div>
                </div>
                {/* Google "G" mark */}
                <GoogleIcon className="w-5 h-5 ml-auto opacity-70" decorative />
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
