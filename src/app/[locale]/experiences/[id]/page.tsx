'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { siteData } from '@/data/siteData';
import Itinerary from '../../components/Itinerary';
import GalleryGrid from '../../components/GalleryGrid';
import BookingCard from '../../components/BookingCard';
import { use, useState } from 'react';
import {
    X,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Clock,
    Users,
    Star,
    Check,
    AlertCircle,
    Quote,
    Home
} from 'lucide-react';

interface ExperiencePageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
    const { id } = use(params);
    const experience = siteData.excursions.find(e => String(e.id) === id);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (!experience) {
        notFound();
    }

    const galleryImages = experience.gallery?.map(img => img.url) || [
        experience.image.url,
        experience.banner_image?.url || experience.image.url,
        experience.image.url
    ];

    const avgRating = experience.reviews && experience.reviews.length > 0
        ? (experience.reviews.reduce((acc, rev) => acc + rev.rating, 0) / experience.reviews.length).toFixed(1)
        : '5.0';

    return (
        <main className="min-h-screen bg-[#faf9f6]"> {/* Off-white premium background */}

            {/* Banner Section - Untouched as requested */}
            <section className="relative h-[85vh] min-h-[600px]">
                <Image
                    src={experience.banner_image?.url || experience.image.url}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
                    <div className="container-custom w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-5xl"
                        >
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-6 overflow-x-auto whitespace-nowrap">
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                    <Home className="w-3.5 h-3.5 mb-0.5" />
                                    <span className="uppercase tracking-wider font-semibold">Home</span>
                                </Link>
                                <ChevronRight className="w-3 h-3 text-white/50" />
                                <Link href="/experiences" className="hover:text-white transition-colors">
                                    <span className="uppercase tracking-wider font-semibold">Experiences</span>
                                </Link>
                                <ChevronRight className="w-3 h-3 text-white/50" />
                                <span className="text-white font-serif font-medium truncate">
                                    {experience.title}
                                </span>
                            </nav>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-bold rounded-full uppercase tracking-wider">
                                    Experience
                                </span>
                                {experience.reviews && experience.reviews.length > 0 && (
                                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-white">{avgRating}</span>
                                        <span className="text-white/70 text-sm">({experience.reviews.length} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-sm">
                                {experience.title}
                            </h1>

                            <div className="flex flex-wrap gap-8 text-white/90 font-medium text-lg">
                                <div className="flex items-center gap-2.5">
                                    <Clock className="w-5 h-5 text-amber-400" />
                                    <span>{experience.duration}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Users className="w-5 h-5 text-amber-400" />
                                    <span className="capitalize">{experience.group_size} group</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <MapPin className="w-5 h-5 text-amber-400" />
                                    <span>{experience.locations?.[0]?.name || 'Morocco'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="container-custom py-20">
                {/* Breadcrumbs */}


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column (Content) */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* 1. Overview */}
                        <div>
                            <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-gray-900"></span>
                                OVERVIEW
                            </h2>
                            <p className="text-gray-600 leading-loose text-lg font-light">
                                {experience.description}
                            </p>
                        </div>

                        {/* 2. Highlights */}
                        <div>
                            <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-gray-900"></span>
                                HIGHLIGHTS
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {experience.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-4 py-2 border-b border-gray-100 last:border-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                                        <span className="text-gray-700 font-light text-lg">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Artistic Map & Itinerary */}
                        <div>
                            <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-gray-900"></span>
                                ITINERARY
                            </h2>

                            {/* Timeline */}
                            {experience.programSteps && experience.programSteps.length > 0 && (
                                <Itinerary
                                    steps={experience.programSteps}
                                    title="Detailed Schedule"
                                />
                            )}
                        </div>

                        {/* 4. Gallery (New Design) */}
                        <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />

                        {/* 5. Reviews (Horizontal Scroll) */}
                        {experience.reviews && experience.reviews.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-serif font-light text-gray-900 mb-10 flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-gray-900"></span>
                                    GUEST STORIES
                                </h2>

                                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                    {experience.reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="min-w-[260px] md:min-w-[320px] snap-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                                        >
                                            <div className="mb-4">
                                                <div className="flex gap-1 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 italic font-light leading-relaxed text-sm line-clamp-4">
                                                    "{review.text}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-serif font-bold text-xs">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest">{review.country}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 6. Travel Advice */}
                        <div className="bg-[#f4f1ea] rounded-2xl p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <AlertCircle className="w-32 h-32 text-stone-400" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl text-stone-800 mb-6">Essential Travel Notes</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <span>Comfortable walking shoes required</span>
                                    </li>
                                    <li className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <span>Sun protection (hat, sunglasses)</span>
                                    </li>
                                    <li className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <span>Bring water bottle</span>
                                    </li>
                                    <li className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <span>Camera for photos</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-4 h-full">
                        <BookingCard
                            price="Contact Us"
                            title={experience.title}
                            duration={experience.duration}
                            groupSize={experience.group_size}
                            onBook={() => window.open(`https://wa.me/212600000000?text=I'm interested in booking: ${experience.title}`, '_blank')}
                        />
                    </div>

                </div>
            </div>

            {/* Lightbox Gallery */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1);
                            }}
                            className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0);
                            }}
                            className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-12" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={galleryImages[selectedImage]}
                                alt={`${experience.title} ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                            {selectedImage + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
