'use client';

import { Info } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface SubHeaderProps {
  helpText?: string;
  tagline?: string;
}

export default function SubHeader({
  helpText = "Can We Help?",
  tagline = "MEMORIES MADE BY MARRAKECH"
}: SubHeaderProps) {
  return (
    <div className="bg-primary text-white overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center justify-between text-xs py-1">
          {/* Left - Help Text */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-4 h-4 border border-white rounded-full">
              <Info className="w-3 h-3" />
            </div>
            <span className="font-medium">{helpText}</span>
          </div>

          {/* Center - Tagline */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <p className="text-xs font-medium tracking-widest uppercase">
              {tagline}
            </p>
          </div>

          {/* Right - Language Switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}