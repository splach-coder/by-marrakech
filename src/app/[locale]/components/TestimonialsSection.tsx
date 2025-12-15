'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Globe, MapPin, Star } from 'lucide-react';
import { testimonialsData } from '@/data/home-data';

interface Testimonial {
  id: string;
  name: string;
  country: string;
  tour: string;
  rating: number;
  review: string;
  image: string;
}

interface TestimonialsSectionProps {
  label?: string;
  title?: string;
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({
  label = "CLIENT STORIES",
  title = "Clients journeys in Marrakech",
  testimonials = testimonialsData
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentTestimonial = testimonials[currentIndex];
  const reviews = currentTestimonial.review.split(". ");

  return (
    <section className="py-8 md:py-24 bg-background">
      <div className="container-custom">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <span className="text-xs md:text-sm text-text-tertiary uppercase tracking-wider">{label}</span>
            <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-text-tertiary" />
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">{title}</h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden group">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                  >
                    <Image src={currentTestimonial.image} alt={currentTestimonial.name} fill className="object-cover" />
                  </motion.div>
                </AnimatePresence>

                {/* Mobile Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 md:hidden pointer-events-none z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                    className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors pointer-events-auto"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-text-primary" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); paginate(1); }}
                    className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors pointer-events-auto"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-text-primary" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{currentTestimonial.name}</h3>
                  <div className="flex items-center gap-2 text-text-tertiary mb-4">
                    <Globe className="w-5 h-5" />
                    <span className="text-lg">{currentTestimonial.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary mb-6">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg font-medium">{currentTestimonial.tour}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="relative pl-6 border-l-4 border-primary">
                    <p className="text-text-tertiary text-lg leading-relaxed">{currentTestimonial.review}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none hidden md:block">
            <div className="container-custom flex justify-between pointer-events-auto">
              <button onClick={() => paginate(-1)} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-background-cream transition-colors -ml-6">
                <ChevronLeft className="w-6 h-6 text-text-primary" />
              </button>
              <button onClick={() => paginate(1)} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-background-cream transition-colors -mr-6">
                <ChevronRight className="w-6 h-6 text-text-primary" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-border-dark'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}