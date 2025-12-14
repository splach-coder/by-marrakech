'use client';

import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { siteData } from '@/data/siteData';
import { useState } from 'react';
import {
    X,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
    Clock,
    Users,
    Camera,
    ArrowRight,
    Home
} from 'lucide-react';
import GalleryGrid from '../../components/GalleryGrid';

interface ActivityPageProps {
    params: {
        id: string;
        locale: string;
    };
}

export default function ActivityPage({ params }: ActivityPageProps) {
    const activity = siteData.activities.find(a => String(a.id) === params.id);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (!activity) {
        notFound();
    }

    const galleryImages = activity.gallery?.map(img => img.url) || [
        activity.image.url
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* 1. HERO SECTION */}
            <section className="relative h-[75vh] w-full">
                <Image
                    src={activity.banner_image?.url || activity.image.url}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
                    <div className="container-custom mx-auto px-4 md:px-8">
                        {/* Breadcrumbs */}
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-6 overflow-x-auto whitespace-nowrap"
                        >
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider font-semibold">Home</span>
                            </Link>
                            <ChevronRight className="w-3 h-3 text-white/50" />
                            <Link href="/activities" className="hover:text-white transition-colors">
                                <span className="uppercase tracking-wider font-semibold">Activities</span>
                            </Link>
                            <ChevronRight className="w-3 h-3 text-white/50" />
                            <span className="text-white font-serif font-medium truncate">
                                {activity.title}
                            </span>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary/90 text-white font-bold uppercase tracking-wider text-xs rounded-full mb-6 backdrop-blur-sm">
                                Authentic Experience
                            </span>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
                                {activity.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-white/90">
                                {activity.locations && activity.locations.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <span className="font-medium text-lg">
                                            {String(activity.locations[0])}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Camera className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-lg">Photo Opportunities</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. DESCRIPTION & HIGHLIGHTS */}
            <section className="py-20 bg-white">
                <div className="container-custom mx-auto px-4 md:px-8 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            {/* Left: Description */}
                            <div className="w-full md:w-2/3">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">About the Experience</h2>
                                <p className="text-xl text-gray-600 leading-relaxed font-light mb-8">
                                    {activity.description}
                                </p>
                            </div>

                            {/* Right: Quick Stats Card */}
                            <div className="w-full md:w-1/3 bg-[#faf9f6] p-8 rounded-2xl border border-stone-100">
                                <h3 className="font-serif font-bold text-gray-900 mb-6 text-xl">Quick Facts</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">Duration</div>
                                            <div className="font-medium">Flexible</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">Group Size</div>
                                            <div className="font-medium">Private / Small Group</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">Rating</div>
                                            <div className="font-medium">5.0 (Excellent)</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* What to Expect Cards */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">What to Expect</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: Camera,
                                        title: "Authentic Vibe",
                                        desc: "Immerse yourself in genuine Moroccan culture and traditions."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Scenic Views",
                                        desc: "Capture stunning memories in picturesque, hand-picked locations."
                                    },
                                    {
                                        icon: Users,
                                        title: "Local Experts",
                                        desc: "Learn fascinating stories from knowledgeable local guides."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-stone-50 rounded-xl p-8 hover:bg-stone-100 transition-all duration-300 group">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. GALLERY (Now at the bottom) */}
            <section className="py-16 bg-[#faf9f6]">
                <div className="container-custom mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">Experience Gallery</h2>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />
                    </div>
                </div>
            </section>

            {/* 4. BOOKING CTA */}
            <section className="py-24 bg-white">
                <div className="container-custom mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="bg-primary rounded-3xl p-10 md:p-16 shadow-2xl text-center relative overflow-hidden">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                                Ready for an Adventure?
                            </h2>
                            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Book your <span className="font-bold">{activity.title}</span> experience today.
                                Flexible scheduling and private groups available.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={`https://wa.me/212600000000?text=I'm interested in: ${activity.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2"
                                >
                                    <span>Book via WhatsApp</span>
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY LIGHTBOX */}
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
                                alt={`${activity.title} ${selectedImage + 1}`}
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
