'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Instagram, Facebook, Phone, Mail, ChevronRight, Globe } from 'lucide-react';
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
  const isDarkTheme = isScrolled || isMobileMenuOpen;
  const logoSrc = "/images/logo-red.webp";
  const textColor = isDarkTheme ? "text-text-primary" : "text-white";
  const buttonHover = isDarkTheme ? "hover:bg-gray-100" : "hover:bg-white/10";

  return (
    <>
      {/* Header Bar */}
      <header
        className={`left-0 right-0 z-[60] transition-all duration-500 ${isScrolled
          ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-sm py-2'
          : 'absolute bg-gradient-to-b from-black/60 to-transparent py-4 md:py-8'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0 relative z-[70]">
              <Image
                src={logoSrc}
                alt="Xhosen Gate"
                width={200}
                height={60}
                className={`object-contain transition-all duration-500 ${isScrolled ? 'h-10 md:h-12 w-auto' : 'h-12 md:h-20 lg:h-24 w-auto'
                  }`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:text-primary hover:tracking-[0.25em] ${isScrolled ? 'text-text-primary' : 'text-white'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart Trigger */}
              <button
                onClick={toggleCart}
                className={`relative p-3 rounded-2xl transition-all duration-300 group ${buttonHover} ${textColor}`}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                {cartTotal > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[11px] font-black flex items-center justify-center rounded-lg shadow-lg shadow-primary/20">
                    {cartTotal}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`xl:hidden p-3 rounded-2xl transition-all duration-300 relative z-[70] group ${buttonHover} ${textColor}`}
                aria-label="Open mobile menu"
              >
                <Menu className="w-8 h-8 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Remodal Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-stone-50 z-[100] xl:hidden flex flex-col h-screen overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-[-12deg] translate-x-1/2 pointer-events-none opacity-50" />

            {/* Menu Header */}
            <div className="relative p-6 flex justify-between items-center z-10">
              <Link href={`/${locale}`} onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/images/logo-red.webp"
                  alt="Xhosen Gate"
                  width={130}
                  height={40}
                  className="w-auto h-10 object-contain"
                />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-text-primary hover:text-primary transition-all duration-300 active:scale-95"
              >
                <X className="w-9 h-9" />
              </button>
            </div>

            {/* Main Links Area */}
            <div className="relative flex-1 flex flex-col justify-between px-8 md:px-12 z-10 pt-2">
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 opacity-60">Navigation</p>

                <div className="space-y-1">
                  {navigationLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center justify-between py-1.5"
                      >
                        <span className="text-2xl md:text-3xl font-nohemi font-black text-text-primary group-hover:text-primary transition-all duration-300">
                          {link.label}
                        </span>
                        <ChevronRight className="w-6 h-6 text-stone-200 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}