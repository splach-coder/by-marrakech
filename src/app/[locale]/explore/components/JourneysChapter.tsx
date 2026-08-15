'use client';

/**
 * Scene 3 — Chapter I: Grand Journeys (multi-day tours).
 * Techniques: alternating editorial rows, directional clip-path wipe reveals,
 * inner image parallax (image drifts inside its mask), outlined watermark,
 * animated route line, itinerary mini-timeline.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Clock, MoveRight } from 'lucide-react';
import ChapterIntro from './ChapterIntro';
import { getExploreCopy, locationName, type ExploreItem } from '../content';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface JourneysChapterProps {
    locale: string;
    tours: ExploreItem[];
}

export default function JourneysChapter({ locale, tours }: JourneysChapterProps) {
    const copy = getExploreCopy(locale).journeys;
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.utils.toArray<HTMLElement>('[data-journey-img]').forEach((mask, i) => {
                    // Directional wipe: odd rows open from the right, even from the left
                    const fromClip = i % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
                    gsap.fromTo(
                        mask,
                        { clipPath: fromClip },
                        {
                            clipPath: 'inset(0 0% 0 0%)',
                            duration: 1.3,
                            ease: 'power3.out',
                            scrollTrigger: { trigger: mask, start: 'top 78%' },
                        }
                    );
                    // The photo drifts inside its mask while the row crosses the viewport
                    const img = mask.querySelector('[data-journey-photo]');
                    if (img) {
                        gsap.fromTo(
                            img,
                            { yPercent: -8 },
                            {
                                yPercent: 8,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: mask,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [tours.length]);

    return (
        <section
            id="journeys"
            ref={sectionRef}
            className="relative overflow-hidden bg-background pb-28 pt-8 md:pb-40"
            data-scene="journeys"
        >
            {/* depth-0 — vertical outlined watermark */}
            <span
                className="xg-outline-text pointer-events-none absolute right-2 top-32 hidden select-none font-serif text-[10rem] font-black leading-none [writing-mode:vertical-rl] xl:block"
                aria-hidden="true"
                data-depth="0"
            >
                {copy.watermark}
            </span>

            <div className="container-custom relative">
                <ChapterIntro
                    numeral={copy.numeral}
                    label={copy.label}
                    title={copy.title}
                    blurb={copy.blurb}
                />

                <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
                    {tours.map((tour, i) => {
                        const reversed = i % 2 === 1;
                        const route = (tour.locations ?? []).map(locationName);
                        const days = (tour.itinerary ?? []).slice(0, 4);

                        return (
                            <article
                                key={tour.id}
                                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                                    reversed ? '' : ''
                                }`}
                            >
                                {/* Image — depth-3, clip-path birth */}
                                <div
                                    className={`relative lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}
                                    data-depth="3"
                                >
                                    <div
                                        data-journey-img
                                        className="xg-clip-img relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-[#912b2b]/10 md:aspect-[16/10]"
                                    >
                                        <Image
                                            data-journey-photo
                                            src={tour.image.url}
                                            alt={tour.image.alt || tour.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 58vw"
                                            className="scale-[1.18] object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                                            aria-hidden="true"
                                        />
                                        {/* duration badge */}
                                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                                            <Clock className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                                            {tour.duration}
                                        </div>
                                        {/* giant index */}
                                        <span
                                            className="absolute bottom-2 right-5 font-serif text-7xl font-black text-white/25 md:text-8xl"
                                            aria-hidden="true"
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Content — depth-4 */}
                                <div
                                    className={`relative lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}
                                    data-depth="4"
                                >
                                    {tour.trip_code && (
                                        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-text-tertiary/70">
                                            {tour.trip_code}
                                        </p>
                                    )}

                                    <motion.h3
                                        initial={{ opacity: 0, y: 26 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.8 }}
                                        className="font-serif text-3xl font-black leading-tight text-text-primary md:text-4xl"
                                    >
                                        {tour.title}
                                    </motion.h3>

                                    {/* animated route line */}
                                    {route.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{ duration: 0.8, delay: 0.15 }}
                                            className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wider text-primary"
                                        >
                                            <span className="text-[10px] tracking-[0.25em] text-text-tertiary/60">
                                                {copy.routeLabel}
                                            </span>
                                            {route.map((name, j) => (
                                                <span key={name} className="flex items-center gap-2">
                                                    {j > 0 && (
                                                        <MoveRight
                                                            className="h-3.5 w-3.5 text-[#D4AF37]"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    {name}
                                                </span>
                                            ))}
                                        </motion.div>
                                    )}

                                    <motion.p
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mt-4 text-sm leading-relaxed text-text-secondary line-clamp-3"
                                    >
                                        {tour.description}
                                    </motion.p>

                                    {/* itinerary mini-timeline */}
                                    {days.length > 0 && (
                                        <motion.ol
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: '-60px' }}
                                            variants={{
                                                hidden: {},
                                                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
                                            }}
                                            className="mt-6 space-y-2.5 border-l-2 border-[#D4AF37]/40 pl-5"
                                            aria-label={copy.itineraryLabel}
                                        >
                                            {days.map((d) => (
                                                <motion.li
                                                    key={d.day}
                                                    variants={{
                                                        hidden: { opacity: 0, x: -16 },
                                                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                                                    }}
                                                    className="relative text-xs text-text-tertiary"
                                                >
                                                    <span
                                                        className="absolute -left-[1.6rem] top-1 h-2 w-2 rounded-full bg-[#D4AF37]"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="font-bold uppercase tracking-wider text-primary">
                                                        {locale === 'fr' ? 'Jour' : 'Day'} {d.day}
                                                    </span>
                                                    <span className="mx-2 text-border-dark">—</span>
                                                    {d.title}
                                                </motion.li>
                                            ))}
                                        </motion.ol>
                                    )}

                                    {/* price + CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.7, delay: 0.4 }}
                                        className="mt-8 flex flex-wrap items-center gap-6"
                                    >
                                        {tour.price && (
                                            <p className="font-serif text-2xl font-black text-text-primary">
                                                <span className="mr-1.5 align-middle text-[10px] font-medium uppercase tracking-[0.2em] text-text-tertiary/70">
                                                    {copy.fromLabel}
                                                </span>
                                                {tour.price}
                                            </p>
                                        )}
                                        <Link
                                            href={`/${locale}/tours/${tour.id}`}
                                            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:gap-3.5 hover:bg-primary-dark"
                                        >
                                            {copy.cta}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
