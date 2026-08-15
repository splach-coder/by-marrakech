'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getSiteData, siteData } from '@/data/siteData';
import { MapPin } from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function ActivitiesPage() {
    const locale = useLocale();
    const t = useTranslations('activitiesPage');

    // Fetch localized data
    const localizedSiteData = getSiteData(locale);
    // Fallback to english data if localized data structure is incomplete
    const activities = localizedSiteData.activities || siteData.activities || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
        <main className="min-h-screen bg-white">
            {/* Standard full-width page banner */}
            <PageBanner
                image="/images/hero-imgs/activites.webp"
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
            />

            {/* Activities Grid */}
            <section id="activities-grid" className="py-24 bg-background">
                <div className="container-custom">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl !font-serif font-medium text-text-primary mb-4">
                            {t('grid.title')}
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                            {t('grid.subtitle')}
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {activities.map((activity) => (
                            <motion.div key={activity.id} variants={cardVariants} className="h-full">
                                <Link href={`/${locale}/activities/${activity.id}`} className="block h-full">
                                    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-72 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={activity.image.url}
                                                alt={activity.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-serif font-medium text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {activity.title}
                                            </h3>

                                            <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                                                {activity.description}
                                            </p>

                                            {/* Meta Info */}
                                            {activity.locations && activity.locations.length > 0 && (
                                                <div className="flex items-center justify-between text-xs text-text-tertiary mt-auto pt-4 border-t border-border/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span className="truncate max-w-[200px]">
                                                            {activity.locations.slice(0, 2).map((loc: any) =>
                                                                typeof loc === 'string' ? loc : loc.name
                                                            ).join(', ')}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
