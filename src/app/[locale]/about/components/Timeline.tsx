// src/app/[locale]/about/components/Timeline.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      year: '2009',
      title: 'The Beginning',
      description: 'Founded by passionate locals with a dream to share Morocco\'s beauty with the world.',
    },
    {
      year: '2012',
      title: 'First Recognition',
      description: 'Received our first tourism excellence award and expanded our team of local guides.',
    },
    {
      year: '2015',
      title: 'Digital Innovation',
      description: 'Launched our online platform and introduced personalized itinerary planning.',
    },
    {
      year: '2018',
      title: 'Sustainable Focus',
      description: 'Implemented eco-friendly practices and strengthened community partnerships.',
    },
    {
      year: '2021',
      title: 'International Recognition',
      description: 'Achieved international certification and expanded our exclusive venue partnerships.',
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Leading Morocco\'s tourism industry with 15+ years of experience and 1000+ satisfied travelers.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background-cream">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          Our Journey Through Time
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-text-tertiary leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Year Badge */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-1" />
                      <div>{event.year}</div>
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}