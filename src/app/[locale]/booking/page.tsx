'use client';

import { useState, use } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Reorder } from 'framer-motion';
import {
    Calendar,
    Users,
    Trash2,
    ChevronRight,
    MessageSquare,
    User,
    Mail,
    Phone,
    MapPin,
    AlertCircle,
    GripVertical
} from 'lucide-react';

interface BookingPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default function BookingPage({ params }: BookingPageProps) {
    const { locale } = use(params);
    const router = useRouter();
    const { items, removeItem, updateItem, reorderItems, clearCart } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemUpdate = (id: string, type: string, field: keyof CartItem, value: any) => {
        updateItem(id, type, { [field]: value });
    };

    // Calculate total guests just for summary
    const totalGuests = items.reduce((acc, item) => acc + (item.guests || 2), 0);

    // Check if all items have dates selected
    const allDatesSelected = items.every(item => item.date);

    // Detect date conflicts
    const detectConflicts = () => {
        const conflicts: Array<{
            itemIds: string[];
            date: string;
            message: string;
            severity: 'warning' | 'error';
        }> = [];

        // Check for same-day conflicts
        const dateGroups = items.reduce((acc, item) => {
            if (!item.date) return acc;
            const key = item.date;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {} as Record<string, typeof items>);

        Object.entries(dateGroups).forEach(([date, itemsOnDate]) => {
            if (itemsOnDate.length > 1) {
                conflicts.push({
                    itemIds: itemsOnDate.map(i => `${i.id}-${i.type}`),
                    date,
                    message: `${itemsOnDate.length} experiences scheduled on ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
                    severity: 'warning'
                });
            }
        });

        return conflicts;
    };

    const conflicts = detectConflicts();
    const hasConflicts = conflicts.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);

        if (!allDatesSelected) {
            // Scroll to top or show error toast
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        // Construct WhatsApp Message
        let message = `*New Booking Request from ${formData.firstName} ${formData.lastName}*\n\n`;
        message += `📧 Email: ${formData.email}\n`;
        message += `📞 Phone: ${formData.phone}\n\n`;
        message += `*Requested Journey Agenda:*\n`;

        items.forEach((item, index) => {
            message += `\n*${index + 1}. ${item.title}*\n`;
            message += `   📅 Date: ${item.date}\n`;
            message += `   👥 Guests: ${item.guests || 2}\n`;
            message += `   💰 Ref: ${item.price}\n`;
        });

        if (formData.notes) {
            message += `\n*Special Requests:*\n${formData.notes}\n`;
        }

        message += `\n--------------------------------\nSent via ByMarrakech Website`;

        // Prepare WhatsApp URL
        // TODO: Replace with the actual business WhatsApp number
        const whatsappNumber = '212600000000';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Clear cart and redirect to confetti page with WhatsApp URL
        clearCart();
        router.push(`/${locale}/confetti?whatsappUrl=${encodeURIComponent(whatsappUrl)}`);
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-[#faf9f6] pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-lg">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-3xl font-serif text-gray-900">Your Journey is Empty</h1>
                    <p className="text-gray-500 text-lg">
                        Explore our collection of tours, activities, and experiences to start building your dream Moroccan adventure.
                    </p>
                    <button
                        onClick={() => router.push(`/${locale}/experiences`)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg"
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
                <div className="max-w-4xl mx-auto mb-10 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Finalize Your Plan</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3 mb-4">Itinerary & Details</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Please select your preferred dates and guest counts for each experience below.
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">

                    {/* Left Column - Itinerary Configuration */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-serif text-gray-900 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-primary" />
                                Your Agenda
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{items.length} Experiences</span>
                                <div className="hidden md:flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                                    <GripVertical className="w-3 h-3" />
                                    <span>Drag to reorder</span>
                                </div>
                            </div>
                        </div>

                        {/* Conflict Warnings */}
                        {hasConflicts && (
                            <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-amber-900 mb-2">Scheduling Conflicts Detected</h4>
                                        <ul className="space-y-1 text-sm text-amber-800">
                                            {conflicts.map((conflict, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-amber-600">•</span>
                                                    <span>{conflict.message} - Please review to ensure this works for your schedule.</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Reorder.Group axis="y" values={items} onReorder={reorderItems} className="space-y-6">
                            {items.map((item, index) => {
                                const itemKey = `${item.id}-${item.type}`;
                                const hasConflict = conflicts.some(c => c.itemIds.includes(itemKey));

                                return (
                                    <Reorder.Item
                                        key={itemKey}
                                        value={item}
                                        className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 cursor-grab active:cursor-grabbing ${!item.date && touched
                                            ? 'border-red-300 ring-2 ring-red-100'
                                            : hasConflict
                                                ? 'border-amber-300 ring-2 ring-amber-100'
                                                : 'border-gray-100 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Image */}
                                            <div className="relative w-full md:w-32 h-48 md:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 flex items-center gap-1">
                                                    <GripVertical className="w-3 h-3 text-gray-400" />
                                                    #{index + 1}
                                                </div>
                                                {hasConflict && (
                                                    <div className="absolute top-2 right-2 bg-amber-500 text-white p-1.5 rounded-full shadow-lg" title="Date conflict">
                                                        <AlertCircle className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 uppercase tracking-wide">{item.type}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id, item.type)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                                        title="Remove"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Configuration Inputs */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                                                            Date <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <input
                                                                type="date"
                                                                required
                                                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium ${!item.date && touched ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'}`}
                                                                value={item.date || ''}
                                                                onChange={(e) => handleItemUpdate(item.id, item.type, 'date', e.target.value)}
                                                                min={new Date().toISOString().split('T')[0]}
                                                            />
                                                        </div>
                                                        {!item.date && touched && (
                                                            <p className="text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" /> Please select a date
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                                            Guests
                                                        </label>
                                                        <div className="relative">
                                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <select
                                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 font-medium appearance-none"
                                                                value={item.guests || 2}
                                                                onChange={(e) => handleItemUpdate(item.id, item.type, 'guests', parseInt(e.target.value))}
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                                                                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                                                ))}
                                                                <option value="20">20+ Group</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Reorder.Item>
                                );
                            })}
                        </Reorder.Group>
                    </div>

                    {/* Right Column - Contact & Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">

                            {/* Contact Form Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Contact Details
                                </h3>

                                <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                placeholder="First Name"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                placeholder="Last Name"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="Email Address"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="WhatsApp Number"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <textarea
                                            name="notes"
                                            rows={3}
                                            placeholder="Any special requests? (Dietary, Accessibility, etc.)"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Summary & Action Card */}
                            <div className="bg-primary text-white rounded-2xl p-6 shadow-xl shadow-primary/20">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-white/80">
                                        <span>Experiences</span>
                                        <span className="font-bold text-white">{items.length}</span>
                                    </div>
                                    <div className="flex justify-between text-white/80">
                                        <span>Total Guests</span>
                                        <span className="font-bold text-white">{totalGuests}</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/20">
                                        <p className="text-xs text-white/70 leading-relaxed mb-2">
                                            <MessageSquare className="w-4 h-4 inline mr-1" />
                                            Clicking confirm will open WhatsApp with your itinerary details.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    form="booking-form"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed group"
                                >
                                    {isSubmitting ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <span>Confirm Booking</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Smart Recommendations */}
                <div className="mt-20 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        {/* Contact CTA */}
                        <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8">
                            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-3">Need Help Planning?</h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Our travel experts can help customize your itinerary, suggest the best combinations, and ensure everything runs smoothly.
                            </p>
                            <a
                                href="https://wa.me/212600000000?text=I need help planning my trip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                <MessageSquare className="w-5 h-5" />
                                Chat with Travel Expert
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
