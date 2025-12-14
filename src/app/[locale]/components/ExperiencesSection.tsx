'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { experiencesPreviewData } from '@/data/home-data';

interface Experience {
  id: string;
  title: string;
  image: string;
  duration: string;
  price: string;
  rating: number;
  guests: number;
  featured?: boolean;
  notForChildren?: boolean;
}

interface ExperiencesSectionProps {
  label?: string;
  title?: string;
  experiences?: Experience[];
}

export default function ExperiencesSection({
  label = "UNFORGETTABLE MOMENTS",
  title = "Curated Experiences in Marrakech",
  experiences = experiencesPreviewData
}: ExperiencesSectionProps) {
  const locale = useLocale();

  // Show only 4 items
  const displayExperiences = experiences.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <motion.span variants={cardVariants} className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
            {label}
          </motion.span>
          <motion.h2 variants={cardVariants} className="text-4xl md:text-5xl font-bold text-[#3D322C] font-serif">
            {title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={cardVariants}
              className={`group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer ${index % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              <Link href={`/${locale}/experiences/${experience.id}`} className="block h-full w-full">
                {/* Image */}
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-medium tracking-wider uppercase mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{experience.duration}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight font-serif">
                    {experience.title}
                  </h3>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="text-white font-medium text-sm border-b border-white pb-0.5">Discover Experience</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating Badge (Top Right) */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span className="text-white text-xs font-bold">{experience.rating || 5.0}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}