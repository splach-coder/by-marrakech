'use client';

/**
 * "However you like to talk" — the apps panel under the three channel cards.
 * A single cream panel with the number stated once, then the app tiles, so the
 * section reads as one object instead of three loose buttons.
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import QuickChannels from '@/components/QuickChannels';
import { PHONE_DISPLAY, PHONE_RAW } from '@/lib/contact';

export default function AppChannels() {
    const t = useTranslations('contactPage.apps');

    return (
        <section className="bg-background-cream pb-14 md:pb-24">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                    className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-white px-5 py-8 text-center shadow-sm md:px-10 md:py-10"
                >
                    {/* gold hairline along the top edge, the house signature */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
                    />

                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                        {t('title')}
                    </p>

                    <a
                        href={`tel:${PHONE_RAW}`}
                        className="mt-3 inline-block font-serif text-2xl font-bold text-text-primary transition-colors hover:text-primary md:text-3xl"
                    >
                        {PHONE_DISPLAY}
                    </a>

                    <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-text-tertiary">
                        {t('note')}
                    </p>

                    <QuickChannels variant="tiles" includeCall className="mt-7" />
                </motion.div>
            </div>
        </section>
    );
}
