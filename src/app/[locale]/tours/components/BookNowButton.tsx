// src/app/[locale]/tours/components/BookNowButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { BookingItem } from '@/types/booking';
import type { Tour } from '@/types/tour';

interface BookNowButtonProps {
  tour: Tour;
}

export default function BookNowButton({ tour }: BookNowButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('toursPage');

  const handleBookNow = () => {
    const bookingItem: BookingItem = {
      id: String(tour.id),
      type: 'tour',
      title: tour.title,
      image: tour.image.url,
      duration: tour.duration,
      price: tour.price,
      location: tour.location || tour.locations?.[0]?.name || 'Morocco',
    };

    // Store in localStorage
    localStorage.setItem('bookingItem', JSON.stringify(bookingItem));

    // Redirect to booking page
    router.push(`/${locale}/book`);
  };

  return (
    <button
      onClick={handleBookNow}
      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg"
    >
      {t('bookThisTour')}
    </button>
  );
}