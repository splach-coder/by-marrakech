'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { siteData } from '@/data/siteData';
import { use, useState } from 'react';
import {
    X,
    ChevronRight,
    Check,
    Star,
    ArrowRight,
    Shield,
    Clock,
    MapPin,
    Home,
    Phone
} from 'lucide-react';
import GalleryGrid from '../../components/GalleryGrid';
import PrivateDriverService from '../components/PrivateDriverService';
import BookingCard from '../../components/BookingCard';

interface ServicePageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function ServicePage({ params }: ServicePageProps) {
    const { id } = use(params);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (id === '501') {
        return <PrivateDriverService />;
    }

    const service = siteData.services.find(s => String(s.id) === id);

    if (!service) {
        notFound();
    }

    const galleryImages = service.gallery?.map(img => img.url) || [
        service.image.url
    ];

    const avgRating = service.reviews && service.reviews.length > 0
        ? (service.reviews.reduce((acc, rev) => acc + rev.rating, 0) / service.reviews.length).toFixed(1)
        : '5.0';

    const handleBook = () => {
        const message = `I'm interested in booking the service: ${service.title}`;
        const url = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen bg-white">

            {/* 1. IMAGE FIRST (Top Section) */}
            <section className="relative h-[50vh] md:h-[70vh] w-full">
                <Image
                    src={service.banner_image?.url || service.image.url}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle gradient at bottom only for transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

                {/* Breadcrumbs Overlay */}
                <div className="absolute bottom-20 left-0 p-6 md:p-10 w-full z-10">
                    <nav className="inline-flex items-center gap-2 text-xs md:text-sm text-white/90 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5 mb-0.5" />
                            <span className="uppercase tracking-wider font-semibold">Home</span>
                        </Link>
                        <ChevronRight className="w-3 h-3 text-white/70" />
                        <Link href="/services" className="hover:text-white transition-colors">
                            <span className="uppercase tracking-wider font-semibold">Services</span>
                        </Link>
                        <ChevronRight className="w-3 h-3 text-white/70" />
                        <span className="text-white font-serif font-medium truncate max-w-[150px] md:max-w-none">
                            {service.title}
                        </span>
                    </nav>
                </div>
            </section>

            {/* 2. DATA / CONTENT SECTION */}
            <section className="relative -mt-20 z-10 md:px-0 pb-8 md:pb-20">
                <div className="container-custom max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-xl py-8 px-4 md:p-12 border border-stone-100"
                    >
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-stone-100 pb-8">
                            <div>
                                <div className="flex items-center gap-2 text-sm text-primary font-bold uppercase tracking-wider mb-3">
                                    <Star className="w-4 h-4 fill-primary" />
                                    <span>Premium Service</span>
                                </div>
                                <h1 className="text-2xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                                    {service.title}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span>24/7 Available</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>Morocco Wide</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                                <button
                                    onClick={() => {
                                        const element = document.getElementById('booking-card-section');
                                        if (element) {
                                            const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                        }
                                    }}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <span>Book Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-gray-400 font-medium">
                                    Contact for price
                                </span>
                            </div>
                        </div>

                        {/* Description & Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                                        {service.description}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Service Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                                                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                                <span className="text-gray-700">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Why Choose Us - Moved to left with new design */}
                                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-gray-900">Why Choose Us</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3 bg-white/60 backdrop-blur p-4 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                            <div>
                                                <div className="font-bold text-gray-900 mb-1">Professional Drivers</div>
                                                <p className="text-sm text-gray-600">Experienced and certified</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-white/60 backdrop-blur p-4 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                            <div>
                                                <div className="font-bold text-gray-900 mb-1">Modern Vehicles</div>
                                                <p className="text-sm text-gray-600">Latest models, well-maintained</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-white/60 backdrop-blur p-4 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                            <div>
                                                <div className="font-bold text-gray-900 mb-1">Fully Insured</div>
                                                <p className="text-sm text-gray-600">Complete coverage protection</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-white/60 backdrop-blur p-4 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                            <div>
                                                <div className="font-bold text-gray-900 mb-1">Fixed Pricing</div>
                                                <p className="text-sm text-gray-600">No hidden fees or surprises</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Booking Card Only */}
                            <div id="booking-card-section" className="lg:col-span-1">
                                <BookingCard
                                    id={String(service.id)}
                                    title={service.title}
                                    price="Contact for price"
                                    duration="Flexible"
                                    groupSize="Private transfer"
                                    type="service"
                                    imageUrl={service.image.url}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. SIMPLE GALLERY */}
            <section className="py-8 md:py-12 bg-white">
                <div className="px-4 md:container-custom max-w-5xl mx-auto">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
                        Gallery
                    </h2>
                    <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />
                </div>
            </section>

            {/* 4. REVIEWS */}
            {service.reviews && service.reviews.length > 0 && (
                <section className="py-16 bg-[#faf9f6]">
                    <div className="container-custom max-w-5xl mx-auto">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
                            Recent Reviews
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
        </main>
    );
}
