'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface SubHeaderProps {
  helpText?: string;
  tagline?: string;
  name?: string;
}

export default function SubHeader({
  helpText,
  tagline,
  name
}: SubHeaderProps) {
  const t = useTranslations('SubHeader');

  return (
    <div className="bg-primary text-white overflow-hidden">
      <div className="container-custom mx-auto px-4">
        <div className="h-8 flex items-center justify-between relative text-sm">
          {/* Left - Contact */}
          <Link
            href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{helpText || t('helpText')}</span>
          </Link>

          {/* Center - Tagline */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <p className="text-xs font-medium tracking-widest">
              {tagline || t('tagline')} <span className="text-secondary font-nohemi font-body">
                {name || 'ByMarrakech'}
              </span>
            </p>

          </div>

          {/* Right - Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}