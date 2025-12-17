
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { driversData, driversDataFr } from '@/data/drivers';
import { getSiteData, siteData } from '@/data/siteData';
import { use, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
    ChevronRight,
    Star,
    Shield,
    MapPin,
    Globe,
    Award,
    Car,
    MessageCircle,
    X,
    ChevronLeft,
    Home,
    Info,
    CalendarCheck,
    Wifi,
    Check,
    Camera
} from 'lucide-react';
import GalleryGrid from '../../components/GalleryGrid';

interface DriverPageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function DriverPage({ params }: DriverPageProps) {
    const { id } = use(params);
    const locale = useLocale();
    const t = useTranslations('common');
    const tDriv = useTranslations('driverDetail');
    const tGallery = useTranslations('galleryPage');

    // Select data based on locale
    const drivers = locale === 'fr' ? driversDataFr : driversData;
    const driver = drivers.find(d => d.id === id);

    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [bookingMode, setBookingMode] = useState<'custom' | 'tour'>('custom');
    const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

    // Fetch localized data for suggestions
    const localizedSiteData = getSiteData(locale);

    if (!driver) {
        notFound();
    }

    const galleryImages = driver.gallery || [driver.image];

    // Combine tours and activities for suggestions
    const allSuggested = [
        ...(localizedSiteData.tours || siteData.tours).map(t => ({ ...t, type: 'tour' })),
        ...(localizedSiteData.activities || siteData.activities).map(a => ({ ...a, type: 'activity' }))
    ].filter(item => {
        const hasMatchingLocation = item.locations && driver.locations.some(driverLoc =>
            item.locations.some((itemLoc: any) =>
                (typeof itemLoc === 'string' ? itemLoc : itemLoc.name) === driverLoc
            )
        );
        return driver.preferredTours.includes(item.title) || hasMatchingLocation; // Keep this consistent with the fix we just made
    });

    const handleBook = () => {
        let message = '';
        if (bookingMode === 'custom') {
            const nameToUse = driver.brandInfo?.companyName || driver.name;
            message = `I'm interested in booking a custom itinerary with ${nameToUse}.`;
        } else {
            const selectedItem = allSuggested.find(i => String(i.id) === selectedTourId);
            const tourName = selectedItem ? selectedItem.title : 'a tour';
            const nameToUse = driver.brandInfo?.companyName || driver.name;
            message = `I'm interested in booking the tour "${tourName}" with ${nameToUse}.`;
        }
        const url = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const isBranded = driver.hasBrand;

    return (
        <main className={`min-h-screen bg-stone-50 ${isBranded ? '' : ''}`}>

            {/* HEADER AREA - Conditional */}
            {isBranded ? (
                // BRANDED HERO
                <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                    {driver.brandInfo?.banner && (
                        <>
                            <Image
                                src={driver.brandInfo.banner}
                                alt={driver.brandInfo.companyName || driver.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </>
                    )}

                    <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 container-custom px-4 md:px-8">
                        <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8">
                            {/* Brand Logo */}
                            {driver.brandInfo?.logo && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-2xl p-4 shadow-2xl flex-shrink-0 me-auto"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={driver.brandInfo.logo}
                                            alt="Brand Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-white pb-2 flex-1"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <span className="uppercase tracking-widest text-xs md:text-sm font-medium text-white/90">
                                        {tDriv('verifiedProfessional', { years: driver.experienceYears })}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 shadow-black drop-shadow-md">
                                    {driver.brandInfo?.companyName || driver.name}
                                </h1>
                                {driver.brandInfo?.description && (
                                    <p className="text-white/90 text-lg md:text-xl max-w-2xl font-light leading-relaxed drop-shadow-sm border-l-4 border-primary pl-4">
                                        {driver.brandInfo.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>

                        {/* Breadcrumbs inside Hero for Branded */}
                        <nav className="flex items-center gap-2 text-xs md:text-sm text-white/60 mt-8">
                            <Link href={`/${locale}`} className="hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-3.5 h-3.5 mb-0.5" />
                                <span>{t('home')}</span>
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href={`/${locale}/services/501`} className="hover:text-white transition-colors capitalize">
                                {tDriv('backToDrivers')}
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white font-medium">{driver.brandInfo?.companyName || driver.name}</span>
                        </nav>
                    </div>
                </div>
            ) : (
                // STANDARD HEADER
                <div className="bg-white border-b border-stone-100 pt-24 md:pt-32">
                    <div className="container-custom py-4">
                        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                            <Link href={`/${locale}`} className="hover:text-primary transition-colors flex items-center gap-1">
                                <Home className="w-3.5 h-3.5 mb-0.5" />
                                <span>{t('home')}</span>
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href={`/${locale}/services/501`} className="hover:text-primary transition-colors capitalize">
                                {tDriv('backToDrivers')}
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-gray-900 font-medium">{driver.name}</span>
                        </nav>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <div className={`container-custom ${isBranded ? '-mt-16 md:-mt-20 relative z-10 mb-12' : 'py-8 md:py-12'}`}>
                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col lg:flex-row ${isBranded ? 'shadow-stone-200/50' : 'min-h-[850px]'}`}
                >
                    {/* LEFT SIDE: Visuals & Core Info */}
                    <div className="w-full lg:w-5/12 bg-stone-50 px-4 py-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-stone-100 flex flex-col">

                        {/* For non-branded, show profile image prominently here */}
                        {!isBranded && (
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-40 md:w-56 h-40 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl mb-6 cursor-pointer group">
                                    <Image
                                        src={driver.image}
                                        alt={driver.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        priority
                                    />
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 text-center mb-3">
                                    {driver.name}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white px-5 py-2.5 rounded-full shadow-sm border border-stone-100">
                                    <Shield className="w-4 h-4 text-primary" />
                                    <span className="font-semibold tracking-wide uppercase text-xs">
                                        {tDriv('verifiedProfessional', { years: driver.experienceYears })}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* For Branded, show a smaller profile card/intro */}
                        {isBranded && (
                            <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                                    <Image src={driver.image} alt={driver.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{tDriv('yourDriver')}</p>
                                    <h3 className="text-xl font-bold text-gray-900 leading-none">{driver.name}</h3>
                                </div>
                            </div>
                        )}

                        <div className="w-full space-y-6">
                            {/* Vehicle Info - Condensed for Branded, Expanded for Non-Brand */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Car className="w-4 h-4 text-primary" /> {tDriv('vehicleFleet')}
                                </h4>

                                {!isBranded && (
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {driver.gallery.slice(0, 2).map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-stone-100 group cursor-pointer"
                                                onClick={() => setSelectedImage(i)}
                                            >
                                                <Image
                                                    src={img}
                                                    alt="Vehicle"
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {driver.vehicleTypes.map((v) => (
                                        <span key={v} className="text-xs bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border border-stone-200">{v}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" /> {tDriv('languages')}
                                    </h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {driver.languages.map(l => (
                                        <span key={l} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100">
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Onboard Comforts */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Wifi className="w-4 h-4 text-primary" /> {tDriv('onboardComforts')}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(driver.features || []).map((feature, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-stone-50 text-stone-600 rounded-lg text-xs font-bold border border-stone-200 flex items-center gap-1.5">
                                            <Check className="w-3 h-3 text-emerald-500" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary" /> {t('privateDriverPage.details.badges')}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {driver.badges.map((b, i) => (
                                        <span key={i} className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Details & Booking */}
                    <div className="w-full lg:w-7/12 p-6 md:p-10 lg:p-12 bg-white flex flex-col">

                        <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-stone-100 pb-8">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-serif">{tDriv('aboutDriver')}</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-900">{driver.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-stone mb-10 max-w-none">
                            <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg">
                                {driver.bio}
                            </p>
                        </div>

                        {/* Booking Section */}
                        <div className="mt-auto">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                                <CalendarCheck className="w-5 h-5 text-primary" />
                                {tDriv('startJourney')}
                            </h3>

                            <div className="bg-stone-50 p-1.5 rounded-2xl mb-8 flex shadow-inner">
                                <button
                                    onClick={() => setBookingMode('custom')}
                                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all ${bookingMode === 'custom' ? 'bg-white shadow text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {tDriv('customItinerary')}
                                </button>
                                <button
                                    onClick={() => setBookingMode('tour')}
                                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all ${bookingMode === 'tour' ? 'bg-white shadow text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {tDriv('bookAgencyTour')}
                                </button>
                            </div>

                            <div className="min-h-[300px] mb-8 relative">
                                {bookingMode === 'custom' ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-blue-50/50 rounded-2xl py-8 px-6 border border-blue-100 h-full"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="hidden md:flex w-12 h-12 rounded-full bg-blue-100  items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">{tDriv('totalFlexibilityTitle')}</h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {tDriv('totalFlexibilityDesc', { name: isBranded ? (driver.brandInfo?.companyName || driver.name) : driver.name.split(' ')[0] })}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-stone-500 font-medium text-sm">
                                                {tDriv('selectTour', { name: driver.name.split(' ')[0] })}
                                            </p>
                                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                                                {tDriv('availableCount', { count: allSuggested.length })}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
                                            {allSuggested.length > 0 ? allSuggested.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setSelectedTourId(String(item.id))}
                                                    className={`group relative flex items-center gap-4 p-3 rounded-2xl border-2 transition-all cursor-pointer ${selectedTourId === String(item.id) ? 'border-primary bg-primary/5 shadow-sm' : 'border-stone-100 hover:border-sidebar-primary/30 bg-white hover:shadow-lg'}`}
                                                >
                                                    <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm">
                                                        <Image src={item.image?.url || (item as any).banner_image?.url} alt={item.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-base mb-1 truncate pr-8">{item.title}</h5>
                                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                                            <span>{item.duration || t('flexible')}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="capitalize text-stone-400">{item.type}</span>
                                                        </div>
                                                    </div>

                                                    {/* Selection Circle */}
                                                    <div className="pr-2">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTourId === String(item.id) ? 'border-primary bg-primary' : 'border-gray-200 group-hover:border-primary/50'}`}>
                                                            {selectedTourId === String(item.id) && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                        </div>
                                                    </div>

                                                    {/* Info Link */}
                                                    <Link
                                                        href={item.type === 'tour' ? `/${locale}/tours/${item.id}` : `/${locale}/activities/${item.id}`}
                                                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-primary hover:bg-white rounded-full transition-all z-10"
                                                        onClick={(e) => e.stopPropagation()}
                                                        title="View Details"
                                                    >
                                                        <Info className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                            )) : (
                                                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100 text-stone-400 flex flex-col items-center justify-center h-full">
                                                    <MapPin className="w-12 h-12 mb-3 text-stone-200" />
                                                    <p>{tDriv('noToursMatch')}</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                onClick={handleBook}
                                disabled={bookingMode === 'tour' && !selectedTourId}
                                className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 ${bookingMode === 'tour' && !selectedTourId ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-green-500/30'}`}
                            >
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-lg">{tDriv('bookWhatsApp')}</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BRANDED GALLERY SECTION (Large Masonry/Grid) */}
            {isBranded && (
                <section className="container-custom pb-20 md:pb-32">
                    <div className="flex items-center gap-4 mb-8 md:mb-12">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Camera className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{tGallery('hero.title')}</h2>
                            <p className="text-gray-500">{tGallery('hero.subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                            >
                                <Image
                                    src={img}
                                    alt={`Portfolio image ${i + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Lightbox Gallery */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white transition-colors z-50 bg-black/30 backdrop-blur-sm rounded-full p-2"
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        >
                            <X className="w-6 md:w-8 h-6 md:h-8" />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1);
                            }}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0);
                            }}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center">
                            <div className="relative w-full flex-1 flex items-center justify-center">
                                <Image
                                    src={galleryImages[selectedImage]}
                                    alt="Gallery view"
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

