'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { aboutData } from '@/data/home-data';
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
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      desc: 'Deeply rooted love for Marrakech and its rich cultural heritage drives every experience we create.'
    },
    {
      icon: Sparkles,
      title: 'Authenticity',
      desc: 'Showcasing the real Marrakech—genuine cultural immersion over superficial tourist attractions.'
    },
    {
      icon: Users,
      title: 'Community',
      desc: 'Working closely with local artisans to ensure our tourism directly benefits the people who make this city special.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      desc: 'Committed to environmentally responsible practices that preserve our natural beauty for future generations.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* 1. CINEMA HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=2000&q=80"
            alt="About ByMarrakech"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-white/90 text-sm font-medium tracking-[0.2em] mb-8 backdrop-blur-sm bg-white/5 uppercase">
              Our Philosophy
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium tracking-tight mb-8 leading-tight">
              Curators of the<br />Red City
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              We don't just show you Marrakech. We invite you to become part of its story.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs uppercase tracking-widest">Our Story</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

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
                src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <p className="font-serif text-xl italic text-primary">
                  &quot;To travel is to discover that everyone is wrong about other countries.&quot;
                </p>
                <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">
                  — Aldous Huxley
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
                Since 2014
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                Crafting Authentic <br />Moroccan Journeys
              </h2>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  {aboutData.description1}
                </p>
                <p>
                  {aboutData.description2}
                </p>
                <p>
                  What sets us apart is our deep connection to the land. We are not just guides; we are storytellers, historians, and friends who want to share the hidden gems that only locals know.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">10+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">5k+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-1">50+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">Tours</div>
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
            <span className="text-primary uppercase tracking-widest font-bold text-sm mb-3 block">Our Ethos</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Guiding Principles</h2>
            <p className="text-gray-600 font-light text-lg">
              Every journey we design is built upon a foundation of respect, quality, and genuine connection.
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
                &quot;We believe that travel is the only thing you buy that makes you richer. Come, let us show you the richness of Morocco.&quot;
              </h2>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden relative border-2 border-white/50">
                  <Image
                    src="/images/logo-red.png"
                    alt="ByMarrakech Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg tracking-wide">The ByMarrakech Team</div>
                  <div className="text-white/60 text-sm uppercase tracking-widest">Your Local Experts</div>
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
                >
                  <span>Start Your Journey</span>
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