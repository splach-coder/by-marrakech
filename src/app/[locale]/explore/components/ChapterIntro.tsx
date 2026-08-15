'use client';

/**
 * Shared chapter header — giant roman numeral, kicker, title, blurb.
 * Technique: offset diagonal layout + masked rise on scroll-into-view.
 */

import { motion } from 'framer-motion';

interface ChapterIntroProps {
    numeral: string;
    label: string;
    title: string;
    blurb: string;
    dark?: boolean;
}

export default function ChapterIntro({ numeral, label, title, blurb, dark = false }: ChapterIntroProps) {
    const titleColor = dark ? 'text-[#f8f6f2]' : 'text-text-primary';
    const blurbColor = dark ? 'text-[#f8f6f2]/65' : 'text-text-tertiary';
    const numeralClass = dark ? 'xg-outline-text-gold' : 'xg-outline-text';

    return (
        <div className="relative">
            {/* depth-0 — oversized outlined numeral behind the heading */}
            <span
                className={`${numeralClass} pointer-events-none absolute -top-[0.35em] left-0 select-none font-serif text-[9rem] font-black leading-none md:-left-4 md:text-[15rem]`}
                aria-hidden="true"
                data-depth="0"
            >
                {numeral}
            </span>

            <div className="relative pt-14 md:pt-24" data-depth="4">
                <motion.p
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]"
                >
                    <span className="inline-block h-px w-10 bg-[#D4AF37]" aria-hidden="true" />
                    {label}
                </motion.p>

                {/* whileInView must live on the UNCLIPPED h2 — the masked span is
                    fully clipped at rest, so an observer on it would never fire */}
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className={`max-w-3xl font-serif font-black leading-[1.02] tracking-tight ${titleColor}`}
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
                            className="block text-[clamp(2rem,5.5vw,4rem)]"
                        >
                            {title}
                        </motion.span>
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${blurbColor}`}
                >
                    {blurb}
                </motion.p>
            </div>
        </div>
    );
}
