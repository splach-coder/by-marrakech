'use client';

import { Suspense, useState, use } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    Calendar,
    Users,
    Trash2,
    ChevronRight,
    Check,
    MessageSquare,
    User,
    Mail,
    Phone
} from 'lucide-react';

interface BookingPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default function BookingPage({ params }: BookingPageProps) {
    const { locale } = use(params);
    const router = useRouter();
    const { items, removeItem, clearCart } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalGuests = items.reduce((acc, item) => acc + (item.guests || 0), 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Construct WhatsApp Message
        let message = `*New Booking Request from ${formData.firstName} ${formData.lastName}*\n\n`;
        message += `📧 Email: ${formData.email}\n`;
        message += `📞 Phone: ${formData.phone}\n\n`;
        message += `*Requested Journey:*\n`;

        items.forEach((item, index) => {
            message += `\n*${index + 1}. ${item.title}*\n`;
            message += `   📅 Date: ${item.date || 'Not specified'}\n`;
            message += `   👥 Guests: ${item.guests}\n`;
            message += `   💰 Price Ref: ${item.price}\n`;
        });

        if (formData.notes) {
            message += `\n*Special Requests:*\n${formData.notes}\n`;
        }

        message += `\n--------------------------------\nSent via ByMarrakech Website`;

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;

        // In a real app, you might want to save this to a DB first
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            clearCart();
            router.push(`/${locale}/thank-you`);
        }, 1500);
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-[#faf9f6] pt-32 pb-20 px-4">
                <div className="container-custom max-w-2xl text-center space-y-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-3xl font-serif text-gray-900">Your Journey is Empty</h1>
                    <p className="text-gray-500">Looks like you haven't added any experiences yet.</p>
                    <button
                        onClick={() => router.push(`/${locale}/experiences`)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors"
                    >
                        Explore Experiences
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Final Step</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3 mb-4">Complete Your Journey</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Review your selected experiences and provide your details. Our concierge team will confirm availability and generate your personalized itinerary.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">

                    {/* Left Column - User Details Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
                                <User className="w-6 h-6 text-primary" />
                                Contact Information
                            </h2>

                            <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            placeholder="e.g. John"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            placeholder="e.g. Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="john@example.com"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">WhatsApp / Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="+1 234 567 8900"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Special Requests / Notes</label>
                                    <textarea
                                        name="notes"
                                        rows={4}
                                        placeholder="Dietary requirements, accessibility needs, or special occasions..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-28">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                Journey Summary
                            </h3>

                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 pr-2">
                                                    {item.title}
                                                </h4>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{item.date || 'Date pending'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-3 h-3" />
                                                    <span>{item.guests} Guests</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Total Experiences</span>
                                    <span className="font-bold text-gray-900">{items.length}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Total Guests</span>
                                    <span className="font-bold text-gray-900">{totalGuests}</span>
                                </div>

                                <div className="bg-amber-50 rounded-lg p-4 text-xs text-amber-800 leading-relaxed flex gap-2">
                                    <div className="mt-0.5"><MessageSquare className="w-4 h-4" /></div>
                                    <p>
                                        This will open WhatsApp with your pre-filled inquiry. Our concierge will reply instantly with final availability.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    form="booking-form"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <span>Send Request</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
