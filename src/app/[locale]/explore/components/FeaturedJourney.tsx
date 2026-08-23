'use client';

/**
 * Featured journey — the split hero card: photograph on one half, a cream
 * panel on the other. Gold tag on the image, gold kicker, two-tone title,
 * description, one meta row, then price and CTA on the same baseline.
 *
 * On desktop the panel overlaps the photo slightly so the card reads as one
 * object rather than two tiles butted together.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import {
    COLLECTION_ROUTE,
    cleanTitle,
    getExploreCopy,
    locationName,
    priceLabel,
    splitTitle,
    tidyDuration,
    type CollectionId,
    type ExploreItem,
} from '../content';
import TwoTone from '@/components/TwoTone';

interface FeaturedJourneyProps {
    locale: string;
    item: ExploreItem;
    collection: CollectionId;
}

export default function FeaturedJourney({ locale, item, collection }: FeaturedJourneyProps) {
    const copy = getExploreCopy(locale).featured;
    const [lead, accent] = splitTitle(item.title);
    const href = `/${locale}/${COLLECTION_ROUTE[collection]}/${item.id}`;
    const region = item.locations?.length ? locationName(item.locations[0]) : null;

    return (
        <section className="bg-background py-16 md:py-24">
            <div className="container-custom">
                <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="grid items-stretch lg:grid-cols-[1.05fr_1fr]"
                >
                    {/* photograph */}
                    <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[520px]">
                        <Image
                            src={item.banner_image?.url || item.image.url}
                            alt={item.image.alt || cleanTitle(item.title)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover"
                            priority
                        />
                        <span
                            className="absolute left-0 top-6 bg-secondary px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#1a120c]"
                        >
                            {copy.tag}
                        </span>
                    </div>

                    {/* panel */}
                    <div className="relative flex flex-col justify-center border border-border bg-white px-7 py-10 md:px-12 md:py-14 lg:-ml-12 lg:my-10 lg:border-l-0">
                        <p className="mb-5 text-[9px] font-black uppercase tracking-[0.3em] text-secondary-dark">
                            {copy.kicker}
                        </p>

                        <TwoTone
                            as="h2"
                            lead={lead}
                            accent={accent}
                            className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.04]"
                        />

                        <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-tertiary md:text-base">
                            {item.description}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] font-black uppercase tracking-[0.18em] text-text-secondary">
                            {item.duration && (
                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {tidyDuration(item.duration)}
                                </span>
                            )}
                            {region && (
                                <span className="inline-flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {region}
                                </span>
                            )}
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border-light pt-7">
                            {item.price && (
                                <p className="leading-none">
                                    <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-text-tertiary">
                                        {copy.fromLabel}
                                    </span>
                                    <span className="font-serif text-3xl font-black text-primary md:text-4xl">
                                        {priceLabel(item.price)}
                                    </span>
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={href}
                                    className="group inline-flex items-center gap-2.5 bg-primary px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:gap-4 hover:bg-primary-dark"
                                >
                                    {copy.cta}
                                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Link>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="inline-flex items-center border border-border-dark px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary transition-colors duration-300 hover:border-primary hover:text-primary"
                                >
                                    {copy.secondaryCta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    );
}
