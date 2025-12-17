'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Activity {
    id: string;
    title: string;
    image: string;
    description: string;
    locations: (string | { name: string; id: number })[];
}

interface ActivitiesSectionProps {
    activities: Activity[];
    label?: string;
    title?: string;
    description?: string;
}

export default function ActivitiesSection({
    activities,
    label,
    title,
    description
}: ActivitiesSectionProps) {
    const locale = useLocale();
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const t = useTranslations('experiences'); // Reusing 'experiences' or generic strings if possible

    // Fallbacks
    const headerLabel = label || (locale === 'fr' ? 'ACTIVITÉS' : 'Activities');
    const headerTitle = title || (locale === 'fr' ? 'Choses à faire au Maroc' : 'Things to Do in Morocco');
    const headerDesc = description || (locale === 'fr' ? 'Découvrez des expériences uniques et des activités à travers le Maroc' : 'Discover unique experiences and activities across Morocco');
    const viewAllText = locale === 'fr' ? 'Voir tout' : 'View All';
    const exploreText = locale === 'fr' ? 'Explorer' : 'Explore';

    // Show only first 5 activities
    const displayActivities = activities.slice(0, 5);

    return (
        <section className="py-8 md:py-24 bg-gray-50">
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
                            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-6 block">
                                {headerLabel}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                                {headerTitle}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                {headerDesc}
                            </p>
                        </div>

                        {/* View All Button */}
                        <Link
                            href={`/${locale}/activities`}
                            className="group flex items-center gap-3 px-6 py-3 text-primary-dark rounded-full transition-all hover:gap-4"
                        >
                            <span className="text-sm font-medium">{viewAllText}</span>
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Layout: Vertical Stack on Mobile, Expandable Row on Desktop */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-2 h-auto md:h-[600px]">
                    {displayActivities.map((activity, index) => {
                        const isHovered = hoveredIndex === index;
                        // Mobile: always full width, Desktop: dynamic width
                        const width = typeof window !== 'undefined' && window.innerWidth < 768
                            ? '100%'
                            : (isHovered ? '40%' : '15%');

                        return (
                            <motion.div
                                key={activity.id}
                                className="relative rounded-2xl overflow-hidden cursor-pointer group h-[250px] md:h-full w-full md:w-auto"
                                style={{ width }}
                                animate={{ width }} // Only animates on desktop effectively due to conditional logic
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
                                        {/* Mobile view or Desktop Hovered */}
                                        <div className="md:hidden block">
                                            <h3 className="text-2xl font-bold text-white mb-2">{activity.title}</h3>
                                            <div className="flex items-center gap-2 text-white/90 text-sm">
                                                <span>{exploreText}</span> <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Desktop Only Logic */}
                                        <div className="hidden md:block">
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
                                                    <h3 className="text-3xl font-bold text-white leading-tight">
                                                        {activity.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                                                        {activity.description}
                                                    </p>
                                                    <div className="pt-4">
                                                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                                            <span>{exploreText}</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
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
