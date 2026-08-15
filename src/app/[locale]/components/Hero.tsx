'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Compass, Star } from 'lucide-react';
import QuoteWidget from './QuoteWidget';
import { googleReviewsConfig } from '@/data/transferData';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  backgroundImage?: string;
  showQuoteWidget?: boolean;
}

// Last word of the title gets the reference-style gold italic treatment
function SplitTitle({ title }: { title: string }) {
  const words = title.trim().split(' ');
  const last = words.pop();
  return (
    <>
      {words.join(' ')}{' '}
      <span className="text-secondary font-serif italic">{last}</span>
    </>
  );
}

export default function Hero({
  title = 'Discover the Magic of Marrakech',
  subtitle = '',
  ctaPrimary = 'Explore Our Tours',
  backgroundImage = '/images/hero.jpeg',
  showQuoteWidget = false,
}: HeroProps) {
  const locale = useLocale();
  const t = useTranslations('home.heroExtras');
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className={`relative w-full overflow-hidden bg-background ${showQuoteWidget ? 'min-h-screen' : 'h-screen'}`}>
      {/* Background with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/hero.jpeg"
            alt="Marrakech"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={backgroundImage}
            alt="Marrakech doorway"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-center hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className={`relative z-10 ${showQuoteWidget ? 'min-h-screen flex items-center pt-32 pb-16 md:pt-36 md:pb-20' : 'h-full flex items-center justify-center pt-20'}`}
      >
        <div className="container-custom w-full">
          {showQuoteWidget ? (
            /* ── Split layout: headline left, quote widget right ── */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                {/* Google rating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[13px] font-black text-[#4285F4]">G</span>
                  <span className="text-white font-bold">{googleReviewsConfig.rating.toFixed(1)}</span>
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                    ))}
                  </span>
                  <span className="text-white/70 text-sm">
                    · {googleReviewsConfig.reviewCount} {t('googleReviews')}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6"
                >
                  <SplitTitle title={title} />
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mb-9"
                >
                  {subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <Link
                    href={`/${locale}#routes`}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-secondary text-[#3b2f2f] rounded-sm font-black text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-secondary-dark hover:shadow-xl hover:scale-105"
                  >
                    {t('ctaBook')}
                  </Link>
                  <Link
                    href={`/${locale}/services/421`}
                    className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/40 text-white rounded-sm font-black text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/10 hover:border-white"
                  >
                    {t('ctaTransfers')}
                  </Link>
                </motion.div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <QuoteWidget />
              </div>
            </div>
          ) : (
            /* ── Classic centered hero (inner pages / fallback) ── */
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <SplitTitle title={title} />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl"
              >
                {subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href={`/${locale}/tours`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-sm font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105"
                >
                  <Compass className="w-5 h-5" />
                  <span>{ctaPrimary}</span>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
