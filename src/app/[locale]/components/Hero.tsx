'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Compass, Star } from 'lucide-react';
import QuoteWidget from './QuoteWidget';
import { googleReviewsConfig } from '@/data/transferData';
import GoogleIcon from '@/components/GoogleIcon';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  backgroundImage?: string;
  showQuoteWidget?: boolean;
}

/**
 * Parallax backdrop — desktop only. Mounting this is what turns on
 * framer-motion's scroll measurement, so phones never mount it.
 */
function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  return (
    <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
      {children}
    </motion.div>
  );
}

/** Mobile counterparts: same boxes, no scroll listeners. */
function StaticLayer({ children }: { children: React.ReactNode }) {
  return <div className="absolute inset-0 w-full h-full">{children}</div>;
}

function PlainLayer({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

/** Hero content that fades out as you scroll past it — desktop only. */
function ScrollFadeLayer({ className, children }: { className: string; children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <motion.div style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
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

  // Parallax and the scroll fade-out are desktop-only: on phones the hero is
  // barely taller than the viewport, so fading it made the headline/CTAs
  // vanish immediately — and the scroll measurement behind both effects cost
  // real frame time on mobile.
  const [isDesktop, setIsDesktop] = useState(false);

  // Static wrappers on mobile, scroll-driven ones on desktop.
  const Backdrop = isDesktop ? ParallaxLayer : StaticLayer;
  const Content = isDesktop ? ScrollFadeLayer : PlainLayer;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className={`relative w-full overflow-hidden bg-background ${showQuoteWidget ? 'min-h-screen' : 'h-screen'}`}>
      {/* Background with parallax.
          Never animate this layer's opacity on mount: the hero photograph is
          the LCP element, and starting it at opacity 0 means the largest paint
          cannot happen until React has hydrated and framer-motion has run —
          measured at 1.9s of pure render delay on a mid-range phone. The scale
          settle is a transform, so it costs nothing and paints immediately. */}
      <Backdrop>
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
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
        </motion.div>
      </Backdrop>

      {/* Content */}
      <Content
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
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <GoogleIcon className="w-3.5 h-3.5" />
                  </span>
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
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6"
                >
                  <SplitTitle title={title} />
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mb-9"
                >
                  {subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.26 }}
                  /* Both CTAs live in one grid so they always match: stacked and
                     full width on a phone, two equal columns from sm up. The
                     grid needs a definite width for 1fr columns to equalise,
                     hence w-full + max-w-xl rather than a fit-content grid. */
                  className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
                >
                  <Link
                    href={`/${locale}#quote`}
                    /* transparent border so it is exactly as tall as the
                       outlined button beside it */
                    className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl border border-transparent bg-secondary px-6 py-4 text-center text-[12px] font-black uppercase tracking-[0.12em] text-[#3b2f2f] transition-all duration-300 hover:bg-secondary-dark hover:shadow-xl hover:scale-105"
                  >
                    {t('ctaBook')}
                  </Link>
                  <Link
                    href={`/${locale}/services/421`}
                    className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/40 px-6 py-4 text-center text-[12px] font-black uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  >
                    {t('ctaTransfers')}
                  </Link>
                </motion.div>
              </div>

              {/* #quote is the target for every "pick a route" link now that the
                  Popular Transfer Routes section is gone — the widget prices routes. */}
              <div id="quote" className="flex scroll-mt-28 justify-center lg:justify-end">
                <QuoteWidget />
              </div>
            </div>
          ) : (
            /* ── Classic centered hero (inner pages / fallback) ── */
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
                  href={`/${locale}/explore#journeys`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105"
                >
                  <Compass className="w-5 h-5" />
                  <span>{ctaPrimary}</span>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </Content>
    </section>
  );
}
