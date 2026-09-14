'use client';

/**
 * Language switcher for the top bar — a custom dropdown, not a native
 * <select> (which ignored our option styling and opened an OS wheel on
 * phones). The trigger states the current language; the panel is a small
 * dark-glass card listing each language by its own name.
 *
 * The options are real <Link>s, so the other language stays a crawlable
 * href with hrefLang and the control works before hydration.
 *
 * Note: SubHeader must not clip this — its wrapper is overflow-visible so the
 * panel can hang below the 32px bar.
 */

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { routing } from '@/i18n/routing';

/** Each language named in its own language, as a reader would look for it. */
const LOCALE_NAME: Record<string, string> = { en: 'English', fr: 'Français' };

/** The panel's own label, in the language currently being read. */
const PANEL_LABEL: Record<string, string> = { en: 'Language', fr: 'Langue' };

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? '/';
  const params = useParams();
  const current = typeof params?.locale === 'string' ? params.locale : routing.defaultLocale;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // swap the leading locale segment, keeping the rest of the path intact
  const hrefFor = (locale: string) =>
    /^\/[a-z]{2}(\/|$)/.test(pathname)
      ? pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
      : `/${locale}${pathname === '/' ? '' : pathname}`;

  // close on outside click, on Escape (focus back to the trigger), and once a
  // choice has actually navigated
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="language-panel"
        aria-label="Change language"
        className={`group flex items-center gap-2 rounded-full border py-[3px] pl-2.5 pr-2 transition-all duration-300 ${
          isOpen
            ? 'border-secondary/60 bg-black/25'
            : 'border-white/20 bg-black/15 hover:border-white/40 hover:bg-black/25'
        }`}
      >
        <Globe
          className={`h-3.5 w-3.5 transition-all duration-500 ${
            isOpen ? 'rotate-180 text-secondary' : 'text-white/70 group-hover:rotate-180 group-hover:text-white'
          }`}
        />
        <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white">
          {current.toUpperCase()}
        </span>
        {/* a caret drawn as a hairline chevron, so it reads as a mark rather than an icon */}
        <span
          aria-hidden="true"
          className={`mr-0.5 h-1.5 w-1.5 rotate-45 border-b border-r transition-all duration-300 ${
            isOpen ? '-translate-y-px -rotate-[135deg] border-secondary' : 'border-white/60 group-hover:border-white'
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="language-panel"
            aria-label={PANEL_LABEL[current] ?? 'Language'}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-[80] mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-[#2a201c]/95 shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            {/* gold hairline reading as the panel's lit edge */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

            <p className="px-4 pb-2 pt-3 text-[9px] font-black uppercase tracking-[0.3em] text-white/35">
              {PANEL_LABEL[current] ?? 'Language'}
            </p>

            <ul className="pb-1.5">
              {routing.locales.map((locale, index) => {
                const isActive = locale === current;
                return (
                  <motion.li
                    key={locale}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={hrefFor(locale)}
                      hrefLang={locale}
                      lang={locale}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`group/item relative flex items-center justify-between px-4 py-2.5 transition-colors duration-300 ${
                        isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.06]'
                      }`}
                    >
                      {/* gold rule slides in from the left edge on the row you are on */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-secondary transition-transform duration-300 ${
                          isActive ? 'scale-y-100' : 'scale-y-0 group-hover/item:scale-y-100'
                        }`}
                      />
                      <span className="flex items-baseline gap-2">
                        <span
                          className={`font-serif text-[15px] leading-none transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/75 group-hover/item:text-white'
                          }`}
                        >
                          {LOCALE_NAME[locale] ?? locale}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">
                          {locale}
                        </span>
                      </span>
                      {isActive && <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
