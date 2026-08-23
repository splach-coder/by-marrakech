'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, Lock } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getRoutes, whatsappLink } from '@/data/transferData';
import { getSiteData } from '@/data/siteData';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const routes = getRoutes(locale);
  const excursions = (getSiteData(locale).excursions || []) as Array<{ id: number; title: string }>;

  // WhatsApp leads the row: it is how most travellers actually reach us, and it
  // keeps its own green on hover instead of the shared gold.
  const socialLinks = [
    {
      icon: WhatsAppIcon,
      href: whatsappLink(t('social.waIntro')),
      label: 'WhatsApp',
      hover: 'hover:bg-[#25D366] hover:text-[#04331d]',
    },
    { icon: Facebook, href: 'https://www.facebook.com/chosengate', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/chosengate/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@xhosengate', label: 'YouTube' },
  ];

  // The catalogue is one page — these four land on their chapter of /explore
  // rather than on four separate index pages.
  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/explore#journeys`, label: t('nav.tours') },
    { href: `/${locale}/explore#escapes`, label: t('nav.excursions') },
    { href: `/${locale}/explore#moments`, label: t('nav.activities') },
    { href: `/${locale}/explore#services`, label: t('nav.transfers') },
    { href: `/${locale}/fleet`, label: t('nav.fleet') },
    { href: `/${locale}/drivers`, label: t('nav.drivers') },
    { href: `/${locale}/guides`, label: t('nav.guides') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  const colHeading = 'text-secondary text-xs font-black uppercase tracking-[0.25em] mb-7';
  const colLink = 'text-white/70 hover:text-white text-sm transition-colors duration-300';

  return (
    <footer className="bg-primary text-white pt-20">
      <div className="container-custom">
        {/* ── Row 1: brand / navigation / routes / contact ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-12 pb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/images/logo-red.webp"
                alt="Xhosen Gate"
                width={220}
                height={70}
                className="object-contain h-24 w-auto"
              />
            </Link>
            <p className="text-white/75 leading-relaxed mb-7 max-w-sm text-sm">
              {t('description')}
            </p>
            <div className="flex gap-3 mb-7">
              {socialLinks.map(({ icon: Icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${hover ?? 'hover:bg-secondary hover:text-[#3b2f2f]'}`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Google Maps embed — Marrakech base */}
            <div className="w-full max-w-[300px] h-[160px] rounded-sm overflow-hidden border border-white/15">
              <iframe
                src="https://www.google.com/maps?q=Marrakech,+Morocco&z=12&output=embed"
                title="Xhosen Gate — Marrakech, Morocco"
                width="300"
                height="160"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale-[35%] contrast-[0.95]"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className={colHeading}>{t('nav.title')}</h3>
            <nav className="flex flex-col space-y-3.5">
              {navLinks.map(link => (
                <Link key={link.href + link.label} href={link.href} className={colLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Transfer routes */}
          <div className="lg:col-span-3">
            <h3 className={colHeading}>{t('routes.title')}</h3>
            <nav className="flex flex-col space-y-3.5">
              {routes.map(r => (
                <Link key={r.id} href={`/${locale}#quote`} className={colLink}>
                  {r.from.replace('Marrakech Airport (RAK)', 'RAK ' + (locale === 'fr' ? 'Aéroport' : 'Airport'))} → {r.to}
                </Link>
              ))}
              <Link href={`/${locale}#quote`} className="text-secondary hover:text-secondary-light text-sm font-bold inline-flex items-center gap-1.5 transition-colors">
                {t('routes.all')}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className={colHeading}>{t('contact.title')}</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3.5 text-white/80">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{t('contact.address')}</span>
              </div>
              <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212600000000'}`} className="flex items-start gap-3.5 text-white/80 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm">{process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000'}</span>
              </a>
              <a href="mailto:contact@xhosengate.com" className="flex items-start gap-3.5 text-white/80 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm">contact@xhosengate.com</span>
              </a>
              <div className="flex items-start gap-3.5 text-white/80">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm">{t('contact.hours')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: excursions from Marrakech ───────────────────────── */}
        <div className="border-t border-white/10 py-12">
          <h3 className={colHeading}>{t('excursions.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3.5">
            {excursions.map(x => (
              <Link key={x.id} href={`/${locale}/experiences/${x.id}`} className={colLink}>
                {x.title}
              </Link>
            ))}
            <Link href={`/${locale}/explore#escapes`} className="text-secondary hover:text-secondary-light text-sm font-bold inline-flex items-center gap-1.5 transition-colors">
              {t('excursions.all')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Row 3: payment strip ───────────────────────────────────── */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            {t('payment.secure')}
          </div>

          {/* Payment method badges */}
          <div className="flex items-center gap-2.5">
            <span className="h-7 px-2.5 flex items-center bg-white/10 border border-white/20 rounded-sm text-white font-black italic text-[11px] tracking-wide">
              VISA
            </span>
            <span className="h-7 px-2.5 flex items-center bg-white/10 border border-white/20 rounded-sm" aria-label="Mastercard">
              <svg viewBox="0 0 32 20" className="h-3.5 w-auto" role="img" aria-hidden="true">
                <circle cx="12" cy="10" r="9" fill="#EB001B" />
                <circle cx="20" cy="10" r="9" fill="#F79E1B" fillOpacity="0.9" />
              </svg>
            </span>
            <span className="h-7 px-2.5 flex items-center bg-white/10 border border-white/20 rounded-sm text-white font-black text-[10px] tracking-widest">
              AMEX
            </span>
          </div>

          <div className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-center md:text-right">
            {t('payment.methods')}
          </div>
        </div>

        {/* ── Row 4: bottom bar ──────────────────────────────────────── */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p className="font-light">
              © {new Date().getFullYear()} <span className="text-white font-medium">Xhosen Gate</span>. {t('bottom.rights')}
            </p>
            <div className="flex gap-8">
              <Link href={`/${locale}/privacy`} className="hover:text-secondary transition-colors">
                {t('bottom.privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-secondary transition-colors">
                {t('bottom.terms')}
              </Link>
              <Link href={`/${locale}/sitemap`} className="hover:text-secondary transition-colors">
                {t('bottom.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
