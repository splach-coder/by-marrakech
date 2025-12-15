'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  const quickLinks = [
    { label: 'Tours', href: `/${locale}/tours` },
    { label: 'Experiences', href: `/${locale}/experiences` },
    { label: 'About Us', href: `/${locale}/about` },
    { label: 'Contact', href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/bymarrakech', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/bymarrakech/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@bymarrakech', label: 'YouTube' },
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
                src="/images/logo-red.png"
                alt="ByMarrakech"
                width={220}
                height={70}
                className="object-contain h-32 w-auto"
              />
            </Link>
            <p className="text-white/80 leading-relaxed mb-8 max-w-sm font-light text-lg">
              Your trusted Morocco travel agency offering authentic tours, excursions, and experiences.
              From Marrakech to the Sahara, we create unforgettable journeys.
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
              Discover
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link href={`/${locale}/tours`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Our Tours
              </Link>
              <Link href={`/${locale}/experiences`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Experiences
              </Link>
              <Link href={`/${locale}/activities`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Activities
              </Link>
              <Link href={`/${locale}/gallery`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Photo Gallery
              </Link>
              <Link href={`/${locale}/marrakech`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Visit Marrakech
              </Link>
            </nav>
          </div>

          {/* Company Column (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-secondary font-serif font-bold text-xl mb-8 tracking-wide">
              Company
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link href={`/${locale}/about`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                About Us
              </Link>
              <Link href={`/${locale}/services`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Our Services
              </Link>
              <Link href={`/${locale}/contact`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Contact Us
              </Link>
              <Link href={`/${locale}/blog`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                Travel Blog
              </Link>
            </nav>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-secondary font-serif font-bold text-xl mb-8 tracking-wide">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Call Us</div>
                  <div className="font-medium text-lg">+212 600 000 000</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Email Us</div>
                  <div className="font-medium text-lg">contact@bymarrakech.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white/80 group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Visit Us</div>
                  <div className="font-medium">Marrakech, Morocco</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p className="font-light">
              © {new Date().getFullYear()} <span className="text-white font-medium">ByMarrakech</span>. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href={`/${locale}/privacy`} className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href={`/${locale}/sitemap`} className="hover:text-secondary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}