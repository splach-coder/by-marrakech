'use client';

import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteData, siteData } from '@/data/siteData';
import { use, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
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
import BookingCard from '../../components/BookingCard';

interface ActivityPageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function ActivityPage({ params }: ActivityPageProps) {
    const { id } = use(params);
    const locale = useLocale();
    const t = useTranslations('common');
    const tAct = useTranslations('activityDetail');
    const tHeader = useTranslations('Header');

    const localizedSiteData = getSiteData(locale);
    const activity = localizedSiteData.activities.find(a => String(a.id) === id) || siteData.activities.find(a => String(a.id) === id);
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
            <section className="relative h-[60vh] md:h-[75vh] w-full">
                <Image
                    src={activity.banner_image?.url || activity.image.url}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-24">
                    <div className="container-custom mx-auto px-4 md:px-8">
                        {/* Breadcrumbs */}
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-3 md:mb-6 overflow-x-auto whitespace-nowrap"
                        >
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider font-semibold">{t('home')}</span>
                            </Link>
                            <ChevronRight className="w-3 h-3 text-white/50" />
                            <Link href="/activities" className="hover:text-white transition-colors">
                                <span className="uppercase tracking-wider font-semibold">{tHeader('activities')}</span>
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
                                {tAct('authenticExperience')}
                            </span>

                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-[1.1]">
                                {activity.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 md:gap-6 text-white/90 text-sm md:text-base">
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
                                    <span className="font-medium text-lg">{tAct('photoOpportunities')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. DESCRIPTION & HIGHLIGHTS */}
            <section className="py-8 md:py-20 bg-white">
                <div className="px-4 md:container-custom md:mx-auto md:px-8 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            {/* Left: Description */}
                            <div className="w-full md:w-2/3">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">{tAct('aboutExperience')}</h2>
                                <p className="text-xl text-gray-600 leading-relaxed font-light mb-8">
                                    {activity.description}
                                </p>
                            </div>

                            {/* Right: Quick Stats Card */}
                            <div className="w-full md:w-1/3 bg-[#faf9f6] p-8 rounded-2xl border border-stone-100">
                                <h3 className="font-serif font-bold text-gray-900 mb-6 text-xl">{tAct('quickFacts')}</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">{t('duration')}</div>
                                            <div className="font-medium">{t('flexible')}</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">{t('groupSize')}</div>
                                            <div className="font-medium">{tAct('privateSmallGroup')}</div>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wide">{t('rating')}</div>
                                            <div className="font-medium">{tAct('excellentRating')}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* What to Expect Cards */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">{tAct('whatToExpect')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: Camera,
                                        title: tAct('authenticVibeTitle'),
                                        desc: tAct('authenticVibeDesc')
                                    },
                                    {
                                        icon: MapPin,
                                        title: tAct('scenicViewsTitle'),
                                        desc: tAct('scenicViewsDesc')
                                    },
                                    {
                                        icon: Users,
                                        title: tAct('localExpertsTitle'),
                                        desc: tAct('localExpertsDesc')
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
            <section className="py-8 md:py-16 bg-[#faf9f6]">
                <div className="px-4 md:container-custom md:mx-auto md:px-8">
                    <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">{t('gallery')}</h2>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />
                    </div>
                </div>
            </section>

            {/* 4. BOOKING CARD */}
            <section className="py-24 bg-background">
                <div className="container-custom mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 max-w-7xl mx-auto">
                        {/* Left: Final CTA */}
                        <div className="lg:col-span-4 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                                {tAct('readyForAdventure')}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                                {tAct('bookToday', { title: activity.title })}
                            </p>
                            <div className="flex flex-wrap gap-6 text-gray-600">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{tAct('flexibleDuration')}</div>
                                        <div className="text-sm">{tAct('adaptSchedule')}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{tAct('allGroupSizes')}</div>
                                        <div className="text-sm">{tAct('privateOrShared')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Booking Card */}
                        <div className="lg:col-span-3">
                            <BookingCard
                                id={String(activity.id)}
                                type="activity"
                                imageUrl={activity.image.url}
                                title={activity.title}
                                price={activity.price || `${t('from')} €35`}
                                duration={activity.duration || t('flexible')}
                                groupSize={activity.suitable_for?.[0] || 'All sizes'}
                            />
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
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white transition-colors z-50 bg-black/30 backdrop-blur-sm rounded-full p-2"
                        >
                            <X className="w-6 md:w-8 h-6 md:h-8" />
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

                        <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center">
                            <div className="relative w-full flex-1 flex items-center justify-center">
                                <Image
                                    src={galleryImages[selectedImage]}
                                    alt={`${activity.title} ${selectedImage + 1}`}
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
