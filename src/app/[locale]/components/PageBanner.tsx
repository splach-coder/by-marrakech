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

// The single shared page banner: a full-screen background image with centered
// kicker + title + subtitle. Every inner page opens with this same hero, at the
// same height as /explore and /fleet — one screen, less the 2rem SubHeader bar.
// svh rather than vh so mobile browser chrome cannot push the copy off-screen.
export default function PageBanner({
  image,
  title,
  kicker = 'Xhosen Gate',
  subtitle,
  imageAlt,
}: PageBannerProps) {
  return (
    <section className="relative flex min-h-[calc(100svh-2rem)] w-full items-center overflow-hidden">
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
        {/* Centred type has to hold over whatever the photograph is doing behind
            it — a person, a vehicle, carved plaster. Base wash for the whole
            frame, plus a soft pool behind the text block itself. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_50%,rgba(0,0,0,0.45),transparent_75%)]" />
      </motion.div>

      {/* Centered content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center px-4">
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
