// src/app/[locale]/book/components/ItemSummary.tsx
'use client';

import Image from 'next/image';
import type { BookingItem } from '@/types/booking';

interface ItemSummaryProps {
  item: BookingItem;
}

export default function ItemSummary({ item }: ItemSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image */}
      <div className="relative h-64 w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-sm font-semibold text-primary uppercase">
            {item.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">
          {item.title}
        </h2>

        {/* Details Grid */}
        <div className="space-y-3 pt-4 border-t border-border">
          {item.duration && (
            <div className="flex justify-between items-center">
              <span className="text-text-tertiary">Duration</span>
              <span className="font-semibold text-text-primary">
                {item.duration}
              </span>
            </div>
          )}

          {item.price && (
            <div className="flex justify-between items-center">
              <span className="text-text-tertiary">Starting Price</span>
              <span className="font-semibold text-text-primary">
                {item.price}
              </span>
            </div>
          )}

          {item.date && (
            <div className="flex justify-between items-center">
              <span className="text-text-tertiary">Event Date</span>
              <span className="font-semibold text-text-primary">
                {item.date}
              </span>
            </div>
          )}

          {item.location && (
            <div className="flex justify-between items-center">
              <span className="text-text-tertiary">Location</span>
              <span className="font-semibold text-text-primary">
                {item.location}
              </span>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-background-cream rounded-lg">
          <p className="text-sm text-text-secondary leading-relaxed">
            <strong>What happens next?</strong><br />
            After submitting this form, you'll be redirected to WhatsApp where 
            we'll confirm your booking details and answer any questions.
          </p>
        </div>
      </div>
    </div>
  );
}