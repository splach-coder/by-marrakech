import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Scale, AlertCircle, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms of Service | ByMarrakech',
    description: 'Terms and Conditions for using ByMarrakech travel services.',
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="container-custom max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                            <Scale className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms of Service</h1>
                    <p className="text-white/90 text-lg">Last updated: December 2024</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-custom max-w-4xl mx-auto px-4">
                    <div className="prose prose-lg max-w-none">
                        {/* Introduction */}
                        <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed">
                                These Terms of Service ("Terms") govern your use of ByMarrakech's website and services. By accessing our website
                                or booking our services, you agree to be bound by these Terms. Please read them carefully before making a booking.
                            </p>
                        </div>

                        {/* Acceptance of Terms */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                Acceptance of Terms
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                By using our website or booking any of our services, you acknowledge that you have read, understood, and agree
                                to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our services.
                            </p>
                        </div>

                        {/* Services Description */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                Services Description
                            </h2>

                            <div className="space-y-4">
                                <p className="text-gray-600">ByMarrakech provides:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-2">🗺️ Guided Tours</h3>
                                        <p className="text-sm text-gray-600">Cultural and historical tours across Morocco</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-2">🏔️ Desert Experiences</h3>
                                        <p className="text-sm text-gray-600">Sahara adventures and camel treks</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-2">🚗 Private Transfers</h3>
                                        <p className="text-sm text-gray-600">Transportation between cities</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-2">🎯 Custom Itineraries</h3>
                                        <p className="text-sm text-gray-600">Personalized travel experiences</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking and Payment */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                Booking and Payment
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Booking Process</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                            All bookings are subject to availability and confirmation
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                            A deposit may be required to secure your booking
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                            Prices are quoted in Euros or Moroccan Dirhams
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                            Payment must be made as per the agreed terms
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Methods</h3>
                                    <p className="text-gray-600">We accept bank transfers, credit cards (via secure payment gateway), and cash payments in Morocco.</p>
                                </div>
                            </div>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-white" />
                                </div>
                                Cancellation and Refund Policy
                            </h2>

                            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                <h3 className="font-bold text-red-900 mb-4">Cancellation Terms:</h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex items-start gap-3">
                                        <span className="font-bold text-red-600">•</span>
                                        <div>
                                            <strong>More than 30 days before departure:</strong> Full refund minus 10% administration fee
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="font-bold text-red-600">•</span>
                                        <div>
                                            <strong>15-30 days before departure:</strong> 50% refund
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="font-bold text-red-600">•</span>
                                        <div>
                                            <strong>Less than 15 days before departure:</strong> No refund
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="font-bold text-red-600">•</span>
                                        <div>
                                            <strong>No-shows:</strong> No refund
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-600">
                                    Refunds will be processed within 14 business days to the original payment method.
                                </p>
                            </div>
                        </div>

                        {/* Changes and Modifications */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">4</span>
                                </div>
                                Changes and Modifications
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We reserve the right to modify itineraries due to unforeseen circumstances, weather conditions, or safety concerns.
                                In such cases, we will provide suitable alternatives of equal or greater value.
                            </p>
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <p className="text-gray-700">
                                    <strong>Client Changes:</strong> Any changes requested by clients after booking confirmation may incur additional charges
                                    and are subject to availability.
                                </p>
                            </div>
                        </div>

                        {/* Traveler Responsibilities */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">5</span>
                                </div>
                                Traveler Responsibilities
                            </h2>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-gray-600 mb-4">As a traveler, you are responsible for:</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Ensuring you have valid travel documents (passport, visas)
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Obtaining necessary vaccinations and travel insurance
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Arriving at designated meeting points on time
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Following guide instructions and safety guidelines
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Respecting local customs and cultures
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900">✓</span>
                                        Taking care of personal belongings
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Liability */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">6</span>
                                </div>
                                Limitation of Liability
                            </h2>
                            <div className="bg-gray-100 border-l-4 border-gray-900 p-6 rounded-r-xl">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    ByMarrakech acts as an intermediary between travelers and service providers. While we carefully select our partners,
                                    we are not liable for:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                        Loss, damage, or theft of personal belongings
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                        Personal injury or illness during tours
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                        Delays or cancellations due to force majeure events
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></span>
                                        Actions or omissions of third-party service providers
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm text-gray-600 font-medium">
                                    We strongly recommend comprehensive travel insurance to cover these eventualities.
                                </p>
                            </div>
                        </div>

                        {/* Intellectual Property */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">7</span>
                                </div>
                                Intellectual Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                All content on this website, including text, graphics, logos, images, and software, is the property of ByMarrakech
                                and protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">8</span>
                                </div>
                                Governing Law
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms are governed by the laws of Morocco. Any disputes arising from these Terms or our services shall be
                                subject to the exclusive jurisdiction of Moroccan courts.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8">
                            <h2 className="text-2xl font-serif font-bold mb-6">Questions About These Terms?</h2>
                            <p className="text-white/90 mb-6">
                                If you have any questions about our Terms of Service, please don't hesitate to contact us:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <a href="mailto:info@bymarrakech.com" className="hover:text-primary transition-colors">
                                        info@bymarrakech.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212600000000'}`} className="hover:text-primary transition-colors">
                                        {process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
