'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  locale: string;
  translations: {
    home: string;
    shop: string;
    marrakech: string;
    about: string;
    artisans: string;
    contact: string;
    catalog: string;
    followUs: string;
    discover: string;
  };
}

export default function Header({ locale, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 40 is the height of the SubHeader (h-10)
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: `/${locale}`, label: translations.home },
    { href: `/${locale}/marrakech`, label: translations.marrakech },
    { href: `/${locale}/about`, label: translations.about },
    { href: `/${locale}/contact`, label: translations.contact },
  ];

  return (
    <header
      className={`left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-md py-2'
        : 'absolute bg-gradient-to-b from-black/50 to-transparent py-2 md:py-6'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 relative z-50">
            <Image
              src={isScrolled ? "/images/logo-red.png" : "/images/logo-yellow.png"}
              alt="ByMarrakech"
              width={200}
              height={60}
              className={`object-contain transition-all duration-300 ${isScrolled ? 'h-10 md:h-12 w-auto' : 'h-12 md:h-16 lg:h-20 w-auto'
                }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {[
              { href: `/${locale}`, label: translations.home },
              { href: `/${locale}/tours`, label: 'Tours' },
              { href: `/${locale}/experiences`, label: 'Experiences' },
              { href: `/${locale}/services`, label: 'Services' },
              { href: `/${locale}/activities`, label: 'Activities' },
              { href: `/${locale}/marrakech`, label: translations.marrakech },
              { href: `/${locale}/about`, label: translations.about },
              { href: `/${locale}/contact`, label: translations.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-secondary ${isScrolled ? 'text-text-primary' : 'text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 rounded-full transition-colors relative z-50 ${isScrolled
              ? 'hover:bg-gray-100 text-text-primary'
              : 'hover:bg-white/10 text-white'
              }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background z-40 xl:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 p-8 overflow-y-auto">
            {[
              { href: `/${locale}`, label: translations.home },
              { href: `/${locale}/tours`, label: 'Tours' },
              { href: `/${locale}/experiences`, label: 'Experiences' },
              { href: `/${locale}/services`, label: 'Services' },
              { href: `/${locale}/activities`, label: 'Activities' },
              { href: `/${locale}/marrakech`, label: translations.marrakech },
              { href: `/${locale}/about`, label: translations.about },
              { href: `/${locale}/contact`, label: translations.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-text-primary hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}