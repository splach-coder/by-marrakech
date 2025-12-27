'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getSiteData, siteData } from '@/data/siteData';
import { Clock, Users, MapPin, Mouse, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ExperiencesPage() {
    const locale = useLocale();
    const t = useTranslations('experiencesPage');

    // Fetch localized data
    const localizedSiteData = getSiteData(locale);
    // Fallback to english data if localization is missing structure
    const experiences = localizedSiteData.excursions || siteData.excursions;

    const [selectedCity, setSelectedCity] = useState<string>('all');

    // Extract unique cities from experiences
    const cities = useMemo(() => {
        const citySet = new Set<string>();
        experiences.forEach(exp => {
            if (exp.locations && exp.locations.length > 0) {
                exp.locations.forEach((loc: any) => {
                    const cityName = typeof loc === 'string' ? loc : loc.name;
                    if (cityName) citySet.add(cityName.trim());
                });
            }
        });
        return ['all', ...Array.from(citySet).sort()];
    }, [experiences]);

    // Filter experiences by city
    const filteredExperiences = useMemo(() => {
        if (selectedCity === 'all') return experiences;
        return experiences.filter(exp => {
            if (!exp.locations || exp.locations.length === 0) return false;
            return exp.locations.some((loc: any) => {
                const cityName = typeof loc === 'string' ? loc : loc.name;
                return cityName?.trim() === selectedCity;
            });
        });
    }, [experiences, selectedCity]);

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
            {/* Full Screen Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={'/images/hero-imgs/experiences.webp'}
                        alt={t('hero.title')}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl !font-serif font-normal tracking-tight mb-6">
                            {t('hero.title')}
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg tracking-[0.2em] font-light uppercase text-white/90">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-10 cursor-pointer"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    onClick={() => {
                        const nextSection = document.getElementById('experiences-grid');
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Mouse className="w-8 h-8 opacity-80" strokeWidth={1.5} />
                    </div>
                </motion.div>
            </div>

            {/* Experiences Grid */}
            <section id="experiences-grid" className="py-24 bg-background">
                <div className="container-custom">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl !font-serif font-medium text-text-primary mb-4">
                            {t('grid.title')}
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                            {t('grid.subtitle')}
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCity === city
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-white text-text-secondary border border-border hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {city === 'all' ? t('grid.allCities') : city}
                            </button>
                        ))}
                    </div>

                    {filteredExperiences.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">{t('grid.notFound', { city: selectedCity })}</p>
                        </div>
                    ) : (
                        <motion.div
                            key={selectedCity}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredExperiences.map((experience) => (
                                <motion.div key={experience.id} variants={cardVariants} className="h-full">
                                    <Link href={`/${locale}/experiences/${experience.id}`} className="block h-full">
                                        <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-72 overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={experience.image.url}
                                                    alt={experience.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-serif font-medium text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {experience.title}
                                                </h3>

                                                <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                                                    {experience.description}
                                                </p>

                                                {/* Meta Info */}
                                                <div className="flex items-center justify-between text-xs text-text-tertiary mt-auto pt-4 border-t border-border/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>{experience.duration}</span>
                                                    </div>

                                                    {experience.locations && experience.locations.length > 0 && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span className="truncate max-w-[100px]">
                                                                {typeof experience.locations[0] === 'string'
                                                                    ? experience.locations[0]
                                                                    : (experience.locations[0] as any).name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </main>
    );
}
