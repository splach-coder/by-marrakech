// src/app/[locale]/book/components/EmptyState.tsx
'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function EmptyState() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-background-cream rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            No Item Selected
          </h1>
          <p className="text-lg text-text-tertiary mb-8">
            Please select an experience, tour, or event before accessing the booking page.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href={`/${locale}`}
            className="block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
          >
            Browse Experiences
          </Link>
          <Link
            href={`/${locale}`}
            className="block px-8 py-3 border-2 border-border text-text-primary font-semibold rounded-lg hover:border-primary hover:text-primary transition-all"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}