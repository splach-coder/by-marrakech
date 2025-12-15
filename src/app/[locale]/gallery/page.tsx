'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Gallery images with proper heights for masonry layout - using local images
    const galleryItems = [
        { id: '1', img: '/images/marrakech/marrakech.jpg', url: '#', height: 600 },
        { id: '2', img: '/images/casablanca/oussama-rahib-NNECQHl9bJc-unsplash.jpg', url: '#', height: 800 },
        { id: '3', img: '/images/fes/ben-ostrower-bjNv5Bg6h4U-unsplash.jpg', url: '#', height: 700 },
        { id: '4', img: '/images/merzouga/merzouga1.jpg', url: '#', height: 650 },
        { id: '5', img: '/images/essaouira/hamza-omlacho-M9GO4Gsd2SM-unsplash.jpg', url: '#', height: 750 },
        { id: '6', img: '/images/ouarzazate/cristiano-pinto-knB5iCogf5Q-unsplash.jpg', url: '#', height: 700 },
        { id: '7', img: '/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.jpg', url: '#', height: 800 },
        { id: '8', img: '/images/merzouga/merzouga2.jpg', url: '#', height: 650 },
        { id: '9', img: '/images/rabat/framopia-EZqHkkyc0wg-unsplash.jpg', url: '#', height: 700 },
        { id: '10', img: '/images/ouarzazate/hassan-ouajbir-INcADDyMwwo-unsplash.jpg', url: '#', height: 750 },
        { id: '11', img: '/images/casablanca/kristijan-nikodinovski-nkav4Pi-UwY-unsplash.jpg', url: '#', height: 600 },
        { id: '12', img: '/images/merzouga/merzouga3.jpg', url: '#', height: 800 },
        { id: '13', img: '/images/essaouira/rigel-No_Y3bn4lNQ-unsplash.jpg', url: '#', height: 700 },
        { id: '14', img: '/images/ouarzazate/sergio-otoya--3uyPo-2cOE-unsplash.jpg', url: '#', height: 650 },
        { id: '15', img: '/images/casablanca/imad-ghazal-gRE6Be-o_Hw-unsplash.jpg', url: '#', height: 750 },
        { id: '16', img: '/images/merzouga/merzouga4.jpg', url: '#', height: 700 },
        { id: '17', img: '/images/rabat/hamza-nouasria-7zVLZu5twJs-unsplash.jpg', url: '#', height: 600 },
        { id: '18', img: '/images/ouarzazate/abdou-faiz-mBo2EUfJ7sY-unsplash.jpg', url: '#', height: 800 },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] min-h-[500px] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2000&q=80"
                    alt="Morocco Gallery"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20">
                    <div className="container-custom px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <Camera className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                                <span className="text-white/80 uppercase tracking-[0.2em] text-xs md:text-sm font-medium">Visual Journey</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                                Morocco Through Our Lens
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl font-light leading-relaxed">
                                Explore the beauty, culture, and landscapes that make Morocco unforgettable
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Masonry */}
            <section className="py-12 md:py-20 bg-[#faf9f6]">
                <div className="container-custom px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6"
                    >
                        {galleryItems.map((image, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.05,
                                    ease: "easeOut"
                                }}
                                className="relative mb-4 md:mb-6 break-inside-avoid cursor-pointer group"
                                onClick={() => setSelectedImage(idx)}
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <Image
                                        src={image.img}
                                        alt={`Gallery image ${idx + 1}`}
                                        width={800}
                                        height={image.height}
                                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Lightbox with Horizontal Scrolling Thumbnails */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white transition-colors z-50 bg-black/30 backdrop-blur-sm rounded-full p-2"
                        >
                            <X className="w-6 md:w-8 h-6 md:h-8" />
                        </button>

                        {/* Navigation Arrows */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryItems.length - 1);
                            }}
                            className="absolute left-4 md:left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm z-40"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage < galleryItems.length - 1 ? selectedImage + 1 : 0);
                            }}
                            className="absolute right-4 md:right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm z-40"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        {/* Image Container */}
                        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 pb-24">
                            <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
                                <Image
                                    src={galleryItems[selectedImage].img}
                                    alt={`Gallery image ${selectedImage + 1}`}
                                    fill
                                    className="object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            {/* Horizontal Scrolling Thumbnails */}
                            <div className="absolute bottom-4 left-0 right-0 px-4">
                                <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide max-w-6xl mx-auto">
                                    {galleryItems.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                                            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden snap-center transition-all ${idx === selectedImage
                                                ? 'ring-2 ring-white scale-110'
                                                : 'opacity-50 hover:opacity-100'
                                                }`}
                                        >
                                            <Image
                                                src={img.img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                <p className="text-white text-sm font-medium">
                                    {selectedImage + 1} / {galleryItems.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
