'use client';

/**
 * Scene 4 — Chapter II: Day Escapes (excursions).
 * Techniques: horizontal scroll conversion (vertical scroll drives a pinned
 * sideways gallery on desktop), scroll progress bar, live card counter,
 * dark cinema-room chapter for contrast against the cream page.
 * Mobile fallback: native swipe with scroll-snap — no pinning on touch.
 */

import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Clock, MapPin, MoveRight } from 'lucide-react';
import ChapterIntro from './ChapterIntro';
import { getExploreCopy, locationName, type ExploreItem } from '../content';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface EscapesChapterProps {
    locale: string;
    excursions: ExploreItem[];
}

export default function EscapesChapter({ locale, excursions }: EscapesChapterProps) {
    const copy = getExploreCopy(locale).escapes;
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    const total = excursions.length;
    const pad = (n: number) => String(n).padStart(2, '0');

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add(
                '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
                () => {
                    const track = trackRef.current;
                    const section = sectionRef.current;
                    if (!track || !section) return;

                    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

                    gsap.to(track, {
                        x: () => -distance(),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top top',
                            end: () => `+=${distance()}`,
                            pin: true,
                            scrub: 1,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => {
                                if (progressRef.current) {
                                    gsap.set(progressRef.current, { scaleX: self.progress });
                                }
                                if (counterRef.current) {
                                    const idx = Math.min(total, Math.round(self.progress * (total - 1)) + 1);
                                    counterRef.current.textContent = pad(idx);
                                }
                            },
                        },
                    });
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [total]);

    return (
        <section
            id="escapes"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#1a120c] py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
            data-scene="escapes"
        >
            {/* depth-1 — warm atmosphere in the dark room */}
            <div className="pointer-events-none absolute inset-0" data-depth="1" aria-hidden="true">
                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#912b2b]/20 blur-3xl" />
                <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            </div>
            <div className="xg-grain" aria-hidden="true" />

            <div className="container-custom relative">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <ChapterIntro
                        numeral={copy.numeral}
                        label={copy.label}
                        title={copy.title}
                        blurb={copy.blurb}
                        dark
                    />
                    {/* live counter — updates as the road unrolls */}
                    <p
                        className="hidden shrink-0 items-baseline gap-1 font-serif text-[#f8f6f2]/80 lg:flex"
                        aria-hidden="true"
                    >
                        <span ref={counterRef} className="text-5xl font-black text-[#D4AF37]">
                            01
                        </span>
                        <span className="text-lg font-bold text-[#f8f6f2]/40">
                            / {pad(total)}
                        </span>
                    </p>
                </div>

                <p className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/80">
                    <MoveRight className="h-4 w-4 animate-pulse" aria-hidden="true" />
                    {copy.dragHint}
                </p>
            </div>

            {/* The road — horizontal track */}
            <div className="relative mt-10 lg:overflow-hidden">
                <div
                    ref={trackRef}
                    className="xg-track flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 md:gap-7 md:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:pl-[max(1rem,calc((100vw-1280px)/2))] lg:pr-24"
                >
                    {excursions.map((exc, i) => {
                        const firstLocation = exc.locations?.length
                            ? locationName(exc.locations[0])
                            : 'Morocco';
                        return (
                            <Link
                                key={exc.id}
                                href={`/${locale}/experiences/${exc.id}`}
                                className="group relative h-[480px] w-[80vw] max-w-[400px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 sm:w-[400px] md:h-[540px]"
                                data-depth="3"
                            >
                                <Image
                                    src={exc.image.url}
                                    alt={exc.image.alt || exc.title}
                                    fill
                                    sizes="(max-width: 640px) 80vw, 400px"
                                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90"
                                    aria-hidden="true"
                                />

                                {/* top row: index + duration */}
                                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                                    <span
                                        className="font-serif text-5xl font-black text-white/30 transition-colors duration-500 group-hover:text-[#D4AF37]/70"
                                        aria-hidden="true"
                                    >
                                        {pad(i + 1)}
                                    </span>
                                    {exc.duration && (
                                        <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                                            <Clock className="h-3 w-3 text-[#D4AF37]" aria-hidden="true" />
                                            {exc.duration}
                                        </span>
                                    )}
                                </div>

                                {/* bottom content */}
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#F3E5AB]/80">
                                        <MapPin className="h-3 w-3" aria-hidden="true" />
                                        {firstLocation}
                                    </p>
                                    <h3 className="font-serif text-2xl font-black leading-tight text-white">
                                        {exc.title}
                                    </h3>
                                    <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                                        {exc.price && (
                                            <p className="font-serif text-lg font-black text-white">
                                                <span className="mr-1.5 align-middle text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
                                                    {copy.fromLabel}
                                                </span>
                                                {exc.price}
                                            </p>
                                        )}
                                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] opacity-0 transition-all duration-500 group-hover:opacity-100">
                                            {copy.cta}
                                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* progress bar (desktop) */}
            <div className="container-custom relative mt-10 hidden lg:block" aria-hidden="true">
                <div className="h-px w-full bg-white/15">
                    <div
                        ref={progressRef}
                        className="h-full origin-left bg-[#D4AF37]"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div>
            </div>
        </section>
    );
}
