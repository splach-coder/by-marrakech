'use client';

/**
 * Finale — the closing call, on our deep-red ground rather than a photograph
 * so the page ends on brand colour instead of a fifth landscape. Huge stacked
 * two-tone heading, one filled button, one outlined, then the quiet links out.
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/data/transferData';
import WhatsAppIcon, { WA_BUTTON_GLOW } from '@/components/WhatsAppIcon';
import { getExploreCopy } from '../content';
import TwoTone from '@/components/TwoTone';

export default function FinaleCTA({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale).finale;

    return (
        <section className="relative overflow-hidden bg-primary py-24 text-white md:py-32">
            {/* faint gold wash so the flat red has some depth */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-black/25 blur-3xl" />
            </div>
            <div className="xg-grain" aria-hidden="true" />

            <div className="container-custom relative text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="overflow-hidden py-[0.08em]"
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
                            stacked
                            className="mx-auto max-w-4xl text-[clamp(2.1rem,6vw,4.6rem)] leading-[1]"
                            leadClassName="text-white"
                            accentClassName="text-secondary-light"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.25 }}
                    className="mt-11 flex flex-wrap items-center justify-center gap-4"
                >
                    <Link
                        href={`/${locale}/book`}
                        className="group inline-flex items-center gap-2.5 bg-secondary px-9 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a120c] transition-all duration-300 hover:gap-4 hover:bg-secondary-light"
                    >
                        {copy.primaryCta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {/* labelled WhatsApp, so it opens WhatsApp — it used to point at /contact */}
                    <a
                        href={whatsappLink(copy.waIntro)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2.5 px-9 py-4 text-[10px] font-black uppercase tracking-[0.2em] ${WA_BUTTON_GLOW}`}
                    >
                        <WhatsAppIcon className="h-4 w-4" />
                        {copy.secondaryCta}
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.45 }}
                    className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                >
                    <span>{copy.browseLabel}</span>
                    {copy.browseLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={`/${locale}${link.href}`}
                            className="underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary-light"
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
