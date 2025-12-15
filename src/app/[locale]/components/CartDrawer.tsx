'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Calendar, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useClickAway } from 'react-use';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import CartUpsell from './CartUpsell';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, items, removeItem, clearCart } = useCart();
    const drawerRef = useRef(null);

    useClickAway(drawerRef, () => {
        if (isCartOpen) toggleCart();
    });

    // Calculate total items (could be guests or just count)
    const totalItems = items.length;

    const locale = useLocale();
    const router = useRouter();

    const handleCheckout = () => {
        toggleCart(); // Close drawer
        router.push(`/${locale}/booking`);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[100] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-serif font-bold text-gray-900">Your Journey</h2>
                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#faf9f6]">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                                    <ShoppingBag className="w-16 h-16 opacity-20" />
                                    <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
                                    <p className="text-sm max-w-xs">Looks like you haven't added any experiences yet.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="mt-4 text-primary font-bold hover:underline"
                                    >
                                        Browse Experiences
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 group"
                                        >
                                            {/* Image Thumbnail */}
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                                                        <ShoppingBag className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-gray-900 text-sm leading-tight truncate pr-2">
                                                        {item.title}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="mt-2 space-y-1">
                                                    {item.date && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{item.date}</span>
                                                        </div>
                                                    )}
                                                    {item.guests && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Users className="w-3 h-3" />
                                                            <span>{item.guests} Guests</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <CartUpsell />
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Selected Experiences</span>
                                        <span>{items.length}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-gray-900">
                                        <span>Estimated Total</span>
                                        <span>Request Quote</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <span>Request Booking via WhatsApp</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={clearCart}
                                        className="w-full py-3 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
