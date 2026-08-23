'use client';

/**
 * Page header — no photograph, on purpose. The reference contact layout opens
 * straight onto type, which keeps the form above the fold instead of pushing
 * it under a banner. Gold kicker, stacked two-tone title, one line of copy.
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TwoTone from '@/components/TwoTone';

export default function ContactHeader() {
    const t = useTranslations('contactPage');

    return (
        <section className="bg-background pb-4 pt-36 md:pb-8 md:pt-48 lg:pt-56">
            <div className="container-custom">
                <motion.p
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-5 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-secondary-dark md:text-[10px]"
                >
                    <span className="inline-block h-px w-8 bg-secondary" aria-hidden="true" />
                    {t('kicker')}
                </motion.p>

                <motion.div initial="hidden" animate="visible" className="overflow-hidden py-[0.06em]">
                    <motion.div
                        variants={{
                            hidden: { y: '108%' },
                            visible: { y: '0%', transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
                        }}
                    >
                        <TwoTone
                            as="h1"
                            lead={t('titleLead')}
                            accent={t('titleAccent')}
                            stacked
                            className="text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.98]"
                        />
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.55 }}
                    className="mt-7 max-w-xl text-sm leading-relaxed text-text-tertiary md:text-base"
                >
                    {t('sub')}
                </motion.p>
            </div>
        </section>
    );
}
