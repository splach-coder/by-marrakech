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
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <Image
                src="/logo-white.png"
                alt="ByMarrakech"
                width={180}
                height={50}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              Your trusted Morocco travel agency offering authentic tours, excursions, and experiences.
              From Marrakech to the Sahara, we create unforgettable journeys.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4" />
                <span>+212 600 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4" />
                <span>contact@bymarrakech.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>Marrakech, Morocco</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} ByMarrakech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}