'use client';

/**
 * Scene 1 — "Choose Your Morocco"
 * Techniques: 6-layer depth stack, masked line reveal (title lines rise out
 * of overflow-hidden wrappers), parallax scroll-out, float loops, film grain,
 * count-up stats, glass chapter chips.
 */

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { getExploreCopy } from '../content';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function CountUp({ to, className }: { to: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduced = useReducedMotion();
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reduced) {
            setVal(to);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const duration = 1400;
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, to, reduced]);

    return (
        <span ref={ref} className={className}>
            {val}
        </span>
    );
}

interface ExploreHeroProps {
    locale: string;
    counts: { journeys: number; escapes: number; moments: number };
    rating: string;
}

export default function ExploreHero({ locale, counts, rating }: ExploreHeroProps) {
    const copy = getExploreCopy(locale);
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // Background pushes away slower than the page (depth-0)
                gsap.to('[data-hero-bg]', {
                    yPercent: 14,
                    scale: 1.18,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
                // Content exits upward faster (depth-4) — cinematic separation
                gsap.to('[data-hero-content]', {
                    yPercent: -20,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '75% top',
                        scrub: true,
                    },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const lineWrap = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
    };
    const line = {
        hidden: { y: '110%' },
        visible: {
            y: '0%',
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    const stats = [
        { value: counts.journeys, label: copy.hero.statLabels.journeys },
        { value: counts.escapes, label: copy.hero.statLabels.escapes },
        { value: counts.moments, label: copy.hero.statLabels.moments },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#171009]"
            data-scene="hero"
        >
            {/* depth-0 — background photograph */}
            <div className="absolute inset-0" data-depth="0" data-hero-bg aria-hidden="true">
                <Image
                    src="/images/merzouga/merzouga1.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="scale-110 object-cover object-center"
                />
            </div>

            {/* depth-1 — atmosphere: vignette + gold dawn glow + cream hand-off to next scene */}
            <div className="absolute inset-0" data-depth="1" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,rgba(212,175,55,0.22),transparent_70%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f8f6f2]" />
            </div>

            {/* depth-2 — drifting light orbs */}
            <div className="absolute inset-0" data-depth="2" aria-hidden="true">
                <div className="xg-drift absolute left-[12%] top-[22%] h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="xg-float absolute right-[10%] top-[55%] h-80 w-80 rounded-full bg-[#912b2b]/25 blur-3xl" />
            </div>

            {/* depth-4 — text content */}
            <div
                className="container-custom relative z-10 pb-28 pt-36 text-center"
                data-depth="4"
                data-hero-content
            >
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="mb-8 text-[11px] uppercase tracking-[0.35em] text-[#F3E5AB]/90 md:text-xs"
                >
                    {copy.hero.eyebrow}
                </motion.p>

                <motion.h1
                    variants={lineWrap}
                    initial="hidden"
                    animate="visible"
                    className="font-serif font-black leading-[0.92] tracking-tight text-white"
                >
                    {copy.hero.titleLines.map((text, i) => (
                        <span key={text} className="block overflow-hidden py-[0.04em]">
                            <motion.span
                                variants={line}
                                className={`block text-[clamp(3.2rem,11vw,8.5rem)] ${
                                    i === copy.hero.goldLine ? 'text-[#D4AF37]' : ''
                                }`}
                            >
                                {text}
                            </motion.span>
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base"
                >
                    {copy.hero.sub}
                </motion.p>

                {/* live stats pulled from the actual catalogue */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.15 }}
                    className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
                >
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <CountUp
                                to={s.value}
                                className="font-serif text-3xl font-black text-white md:text-4xl"
                            />
                            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#F3E5AB]/80">
                                {s.label}
                            </p>
                        </div>
                    ))}
                    <div className="text-center">
                        <span className="inline-flex items-center gap-1.5 font-serif text-3xl font-black text-white md:text-4xl">
                            {rating}
                            <Star className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" aria-hidden="true" />
                        </span>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#F3E5AB]/80">
                            {copy.hero.statLabels.rating}
                        </p>
                    </div>
                </motion.div>

                {/* chapter chips — the page's table of contents */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.35 }}
                    className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                    {copy.hero.chips.map((chip) => (
                        <a
                            key={chip.href}
                            href={chip.href}
                            className="group rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white/15"
                        >
                            <span className="font-serif text-xs font-bold text-[#D4AF37]">
                                {chip.numeral}
                            </span>
                            <span className="mt-0.5 block font-serif text-sm font-bold text-white group-hover:text-[#F3E5AB]">
                                {chip.label}
                            </span>
                            <span className="mt-1 block text-[11px] leading-snug text-white/60">
                                {chip.hint}
                            </span>
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* depth-5 — film grain */}
            <div className="xg-grain z-20" aria-hidden="true" />

            {/* scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
                aria-hidden="true"
            >
                <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1.5">
                    <div className="xg-cue-dot h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/50">
                    {copy.hero.scrollCue}
                </p>
            </motion.div>
        </section>
    );
}
