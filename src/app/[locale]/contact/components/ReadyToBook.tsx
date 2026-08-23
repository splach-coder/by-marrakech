'use client';

/**
 * Closing panel — a contained photographic block (not full-bleed, so it reads
 * as a card sitting on the page) with the two-tone call, a gold book button and
 * the WhatsApp green beside it.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/data/transferData';
import WhatsAppIcon, { WA_BUTTON_GLOW } from '@/components/WhatsAppIcon';
import TwoTone from '@/components/TwoTone';

export default function ReadyToBook() {
    const locale = useLocale();
    const t = useTranslations('contactPage');

    return (
        <section className="bg-background pb-20 pt-4 md:pb-28">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden px-6 py-20 text-center md:px-12 md:py-24"
                >
                    <div className="absolute inset-0" aria-hidden="true">
                        <Image
                            src="/images/marrakech/marrakech7.webp"
                            alt=""
                            fill
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />
                    </div>
                    <div className="xg-grain" aria-hidden="true" />

                    <div className="relative">
                        <div className="overflow-hidden py-[0.06em]">
                            <TwoTone
                                lead={t('ready.headLead')}
                                accent={t('ready.headAccent')}
                                className="mx-auto max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.04]"
                                leadClassName="text-white"
                            />
                        </div>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                            {t('ready.sub')}
                        </p>

                        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href={`/${locale}/book`}
                                className="group inline-flex items-center gap-2.5 bg-secondary px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a120c] transition-all duration-300 hover:gap-4 hover:bg-secondary-light"
                            >
                                {t('ready.primaryCta')}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href={whatsappLink(t('wa.directIntro'))}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2.5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] ${WA_BUTTON_GLOW}`}
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                                {t('ready.secondaryCta')}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
