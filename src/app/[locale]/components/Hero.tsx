'use client';

import { useEffect, useState } from 'react';
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
  backgroundImage = '/images/marrakech/hero.jpg',
}: HeroProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-text-primary">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={backgroundImage}
            alt="Marrakech doorway"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container-custom">
          <div className="max-w-3xl">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Red Button */}
              <Link
                href={`/${locale}/tours`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>{ctaPrimary}</span>
              </Link>

              {/* Outlined Button */}
              <Link
                href={`/${locale}/luxury`}
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-text-primary hover:shadow-lg"
              >
                <Gift className="w-5 h-5" />
                <span>{ctaSecondary}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}