'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { aboutData } from '@/data/home-data';

interface AboutSectionProps {
  label?: string;
  title?: string;
  description1?: string;
  description2?: string;
  stats?: {
    stat1: { number: string; label: string };
    stat2: { number: string; label: string };
    stat3: { number: string; label: string };
  };
}

export default function AboutSection({
  label = aboutData.label,
  title = aboutData.title,
  description1 = aboutData.description1,
  description2 = aboutData.description2,
  stats = aboutData.stats
}: AboutSectionProps = {}) {
  const locale = useLocale();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const images = [
    { src: aboutData.images.image1, alt: "Atlas Mountains", rotate: -3 },
    { src: aboutData.images.image2, alt: "Desert Safari", rotate: 2 },
    { src: aboutData.images.image3, alt: "Marrakech Souks", rotate: -2 },
    { src: aboutData.images.ctaImage, alt: "Sahara Sunset", rotate: 3 },
  ];

  return (
    <section className="pt-24 bg-[#FAF9F6] overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mx-auto mb-16"
        >
          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D322C] mb-6 leading-tight font-serif"
          >
            {title}
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-tertiary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {description1}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              href={`/${locale}/tours`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold transition-transform hover:scale-105 hover:bg-primary-dark shadow-lg hover:shadow-xl"
            >
              <span>Explore All Destinations</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Slanted Image Gallery */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative pt-10 pb-20"
        >
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-4 md:px-0 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: img.rotate,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 50
                  }
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                className="relative flex-shrink-0 w-[280px] md:w-auto h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />


              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}