'use client';

/**
 * Concierge process — four flat cards, each led by an oversized ghost numeral.
 * Centred kicker and two-tone heading above. A hairline connector runs behind
 * the numerals on desktop so the four steps read as one sequence.
 */

import { motion } from 'framer-motion';
import { getExploreCopy } from '../content';
import TwoTone from '@/components/TwoTone';

export default function ConciergeProcess({ locale }: { locale: string }) {
    const copy = getExploreCopy(locale).process;

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container-custom">
                <div className="mb-14 text-center md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-secondary-dark md:text-[10px]"
                    >
                        {copy.kicker}
                    </motion.p>

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
                                lead={copy.headLead}
                                accent={copy.headAccent}
                                className="text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.04]"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative">
                    <motion.ol
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                        className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {copy.steps.map((step) => (
                            <motion.li
                                key={step.n}
                                variants={{
                                    hidden: { opacity: 0, y: 28 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                                }}
                                className="group bg-background-light px-7 py-10 text-center transition-colors duration-500 hover:bg-white"
                            >
                                <span
                                    className="block font-serif text-5xl font-black leading-none text-text-primary/10 transition-colors duration-500 group-hover:text-secondary/45 md:text-6xl"
                                    aria-hidden="true"
                                >
                                    {step.n}
                                </span>
                                <h3 className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-text-primary">
                                    {step.title}
                                </h3>
                                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-text-tertiary">
                                    {step.copy}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
}
