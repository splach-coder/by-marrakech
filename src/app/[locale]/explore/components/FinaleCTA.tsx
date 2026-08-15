'use client';

/**
 * Scene 6 — Finale: "Weave them into one itinerary."
 * Techniques: window-pane iris reveal (the section is born from a small
 * rounded pane that expands to full-bleed as you scroll), background
 * parallax, split CTA row.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getExploreCopy } from '../content';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FinaleCTA({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale).finale;
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // Window-pane iris: small rounded pane → full-bleed
                gsap.fromTo(
                    '[data-finale-pane]',
                    { clipPath: 'inset(18% 12% 18% 12% round 32px)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 0px)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            end: 'top 15%',
                            scrub: 1,
                        },
                    }
                );
                // Background drifts slower than the section (depth-0)
                gsap.fromTo(
                    '[data-finale-bg]',
                    { yPercent: -12 },
                    {
                        yPercent: 12,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-background" data-scene="finale">
            <div
                data-finale-pane
                className="relative overflow-hidden py-32 md:py-44"
                style={{ willChange: 'clip-path' }}
            >
                {/* depth-0 — sunset photograph */}
                <div className="absolute inset-0" data-finale-bg data-depth="0" aria-hidden="true">
                    <Image
                        src="/images/Zagoura/raul-mermans-garcia-oWzVpeYyJ-w-unsplash.webp"
                        alt=""
                        fill
                        sizes="100vw"
                        className="scale-125 object-cover object-center"
                    />
                </div>
                {/* depth-1 — dark atmosphere */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
                    data-depth="1"
                    aria-hidden="true"
                />
                <div className="xg-grain" aria-hidden="true" />

                {/* depth-4 — content */}
                <div className="container-custom relative text-center" data-depth="4">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="mb-5 font-serif text-lg font-bold italic text-[#D4AF37] md:text-xl"
                    >
                        {copy.kicker}
                    </motion.p>

                    {/* observer sits on the unclipped h2; the masked child follows via variants */}
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="mx-auto max-w-3xl font-serif font-black leading-[1.02] tracking-tight text-white"
                    >
                        <span className="block overflow-hidden py-[0.06em]">
                            <motion.span
                                variants={{
                                    hidden: { y: '105%' },
                                    visible: {
                                        y: '0%',
                                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                                className="block text-[clamp(2.2rem,6vw,4.5rem)]"
                            >
                                {copy.title}
                            </motion.span>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base"
                    >
                        {copy.copy}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link
                            href={`/${locale}/book`}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-[#D4AF37] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1a120c] transition-all duration-300 hover:gap-4 hover:bg-[#F3E5AB]"
                        >
                            {copy.primaryCta}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            {copy.secondaryCta}
                        </Link>
                    </motion.div>

                    {/* classic index links — keeps the old pages one tap away */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-white/45"
                    >
                        <span>{copy.browseLabel}</span>
                        {copy.browseLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={`/${locale}${l.href}`}
                                className="underline decoration-[#D4AF37]/50 underline-offset-4 transition-colors hover:text-[#D4AF37]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
