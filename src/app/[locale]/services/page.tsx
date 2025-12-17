'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getSiteData, siteData } from '@/data/siteData';
import { ArrowRight, Mouse } from 'lucide-react';

export default function ServicesPage() {
    const locale = useLocale();
    const t = useTranslations('servicesPage');

    // Fetch localized data
    const localizedSiteData = getSiteData(locale);
    // Fallback to english data
    const services = localizedSiteData.services || siteData.services;

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
                        src={'/images/hero-imgs/services.png'}
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
                        const nextSection = document.getElementById('services-grid');
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Mouse className="w-8 h-8 opacity-80" strokeWidth={1.5} />
                    </div>
                </motion.div>
            </div>

            {/* Services Grid */}
            <section id="services-grid" className="py-24 bg-background">
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
                        {services.map((service) => (
                            <motion.div key={service.id} variants={cardVariants} className="h-full">
                                <Link href={`/${locale}/services/${service.id}`} className="block h-full">
                                    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-72 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={service.image.url}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-serif font-medium text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {service.title}
                                            </h3>

                                            <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-end text-xs text-primary font-medium mt-auto pt-4 border-t border-border/50 group-hover:gap-2 transition-all">
                                                <span>{locale === 'fr' ? 'Voir Service' : 'View Service'}</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
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
