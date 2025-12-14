// src/app/[locale]/about/components/Values.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Lightbulb, Leaf, Globe } from 'lucide-react';

interface Value {
  icon: React.ElementType;
  iconBg: string;
  title: string;
  description: string;
}

export default function Values() {
  const values: Value[] = [
    {
      icon: Heart,
      iconBg: 'bg-red-500',
      title: 'Passion',
      description: 'We are deeply passionate about Marrakech and its rich cultural heritage. This passion drives us to create exceptional experiences that showcase the best of what our city has to offer.',
    },
    {
      icon: Sparkles,
      iconBg: 'bg-amber-600',
      title: 'Authenticity',
      description: 'We believe in showcasing the real Marrakech. Our tours and experiences are designed to provide genuine cultural immersion rather than superficial tourist attractions.',
    },
    {
      icon: Users,
      iconBg: 'bg-orange-500',
      title: 'Community',
      description: 'We work closely with local communities and artisans to ensure our tourism activities benefit the people who make Marrakech special, fostering sustainable economic growth.',
    },
    {
      icon: Lightbulb,
      iconBg: 'bg-yellow-500',
      title: 'Innovation',
      description: 'While respecting traditions, we constantly seek innovative ways to enhance our services and create unique experiences that blend the ancient with modern convenience.',
    },
    {
      icon: Leaf,
      iconBg: 'bg-green-600',
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible tourism practices that preserve Marrakech\'s natural beauty and cultural heritage for future generations.',
    },
    {
      icon: Globe,
      iconBg: 'bg-blue-600',
      title: 'Inclusivity',
      description: 'We welcome travelers from all backgrounds and strive to make Marrakech accessible and enjoyable for everyone, regardless of age, ability, or cultural background.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-text-tertiary uppercase tracking-wider">
              OUR VALUES
            </span>
            <div className="w-4 h-4 text-text-tertiary">↓</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            The Principles That Guide Us
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${value.iconBg} rounded-2xl mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-text-tertiary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}