'use client';

import { use, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Home, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThankYouPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default function ThankYouPage({ params }: ThankYouPageProps) {
    const { locale } = use(params);

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#D91A1A', '#D4AF37', '#ffffff']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#D91A1A', '#D4AF37', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    return (
        <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden text-center p-8 md:p-16 border border-gray-100"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Check className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                    Request Sent!
                </h1>

                <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                    Thank you for choosing ByMarrakech. We have generated your WhatsApp inquiry.
                    <br /><br />
                    <span className="font-bold text-gray-900">Please verify that your WhatsApp message was sent.</span> Our concierge team will double-check availability and get back to you shortly.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        href={`/${locale}`}
                        className="w-full md:w-auto px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>Return Home</span>
                    </Link>

                    <Link
                        href={`/${locale}/experiences`}
                        className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                    >
                        <span>Explore More</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
