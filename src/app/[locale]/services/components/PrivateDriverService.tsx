'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getDriversData } from '@/lib/i18n-data';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
    Star,
    MapPin,
    Globe,
    Car,
    Filter,
    ArrowRight
} from 'lucide-react';

export default function PrivateDriverService() {
    const locale = useLocale();
    const t = useTranslations('privateDriverPage');
    const driversData = getDriversData(locale as 'en' | 'fr');

    const [filterLang, setFilterLang] = useState<string>('All');
    const [filterVehicle, setFilterVehicle] = useState<string>('All');

    // Filter Logic
    const filteredDrivers = driversData.filter(driver => {
        const langMatch = filterLang === 'All' || driver.languages.includes(filterLang);
        const vehicleMatch = filterVehicle === 'All' || driver.vehicleTypes.some(v => v.includes(filterVehicle));
        return langMatch && vehicleMatch;
    });

    const allLanguages = Array.from(new Set(driversData.flatMap(d => d.languages)));
    const allVehicles = Array.from(new Set(driversData.flatMap(d => d.vehicleTypes)));

    return (
        <main className="min-h-screen bg-[#faf9f6]">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <Image
                    src="/images/services/luxury_driver_service.png"
                    alt={t('hero.title')}
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
                            {t('hero.tag')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-6">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. HOW IT WORKS */}
            <section className="py-16 bg-white border-b border-stone-100">
                <div className="container-custom mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{t('howItWorks.title')}</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {t('howItWorks.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { step: "01", title: t('howItWorks.steps.browse.title'), desc: t('howItWorks.steps.browse.desc') },
                            { step: "02", title: t('howItWorks.steps.select.title'), desc: t('howItWorks.steps.select.desc') },
                            { step: "03", title: t('howItWorks.steps.enjoy.title'), desc: t('howItWorks.steps.enjoy.desc') }
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
                            <span className="font-bold text-gray-900">{t('filters.label')}</span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <select
                                className="px-4 py-2 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-primary text-gray-700 font-medium cursor-pointer"
                                value={filterLang}
                                onChange={(e) => setFilterLang(e.target.value)}
                            >
                                <option value="All">{t('filters.allLanguages')}</option>
                                {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>

                            <select
                                className="px-4 py-2 bg-stone-50 rounded-lg border-0 focus:ring-2 focus:ring-primary text-gray-700 font-medium cursor-pointer"
                                value={filterVehicle}
                                onChange={(e) => setFilterVehicle(e.target.value)}
                            >
                                <option value="All">{t('filters.allVehicles')}</option>
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
                                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">{driver.languages[0]} {t('filters.speaker')}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/${locale}/drivers/${driver.id}`}
                                        className="w-full py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <span>{t('card.viewProfile')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

