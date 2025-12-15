import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | ByMarrakech',
    description: 'Privacy Policy for ByMarrakech - Learn how we protect and handle your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
                <div className="container-custom max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                            <Shield className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
                    <p className="text-white/90 text-lg">Last updated: December 2024</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-custom max-w-4xl mx-auto px-4">
                    <div className="prose prose-lg max-w-none">
                        {/* Introduction */}
                        <div className="mb-12">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                At ByMarrakech, we are committed to protecting your privacy and ensuring the security of your personal information.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                                or use our services.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-primary font-bold">1</span>
                                </div>
                                Information We Collect
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Information</h3>
                                    <p className="text-gray-600 mb-3">When you book our services or contact us, we may collect:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Full name and contact details (email, phone number)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Travel preferences and booking information
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Payment information (processed securely through third-party providers)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Special requirements or dietary restrictions
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Automatically Collected Information</h3>
                                    <p className="text-gray-600 mb-3">When you visit our website, we may automatically collect:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            IP address and browser type
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Pages visited and time spent on our website
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                            Referring website addresses
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-primary font-bold">2</span>
                                </div>
                                How We Use Your Information
                            </h2>

                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
                                <p className="text-gray-600 mb-4">We use the collected information to:</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Process and manage your bookings and reservations
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Communicate with you about your trips and services
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Provide customer support and respond to inquiries
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Send promotional offers and travel tips (with your consent)
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Improve our website and services
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        Comply with legal obligations
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Data Security */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-primary" />
                                </div>
                                Data Security
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                    <p className="text-gray-700 font-medium">🔒 SSL encryption for data transmission</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                    <p className="text-gray-700 font-medium">🛡️ Secure servers and databases</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                    <p className="text-gray-700 font-medium">👥 Limited employee access to data</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                    <p className="text-gray-700 font-medium">🔐 Regular security audits</p>
                                </div>
                            </div>
                        </div>

                        {/* Your Rights */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-primary font-bold">3</span>
                                </div>
                                Your Rights
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-gray-600 mb-4">You have the right to:</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary">✓</span>
                                        Access your personal data we hold
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary">✓</span>
                                        Request correction of inaccurate data
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary">✓</span>
                                        Request deletion of your data
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary">✓</span>
                                        Opt-out of marketing communications
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary">✓</span>
                                        Lodge a complaint with a supervisory authority
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Cookies */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-primary font-bold">4</span>
                                </div>
                                Cookies
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic.
                                You can control cookie preferences through your browser settings. Note that disabling cookies may affect website functionality.
                            </p>
                        </div>

                        {/* Third-Party Services */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-primary font-bold">5</span>
                                </div>
                                Third-Party Services
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may share your information with trusted third-party service providers who assist us in operating our website,
                                conducting our business, or servicing you (e.g., payment processors, email services). These parties are
                                contractually obligated to keep your information confidential and use it only for the purposes we specify.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Contact Us About Privacy</h2>
                            <p className="text-gray-600 mb-6">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <a href="mailto:privacy@bymarrakech.com" className="hover:text-primary transition-colors">
                                        privacy@bymarrakech.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <a href="tel:+212600000000" className="hover:text-primary transition-colors">
                                        +212 600 000 000
                                    </a>
                                </div>
                                <div className="flex items-start gap-3 text-gray-700">
                                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Marrakech, Morocco</span>
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
