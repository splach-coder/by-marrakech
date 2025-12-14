'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '@/data/siteData';


interface Tour {
  id: string;
  slug: string;
  title: string;
  days: string;
  date: string;
  image: string;
  notForChildren?: boolean;
  featured?: boolean;
}

interface ToursSectionProps {
  label?: string;
  title?: string;
  tours?: Tour[];
}

export default function ToursSection({
  label = "OUR SIGNATURE TRIPS",
  title = "Discover Morocco's Best Kept Secrets",
  tours
}: ToursSectionProps) {
  const locale = useLocale();

  // Use provided tours or default to first 2 from siteData
  const displayTours = tours || siteData.tours.slice(0, 2).map(tour => ({
    id: String(tour.id),
    slug: String(tour.id),
    title: tour.title,
    days: tour.duration,
    date: 'Daily',
    image: tour.image.url,
    featured: false,
    notForChildren: false
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section className="py-24 bg-[#FFFBF5]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="block text-primary font-bold tracking-[0.2em] text-sm uppercase mb-4">
              {label}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2C2C] leading-none">
              {title}
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/tours`}
              className="hidden md:inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#2C2C2C]/20 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
            >
              <ArrowUpRight className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Tours Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {displayTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              variants={cardVariants}
              className={`group relative ${index === 0 || index === 3 ? 'md:col-span-1' : 'md:col-span-1'} h-[500px] w-full cursor-pointer`}
            >
              <Link href={`/${locale}/tours/${tour.slug}`} className="block h-full w-full relative overflow-hidden rounded-xl">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Floating Content Box */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {tour.days}
                    </span>
                    {tour.featured && (
                      <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif text-[#2C2C2C] mb-4">
                    {tour.title}
                  </h3>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-text-tertiary group-hover:text-primary transition-colors">
                      View Itinerary
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href={`/${locale}/tours`}
            className="inline-block px-8 py-4 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  );
}