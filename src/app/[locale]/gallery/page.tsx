'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Gallery categories and images
    const categories = ['all', 'tours', 'experiences', 'culture', 'landscapes', 'cities'];

    const galleryImages = [
        { url: '/images/marrakech/marrakech.png', alt: 'Marrakech', category: 'cities' },
        { url: '/images/casablanca/casablanca.png', alt: 'Casablanca', category: 'cities' },
        { url: '/images/fes/Fes.png', alt: 'Fes', category: 'cities' },
        { url: '/images/chefchaouen/chefchaouen.png', alt: 'Chefchaouen', category: 'cities' },
        { url: '/images/merzouga/merzouga1.jpg', alt: 'Sahara Desert', category: 'landscapes' },
        { url: '/images/essaouira/essaouira.png', alt: 'Essaouira', category: 'cities' },
        { url: '/images/rabat/rabat.png', alt: 'Rabat', category: 'cities' },
        { url: '/images/ouarzazate/ouarzazate.png', alt: 'Ouarzazate', category: 'landscapes' },
    ];

    const filteredImages = selectedCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[40vh] bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                <div className="relative h-full flex items-center justify-center text-center">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                                Photo Gallery
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Explore Morocco through our curated collection of stunning photography
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
                <div className="container-custom">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {category === 'all' ? 'All Photos' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container-custom">
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {filteredImages.map((image, idx) => (
                            <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                                onClick={() => setSelectedImage(idx)}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-white text-center">
                                            <p className="font-bold text-lg mb-2">{image.alt}</p>
                                            <span className="text-xs uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                                                {image.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">No images found in this category</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
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
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Action Buttons */}
                        <div className="absolute top-6 left-6 flex gap-3">
                            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Download className="w-5 h-5 text-white" />
                            </button>
                            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Share2 className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1);
                            }}
                            className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0);
                            }}
                            className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-12" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={filteredImages[selectedImage].url}
                                alt={filteredImages[selectedImage].alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Image Info */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                            <p className="text-white text-lg font-semibold mb-2">{filteredImages[selectedImage].alt}</p>
                            <p className="text-white/60 text-sm">
                                {selectedImage + 1} / {filteredImages.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
