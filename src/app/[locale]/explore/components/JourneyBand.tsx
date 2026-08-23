'use client';

/**
 * Interstitial band — a full-bleed photographic breath between the
 * collections and the process steps. Centred two-tone heading, one paragraph,
 * one CTA. The photograph parallaxes; nothing else moves.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { getExploreCopy } from '../content';
import TwoTone from '@/components/TwoTone';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function JourneyBand({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale).band;
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo(
                    '[data-band-bg]',
                    { yPercent: -10 },
                    {
                        yPercent: 10,
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
        <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32" data-scene="band">
            <div className="absolute inset-0" data-band-bg aria-hidden="true">
                <Image
                    src="/images/services/luxury_driver_service.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="scale-115 object-cover object-center"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" aria-hidden="true" />
            <div className="xg-grain" aria-hidden="true" />

            <div className="container-custom relative text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="overflow-hidden py-[0.06em]"
                >
                    <motion.div
                        variants={{
                            hidden: { y: '105%' },
                            visible: { y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
                        }}
                    >
                        <TwoTone
                            lead={copy.headLead}
                            accent={copy.headAccent}
                            className="mx-auto max-w-4xl text-[clamp(2rem,5vw,3.8rem)] leading-[1.04]"
                            leadClassName="text-white"
                        />
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.2 }}
                    className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base"
                >
                    {copy.copy}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.35 }}
                    className="mt-9"
                >
                    <Link
                        href={`/${locale}/book`}
                        className="group inline-flex items-center gap-2.5 border border-white/40 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:gap-4 hover:border-secondary hover:text-secondary"
                    >
                        {copy.cta}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
