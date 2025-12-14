'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Activity {
    id: string;
    title: string;
    image: string;
    description: string;
    locations: Array<{ name: string; id: number }>;
}

interface ActivitiesSectionProps {
    activities: Activity[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
    const locale = useLocale();
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    // Show only first 5 activities
    const displayActivities = activities.slice(0, 5);

    return (
        <section className="py-24 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
                                Activities
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                                Things to Do in Morocco
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Discover unique experiences and activities across Morocco
                            </p>
                        </div>

                        {/* View All Button */}
                        <Link
                            href={`/${locale}/activities`}
                            className="group flex items-center gap-3 px-6 py-3 text-primary-dark rounded-full transition-all hover:gap-4"
                        >
                            <span className="text-sm font-medium">View All</span>
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Expandable Bars Layout */}
                <div className="flex gap-2 h-[600px]">
                    {displayActivities.map((activity, index) => {
                        const isHovered = hoveredIndex === index;
                        const width = isHovered ? '40%' : '15%';

                        return (
                            <motion.div
                                key={activity.id}
                                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                                style={{ width }}
                                animate={{ width }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(0)}
                            >
                                <Link href={`/${locale}/activities/${activity.id}`} className="block h-full">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={activity.image}
                                            alt={activity.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-6">
                                        {/* Collapsed State - Vertical Title */}
                                        {!isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0 flex items-end justify-center pb-8"
                                            >
                                                <h3
                                                    className="text-white font-bold text-xl writing-mode-vertical transform rotate-180 whitespace-nowrap"
                                                    style={{ writingMode: 'vertical-rl' }}
                                                >
                                                    {activity.title}
                                                </h3>
                                            </motion.div>
                                        )}

                                        {/* Expanded State - Full Details */}
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className="space-y-4"
                                            >

                                                {/* Title */}
                                                <h3 className="text-3xl font-bold text-white leading-tight">
                                                    {activity.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                                                    {activity.description}
                                                </p>

                                                {/* Location */}
                                                {activity.locations && activity.locations.length > 0 && (
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {activity.locations.slice(0, 2).map((loc: any) =>
                                                                typeof loc === 'string' ? loc : loc.name
                                                            ).join(', ')}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Explore Button */}
                                                <div className="pt-4">
                                                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                                        <span>Explore</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
