// src/app/[locale]/about/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Authentic Moroccan<br />
              Experiences Since<br />
              2015
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Connecting visitors with Morocco's true essence through authentic 
              experiences that celebrate our rich cultural heritage since 2015.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all">
              <BookOpen className="w-5 h-5" />
              <span>Discover Our Story</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}