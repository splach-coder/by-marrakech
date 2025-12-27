'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* Full Screen Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-imgs/contact.webp"
            alt={t('hero.title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl !font-serif font-normal tracking-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-sm md:text-base lg:text-lg tracking-[0.2em] font-light uppercase text-white/90">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. EDITORIAL CONTACT SECTION */}
      <section className="py-24 px-2 md:px-6 lg:px-12">
        <div className="container-custom mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12">
                {t('hero.subtitle')}
              </h2>

              <div className="space-y-12">
                {/* Office */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('info.address')}</span>
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed pl-16 border-l border-gray-100">
                    123 Medina Avenue<br />
                    Marrakech 40000, Morocco
                  </p>
                </div>

                {/* Contact */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('info.title')}</span>
                  </div>
                  <div className="pl-16 border-l border-gray-100 space-y-2">
                    <p className="text-xl text-gray-800 hover:text-primary transition-colors cursor-pointer">
                      {process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@xhosen.com'}
                    </p>
                    <p className="text-xl text-gray-800 hover:text-primary transition-colors cursor-pointer">
                      {process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000'}
                    </p>
                  </div>
                </div>

                {/* Socials */}
                <div className="pt-8">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 block">Follow Our Journey</span>
                  <div className="flex gap-4">
                    {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Minimal Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white py-8 md:py-12 px-4 md:px-8 rounded-3xl shadow-xl shadow-gray-100/50"
            >
              <h3 className="text-2xl font-serif text-gray-900 mb-8">{t('form.title')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-100 px-4 py-4 rounded-t-lg focus:ring-0 focus:border-primary transition-colors text-gray-800 placeholder-gray-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-100 px-4 py-4 rounded-t-lg focus:ring-0 focus:border-primary transition-colors text-gray-800 placeholder-gray-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('form.message')}</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-100 px-4 py-4 rounded-t-lg focus:ring-0 focus:border-primary transition-colors text-gray-800 placeholder-gray-300 resize-none"
                    placeholder={t('hero.subtitle')}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 mt-4"
                >
                  <span>{t('form.submit')}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MAP SECTION - Separate full-width section */}
      <section className="pb-20 px-4 md:px-6 lg:px-12">
        <div className="container-custom mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">{t('hero.title')}</h2>
              <p className="text-gray-500">{t('info.title')}</p>
            </div>

            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108704.22922718712!2d-8.077885489726833!3d31.63474853046036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}