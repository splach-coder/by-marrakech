'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageBannerProps {
  image: string;
  title: ReactNode;
  kicker?: string;
  subtitle?: ReactNode;
  imageAlt?: string;
}

// The single shared page banner: FULL-SCREEN background image with centered
// kicker + title + subtitle. Every inner page opens with this same hero.
export default function PageBanner({
  image,
  title,
  kicker = 'Xhosen Gate',
  subtitle,
  imageAlt,
}: PageBannerProps) {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={imageAlt || (typeof title === 'string' ? title : 'Xhosen Gate')}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75" />
      </motion.div>

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-xs font-bold tracking-[0.3em] text-secondary uppercase mb-4 block"
        >
          {kicker}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight max-w-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-5 max-w-2xl text-white/85 text-sm md:text-base leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-10"
      >
        <span className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  );
}
