'use client';

/**
 * The five questions travellers ask most, as an accordion. Pulls the same
 * `getFaq` data the homepage FAQ uses so the answers can never diverge — this
 * page just shows the top of the list and links out to the rest.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Plus } from 'lucide-react';
import { getFaq } from '@/data/transferData';
import TwoTone from '@/components/TwoTone';

const SHOWN = 5;

export default function ContactFaq() {
    const locale = useLocale();
    const t = useTranslations('contactPage.faq');
    const faq = getFaq(locale).slice(0, SHOWN);
    const [open, setOpen] = useState<number | null>(0);

    if (!faq.length) return null;

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container-custom">
                <div className="mb-12 text-center md:mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="overflow-hidden py-[0.06em]"
                    >
                        <motion.div
                            variants={{
                                hidden: { y: '105%' },
                                visible: { y: '0%', transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <TwoTone
                                lead={t('headLead')}
                                accent={t('headAccent')}
                                className="text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.04]"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-tertiary md:text-base"
                    >
                        {t('sub')}
                    </motion.p>
                </div>

                <div className="mx-auto max-w-3xl space-y-3">
                    {faq.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <motion.div
                                key={item.question}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className={`border transition-colors duration-300 ${
                                    isOpen ? 'border-secondary bg-white' : 'border-border bg-background-light'
                                }`}
                            >
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="text-[12px] font-black uppercase tracking-[0.1em] text-text-primary md:text-[13px]">
                                        {item.question}
                                    </span>
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                            isOpen ? 'rotate-45 bg-secondary' : 'bg-background-cream'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        <Plus className={`h-4 w-4 ${isOpen ? 'text-[#3b2f2f]' : 'text-text-secondary'}`} />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-6 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href={`/${locale}#faq`}
                        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:gap-3.5"
                    >
                        {t('seeAll')}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
