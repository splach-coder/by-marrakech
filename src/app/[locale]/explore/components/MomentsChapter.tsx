'use client';

/**
 * Scene 5 — Chapter III: Signature Moments (activities).
 * Technique: expanding panel gallery — five full-height photographic panels
 * share one row; the hovered/tapped panel breathes open (flex-grow morph)
 * while its siblings compress into vertical film-strip slivers.
 * Mobile fallback: full-info stacked cards, no accordion.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import ChapterIntro from './ChapterIntro';
import { getExploreCopy, type ExploreItem } from '../content';

interface MomentsChapterProps {
    locale: string;
    activities: ExploreItem[];
}

// "Cooking Class Activity In Morocco" → "Cooking Class"
const shortTitle = (title: string) =>
    title
        .replace(/\s+Activity\s+In\s+Morocco\s*$/i, '')
        .replace(/\s+Activité\s+au\s+Maroc\s*$/i, '')
        .replace(/^Activité\s+de\s+/i, '')
        .trim();

export default function MomentsChapter({ locale, activities }: MomentsChapterProps) {
    const copy = getExploreCopy(locale).moments;
    const [active, setActive] = useState(0);

    return (
        <section
            id="moments"
            className="relative overflow-hidden bg-background py-24 md:py-32"
            data-scene="moments"
        >
            <div className="container-custom relative">
                <ChapterIntro
                    numeral={copy.numeral}
                    label={copy.label}
                    title={copy.title}
                    blurb={copy.blurb}
                />

                <p className="mt-6 hidden text-[10px] uppercase tracking-[0.3em] text-text-tertiary/60 md:block">
                    {copy.expandHint}
                </p>

                {/* the film strip */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="mt-10 flex flex-col gap-4 md:h-[68vh] md:min-h-[520px] md:flex-row md:gap-3"
                >
                    {activities.map((act, i) => {
                        const isActive = i === active;
                        const title = shortTitle(act.title);
                        return (
                            <motion.div
                                key={act.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                                className="xg-panel group relative h-72 overflow-hidden rounded-2xl md:h-auto md:basis-0"
                                style={{ flexGrow: isActive ? 4.5 : 1 }}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                                data-depth="3"
                            >
                                <Image
                                    src={act.image.url}
                                    alt={act.image.alt || title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    className={`object-cover transition-transform duration-[1.4s] ease-out ${
                                        isActive ? 'md:scale-105' : 'md:scale-125'
                                    }`}
                                />
                                <div
                                    className={`absolute inset-0 transition-colors duration-700 ${
                                        isActive
                                            ? 'bg-gradient-to-t from-black/80 via-black/15 to-transparent'
                                            : 'bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:bg-black/45 md:bg-none'
                                    }`}
                                    aria-hidden="true"
                                />

                                {/* collapsed state — vertical spine label (desktop only) */}
                                <div
                                    className={`absolute inset-0 hidden items-end justify-center pb-8 transition-opacity duration-500 md:flex ${
                                        isActive ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    aria-hidden={isActive}
                                >
                                    <span className="xg-vertical-label rotate-180 font-serif text-lg font-bold uppercase tracking-[0.2em] text-white/90">
                                        {title}
                                    </span>
                                </div>

                                {/* index chip */}
                                <span
                                    className="absolute left-5 top-5 font-serif text-sm font-black text-[#D4AF37]"
                                    aria-hidden="true"
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* expanded content */}
                                <div
                                    className={`xg-panel-fade absolute inset-x-0 bottom-0 p-6 md:p-8 ${
                                        isActive
                                            ? 'md:translate-y-0 md:opacity-100'
                                            : 'md:pointer-events-none md:translate-y-6 md:opacity-0'
                                    }`}
                                >
                                    <h3 className="font-serif text-2xl font-black leading-tight text-white md:whitespace-nowrap md:text-3xl">
                                        {title}
                                    </h3>
                                    <p className="mt-2 hidden max-w-md text-xs leading-relaxed text-white/70 md:block md:line-clamp-2">
                                        {act.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                                        {act.price && (
                                            <p className="font-serif text-lg font-black text-white">
                                                <span className="mr-1.5 align-middle text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
                                                    {copy.fromLabel}
                                                </span>
                                                {act.price.trim()}
                                            </p>
                                        )}
                                        {act.duration && (
                                            <span className="hidden items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 lg:flex">
                                                <Clock className="h-3 w-3 text-[#D4AF37]" aria-hidden="true" />
                                                <span className="max-w-[200px] truncate">{act.duration}</span>
                                            </span>
                                        )}
                                        <Link
                                            href={`/${locale}/activities/${act.id}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a120c] transition-all duration-300 hover:gap-3 hover:bg-[#F3E5AB]"
                                        >
                                            {copy.cta}
                                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
