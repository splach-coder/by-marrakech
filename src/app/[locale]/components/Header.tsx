'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, Instagram, Facebook, Phone, Mail, ChevronRight, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useTranslations, useLocale } from 'next-intl';

// Routes that open on paper rather than a dark hero photograph. The header
// needs its light treatment from the very top on these, or white nav links sit
// on cream under a gradient band that reads as a rendering bug.
// A trailing slash means "this subtree" — '/drivers/' catches driver profiles
// without catching the /drivers index, which still opens on a photo banner.
const LIGHT_TOP_ROUTES = ['/contact', '/drivers/'];

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const routePath = (pathname ?? '').replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  const startsLight = LIGHT_TOP_ROUTES.some(
    (route) => routePath === route || routePath.startsWith(route)
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const { toggleCart, cartTotal } = useCart();

  // No scroll listener: reading window.scrollY on every scroll event forces a
  // synchronous layout, and the trace blamed exactly that for ~90ms of forced
  // reflow per scroll of the home page. A 40px sentinel at the top of the
  // document (40 = SubHeader height) tells us the same thing through an
  // IntersectionObserver, which costs no layout work on the main thread.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Tours, experiences, activities and services are one page now (/explore),
  // so the nav carries one entry for the whole catalogue. In-page navigation is
  // handled by the hero chips and the chapter rail on /explore itself.
  // /explore holds three collections behind one anchor each. On mobile the nav
  // entry expands into them so a reader who wants one specific kind of trip
  // does not have to land on the page and hunt the sticky rail.
  const exploreChildren = [
    { href: `/${locale}/explore#journeys`, label: t('exploreJourneys') },
    { href: `/${locale}/explore#escapes`, label: t('exploreEscapes') },
    { href: `/${locale}/explore#moments`, label: t('exploreMoments') },
    { href: `/${locale}/explore`, label: t('exploreAll') },
  ];

  const navigationLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/explore`, label: t('explore') },
    { href: `/${locale}/fleet`, label: t('fleet') },
    { href: `/${locale}/drivers`, label: t('drivers') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/guides`, label: t('guides') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) setIsExploreOpen(false);
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
  const isDarkTheme = isScrolled || isMobileMenuOpen || startsLight;
  const logoSrc = "/images/logo-red.webp";
  const textColor = isDarkTheme ? "text-text-primary" : "text-white";
  const buttonHover = isDarkTheme ? "hover:bg-gray-100" : "hover:bg-white/10";

  return (
    <>
      {/* Scroll sentinel — watched instead of listening to scroll events. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-10 w-px" />

      {/* Header Bar */}
      <header
        className={`left-0 right-0 z-[60] transition-all duration-500 ${isScrolled
          ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-sm py-2'
          : startsLight
            ? 'absolute py-4 md:py-8'
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
                  className={`text-[12px] font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:text-primary hover:tracking-[0.25em] ${isDarkTheme ? 'text-text-primary' : 'text-white'
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
                  {navigationLinks.map((link, index) => {
                    const isExplore = link.href === `/${locale}/explore`;
                    return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      {isExplore ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsExploreOpen((open) => !open)}
                            aria-expanded={isExploreOpen}
                            aria-controls="mobile-explore-submenu"
                            className="group flex w-full items-center justify-between py-1.5 text-left"
                          >
                            <span className={`text-2xl md:text-3xl font-nohemi font-black transition-all duration-300 ${isExploreOpen ? 'text-primary' : 'text-text-primary group-hover:text-primary'}`}>
                              {link.label}
                            </span>
                            <ChevronDown
                              className={`w-6 h-6 transition-all duration-300 ${isExploreOpen ? 'rotate-180 text-primary' : 'text-stone-200 group-hover:text-primary'}`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExploreOpen && (
                              <motion.ul
                                id="mobile-explore-submenu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <li className="pt-1 pb-2 pl-4 border-l border-stone-200 space-y-1">
                                  {exploreChildren.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="group flex items-center justify-between py-2"
                                    >
                                      <span className="text-base font-sans font-semibold uppercase tracking-[0.12em] text-text-secondary group-hover:text-primary transition-colors duration-300">
                                        {child.label}
                                      </span>
                                      <ChevronRight className="w-4 h-4 text-stone-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </Link>
                                  ))}
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
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
                      )}
                    </motion.div>
                    );
                  })}
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