'use client';

/**
 * Four quiet assurances on a hairline strip — the same reassurance beat the
 * catalogue page opens with, closing this one instead.
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Headphones, Lock, ShieldCheck } from 'lucide-react';

const ICONS = { shield: ShieldCheck, clock: Clock, headset: Headphones, lock: Lock } as const;

interface Assurance {
    icon: string;
    label: string;
}

export default function AssurancesStrip() {
    const t = useTranslations('contactPage');
    const items = t.raw('assurances') as Assurance[];

    return (
        <div className="border-y border-border bg-background-cream">
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
