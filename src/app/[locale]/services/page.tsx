'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getSiteData, siteData } from '@/data/siteData';
import { ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner';

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
            {/* Standard full-width page banner */}
            <PageBanner
                image="/images/hero-imgs/services.webp"
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
            />

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
