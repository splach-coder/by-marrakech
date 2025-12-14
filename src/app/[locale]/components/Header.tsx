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
        ? 'fixed top-0 bg-white/90 backdrop-blur-md shadow-sm py-3'
        : 'absolute top-10 bg-transparent py-5'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 relative z-50">
            <Image
              src="/logo.png"
              alt="ByMarrakech"
              width={180}
              height={50}
              className={`object-contain transition-all duration-300 ${isScrolled ? 'h-10 w-auto' : 'h-12 w-auto brightness-0 invert'
                }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? 'text-text-primary' : 'text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors relative z-50 ${isScrolled
              ? 'hover:bg-gray-100 text-text-primary'
              : 'hover:bg-white/10 text-white'
              }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-text-primary hover:text-primary transition-colors"
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