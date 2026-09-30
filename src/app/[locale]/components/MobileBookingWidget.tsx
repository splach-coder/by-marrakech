'use client';

/**
 * Sticky booking bar for phones (this whole component is md:hidden).
 *
 * The two actions sit side by side on one row, under a single compact price
 * line — the old layout stacked them, which ate a third of a small screen and
 * pushed the page content behind a wall of buttons.
 */

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickChannels from '@/components/QuickChannels';

interface MobileBookingWidgetProps {
    id: string;
    type: 'tour' | 'experience' | 'activity' | 'service';
    title: string;
    price: string;
    imageUrl?: string;
}

const BUTTON =
    'inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[11px] font-black uppercase tracking-[0.08em] transition-all active:scale-[0.97]';

export default function MobileBookingWidget({
    id,
    type,
    title,
    price,
    imageUrl
}: MobileBookingWidgetProps) {
    const { addItem, items, toggleCart } = useCart();
    const t = useTranslations('bookingCard');
    const [isAdded, setIsAdded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const isInCart = items.some(item => item.id === id && item.type === type);

    useEffect(() => {
        setIsAdded(isInCart);
    }, [isInCart]);

    // Show the bar once the hero is behind you. Coalesced into one rAF so the
    // scroll position is read after layout instead of forcing one per event.
    useEffect(() => {
        let frame = 0;
        const handleScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                setIsVisible(window.scrollY > 100);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
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
                                bottom: 132px !important;
                                transition: bottom 0.3s cubic-bezier(0, 0, 0.2, 1);
                            }
                        }
                    `}} />
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200/70 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-lg md:hidden pb-safe safe-area-bottom"
                    >
                        <div className="mx-auto max-w-md">
                            {/* first line: what it costs, and the one action */}
                            <div className="flex items-center gap-3">
                                <div className="shrink-0">
                                    <span className="block text-[8px] font-black uppercase leading-none tracking-[0.2em] text-text-tertiary">
                                        {t('total')}
                                    </span>
                                    <span className="mt-1 block font-serif text-[17px] font-bold leading-none text-text-primary">
                                        {price}
                                    </span>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`${BUTTON} min-w-0 flex-1 px-3 ${isAdded
                                        ? 'border border-primary/30 bg-primary/5 text-primary'
                                        : 'bg-primary text-white shadow-lg shadow-primary/25'
                                        }`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{t('mobileInCart')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{t('mobileAdd')}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* second line: every way to talk to a human, named,
                                in the app marks people recognise */}
                            <QuickChannels
                                variant="bar"
                                includeWhatsApp
                                message={`${t('waIntro')} ${title} (${price})`}
                                className="mt-2.5"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
