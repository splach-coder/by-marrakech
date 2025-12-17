'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Heart, Share2 } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    highlights: string[];
}

interface ServicesSectionProps {
    services: Service[];
    label?: string;
    title?: string;
    description?: string;
}

export default function ServicesSection({
    services,
    label,
    title,
    description
}: ServicesSectionProps) {
    const locale = useLocale();
    const t = useTranslations('home.features'); // using generic or creating specific 'services' scope

    // Fallback static text if not in messages
    const viewAllText = locale === 'fr' ? 'Voir tout' : 'View All';
    const viewDetailsText = locale === 'fr' ? 'Voir détails' : 'View Details';
    const availableText = locale === 'fr' ? 'Disponible' : 'Available';
    const locationText = locale === 'fr' ? 'Maroc, National' : 'Morocco, Nationwide';

    // Header defaults
    const headerLabel = label || (locale === 'fr' ? 'NOS SERVICES' : 'Our Services');
    const headerTitle = title || (locale === 'fr' ? 'Services de voyage au Maroc' : 'Travel Services in Morocco');
    const headerDesc = description || (locale === 'fr' ? 'Transport et logistique professionnels pour rendre votre voyage fluide' : 'Professional transportation and logistics to make your journey seamless');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
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
        <section className="py-8 md:py-24 bg-[#FFFBF5]">
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

                        {/* View All Button - Top Right */}
                        <Link
                            href={`/${locale}/services`}
                            className="group flex items-center gap-3 px-6 py-3 text-primary-dark rounded-full transition-all hover:gap-4"
                        >
                            <span className="text-sm font-medium">{viewAllText}</span>
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Section */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="flex items-center gap-2 px-2 py-1 bg-primary-dark rounded-full">
                                        <div className="w-1 h-1 bg-green-400 rounded-full" />
                                        <span className="text-white text-xs ">{availableText}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Title and Location */}
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        {locationText}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div className="space-y-2 mb-6">
                                    {service.highlights.slice(0, 3).map((highlight, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700">{highlight.split(':')[0] || highlight}</span>
                                            {highlight.includes(':') && (
                                                <span className="text-gray-900 font-medium">
                                                    {highlight.split(':')[1]?.trim()}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* View Details Button */}
                                <Link href={`/${locale}/services/${service.id}`}>
                                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors">
                                        <span>{viewDetailsText}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
