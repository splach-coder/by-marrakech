'use client';

import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getSiteData, siteData } from '@/data/siteData';
import { use, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
    X,
    Check,
    Star,
    Shield,
    Clock,
    MapPin
} from 'lucide-react';
import GalleryGrid from '../../components/GalleryGrid';
import BookingCard from '../../components/BookingCard';
import MobileBookingWidget from '../../components/MobileBookingWidget';
import HeroBreadcrumb from '../../components/HeroBreadcrumb';

interface ServicePageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function ServicePage({ params }: ServicePageProps) {
    const { id } = use(params);
    const locale = useLocale();
    const t = useTranslations('common');
    const tServ = useTranslations('serviceDetail');
    const tHeader = useTranslations('Header');
    const tTour = useTranslations('tourDetail'); // For contactForPrice

    const localizedSiteData = getSiteData(locale);

    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const service = localizedSiteData.services.find(s => String(s.id) === id) || siteData.services.find(s => String(s.id) === id);

    if (!service) {
        notFound();
    }

    const galleryImages = service.gallery?.map(img => img.url) || [
        service.image.url
    ];

    return (
        <main className="min-h-screen bg-white">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] md:h-[75vh] w-full">
                <Image
                    src={service.banner_image?.url || service.image.url}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-24">
                    <div className="container-custom mx-auto px-4 md:px-8">
                        {/* Breadcrumbs */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-5 md:mb-6"
                        >
                            <HeroBreadcrumb
                                items={[
                                    { label: t('home'), href: `/${locale}` },
                                    { label: tHeader('services'), href: `/${locale}/explore#services` },
                                    { label: service.title },
                                ]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/90 text-white font-bold uppercase tracking-wider text-xs rounded-full mb-6 backdrop-blur-sm">
                                <Star className="w-3.5 h-3.5 fill-white" />
                                {tServ('premiumService')}
                            </span>

                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-[1.1]">
                                {service.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 md:gap-6 text-white/90 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-lg">{tServ('available247')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-lg">{tServ('moroccoWide')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. DESCRIPTION, HIGHLIGHTS & BOOKING */}
            <section className="py-8 md:py-20 bg-white">
                <div className="px-4 md:container-custom md:mx-auto md:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">{tServ('description')}</h2>
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">{tServ('serviceHighlights')}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-[#faf9f6] rounded-xl border border-stone-100">
                                            <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                            <span className="text-gray-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Choose Us */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{tServ('whyChooseUs')}</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { title: tServ('driversTitle'), desc: tServ('experiencedDrivers') },
                                        { title: tServ('vehiclesTitle'), desc: tServ('modernVehicles') },
                                        { title: tServ('insuredTitle'), desc: tServ('fullyInsured') },
                                        { title: tServ('pricingTitle'), desc: tServ('fixedPricing') },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-stone-50 p-5 rounded-xl hover:bg-stone-100 transition-colors duration-300">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                            <div>
                                                <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Booking Card */}
                        <div id="booking-card-section" className="lg:col-span-1">
                            <BookingCard
                                id={String(service.id)}
                                title={service.title}
                                price={service.price || tTour('contactForPrice')}
                                duration={t('flexible')}
                                groupSize={tServ('privateTransfer')}
                                type="service"
                                imageUrl={service.image.url}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SIMPLE GALLERY */}
            <section className="py-8 md:py-12 bg-white">
                <div className="px-4 md:container-custom max-w-7xl mx-auto">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
                        {t('gallery')}
                    </h2>
                    <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />
                </div>
            </section>

            {/* 4. REVIEWS */}
            {service.reviews && service.reviews.length > 0 && (
                <section className="py-16 bg-[#faf9f6]">
                    <div className="container-custom max-w-7xl mx-auto">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
                            {tServ('recentReviews')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.reviews.map((review, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-primary text-primary' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                                    <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                                    <div className="text-xs text-gray-400">{review.country}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white transition-colors z-50 bg-black/30 backdrop-blur-sm rounded-full p-2"
                        >
                            <X className="w-6 md:w-8 h-6 md:h-8" />
                        </button>
                        <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center">
                            <div className="relative w-full flex-1 flex items-center justify-center">
                                <Image
                                    src={galleryImages[selectedImage]}
                                    alt="Gallery"
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                />
                            </div>

                            {/* Thumbnail Navigation */}
                            <div className="w-full max-w-4xl mt-4 px-4">
                                <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                                    {galleryImages.map((url, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                                            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden snap-center transition-all ${idx === selectedImage
                                                ? 'ring-2 ring-white scale-110'
                                                : 'opacity-50 hover:opacity-100'
                                                }`}
                                        >
                                            <Image
                                                src={url}
                                                alt={`Thumbnail ${idx + 1}`}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                {selectedImage + 1} / {galleryImages.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Mobile Booking Widget */}
            <MobileBookingWidget
                id={String(service.id)}
                type="service"
                title={service.title}
                price={service.price || tTour('contactForPrice')}
                imageUrl={service.image.url}
            />
        </main>
    );
}
