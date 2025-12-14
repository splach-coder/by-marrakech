'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BookingCardProps {
    price: string;
    title: string;
    duration: string;
    groupSize: string;
    onBook: () => void;
}

export default function BookingCard({ price, title, duration, groupSize, onBook }: BookingCardProps) {
    return (
        <div className="sticky top-8">
            <div className="relative group">
                {/* Decorative Elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-orange-100 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                <div className="relative bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-stone-100">
                    {/* Top Decorative Header */}
                    <div className="h-24 bg-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:16px_16px]"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-[1.5rem]"></div>
                        <div className="absolute top-6 left-8 right-8 flex justify-between items-center text-white/90">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Boarding Pass</span>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8 pt-2">
                        {/* Title Section */}
                        <div className="mb-8">
                            <h3 className="font-serif text-2xl text-gray-900 leading-tight mb-2">{title}</h3>
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Available for booking
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            <div className="space-y-1.5">
                                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Duration</span>
                                <div className="flex items-center gap-2 text-stone-800 font-medium">
                                    <Clock className="w-4 h-4 text-primary" />
                                    {duration}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Group Size</span>
                                <div className="flex items-center gap-2 text-stone-800 font-medium">
                                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center text-[8px] font-bold text-primary">G</div>
                                    <span className="capitalize">{groupSize}</span>
                                </div>
                            </div>
                            <div className="col-span-2 pt-4 border-t border-dashed border-stone-200">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Price</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">{price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={onBook}
                            className="w-full group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white py-4 px-6 rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-primary/20"
                        >
                            <span className="relative z-10 font-bold tracking-wide">Reserve Spot</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-stone-400">Free cancellation up to 24h before</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
