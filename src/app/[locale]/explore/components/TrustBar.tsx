'use client';

/**
 * The thin reassurance strip that sits directly under the hero — gold icon,
 * tiny wide-tracked label, hairline separators. Deliberately quiet: it is
 * a floor under the hero, not a section of its own.
 */

import { motion } from 'framer-motion';
import { Car, ShieldCheck, Tag, Users } from 'lucide-react';
import { getExploreCopy } from '../content';

const ICONS = { shield: ShieldCheck, users: Users, car: Car, tag: Tag } as const;

export default function TrustBar({ locale }: { locale: string }) {
    const items = getExploreCopy(locale).trust;

    return (
        <div className="border-b border-border bg-background-cream">
            <div className="container-custom">
                <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
                    className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x"
                >
                    {items.map((item) => {
                        const Icon = ICONS[item.icon as keyof typeof ICONS] ?? ShieldCheck;
                        return (
                            <motion.li
                                key={item.label}
                                variants={{
                                    hidden: { opacity: 0, y: 14 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                                }}
                                className="flex items-center justify-center gap-2.5 px-3 py-5 md:py-6"
                            >
                                <Icon className="h-4 w-4 shrink-0 text-secondary-dark" strokeWidth={1.6} aria-hidden="true" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary md:text-[10px]">
                                    {item.label}
                                </span>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </div>
    );
}
