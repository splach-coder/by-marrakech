'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, MessageSquare, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const whatsappUrl = searchParams.get('whatsappUrl');

    const handleWhatsAppClick = () => {
        if (whatsappUrl) {
            window.open(decodeURIComponent(whatsappUrl), '_blank');
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4 mt-4">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Logo */}
                    <div className="mb-4 flex justify-center">
                        <Image
                            src="/images/logo-red.webp"
                            alt="Xhosen Gate"
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                    </div>

                    {/* Thank You Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                            Thank You!
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
                            Your booking request has been received. We're excited to help you create an unforgettable Moroccan experience.
                        </p>
                    </motion.div>

                    {/* WhatsApp CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <MessageSquare className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl font-bold text-gray-900">Complete Your Booking</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Click the button below to send your booking details via WhatsApp and finalize everything with our team.
                        </p>

                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full md:w-auto px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto mb-4"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Send Booking via WhatsApp
                        </button>

                        <p className="text-sm text-gray-500">
                            Our team will respond within 24 hours
                        </p>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <span className="hidden sm:block text-gray-300">•</span>
                        <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212600000000'}`} className="text-gray-600 hover:text-primary transition-colors font-medium">
                            Call: {process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000'}
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
