'use client';

/**
 * One collection: left-aligned kicker + two-tone heading + blurb, then a
 * three-up grid of tall photographs with the price chipped onto the image and
 * a two-tone title beneath it. No card chrome — the photograph is the card.
 *
 * The four collections on this page all use this component, so Journeys,
 * Escapes, Moments and Services read as one catalogue in four chapters rather
 * than four differently-styled pages stapled together.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
    COLLECTION_ROUTE,
    cleanTitle,
    getExploreCopy,
    metaLine,
    priceLabel,
    splitTitle,
    type CollectionId,
    type ExploreItem,
} from '../content';
import TwoTone from '@/components/TwoTone';

interface CollectionSectionProps {
    locale: string;
    id: CollectionId;
    items: ExploreItem[];
    /** Cream sections alternate with paper ones to give the page a rhythm */
    tone?: 'paper' | 'cream';
    /** Index offset so the running item numerals continue across collections */
    numberFrom?: number;
}

export default function CollectionSection({
    locale,
    id,
    items,
    tone = 'paper',
    numberFrom = 1,
}: CollectionSectionProps) {
    const copy = getExploreCopy(locale);
    const section = copy.collections[id];
    const route = COLLECTION_ROUTE[id];

    if (!items.length) return null;

    return (
        <section
            id={id}
            className={`scroll-mt-32 py-20 md:py-28 ${tone === 'cream' ? 'bg-background-cream' : 'bg-background'}`}
            data-collection={id}
        >
            <div className="container-custom">
                {/* section header */}
                <div className="mb-12 md:mb-16 md:flex md:items-end md:justify-between md:gap-12">
                    <div className="max-w-2xl">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7 }}
                            className="mb-4 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.28em] text-secondary-dark md:text-[10px]"
                        >
                            <span className="inline-block h-px w-8 bg-secondary" aria-hidden="true" />
                            {section.kicker}
                        </motion.p>

                        {/* the observer sits on the unclipped wrapper — the masked
                            child is fully hidden at rest and would never trigger */}
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
                                    lead={section.headLead}
                                    accent={section.headAccent}
                                    className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02]"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-5 text-sm leading-relaxed text-text-tertiary md:text-base"
                        >
                            {section.blurb}
                        </motion.p>
                    </div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-6 hidden shrink-0 font-serif text-sm font-black tabular-nums text-text-tertiary/40 md:mt-0 md:block"
                        aria-hidden="true"
                    >
                        {String(items.length).padStart(2, '0')} —
                    </motion.span>
                </div>

                {/* the grid */}
                <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                    className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {items.map((item, i) => {
                        const [lead, accent] = splitTitle(item.title);
                        const meta = metaLine(item);
                        return (
                            <motion.li
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 44 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <Link prefetch={false} href={`/${locale}/${route}/${item.id}`} className="group block">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-background-cream">
                                        <Image
                                            src={item.image.url}
                                            alt={item.image.alt || cleanTitle(item.title)}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
                                        />
                                        {/* the photograph darkens just enough for the chip to hold */}
                                        <span
                                            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 opacity-70 transition-opacity duration-500 group-hover:opacity-50"
                                            aria-hidden="true"
                                        />

                                        {/* running index — quiet, editorial */}
                                        <span
                                            className="absolute left-4 top-4 font-serif text-[10px] font-black tabular-nums text-white/70"
                                            aria-hidden="true"
                                        >
                                            {String(numberFrom + i).padStart(2, '0')}
                                        </span>

                                        {item.price && (
                                            <span className="absolute right-4 top-4 bg-background/95 px-3 py-1.5 font-serif text-xs font-black text-primary transition-colors duration-500 group-hover:bg-secondary group-hover:text-[#1a120c]">
                                                {priceLabel(item.price)}
                                            </span>
                                        )}

                                        {/* CTA slides up out of the bottom edge on hover */}
                                        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-primary px-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                                            {copy.itemCta}
                                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </span>
                                    </div>

                                    <div className="pt-5">
                                        <TwoTone
                                            as="h3"
                                            lead={lead}
                                            accent={accent}
                                            className="text-lg leading-tight md:text-xl"
                                        />
                                        {/* gold rule draws itself under the title on hover */}
                                        <span
                                            className="mt-3 block h-px w-8 origin-left scale-x-100 bg-secondary transition-transform duration-500 group-hover:scale-x-[3]"
                                            aria-hidden="true"
                                        />
                                        {meta && (
                                            <p className="mt-3 text-[9px] font-black uppercase leading-relaxed tracking-[0.18em] text-text-tertiary/80">
                                                {meta}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}
