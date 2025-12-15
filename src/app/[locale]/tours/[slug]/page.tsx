'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { siteData } from '@/data/siteData';
import { use, useState } from 'react';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Flag,
  Calendar,
  X,
  Quote
} from 'lucide-react';
import Itinerary from '@/app/[locale]/components/Itinerary';
import BookingCard from '@/app/[locale]/components/BookingCard';
import GalleryGrid from '@/app/[locale]/components/GalleryGrid';

interface TourPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default function TourPage({ params }: TourPageProps) {
  const { slug } = use(params);
  const tour = siteData.tours.find(t => String(t.id) === slug);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!tour) {
    notFound();
  }

  // Process gallery images for the GalleryGrid (needs string array)
  const galleryUrls = tour.gallery?.map(img => img.url) || [
    tour.image.url
  ];

  // Format itinerary for the Itinerary component
  const itineraryDays = tour.itinerary?.map(day => ({
    day: day.day,
    dayNumber: day.day,
    title: day.title,
    description: day.description,
    location: day.location,
    highlights: day.highlights
  })) || [];

  const avgRating = tour.reviews && tour.reviews.length > 0
    ? (tour.reviews.reduce((acc, rev) => acc + rev.rating, 0) / tour.reviews.length).toFixed(1)
    : '5.0';

  const handleBook = () => {
    const message = `I'm interested in booking the tour: ${tour.title} (${tour.trip_code})`;
    const url = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative h-[60vh] md:h-[85vh] min-h-[500px] md:min-h-[600px]">
        <Image
          src={tour.banner_image?.url || tour.image.url}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />

        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-3 md:mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 mb-0.5" />
                  <span className="uppercase tracking-wider font-semibold">Home</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/50" />
                <Link href="/tours" className="hover:text-white transition-colors">
                  <span className="uppercase tracking-wider font-semibold">Tours</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/50" />
                <span className="text-white font-serif font-medium truncate">
                  {tour.title}
                </span>
              </nav>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-6">
                <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-md px-2 md:px-4 py-1 md:py-1.5 rounded-full border border-white/30 text-white">
                  <Star className="w-3 md:w-4 h-3 md:h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-xs md:text-base">{avgRating}</span>
                  <span className="text-white/80 text-xs md:text-sm">({tour.reviews?.length || 24} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-8 leading-tight drop-shadow-lg">
                {tour.title}
              </h1>

              <div className="flex flex-wrap gap-3 md:gap-8 text-white/90 font-medium text-sm md:text-lg">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Clock className="w-4 md:w-6 h-4 md:h-6" />
                  </div>
                  <span className="text-xs md:text-base">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Users className="w-4 md:w-6 h-4 md:h-6" />
                  </div>
                  <span className="capitalize text-xs md:text-base">{tour.group_size} Group</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <MapPin className="w-4 md:w-6 h-4 md:h-6" />
                  </div>
                  <span className="text-xs md:text-base">{tour.locations?.[0]?.name || 'Morocco'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-0 md:container-custom py-8 md:py-16">
        {/* Breadcrumbs */}


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-10 md:space-y-20 px-4 md:px-0">

            {/* Overview */}
            <section>
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-gray-900"></span>
                OVERVIEW
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                {tour.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-gray-900"></span>
                HIGHLIGHTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-amber-50/50 transition-colors duration-300 border border-transparent hover:border-amber-100"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700 leading-relaxed font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <Itinerary
                days={itineraryDays}
                title="YOUR JOURNEY"
                defaultView={itineraryDays.length > 2 ? 'timeline' : 'timeline'}
              />
            </section>

            {/* Reviews */}
            {tour.reviews && tour.reviews.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-gray-900"></span>
                  GUEST REVIEWS
                </h2>

                <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
                  {tour.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="min-w-[300px] md:min-w-[350px] bg-gray-50 p-8 rounded-2xl snap-center border border-gray-100"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic leading-relaxed text-sm">"{review.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-serif font-bold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">{review.country}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            <section>
              <GalleryGrid
                images={galleryUrls}
                title="Tour Gallery"
                onImageClick={(idx) => setSelectedImage(idx)}
              />
            </section>

            {/* Travel Advice */}
            <div className="bg-[#fcfbf9] border border-[#f0ebe3] rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-[100px] -mr-8 -mt-8" />

              <div className="relative z-10">
                <h3 className="text-2xl font-serif text-gray-900 mb-2 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  Traveler's Note
                </h3>
                <div className="w-12 h-1 bg-amber-200 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {tour.suitable_for?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="font-medium">Perfect for {item}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-medium">Free cancellation up to 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-8">
              <BookingCard
                title="Book This Tour"
                price="Contact us for price"
                duration={tour.duration}
                groupSize="Private Group"
                onBook={handleBook}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Gallery */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white transition-colors z-50 bg-black/30 backdrop-blur-sm rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 md:w-8 h-6 md:h-8" />
            </button>

            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryUrls.length - 1);
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage < galleryUrls.length - 1 ? selectedImage + 1 : 0);
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center">
              <div className="relative w-full flex-1 flex items-center justify-center">
                <Image
                  src={galleryUrls[selectedImage]}
                  alt="Gallery view"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Thumbnail Navigation */}
              <div className="w-full max-w-4xl mt-4 px-4">
                <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                  {galleryUrls.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                      className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden snap-center transition-all ${idx === selectedImage
                          ? 'ring-2 ring-white scale-110'
                          : 'opacity-50 hover:opacity-100'
                        }`}
                    >
                      <Image
                        src={url}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {selectedImage + 1} / {galleryUrls.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}