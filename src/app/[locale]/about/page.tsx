'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import PageBanner from '../components/PageBanner';
import {
  Heart,
  Sparkles,
  Users,
  Lightbulb,
  Leaf,
  Globe,
  ArrowRight,
  Quote
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  const values = [
    {
      icon: Heart,
      title: t('values.items.passion.title'),
      desc: t('values.items.passion.desc')
    },
    {
      icon: Sparkles,
      title: t('values.items.authenticity.title'),
      desc: t('values.items.authenticity.desc')
    },
    {
      icon: Users,
      title: t('values.items.community.title'),
      desc: t('values.items.community.desc')
    },
    {
      icon: Leaf,
      title: t('values.items.sustainability.title'),
      desc: t('values.items.sustainability.desc')
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* Standard full-width page banner */}
      <PageBanner
        image="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=2000&q=80"
        kicker={t('hero.tag')}
        title={t.rich('hero.title', { br: () => ' ' })}
        subtitle={t('hero.subtitle')}
      />

      {/* 2. OUR STORY (Editorial) */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/marrakech/marrakech14.webp"
                alt="Our Story"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <p className="font-serif text-xl italic text-primary">
                  &quot;{t('story.quote')}&quot;
                </p>
                <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">
                  — {t('story.author')}
                </p>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary uppercase tracking-widest font-bold text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary"></span>
                {t('story.since')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                {t.rich('story.title', {
                  br: () => <br />
                })}
              </h2>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  {t('story.description1')}
                </p>
                <p>
                  {t('story.description2')}
                </p>
                <p>
                  {t('story.description3')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">10+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">{t('story.stats.years')}</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">5k+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">{t('story.stats.travelers')}</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">50+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">{t('story.stats.tours')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES (Minimal Grid) */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-3 block">{t('values.tag')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">{t('values.title')}</h2>
            <p className="text-gray-600 font-light text-lg">
              {t('values.subtitle')}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. FOUNDER'S NOTE / CONCLUSION */}
      <section className="py-24 px-1 md:px-4 bg-[#faf9f6]">
        <div className="container-custom mx-auto">
          <div className="relative bg-primary text-white rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center shadow-2xl">

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/patterns/moroccan-pattern.png')] bg-repeat" />

            <div className="relative z-10 md:max-w-4xl mx-auto">
              <Quote className="w-12 h-12 text-white/30 mx-auto mb-8" />
              <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-8">
                &quot;{t('cta.quote')}&quot;
              </h2>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden relative border-2 border-white/50">
                  <Image
                    src="/images/logo-red.webp"
                    alt="Xhosen Gate Logo"
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg tracking-wide">{t('cta.team')}</div>
                  <div className="text-white/60 text-sm uppercase tracking-widest">{t('cta.experts')}</div>
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
                >
                  <span>{t('cta.button')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}