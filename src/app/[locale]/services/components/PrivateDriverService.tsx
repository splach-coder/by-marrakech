'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { driversData, Driver } from '@/data/drivers';
import { siteData } from '@/data/siteData';
import {
    Star,
    MapPin,
    Globe,
    Car,
    Check,
    Filter,
    X,
    MessageCircle,
    Mail,
    ChevronRight,
    Shield,
    Wifi,
    CalendarCheck,
    ArrowRight
} from 'lucide-react';

export default function PrivateDriverService() {
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [filterLang, setFilterLang] = useState<string>('All');
    const [filterVehicle, setFilterVehicle] = useState<string>('All');
    const [bookingMode, setBookingMode] = useState<'custom' | 'tour'>('custom');
    const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

    // Filter Logic
    const filteredDrivers = driversData.filter(driver => {
        const langMatch = filterLang === 'All' || driver.languages.includes(filterLang);
        const vehicleMatch = filterVehicle === 'All' || driver.vehicleTypes.some(v => v.includes(filterVehicle));
        return langMatch && vehicleMatch;
    });

    const allLanguages = Array.from(new Set(driversData.flatMap(d => d.languages)));
    const allVehicles = Array.from(new Set(driversData.flatMap(d => d.vehicleTypes)));

    // Derived Data for Modal
    const suggestedTours = selectedDriver
        ? siteData.tours
            .filter(t => t.locations?.some(l => selectedDriver.locations.includes(l.name)))
            .slice(0, 4)
        : [];

    // Also optionally include Excursions
    const suggestedExcursions = selectedDriver
        ? siteData.excursions
            .filter(e => e.locations?.some(l => selectedDriver.locations.includes(l.name)))
            .slice(0, 2)
        : [];

    const allSuggested = [...suggestedTours, ...suggestedExcursions];

    const handleBookingClick = (type: 'whatsapp' | 'email') => {
        if (!selectedDriver) return;

        let message = `Hello, I am interested in booking driver ${selectedDriver.name}.`;
        if (bookingMode === 'tour' && selectedTourId) {
            const tour = allSuggested.find(t => t.id === selectedTourId);
            if (tour) {
                message += ` I would like to book the "${tour.title}" from your agency tours with him.`;
            }
        } else {
            message += ` I would like to discuss a custom itinerary.`;
        }

        if (type === 'whatsapp') {
            window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
        } else {
            window.location.href = `mailto:hello@bymarrakech.com?subject=Booking Request: ${selectedDriver.name}&body=${encodeURIComponent(message)}`;
        }
    };

    return (
        <main className="min-h-screen bg-[#faf9f6]">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <Image
                    src="/images/services/luxury_driver_service.png"
                    alt="Luxury Driver Service"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-white/90 text-sm font-medium tracking-[0.2em] mb-6 backdrop-blur-sm bg-white/5 uppercase">
                            Premium Service
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-6">
                            Your Freedom, Your Morocco
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                            Select your personal driver, choose your vehicle, and craft your own journey.
                            Experience the luxury of total flexibility.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. HOW IT WORKS */}
            <section className="py-16 bg-white border-b border-stone-100">
                <div className="container-custom mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            We believe the driver makes the journey. That's why we let you choose the perfect match for your travel style.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { step: "01", title: "Browse Profiles", desc: "View detailed portfolios, read bios, and check specialties to find your connection." },
                            { step: "02", title: "Select & Connect", desc: "Choose your driver and vehicle, then chat directly to plan your perfect itinerary." },
                            { step: "03", title: "Enjoy the Ride", desc: "Relax in luxury while your local expert handles the navigation and logistics." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[#faf9f6]">
                                <span className="text-5xl font-serif text-gray-200 font-bold block mb-4">{item.step}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. BROWSE DRIVERS (Grid & Filters) */}
            <section className="py-20 px-4 md:px-8">
                <div className="container-custom mx-auto max-w-7xl">

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" />
                            <span className="font-bold text-gray-900">Filter Drivers:</span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <select
                                className="px-4 py-2 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-primary text-gray-700 font-medium cursor-pointer"
                                value={filterLang}
                                onChange={(e) => setFilterLang(e.target.value)}
                            >
                                <option value="All">All Languages</option>
                                {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>

                            <select
                                className="px-4 py-2 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-primary text-gray-700 font-medium cursor-pointer"
                                value={filterVehicle}
                                onChange={(e) => setFilterVehicle(e.target.value)}
                            >
                                <option value="All">All Vehicles</option>
                                {allVehicles.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDrivers.map((driver) => (
                            <motion.div
                                key={driver.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col relative h-full border border-gray-100"
                            >
                                {/* Clean Card Look */}
                                <div className="p-2">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={driver.image}
                                            alt={driver.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-gray-100">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                            <span className="font-bold text-xs text-gray-900">{driver.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors">{driver.name}</h3>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                                        {driver.bio}
                                    </p>

                                    <div className="space-y-3 mb-6 mt-auto">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">{driver.vehicleTypes[0]}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">{driver.languages[0]} Speaker</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setSelectedDriver(driver); setBookingMode('custom'); setSelectedTourId(null); }}
                                        className="w-full py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <span>View Profile</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. DRIVER PROFILE MODAL */}
            <AnimatePresence>
                {selectedDriver && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedDriver(null)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedDriver(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
                            >
                                <X className="w-6 h-6 text-gray-900" />
                            </button>

                            {/* Split Layout */}
                            <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto">

                                {/* LEFT: Driver Visuals */}
                                <div className="w-full md:w-5/12 bg-gray-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                                            <Image
                                                src={selectedDriver.image}
                                                alt={selectedDriver.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-2">{selectedDriver.name}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                            <Shield className="w-4 h-4 text-green-600" />
                                            <span>Verified • {selectedDriver.experienceYears} Years Exp.</span>
                                        </div>

                                        <div className="w-full space-y-4">
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Vehicle Fleet</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {selectedDriver.gallery.slice(0, 2).map((img, i) => (
                                                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                                            <Image src={img} alt="Vehicle" fill className="object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{selectedDriver.vehicleTypes[0]}</span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{selectedDriver.vehicleTypes[1]}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Languages</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedDriver.languages.map(l => (
                                                        <span key={l} className="flex items-center gap-1 text-xs font-medium text-gray-700">
                                                            <Globe className="w-3 h-3 text-primary" /> {l}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Booking & Content */}
                                <div className="w-full md:w-7/12 p-6 md:p-8 bg-white">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Book Your Journey</h3>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-primary">€{selectedDriver.pricePerDay}</span>
                                            <span className="text-xs text-gray-400">per day starting</span>
                                        </div>
                                    </div>

                                    {/* Booking Tabs */}
                                    <div className="bg-gray-50 p-1 rounded-xl flex mb-6">
                                        <button
                                            onClick={() => setBookingMode('custom')}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${bookingMode === 'custom' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            Hire Driver (Custom)
                                        </button>
                                        <button
                                            onClick={() => setBookingMode('tour')}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${bookingMode === 'tour' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            Book Our Tours
                                        </button>
                                    </div>

                                    <div className="min-h-[250px] mb-8">
                                        {bookingMode === 'custom' ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-4"
                                            >
                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                                        <MapPin className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 mb-1">Total Freedom</h4>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            Hire {selectedDriver.name} for a fully customized trip. You decide the itinerary, stops, and pace. Perfect for explorers who want to go off the beaten path.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4 mt-6">
                                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Included Features</h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {selectedDriver.features.map((f, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Check className="w-4 h-4 text-green-500" /> {f}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-4"
                                            >
                                                <p className="text-sm text-gray-500 mb-4">
                                                    Browse our agency tours that {selectedDriver.name} is an expert on. Booking these includes the itinerary, stays (if applicable), and this specific driver.
                                                </p>

                                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {allSuggested.length > 0 ? allSuggested.map((tour) => (
                                                        <div
                                                            key={tour.id}
                                                            onClick={() => setSelectedTourId(tour.id)}
                                                            className={`group flex items-center gap-3 p-2 rounded-xl border transition-all cursor-pointer ${selectedTourId === tour.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-100 hover:border-sidebar-primary hover:bg-white'}`}
                                                        >
                                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                                                <Image src={tour.image?.url} alt={tour.title} fill className="object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="font-bold text-gray-900 text-sm mb-0.5 line-clamp-1">{tour.title}</h5>
                                                                <div className="text-xs text-gray-500">{tour.duration || 'Day Trip'}</div>
                                                            </div>
                                                            <div className="px-3">
                                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedTourId === tour.id ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                                                    {selectedTourId === tour.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="text-center py-8 text-gray-400 text-sm">
                                                            No specific tours match this driver's primary regions.
                                                            <br />Please choose "Custom Journey" to plan a unique route.
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button
                                            onClick={() => handleBookingClick('whatsapp')}
                                            className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-green-100"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <div className="text-left leading-tight">
                                                <span className="block text-xs font-medium opacity-90">Plan via</span>
                                                <span>WhatsApp</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleBookingClick('email')}
                                            className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-gray-200"
                                        >
                                            <Mail className="w-5 h-5" />
                                            <div className="text-left leading-tight">
                                                <span className="block text-xs font-medium opacity-90">Request via</span>
                                                <span>Email</span>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </main>
    );
}
