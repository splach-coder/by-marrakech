'use client';

import { useState, use } from 'react';
import { useCart, CartItem, parsePrice } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Reorder, useDragControls } from 'framer-motion';
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
    GripVertical,
    Plane,
    Hotel,
    Car,
    Plus,
    PlusCircle
} from 'lucide-react';
import { siteData } from '@/data/siteData';

interface BookingPageProps {
    params: Promise<{
        locale: string;
    }>;
}

// Separate component for draggable item to use hooks properly
function DraggableBookingItem({
    item,
    index,
    itemKey,
    hasConflict,
    href,
    touched,
    handleItemUpdate,
    removeItem
}: {
    item: CartItem;
    index: number;
    itemKey: string;
    hasConflict: boolean;
    href: string;
    touched: boolean;
    handleItemUpdate: (id: string, type: string, field: keyof CartItem, value: any) => void;
    removeItem: (id: string, type: string) => void;
}) {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            key={itemKey}
            value={item}
            dragListener={false}
            dragControls={dragControls}
            className={`relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 md:cursor-grab md:active:cursor-grabbing ${!item.date && touched
                ? 'border-red-300 ring-2 ring-red-100'
                : hasConflict
                    ? 'border-amber-300 ring-2 ring-amber-100'
                    : 'border-gray-100 hover:shadow-md'
                }`}
        >
            {/* Mobile Drag Handle */}
            <div
                className="md:hidden absolute top-2 right-2 z-20 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
            >
                <div className="bg-primary/90 backdrop-blur text-white p-3 rounded-xl shadow-lg active:scale-95 transition-transform">
                    <GripVertical className="w-5 h-5" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6" onPointerDown={(e) => {
                // On desktop, allow dragging from anywhere
                if (window.innerWidth >= 768) {
                    dragControls.start(e);
                }
            }}>

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
                        <GripVertical className="w-3 h-3 text-gray-400 hidden md:inline" />
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
                            <Link href={href} className="group-hover:text-primary transition-colors">
                                <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1 hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-sm text-gray-500 uppercase tracking-wide">{item.type}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                                    {item.price || 'Price on request'}
                                </span>
                                {item.price && (
                                    <span className="text-sm font-bold text-primary">
                                        Total: €{parsePrice(item.price) * (item.guests || 1)}
                                    </span>
                                )}
                            </div>
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
                                    value={item.guests || 1}
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
}

export default function BookingPage({ params }: BookingPageProps) {
    const { locale } = use(params);
    const router = useRouter();
    const { items, removeItem, updateItem, reorderItems, clearCart, totalPrice, addItem } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState(false);
    const [showTransportUpsell, setShowTransportUpsell] = useState(false);

    const TRANSPORT_IDS = ['421', '419', '501'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemUpdate = (id: string, type: string, field: keyof CartItem, value: any) => {
        updateItem(id, type, { [field]: value });
    };

    // Calculate total guests just for summary
    const totalGuests = items.reduce((acc, item) => acc + (item.guests || 1), 0);

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const hasTransport = items.some(item => TRANSPORT_IDS.includes(item.id));
        if (!hasTransport) {
            setShowTransportUpsell(true);
            return;
        }

        processSubmission();
    };

    const processSubmission = () => {
        setIsSubmitting(true);

        // Construct WhatsApp Message
        let message = `*New Booking Request from ${formData.firstName} ${formData.lastName}*\n\n`;
        message += `📧 Email: ${formData.email}\n`;
        message += `📞 Phone: ${formData.phone}\n\n`;
        message += `*Requested Journey Agenda:*\n`;

        items.forEach((item, index) => {
            const itemPrice = parsePrice(item.price);
            const itemTotal = itemPrice * (item.guests || 1);
            message += `\n*${index + 1}. ${item.title}*\n`;
            message += `   📅 Date: ${item.date}\n`;
            message += `   👥 Guests: ${item.guests || 1}\n`;
            message += `   💰 Price: ${item.price} (Subtotal: €${itemTotal})\n`;
        });

        if (totalPrice > 0) {
            message += `\n*Estimated Total: €${totalPrice}*\n`;
        }

        if (formData.notes) {
            message += `\n*Special Requests:*\n${formData.notes}\n`;
        }

        message += `\n--------------------------------\nSent via Xhosen Gate Website`;

        const whatsappNumber = '212600000000';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

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

                        {(() => {
                            const allGuestsSame = items.length > 0 && items.every(item => (item.guests || 1) === (items[0].guests || 1));
                            const activeGuestCount = allGuestsSame ? (items[0].guests || 1) : null;

                            return (
                                <div className="bg-white rounded-3xl p-4 md:p-6 border border-gray-100 shadow-sm mb-6 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                                    <div className="flex items-center gap-3 md:gap-4 w-full lg:w-auto">
                                        <div className="p-2.5 md:p-3 bg-primary/10 rounded-2xl flex-shrink-0">
                                            <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-gray-900 leading-tight">Travel Party</h4>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black md:mt-0.5">Global Settings</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter hidden sm:inline">Set all experiences to:</span>
                                        <div className="relative w-full sm:w-auto">
                                            <div className="flex items-center bg-gray-50/100 rounded-2xl p-1 border border-gray-100/80 w-full overflow-hidden">
                                                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1 py-0.5">
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                        <button
                                                            key={num}
                                                            onClick={() => {
                                                                items.forEach(item => updateItem(item.id, item.type, { guests: num }));
                                                            }}
                                                            className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-90 flex-shrink-0 ${activeGuestCount === num
                                                                ? 'bg-primary text-white shadow-lg shadow-primary/30 active:shadow-inner'
                                                                : 'text-gray-400 hover:bg-white hover:text-primary bg-white/40'
                                                                }`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                    <div className="w-px h-6 bg-gray-200/60 mx-1 flex-shrink-0" />
                                                    <div className="relative flex-shrink-0">
                                                        <input
                                                            type="number"
                                                            min="9"
                                                            placeholder="9+"
                                                            value={activeGuestCount && activeGuestCount >= 9 ? activeGuestCount : ''}
                                                            className={`w-14 h-10 md:h-11 bg-transparent text-center text-sm font-bold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-xl transition-all ${activeGuestCount && activeGuestCount >= 9
                                                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                                : 'text-gray-400 placeholder:text-gray-300 hover:bg-white bg-white/40'
                                                                }`}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (val > 0) {
                                                                    items.forEach(item => updateItem(item.id, item.type, { guests: val }));
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

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

                        <Reorder.Group
                            axis="y"
                            values={items}
                            onReorder={reorderItems}
                            className="space-y-6"
                        >
                            {items.map((item, index) => {
                                const itemKey = `${item.id}-${item.type}`;
                                const hasConflict = conflicts.some(c => c.itemIds.includes(itemKey));
                                const category = {
                                    'tour': 'tours',
                                    'activity': 'activities',
                                    'experience': 'experiences',
                                    'service': 'services'
                                }[item.type] || 'tours';
                                const href = `/${locale}/${category}/${item.id}`;

                                return (
                                    <DraggableBookingItem
                                        key={itemKey}
                                        item={item}
                                        index={index}
                                        itemKey={itemKey}
                                        hasConflict={hasConflict}
                                        href={href}
                                        touched={touched}
                                        handleItemUpdate={handleItemUpdate}
                                        removeItem={removeItem}
                                    />
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
                                    <div className="flex justify-between text-white/80">
                                        <span>Estimated Total</span>
                                        <span className="font-bold text-white">{totalPrice > 0 ? `€${totalPrice}` : 'Request Quote'}</span>
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

                {/* Smart Recommendations - Transport Suggestions */}
                {/* Smart Recommendations - Transport Suggestions */}
                {(() => {
                    const anyTransportSelected = items.some(item => TRANSPORT_IDS.includes(item.id));

                    // Don't show suggestions section at all if transport is selected
                    // if (anyTransportSelected) return null;

                    const availableSuggestions = [
                        {
                            id: '421',
                            icon: Plane,
                            title: "Airport Transfer",
                            desc: "Stress-free arrival with meet & greet and flight tracking.",
                            price: "€25",
                            label: "Recommended",
                            service: siteData.services.find(s => s.id === 421)
                        },
                        {
                            id: '419',
                            icon: Hotel,
                            title: "Hotel Transfer",
                            desc: "Seamless door-to-door comfort between your stays.",
                            price: "€30",
                            label: "Popular",
                            service: siteData.services.find(s => s.id === 419)
                        },
                        {
                            id: '501',
                            icon: Car,
                            title: "Private Driver",
                            desc: "Premium vehicle with a professional local chauffeur.",
                            price: "Request Quote",
                            label: "Premium",
                            service: siteData.services.find(s => s.id === 501)
                        }
                    ];

                    if (availableSuggestions.length === 0) return null;

                    return (
                        <div className="mt-20">
                            <div className="max-w-7xl mx-auto px-4 md:px-0">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                                    <div>
                                        <h2 className="text-3xl font-serif text-gray-900 mb-2">Complete Your Journey</h2>
                                        <p className="text-gray-500">Essential transport services for a seamless Moroccan experience.</p>
                                    </div>
                                    <Link href={`/${locale}/services`} className="text-primary font-bold flex items-center gap-1 hover:underline">
                                        View All Services <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(availableSuggestions.length, 3)} gap-6 max-w-${availableSuggestions.length === 1 ? 'md' : availableSuggestions.length === 2 ? '4xl' : '7xl'} mx-auto overflow-visible`}>
                                    {availableSuggestions.map((suggestion) => {
                                        if (!suggestion.service) return null;

                                        return (
                                            <div
                                                key={suggestion.id}
                                                className="relative group bg-white rounded-[2rem] p-8 border border-gray-100 transition-all duration-700 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col h-full"
                                            >
                                                {/* Status Badge */}
                                                <div className="absolute top-6 right-6">
                                                    <div className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                                                        {suggestion.label}
                                                    </div>
                                                </div>

                                                <div className="mb-8">
                                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden bg-gray-50 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary/40">
                                                        <suggestion.icon className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-8">
                                                    <h3 className="text-2xl font-bold text-gray-900 font-serif leading-tight">{suggestion.title}</h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                        {suggestion.desc}
                                                    </p>
                                                    <div className="flex items-center gap-2 pt-2 text-primary font-bold">
                                                        <span className="text-xs uppercase tracking-widest text-gray-400">Starting from</span>
                                                        <span className="text-lg">{suggestion.price}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto flex items-center gap-3">
                                                    <button
                                                        onClick={() => {
                                                            if (suggestion.service) {
                                                                addItem({
                                                                    id: suggestion.id,
                                                                    title: suggestion.service.title,
                                                                    type: 'service',
                                                                    price: suggestion.service.price,
                                                                    image: suggestion.service.image.url,
                                                                    guests: 1
                                                                });
                                                            }
                                                        }}
                                                        className="flex-1 py-4 bg-primary text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn hover:bg-primary-dark shadow-xl shadow-primary/20 active:scale-[0.98]"
                                                    >
                                                        <Plus className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-90" />
                                                        <span>Secure Transport</span>
                                                    </button>
                                                    <Link
                                                        href={`/${locale}/services/${suggestion.id}`}
                                                        className="p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all text-gray-400 hover:text-primary flex items-center justify-center group/info"
                                                        title="View Details"
                                                    >
                                                        <PlusCircle className="w-5 h-5 transition-all duration-300 group-hover/info:rotate-90 group-hover/info:scale-110" />
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Contact CTA */}
                                <div className="mt-16 text-center bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <MessageSquare className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="font-serif font-bold text-3xl text-gray-900 mb-4">Need a Custom Transport Plan?</h3>
                                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                                        Our travel experts can coordinate complex transfers, group transport, and VIP logistics for your entire Moroccan journey.
                                    </p>
                                    <a
                                        href="https://wa.me/212600000000?text=I need help with my transport coordination"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 hover:-translate-y-1"
                                    >
                                        <span className="bg-white/20 p-1 rounded-full"><MessageSquare className="w-5 h-5" /></span>
                                        Chat with Travel Expert
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Transport Upsell Modal */}
            {showTransportUpsell && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowTransportUpsell(false)}
                    />
                    <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-8 md:p-12 text-center">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary">
                                <Car className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Wait, No Transport?</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                Arriving and navigating Morocco can be tricky. Are you sure you want to proceed without a professional driver or transfer?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 font-bold">
                                <button
                                    onClick={() => setShowTransportUpsell(false)}
                                    className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 hover:bg-gray-50 transition-all"
                                >
                                    Let me check
                                </button>
                                <button
                                    onClick={() => {
                                        setShowTransportUpsell(false);
                                        processSubmission();
                                    }}
                                    className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                                >
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
