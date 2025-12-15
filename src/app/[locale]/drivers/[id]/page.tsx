'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { driversData } from '@/data/drivers';
import { siteData } from '@/data/siteData';
import {
    Star,
    MapPin,
    Globe,
    Car,
    Check,
    MessageCircle,
    Shield,
    Wifi,
    CalendarCheck,
    ChevronLeft,
    ArrowUpRight,
    Info
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';

interface DriverPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DriverProfilePage({ params }: DriverPageProps) {
    const { id } = use(params);
    const driver = driversData.find(d => d.id === id);
    const [bookingMode, setBookingMode] = useState<'custom' | 'tour'>('custom');
    const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

    if (!driver) {
        notFound();
    }

    // Derived Data - Show ALL recommendations
    const suggestedTours = siteData.tours
        .filter(t => t.locations?.some(l => driver.locations.includes(l.name)))
        .map(t => ({ ...t, type: 'tour' }));

    const suggestedExcursions = siteData.excursions
        .filter(e => e.locations?.some(l => driver.locations.includes(l.name)))
        .map(e => ({ ...e, type: 'excursion' }));

    const allSuggested = [...suggestedTours, ...suggestedExcursions];

    const handleBookingClick = (type: 'whatsapp') => {
        let message = `Hello, I am interested in booking driver ${driver.name}.`;
        if (bookingMode === 'tour' && selectedTourId) {
            const tour = allSuggested.find(t => t.id === selectedTourId);
            if (tour) {
                message += ` I would like to book the "${tour.title}" from your agency tours with him.`;
            }
        } else {
            message += ` I would like to discuss a custom itinerary.`;
        }

        window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-20 md:pt-28 pb-8 md:pb-20 px-0 md:px-8 relative overflow-hidden">
            {/* Decorative Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>

            <div className="px-4 md:container-custom mx-auto max-w-7xl relative z-10">

                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/services/501" className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors font-medium group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Drivers
                    </Link>
                </div>

                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col lg:flex-row min-h-[850px]"
                >
                    {/* LEFT SIDE: Visuals & Core Info */}
                    <div className="w-full lg:w-5/12 bg-stone-50 px-2 py-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-stone-100 flex flex-col">
                        <div className="flex flex-col items-center mb-6 md:mb-10">
                            <div className="relative w-40 md:w-56 h-40 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl mb-6 md:mb-8 group cursor-pointer">
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
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-white px-5 py-2.5 rounded-full shadow-sm border border-stone-100">
                                <Shield className="w-4 h-4 text-primary" />
                                <span className="font-semibold tracking-wide uppercase text-xs">Verified Professional • {driver.experienceYears} Years Exp.</span>
                            </div>

                            <div className="w-full space-y-6">
                                {/* Vehicle Fleet */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Car className="w-4 h-4 text-primary" /> Vehicle Fleet
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {driver.gallery.slice(0, 2).map((img, i) => (
                                            <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-stone-100 group">
                                                <Image
                                                    src={img}
                                                    alt="Vehicle"
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {driver.vehicleTypes.map((v) => (
                                            <span key={v} className="text-xs bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">{v}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-primary" /> Languages
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
                                        <Wifi className="w-4 h-4 text-primary" /> Onboard Comforts
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
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Details & Booking */}
                    <div className="w-full lg:w-7/12 p-6 md:p-8 lg:p-12 bg-white flex flex-col">

                        <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-stone-100 pb-8">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-serif">About Your Driver</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-900">{driver.rating}</span>
                                    <span className="text-gray-400">/ 5.0 Rating</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-stone mb-8 md:mb-12 max-w-none">
                            <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg">
                                {driver.bio}
                            </p>
                        </div>

                        {/* Booking Section */}
                        <div className="mt-auto">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                                <CalendarCheck className="w-5 h-5 text-primary" />
                                Start Your Journey
                            </h3>

                            <div className="bg-stone-50 p-1.5 rounded-2xl mb-8 flex shadow-inner">
                                <button
                                    onClick={() => setBookingMode('custom')}
                                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all ${bookingMode === 'custom' ? 'bg-white shadow text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Custom Itinerary
                                </button>
                                <button
                                    onClick={() => setBookingMode('tour')}
                                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all ${bookingMode === 'tour' ? 'bg-white shadow text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Book Agency Tour
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
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">Total Flexibility</h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    Hire {driver.name} for the day, week, or specific trip.
                                                    You decide the route, stops, and pace. Perfect for explorers who want to go off the beaten path.
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
                                                Select a tour to book with {driver.name}:
                                            </p>
                                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                                                {allSuggested.length} Available
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
                                            {allSuggested.length > 0 ? allSuggested.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setSelectedTourId(item.id)}
                                                    className={`group relative flex items-center gap-4 p-3 rounded-2xl border-2 transition-all cursor-pointer ${selectedTourId === item.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-stone-100 hover:border-sidebar-primary/30 bg-white hover:shadow-lg'}`}
                                                >
                                                    <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm">
                                                        <Image src={item.image?.url} alt={item.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-base mb-1 truncate pr-8">{item.title}</h5>
                                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                                            <span>{item.duration || 'Day Trip'}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="capitalize text-stone-400">{item.type}</span>
                                                        </div>
                                                    </div>

                                                    {/* Selection Circle */}
                                                    <div className="pr-2">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTourId === item.id ? 'border-primary bg-primary' : 'border-gray-200 group-hover:border-primary/50'}`}>
                                                            {selectedTourId === item.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                        </div>
                                                    </div>

                                                    {/* Info Link */}
                                                    <Link
                                                        href={item.type === 'tour' ? `/tours/${item.id}` : `/activities/${item.id}`}
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
                                                    <p>No specific tours match this driver's primary regions currently.</p>
                                                    <p className="text-sm mt-2 text-primary font-bold">Please choose "Custom Itinerary"</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                onClick={() => handleBookingClick('whatsapp')}
                                className="flex items-center justify-center gap-3 w-full py-4 md:py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg"
                            >
                                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                                <span>Book via WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
