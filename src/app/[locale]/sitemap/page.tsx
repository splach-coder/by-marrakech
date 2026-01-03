import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    Home,
    MapPin,
    Compass,
    Mountain,
    Sparkles,
    Car,
    ChevronRight,
    Info
} from 'lucide-react';
import { siteData } from '@/data/siteData';

export const metadata: Metadata = {
    title: 'Sitemap | Xhosen Gate',
    description: 'Navigate through all pages and services offered by Xhosen Gate.',
};

export default function SitemapPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Header with Image */}
            <section className="relative h-[50vh] overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/marrakech/marrakech.jpg"
                    alt="Morocco Travel Destinations"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white z-10 px-4">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Sitemap</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Navigate our complete collection of experiences
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container-custom max-w-7xl mx-auto px-4">

                    {/* Main Navigation */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Main Pages</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { href: '/', label: 'Home', icon: Home },
                                { href: '/about', label: 'About Us', icon: Info },
                                { href: '/contact', label: 'Contact' },
                                { href: '/gallery', label: 'Gallery' },
                                { href: '/events', label: 'Events' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tours Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Compass className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900">Multi-Day Tours</h2>
                                <p className="text-gray-500">Immersive journeys across Morocco</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                {siteData.tours?.slice(0, 6).map((tour) => (
                                    <Link
                                        key={tour.id}
                                        href={`/tours/${tour.id}`}
                                        className="group p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 leading-tight">
                                                    {tour.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">{tour.duration}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {siteData.tours && siteData.tours.length > 6 && (
                                <Link
                                    href="/tours"
                                    className="block w-full p-4 bg-gray-50 text-center font-bold text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                    View All Tours ({siteData.tours.length})
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Day Excursions */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900">Day Excursions</h2>
                                <p className="text-gray-500">Perfect day trips from Marrakech</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {siteData.excursions?.map((excursion) => (
                                <Link
                                    key={excursion.id}
                                    href={`/tours/${excursion.id}`}
                                    className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-primary transition-all"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                                                {excursion.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{excursion.duration}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mountain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900">Activities & Experiences</h2>
                                <p className="text-gray-500">Unique Moroccan adventures</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {siteData.activities?.map((activity) => (
                                <Link
                                    key={activity.id}
                                    href={`/activities/${activity.id}`}
                                    className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-primary transition-all"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">
                                            {activity.title}
                                        </h3>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900">Services</h2>
                                <p className="text-gray-500">Transportation and support</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {siteData.services?.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.id}`}
                                    className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:from-primary/5 hover:to-primary/10 border border-gray-200 hover:border-primary transition-all"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{service.description.slice(0, 100)}...</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-20 pt-12 border-t border-gray-200">
                        <div className="text-center">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Additional Information</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/booking" className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl">
                                    Book Now
                                </Link>
                                <Link href="/privacy" className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-primary hover:text-primary transition-all">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-primary hover:text-primary transition-all">
                                    Terms of Service
                                </Link>
                                <Link href="/" className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
