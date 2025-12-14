// src/app/[locale]/book/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import BookingForm from './components/BookingForm';
import ItemSummary from './components/ItemSummary';
import EmptyState from './components/EmptyState';
import type { BookingItem } from '@/types/booking';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const [bookingItem, setBookingItem] = useState<BookingItem | null>(null);

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem('bookingItem');
    
    if (storedData) {
      try {
        const item: BookingItem = JSON.parse(storedData);
        setBookingItem(item);
      } catch (error) {
        console.error('Invalid booking data:', error);
        setBookingItem(null);
      }
    }
  }, []);

  // Redirect if no item selected
  if (bookingItem === null) {
    return <EmptyState />;
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Complete Your Booking
          </h1>
          <p className="text-lg text-text-tertiary">
            Fill in your details to confirm your reservation via WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Item Summary (Sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ItemSummary item={bookingItem} />
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm item={bookingItem} />
          </div>
        </div>
      </div>
    </main>
  );
}