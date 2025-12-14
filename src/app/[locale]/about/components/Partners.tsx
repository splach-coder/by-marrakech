// src/app/[locale]/about/components/Partners.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { UtensilsCrossed, Hotel, Bus, Users } from 'lucide-react';

export default function Partners() {
  const [activeCategory, setActiveCategory] = useState('restaurants');

  const categories = [
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'hotels', label: 'Hotels & Riads', icon: Hotel },
    { id: 'operators', label: 'Tour Operators', icon: Bus },
    { id: 'guides', label: 'Local Guides', icon: Users },
  ];

  const partners = {
    restaurants: [
      { name: 'Le Jardin Restaurant', image: '/images/partners/restaurant-1.jpg' },
    ],
    hotels: [],
    operators: [],
    guides: [],
  };

  return (
    <section className="py-16 md:py-20 bg-background-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-text-tertiary uppercase tracking-wider">
              OUR PARTNERS
            </span>
            <div className="w-4 h-4 text-text-tertiary">↓</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-8">
            Discover our carefully selected<br />
            partners who share our<br />
            commitment to excellence
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-primary border-2 border-border hover:border-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Restaurant Example */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-64">
              <Image
                src="/images/partners/le-jardin.jpg"
                alt="Le Jardin Restaurant"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold">Le Jardin Restaurant</h3>
              </div>
            </div>
          </div>

          {/* Add more partner cards as needed */}
        </motion.div>
      </div>
    </section>
  );
}