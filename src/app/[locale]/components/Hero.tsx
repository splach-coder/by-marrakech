'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Compass, Gift } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  backgroundImage?: string;
}

export default function Hero({
  title = 'Discover the Magic of Marrakech',
  subtitle = 'Experience the vibrant colors, rich culture, and warm hospitality of Morocco\'s most enchanting city. From ancient medinas to luxurious riads, Marrakech offers an unforgettable journey into the heart of North Africa.',
  ctaPrimary = 'Explore Our Tours',
  ctaSecondary = 'Try a Luxury Experience',
  backgroundImage = '/images/marrakech/hero.webp',
}: HeroProps) {
  const locale = useLocale();
  const { scrollY } = useScroll();

  // Parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background Image with Parallax and Entry Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full h-full">
          {/* Mobile Image */}
          <Image
            src="/images/marrakech/marrakech1.webp"
            alt="Marrakech"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />

          {/* Desktop Image */}
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

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 md:bg-gradient-to-b md:from-black/30 md:via-black/20 md:to-black/60" />

          {/* Additional Mobile Bottom Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center pt-20"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {title.includes('Xhosen') ? (
                <>
                  {title.split('Xhosen')[0]}
                  <span className="text-secondary font-nohemi tracking-tight">Xhosen</span>
                  {title.split('Xhosen')[1]}
                </>
              ) : title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none"
            >
              {subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href={`/${locale}/tours`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>{ctaPrimary}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}