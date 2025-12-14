'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { eventsData } from '@/data/home-data';

interface Event {
  id: string;
  title: string;
  date: string;
  dateRange?: string;
  location: string;
  description?: string;
  image: string;
  isLive?: boolean;
  status?: string;
}

interface EventsSectionProps {
  label?: string;
  title?: string;
  events?: Event[];
}

export default function EventsSection({
  label = "CULTURAL EXPERIENCES",
  title = "Upcoming Events in Morocco",
  events = eventsData
}: EventsSectionProps) {
  const locale = useLocale();

  // Show only first 4 events
  const displayEvents = events.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-[#FFFBF5]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
            {label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience Morocco's vibrant cultural festivals and events
          </p>
        </motion.div>

        {/* Events Grid - 2 rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto space-y-2"
        >
          {/* First Row: 35% left + 65% right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            {/* Event 1 - 35% width */}
            {displayEvents[0] && (
              <motion.div
                variants={cardVariants}
                className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px]"
              >
                <Link href={`/${locale}/events/${displayEvents[0].id}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={displayEvents[0].image}
                      alt={displayEvents[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      {displayEvents[0].status && (
                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${displayEvents[0].isLive
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-gray-900'
                          }`}>
                          {displayEvents[0].status}
                        </div>
                      )}
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border-2 border-primary-dark cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors ml-auto">
                        <ArrowRight className="w-5 h-5 text-primary-dark rotate-[-45deg] hover:rotate-0 transition-all duration-300 " />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {displayEvents[0].title}
                      </h3>
                      <div className="flex flex-col gap-2 text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{displayEvents[0].dateRange || displayEvents[0].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{displayEvents[0].location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Event 2 - 65% width */}
            {displayEvents[1] && (
              <motion.div
                variants={cardVariants}
                className="md:col-span-8 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px]"
              >
                <Link href={`/${locale}/events/${displayEvents[1].id}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={displayEvents[1].image}
                      alt={displayEvents[1].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      {displayEvents[1].status && (
                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${displayEvents[1].isLive
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-gray-900'
                          }`}>
                          {displayEvents[1].status}
                        </div>
                      )}
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border-2 border-primary-dark cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors ml-auto">
                        <ArrowRight className="w-5 h-5 text-primary-dark rotate-[-45deg] hover:rotate-0 transition-all duration-300 " />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        {displayEvents[1].title}
                      </h3>
                      <div className="flex flex-col gap-2 text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{displayEvents[1].dateRange || displayEvents[1].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{displayEvents[1].location}</span>
                        </div>
                      </div>
                      {displayEvents[1].description && (
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                          {displayEvents[1].description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Second Row: 65% left + 35% right (reversed) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            {/* Event 3 - 65% width */}
            {displayEvents[2] && (
              <motion.div
                variants={cardVariants}
                className="md:col-span-8 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px]"
              >
                <Link href={`/${locale}/events/${displayEvents[2].id}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={displayEvents[2].image}
                      alt={displayEvents[2].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      {displayEvents[2].status && (
                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${displayEvents[2].isLive
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-gray-900'
                          }`}>
                          {displayEvents[2].status}
                        </div>
                      )}
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border-2 border-primary-dark cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors ml-auto">
                        <ArrowRight className="w-5 h-5 text-primary-dark rotate-[-45deg] hover:rotate-0 transition-all duration-300 " />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        {displayEvents[2].title}
                      </h3>
                      <div className="flex flex-col gap-2 text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{displayEvents[2].dateRange || displayEvents[2].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{displayEvents[2].location}</span>
                        </div>
                      </div>
                      {displayEvents[2].description && (
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                          {displayEvents[2].description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Event 4 - 35% width */}
            {displayEvents[3] && (
              <motion.div
                variants={cardVariants}
                className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px]"
              >
                <Link href={`/${locale}/events/${displayEvents[3].id}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={displayEvents[3].image}
                      alt={displayEvents[3].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      {displayEvents[3].status && (
                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${displayEvents[3].isLive
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-gray-900'
                          }`}>
                          {displayEvents[3].status}
                        </div>
                      )}
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border-2 border-primary-dark cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors ml-auto">
                        <ArrowRight className="w-5 h-5 text-primary-dark rotate-[-45deg] hover:rotate-0 transition-all duration-300 " />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {displayEvents[3].title}
                      </h3>
                      <div className="flex flex-col gap-2 text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{displayEvents[3].dateRange || displayEvents[3].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{displayEvents[3].location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
          >
            <span>View All Events</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}