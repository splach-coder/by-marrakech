'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { eventsData } from '@/data/home-data';
import {
    Calendar,
    MapPin,
    ArrowLeft,
    Share2,
    Clock,
    ArrowRight,
    Info
} from 'lucide-react';
import Link from 'next/link';

interface EventPageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default function EventPage({ params }: EventPageProps) {
    const { id } = use(params);
    const event = eventsData.find((e) => e.id === id);

    if (!event) {
        notFound();
    }

    // Calculate status
    const today = new Date();
    const start = event.startDate ? new Date(event.startDate) : new Date();
    const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 86400000);

    let status = 'Upcoming';
    let statusColor = 'bg-blue-100 text-blue-800';

    if (today >= start && today <= end) {
        status = 'Happening Now';
        statusColor = 'bg-red-100 text-red-800 animate-pulse';
    } else if (today > end) {
        status = 'Ended';
        statusColor = 'bg-stone-100 text-stone-600';
    }

    return (
        <main className="min-h-screen bg-[#faf9f6]">
            {/* 1. CINEMA HERO */}
            <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>

                <div className="absolute top-8 left-0 right-0 z-20 px-4">
                    <div className="container-custom mx-auto">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors backdrop-blur-sm bg-black/10 px-4 py-2 rounded-full"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Events</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 px-4">
                    <div className="container-custom mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${statusColor === 'bg-red-100 text-red-800 animate-pulse' ? 'bg-red-600 text-white' : 'bg-white/20 text-white backdrop-blur-md'}`}>
                                {status === 'Happening Now' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                {status}
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 max-w-4xl leading-[1.1]">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium tracking-wide">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span>{event.dateRange || event.date}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/50" />
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. CONTENT & DETAILS */}
            <section className="py-20 px-4">
                <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-2xl shadow-sm mb-12"
                        >
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Info className="w-6 h-6 text-primary" />
                                About the Event
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {event.description || "Join us for this exclusive cultural experience in the heart of Morocco."}
                            </p>

                            {/* Additional Context (Mocked since data is limited) */}
                            <div className="space-y-6">
                                <p className="text-gray-600 leading-relaxed">
                                    Immerse yourself in the vibrant atmosphere of {event.location}. This event brings together locals and travelers alike to celebrate the rich traditions and modern creativity of Morocco. Whether you are a first-time visitor or a seasoned traveler, this experience promises unforgettable moments.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Expect a curated program featuring authentic performances, artisanal showcases, and the warm hospitality that Morocco is famous for.
                                </p>
                            </div>
                        </motion.div>

                        {/* Gallery Hint */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={event.image} // Reusing main image as placeholder for gallery
                                        alt="Gallery"
                                        fill
                                        className={`object-cover hover:scale-110 transition-transform duration-700 ${i === 2 ? 'hidden md:block' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Quick Info Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Event Details</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</span>
                                        <span className="text-gray-900 font-medium">{event.dateRange || event.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</span>
                                        <span className="text-gray-900 font-medium">All Day</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</span>
                                        <span className="text-gray-900 font-medium">{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link href="/contact" className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-colors shadow-lg shadow-primary/20">
                                    <span>Reserve Your Spot</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button className="w-full py-4 bg-transparent border border-gray-200 text-gray-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share Event</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
