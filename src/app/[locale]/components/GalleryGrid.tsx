'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Maximize2, Plus } from 'lucide-react';

interface GalleryProps {
    images: string[];
    title?: string;
    onImageClick?: (index: number) => void;
}

export default function GalleryGrid({ images, title = "Gallery", onImageClick }: GalleryProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Always ensure we have images to work with
    const displayImages = images.length > 0 ? images : [];

    // Limits
    const INITIAL_LIMIT = 5;
    const hasMore = images.length > INITIAL_LIMIT;

    const shownImages = isExpanded ? displayImages : displayImages.slice(0, INITIAL_LIMIT);

    // Custom layout logic for creative grid
    // We'll use CSS grid spanning for a creative default look

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-serif font-light text-gray-900 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-gray-900"></span>
                    {title.toUpperCase()}
                </h2>
                {hasMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-2"
                    >
                        {isExpanded ? 'Show Less' : `View All (${images.length})`}
                    </button>
                )}
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-6 auto-rows-[250px] gap-1"
            >
                <AnimatePresence>
                    {shownImages.map((img, idx) => {
                        // Creative spanning logic
                        // First image large (cols-3, rows-2)
                        // Second, third normal (cols-3)
                        // Fourth, fifth normal

                        let spanClass = "md:col-span-2 md:row-span-1"; // Default

                        if (!isExpanded) {
                            if (idx === 0) spanClass = "md:col-span-3 md:row-span-2";
                            else if (idx === 1) spanClass = "md:col-span-3 md:row-span-1";
                            else if (idx === 2) spanClass = "md:col-span-3 md:row-span-1";
                            else if (idx === 3) spanClass = "md:col-span-3 md:row-span-1";
                            else if (idx === 4) spanClass = "md:col-span-3 md:row-span-1";
                        } else {
                            // Masonry-ish random look based on index
                            const pattern = idx % 6;
                            if (pattern === 0) spanClass = "md:col-span-4 md:row-span-2";
                            else if (pattern === 1) spanClass = "md:col-span-2 md:row-span-1";
                            else if (pattern === 2) spanClass = "md:col-span-2 md:row-span-1";
                            else if (pattern === 3) spanClass = "md:col-span-3 md:row-span-1";
                            else if (pattern === 4) spanClass = "md:col-span-3 md:row-span-1";
                            else spanClass = "md:col-span-6 md:row-span-1"; // Wide strip
                        }

                        // Override for the initial view specifically to match the reference style better if preferred
                        // But CSS grid spanning is powerful. Let's try to match the reference:
                        // Ref: 3 top, 2 bottom wide.
                        if (!isExpanded && idx < 5) {
                            if (idx < 3) spanClass = "md:col-span-2 md:row-span-1"; // Top row 3 images
                            else spanClass = "md:col-span-3 md:row-span-1"; // Bottom row 2 images wide
                        }

                        return (
                            <GalleryItem
                                key={img}
                                src={img}
                                index={idx}
                                spanClass={spanClass}
                                onClick={() => onImageClick?.(idx)}
                            />
                        );
                    })}
                </AnimatePresence>

                {hasMore && !isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="md:col-span-1 md:row-span-1 flex items-center justify-center"
                    >
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="w-full h-full min-h-[100px] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-amber-600 hover:border-amber-300 transition-colors group bg-gray-50/50"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-sm">View {images.length - 5} More</span>
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

function GalleryItem({ src, index, spanClass, onClick }: { src: string, index: number, spanClass: string, onClick?: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`group relative rounded-2xl overflow-hidden shadow-sm cursor-pointer ${spanClass} min-h-[200px]`}
            onClick={onClick}
        >
            <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/50 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                </div>
            </div>

            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                0{index + 1}
            </div>
        </motion.div>
    )
}
