'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cartTotal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // 40 is the height of the SubHeader (h-10)
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/tours`, label: t('tours') },
    { href: `/${locale}/experiences`, label: t('experiences') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/activities`, label: t('activities') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/marrakech`, label: t('marrakech') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Determine logo source and text color based on state
  // If menu is open, always use "colored" theme (dark text, red logo)
  const isDarkTheme = isScrolled || isMobileMenuOpen;
  const logoSrc = isDarkTheme ? "/images/logo-red.png" : "/images/logo-yellow.png";
  const textColor = isDarkTheme ? "text-text-primary" : "text-white";
  const buttonHover = isDarkTheme ? "hover:bg-gray-100" : "hover:bg-white/10";

  return (
    <>
      {/* Header Bar */}
      <header
        className={`left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'absolute bg-gradient-to-b from-black/50 to-transparent py-2 md:py-6'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0 relative z-50">
              <Image
                src={logoSrc}
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
              {navigationLinks.map((link) => (
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

            <div className="flex items-center gap-4">
              {/* Cart Trigger */}
              <button
                onClick={toggleCart}
                className={`relative p-2 rounded-full transition-colors ${buttonHover} ${textColor}`}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                {cartTotal > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {cartTotal}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`xl:hidden p-2 rounded-full transition-colors relative z-50 ${buttonHover} ${textColor}`}
                aria-label="Open mobile menu"
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay (Remodal) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[100] xl:hidden flex flex-col"
          >
            {/* Menu Header with Close Button */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm z-10">
              {/* Logo in Menu */}
              <div className="w-[150px]">
                <Image
                  src="/images/logo-red.png"
                  alt="ByMarrakech"
                  width={150}
                  height={45}
                  className="w-auto h-10 object-contain"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Links Container */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 overflow-y-auto mt-16">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif font-bold text-text-primary hover:text-primary transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors text-lg shadow-lg shadow-primary/30"
                >
                  {t('bookTrip')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}