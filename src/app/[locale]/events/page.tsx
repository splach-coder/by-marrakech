'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { eventsData } from '@/data/home-data';
import {
    ArrowRight,
    MapPin,
    Calendar,
    Music,
    Camera,
    Coffee,
    Sparkles
} from 'lucide-react';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
};

export default function EventsPage() {
    // Dynamic Date Logic
    const today = new Date();

    const liveEvents = eventsData.filter(e => {
        if (!e.startDate) return false;
        const start = new Date(e.startDate);
        const end = e.endDate ? new Date(e.endDate) : new Date(start.getTime() + 86400000); // Default 1 day
        return today >= start && today <= end;
    });

    const upcomingEvents = eventsData.filter(e => {
        if (!e.startDate) return false;
        const start = new Date(e.startDate);
        return today < start;
    });

    const pastEvents = eventsData.filter(e => {
        if (!e.startDate) return false;
        const end = e.endDate ? new Date(e.endDate) : new Date(new Date(e.startDate).getTime() + 86400000);
        return today > end;
    });

    // Helper to get icon based on event title/type
    const getEventIcon = (title: string) => {
        if (title.toLowerCase().includes('music') || title.toLowerCase().includes('bailaimos')) return Music;
        if (title.toLowerCase().includes('film')) return Camera;
        if (title.toLowerCase().includes('coffee')) return Coffee;
        return Sparkles;
    };

    return (
        <main className="min-h-screen bg-[#faf9f6]">

            {/* 1. CINEMA HERO */}
            <section className="relative h-screen min-h-[700px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/events-banner.jpg" // Fallback: /images/events-hero.jpg if missing
                        alt="Morocco Events"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-white/90 text-sm font-medium tracking-[0.2em] mb-6 backdrop-blur-sm bg-white/5 uppercase">
                            Cultural Agenda
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-medium tracking-tight mb-8">
                            The Pulse
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                            Immerse yourself in the rhythm of Morocco. From ancient folklore to modern cinema.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* 2. HAPPENING NOW (Editorial Style) */}
            {liveEvents.length > 0 && (
                <section className="py-12 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div {...fadeInUp} className="mb-10 flex items-end justify-between">
                            <div>
                                <span className="text-primary uppercase tracking-widest font-bold text-sm mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Live Now
                                </span>
                                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
                                    Happening This Week
                                </h2>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {liveEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="group relative"
                                >
                                    <Link href={`#`} className="block">
                                        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-6 shadow-xl">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-gray-500">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    {event.dateRange || event.date}
                                                </span>
                                                <span className="w-px h-3 bg-gray-300"></span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    {event.location}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>

                                            {event.description && (
                                                <p className="text-gray-600 text-base font-light leading-relaxed max-w-xl">
                                                    {event.description}
                                                </p>
                                            )}

                                            <div className="mt-2 flex items-center gap-2 text-primary font-medium tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                <span>View Event Details</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 3. UPCOMING HIGHLIGHTS */}
            <section className="py-24 bg-[#faf9f6]">
                <div className="container-custom mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-primary uppercase tracking-widest font-bold text-sm mb-3 block">Perspective</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Upcoming Highlights</h2>
                        <p className="text-gray-600 font-light text-lg">
                            Mark your calendars. A curated selection of festivals, exhibitions, and cultural gatherings defining the season.
                        </p>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="whileInView"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {upcomingEvents.map((event) => {
                                const Icon = getEventIcon(event.title);
                                return (
                                    <motion.div
                                        key={event.id}
                                        variants={fadeInUp}
                                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="w-12 h-12 bg-[#faf9f6] rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-sm font-bold bg-primary/5 text-primary tracking-wider px-3 py-1 rounded-full uppercase">
                                                {event.date}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                                            <MapPin className="w-4 h-4" />
                                            {event.location}
                                        </div>

                                        <div className="aspect-video relative rounded-lg overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <Link
                                            href="#"
                                            className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition-colors"
                                        >
                                            <span className="text-sm uppercase tracking-wider">Learn More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-stone-100 max-w-2xl mx-auto">
                            <Calendar className="w-16 h-16 text-stone-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Nothing in here</h3>
                            <p className="text-stone-500 text-lg">Currently no upcoming events scheduled. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. PAST EVENTS */}
            {pastEvents.length > 0 && (
                <section className="py-24 bg-white border-t border-stone-100">
                    <div className="container-custom mx-auto px-4 md:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-stone-700 uppercase tracking-widest font-bold text-sm mb-3 block">Archive</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-700 mb-4">Past Memories</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="group relative rounded-xl overflow-hidden bg-stone-50">
                                    <div className="aspect-[4/3] relative filter transition-all">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="px-2 py-1 bg-stone-200 text-stone-600 text-xs font-bold uppercase rounded inline-block mb-3">
                                            Ended {event.date}
                                        </div>
                                        <h3 className="text-lg font-bold text-stone-700 leading-snug mb-1">
                                            {event.title}
                                        </h3>
                                        <p className="text-xs text-stone-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {event.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="py-20 text-center bg-[#faf9f6]">
                <p className="text-gray-500 italic font-serif text-lg mb-8">
                    &quot;Culture is the widening of the mind and of the spirit.&quot;
                </p>
                <Link
                    href="/contact"
                    className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                >
                    <span>Plan Your Cultural Trip</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

        </main>
    );
}
