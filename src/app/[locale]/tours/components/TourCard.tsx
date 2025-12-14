// src/app/[locale]/tours/components/TourCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Tour } from '@/types/tour';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const locale = useLocale();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/${locale}/tours/${tour.id}`}
        className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={tour.image.url}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {tour.featured && (
              <div className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded">
                Featured
              </div>
            )}
            {tour.notForChildren && (
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase rounded">
                Adults Only
              </div>
            )}
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded">
            <span className="text-sm font-semibold text-text-primary">
              {tour.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {tour.category || tour.categories?.[0] || 'Tour'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
            {tour.title}
          </h3>

          {/* Short Description */}
          <p className="text-text-tertiary text-sm leading-relaxed mb-4">
            {tour.shortDescription || tour.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            {/* Price */}
            <div>
              <div className="text-xs text-text-tertiary mb-1">Starting from</div>
              <div className="text-lg font-bold text-primary">{tour.price}</div>
            </div>

            {/* CTA */}
            <div className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
              View Details →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}