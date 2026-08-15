'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Clock, Check, Minus, Plus, Calendar, Hotel, MessageCircle, CalendarCheck, Star } from 'lucide-react';
import { useCart, parsePrice } from '@/context/CartContext';
import { whatsappLink, googleReviewsConfig } from '@/data/transferData';

interface BookingCardProps {
    id?: string;
    type?: 'tour' | 'experience' | 'activity' | 'service';
    imageUrl?: string;
    price: string;
    title: string;
    duration: string;
    groupSize: string;
    onBook?: () => void;
}

const TIME_SLOTS = ['07:30', '09:00', '14:00'];

// Booking card modeled on the reference site's "BOOK EXPERIENCE" sidebar:
// guests stepper → departure time → date → pickup hotel → private toggle →
// total → trust line → Confirm + WhatsApp buttons.
export default function BookingCard({
    id,
    type = 'tour',
    imageUrl,
    price,
    title,
    duration,
    groupSize,
    onBook
}: BookingCardProps) {
    const { addItem, toggleCart, items } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const locale = useLocale();
    const t = useTranslations('bookingCard');

    const [guests, setGuests] = useState(2);
    const [time, setTime] = useState(TIME_SLOTS[0]);
    const [date, setDate] = useState('');
    const [hotel, setHotel] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const isInCart = items.some(item => item.id === id && item.type === type);

    useEffect(() => {
        if (isInCart) setIsAdded(true);
    }, [isInCart]);

    const basePrice = parsePrice(price);
    const total = basePrice > 0 ? basePrice * guests : 0;

    const handleConfirm = () => {
        if (isInCart) {
            toggleCart();
            return;
        }
        if (id) {
            addItem({ id, title, type, price, image: imageUrl });
        } else if (onBook) {
            onBook();
        }
    };

    const waMessage =
        `${t('waIntro')} ${title}\n` +
        `👥 ${guests} ${t('waGuests')}\n` +
        `🕐 ${time} · 📅 ${date || '—'}\n` +
        `🏨 ${hotel || '—'}\n` +
        (isPrivate ? `⭐ ${t('privateTitle')}\n` : '') +
        (total > 0 ? `💶 ${t('total')}: €${total}` : `💶 ${price}`);

    const label = 'block text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary mb-2';
    const row = 'py-4 border-b border-border-light';

    return (
        <div className="sticky top-24">
            <div className="bg-white border border-border rounded-md shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-1">
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">
                        {t('book')} <span className="text-secondary-dark font-serif italic">{t(`type_${type}`)}</span>
                    </h3>
                </div>

                <div className="px-6 pb-6">
                    {/* Guests stepper */}
                    <div className={row}>
                        <span className={label}>{t('guests')}</span>
                        <div className="flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2.5">
                            <button
                                type="button"
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-dark text-text-primary hover:bg-secondary/20 hover:border-secondary transition-colors"
                                aria-label="Fewer guests"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-text-primary text-lg">{guests}</span>
                            <button
                                type="button"
                                onClick={() => setGuests(Math.min(17, guests + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-[#3b2f2f] hover:bg-secondary-dark transition-colors"
                                aria-label="More guests"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Departure time */}
                    <div className={row}>
                        <span className={label}>{t('departureTime')}</span>
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-secondary-dark shrink-0" />
                            <select
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className="flex-1 bg-transparent text-sm font-semibold text-text-primary focus:outline-none"
                            >
                                {TIME_SLOTS.map(s => (
                                    <option key={s} value={s}>{t('departureAt')} {s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary">
                            <CalendarCheck className="w-3.5 h-3.5 text-secondary-dark" />
                            {t('availableDaily')}
                        </div>
                    </div>

                    {/* Departure date */}
                    <div className={row}>
                        <span className={label}>{t('departureDate')}</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-secondary-dark shrink-0" />
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="flex-1 bg-transparent text-sm font-semibold text-text-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Pickup hotel */}
                    <div className={row}>
                        <span className={label}>{t('pickupHotel')}</span>
                        <div className="flex items-center gap-2">
                            <Hotel className="w-4 h-4 text-secondary-dark shrink-0" />
                            <input
                                value={hotel}
                                onChange={e => setHotel(e.target.value)}
                                placeholder={t('pickupPlaceholder')}
                                className="flex-1 bg-transparent text-sm font-semibold text-text-primary placeholder:text-text-tertiary/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Private toggle */}
                    <div className={`${row} flex items-center justify-between`}>
                        <div>
                            <span className="block text-[11px] font-black uppercase tracking-[0.15em] text-text-primary">
                                {t('privateTitle')}
                            </span>
                            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary mt-0.5">
                                {t('privateSub')}
                            </span>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isPrivate}
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${isPrivate ? 'bg-secondary' : 'bg-border-dark'}`}
                        >
                            <span
                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${isPrivate ? 'left-[22px]' : 'left-0.5'}`}
                            />
                        </button>
                    </div>

                    {/* Total */}
                    <div className="py-5 flex items-center justify-between">
                        <span className={label + ' mb-0'}>{t('total')}</span>
                        <span className="text-3xl font-bold text-secondary-dark font-serif leading-none">
                            {total > 0 ? `€${total}` : price}
                        </span>
                    </div>

                    {/* Trust line */}
                    <div className="pb-4 text-center text-[10px] text-text-tertiary flex items-center justify-center gap-1 flex-wrap">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        {googleReviewsConfig.rating.toFixed(1)} {t('trustLine')}
                    </div>

                    {/* Confirm — WhatsApp below it */}
                    <button
                        onClick={handleConfirm}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-sm font-black text-[12px] uppercase tracking-[0.18em] transition-all duration-300 ${
                            isAdded
                                ? 'bg-green-600 text-white cursor-default'
                                : 'bg-secondary text-[#3b2f2f] hover:bg-secondary-dark hover:shadow-lg'
                        }`}
                    >
                        {isAdded ? (
                            <>
                                <Check className="w-4 h-4" />
                                {t('inCart')}
                            </>
                        ) : (
                            t('confirm')
                        )}
                    </button>

                    <a
                        href={whatsappLink(waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 w-full flex items-center justify-center gap-2 py-3.5 rounded-sm bg-[#25D366] text-white font-black text-[12px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#1fb857] hover:shadow-lg"
                    >
                        <MessageCircle className="w-4 h-4" />
                        {t('whatsapp')}
                    </a>

                    <p className="mt-3 text-center text-[10px] text-text-tertiary">
                        {t('note', { duration, groupSize })}
                    </p>
                </div>
            </div>
        </div>
    );
}
