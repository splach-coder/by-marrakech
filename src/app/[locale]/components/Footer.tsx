'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/xhosen', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/xhosen/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@xhosen', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href={`/${locale}`} className="inline-block mb-2">
              <Image
                src="/images/logo-red.webp"
                alt="Xhosen"
                width={220}
                height={70}
                className="object-contain h-32 w-auto"
              />
            </Link>
            <p className="text-white/80 leading-relaxed mb-8 max-w-sm font-light text-lg">
              {t('description')}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer (1 col) */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Discover Column (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-secondary-dark font-serif font-bold text-xl mb-8 tracking-wide">
              {t('discover.title')}
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link href={`/${locale}/tours`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('discover.tours')}
              </Link>
              <Link href={`/${locale}/experiences`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('discover.experiences')}
              </Link>
              <Link href={`/${locale}/activities`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('discover.activities')}
              </Link>
              <Link href={`/${locale}/gallery`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('discover.gallery')}
              </Link>
              <Link href={`/${locale}/marrakech`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('discover.marrakech')}
              </Link>
            </nav>
          </div>

          {/* Company Column (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-secondary font-serif font-bold text-xl mb-8 tracking-wide">
              {t('company.title')}
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link href={`/${locale}/about`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('company.about')}
              </Link>
              <Link href={`/${locale}/services`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('company.services')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('company.contact')}
              </Link>
              <Link href={`/${locale}/events`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                {t('company.events')}
              </Link>
            </nav>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-secondary font-serif font-bold text-xl mb-8 tracking-wide">
              {t('contact.title')}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{t('contact.call')}</div>
                  <div className="font-medium text-lg">{process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000'}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{t('contact.email')}</div>
                  <div className="font-medium text-lg">contact@xhosen.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{t('contact.visit')}</div>
                  <div className="font-medium">{t('contact.address')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p className="font-light">
              © {new Date().getFullYear()} <span className="text-white font-medium">Xhosen</span>. {t('bottom.rights')}
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