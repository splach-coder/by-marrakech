// src/app/[locale]/about/components/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Thomas & Emma Laurent',
      location: 'Paris, France',
      text: 'Nous avons passé une semaine inoubliable à Marrakech grâce à l\'équipe de Xhosen. Fatima a créé un itinéraire parfaitement adapté à nos intérêts, combinant culture, gastronomie et aventure. Le niveau de personnalisation et d\'attention aux détails était exceptionnel. C\'était notre troisième visite au Maroc, mais de loin la meilleure!',
      rating: 5,
      image: '/images/testimonials/thomas-emma.jpg',
    },
    // Add more testimonials as needed
  ];

  const paginate = (direction: number) => {
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-text-tertiary uppercase tracking-wider">
              CLIENT STORIES
            </span>
            <div className="w-4 h-4 text-text-tertiary">↓</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            What Our Travelers Say About Us
          </h2>
        </div>

        {/* Testimonial Display */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stars */}
              <div className="flex items-center gap-2 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <div className="relative pl-6 border-l-4 border-primary mb-8">
                <p className="text-text-tertiary text-lg leading-relaxed italic">
                  "{currentTestimonial.text}"
                </p>
              </div>

              {/* Author */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {currentTestimonial.name}
                </h3>
                <p className="text-text-tertiary">{currentTestimonial.location}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => paginate(-1)}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-background-cream transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-text-primary" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots */}
                <div className="flex gap-2 ml-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}