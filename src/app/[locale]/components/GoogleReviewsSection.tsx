'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Star, ExternalLink } from 'lucide-react';
import { getGoogleReviews, googleReviewsConfig } from '@/data/transferData';

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
                <svg className="w-5 h-5 ml-auto opacity-70" viewBox="0 0 24 24" aria-label="Google review">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
