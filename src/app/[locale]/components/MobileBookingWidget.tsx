'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileBookingWidgetProps {
    id: string;
    type: 'tour' | 'experience' | 'activity' | 'service';
    title: string;
    price: string;
    imageUrl?: string;
}

export default function MobileBookingWidget({
    id,
    type,
    title,
    price,
    imageUrl
}: MobileBookingWidgetProps) {
    const { addItem, items, toggleCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const isInCart = items.some(item => item.id === id && item.type === type);

    useEffect(() => {
        setIsAdded(isInCart);
    }, [isInCart]);

    // Show widget after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddToCart = () => {
        if (isInCart) {
            toggleCart();
            return;
        }

        addItem({
            id,
            title,
            type,
            price,
            image: imageUrl
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media (max-width: 768px) {
                            [id^="chatling"], #chatling-launcher, .chatling-launcher, iframe[title*="Chat"] {
                                bottom: 100px !important;
                                transition: bottom 0.3s cubic-bezier(0, 0, 0.2, 1);
                            }
                        }
                    `}} />
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-4 md:hidden pb-safe safe-area-bottom"
                    >
                        <div className="flex items-center justify-between gap-4 max-w-md mx-auto pr-20 md:pr-0">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total Price</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-serif font-bold text-gray-900">{price}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-xl active:scale-95 ${isAdded
                                    ? 'bg-green-500 text-white shadow-green-500/20'
                                    : 'bg-primary text-white shadow-primary/25'
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>In Journey</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Add to Journey</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
