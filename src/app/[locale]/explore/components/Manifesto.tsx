'use client';

/**
 * Scene 2 — Manifesto.
 * Technique: word-by-word scroll lighting — each word starts dim and is
 * "lit up" in reading order as the scrubbed ScrollTrigger progresses.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { getExploreCopy } from '../content';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale);
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.to('.xg-word', {
                    opacity: 1,
                    stagger: 0.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                        end: 'bottom 55%',
                        scrub: 0.6,
                    },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const words = copy.manifesto.split(' ');

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-background py-28 md:py-40"
            data-scene="manifesto"
        >
            {/* depth-0 — faint outlined watermark */}
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                data-depth="0"
                aria-hidden="true"
            >
                <span className="xg-outline-text-gold select-none font-serif text-[26vw] font-black leading-none">
                    ✦
                </span>
            </div>

            {/* depth-4 — the lit sentence */}
            <div className="container-custom relative" data-depth="4">
                <p className="mx-auto max-w-4xl text-center font-serif text-2xl font-bold leading-snug text-text-primary md:text-4xl lg:text-[2.75rem]">
                    {words.map((word, i) => (
                        <span key={`${word}-${i}`} className="xg-word">
                            {word}
                            {i < words.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
