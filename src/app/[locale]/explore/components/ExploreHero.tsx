'use client';

/**
 * Hero — full-bleed photograph, heavy scrim, a short gold rule, then the
 * two-tone display title left-aligned in the lower third. The background
 * drifts slower than the page on scroll; the copy lifts away faster.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { getExploreCopy } from '../content';
import TwoTone from '@/components/TwoTone';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ExploreHero({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale).hero;
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.to('[data-hero-bg]', {
                    yPercent: 12,
                    scale: 1.14,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
                gsap.to('[data-hero-copy]', {
                    yPercent: -18,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '80% top',
                        scrub: true,
                    },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const rise = {
        hidden: { y: '110%' },
        visible: { y: '0%', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } },
    };

    return (
        <section
            ref={sectionRef}
            // full screen, less the 2rem SubHeader bar above it, so the hero
            // fills the viewport exactly instead of reading as a banner
            className="relative flex min-h-[calc(100svh-2rem)] flex-col justify-end overflow-hidden bg-[#171009]"
            data-scene="hero"
        >
            {/* depth-0 — photograph */}
            <div className="absolute inset-0" data-hero-bg aria-hidden="true">
                <Image
                    src="/images/merzouga/merzouga1.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="scale-105 object-cover object-center"
                />
            </div>

            {/* depth-1 — scrim: dark from the left so the copy always holds */}
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45" />
            </div>
            <div className="xg-grain" aria-hidden="true" />

            {/* depth-4 — copy */}
            <div className="container-custom relative pb-24 pt-40 md:pb-28" data-hero-copy>
                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '4rem', opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                    className="mb-8 block h-[2px] bg-secondary"
                    aria-hidden="true"
                />

                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="mb-6 text-[10px] uppercase tracking-[0.35em] text-secondary-light/90 md:text-[11px]"
                >
                    {copy.eyebrow}
                </motion.p>

                <motion.div initial="hidden" animate="visible" className="overflow-hidden py-[0.06em]">
                    <motion.div variants={rise}>
                        <TwoTone
                            as="h1"
                            lead={copy.titleLead}
                            accent={copy.titleAccent}
                            className="text-[clamp(2.8rem,9vw,7rem)] leading-[0.92]"
                            leadClassName="text-white"
                            accentClassName="text-secondary"
                        />
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.75 }}
                    className="mt-7 max-w-xl text-sm leading-relaxed text-white/75 md:text-base"
                >
                    {copy.sub}
                </motion.p>
            </div>

            {/* scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-6 right-6 hidden items-center gap-3 md:flex"
                aria-hidden="true"
            >
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/45">{copy.scrollCue}</span>
                <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/35 p-1.5">
                    <span className="xg-cue-dot h-1.5 w-1.5 rounded-full bg-secondary" />
                </span>
            </motion.div>
        </section>
    );
}
