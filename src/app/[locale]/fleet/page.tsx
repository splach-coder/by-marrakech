'use client';

/**
 * /fleet — the vehicle collection, laid out as an editorial catalogue.
 *
 *   1  Hero             full-bleed photograph + two-tone display title
 *   2  Trust strip      three condition marks on a cream hairline strip
 *   3  The collection   three-up grid: photograph, class, model, pax + price
 *   4  Band             full-bleed "comfort is the baseline" breath
 *   5  Included         four marks that apply to every vehicle
 *   6  At a glance      the whole fleet as one comparison table
 *   7  Not sure?        one WhatsApp CTA
 *
 * Cards are deliberately light — a photograph and three lines — because the
 * fleet is eight vehicles and several share a model. Descriptions and feature
 * lists used to sit on every card, which made the page enormous and buried the
 * comparison table; those details now live in the table instead. Each card is
 * itself a WhatsApp link, with the booking bar sliding up on hover.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { use } from 'react';
import {
    ArrowUpRight,
    Briefcase,
    Droplet,
    ShieldCheck,
    Snowflake,
    Sparkles,
    UserRound,
    Users,
    Wifi,
} from 'lucide-react';
import WhatsAppIcon, { WA_BUTTON } from '@/components/WhatsAppIcon';
import { getFleet, whatsappLink } from '@/data/transferData';
import TwoTone from '@/components/TwoTone';
import CTASection from '../components/CTASection';

interface FleetPageProps {
    params: Promise<{ locale: string }>;
}

const ICONS = {
    sparkles: Sparkles,
    shield: ShieldCheck,
    snowflake: Snowflake,
    driver: UserRound,
    water: Droplet,
    wifi: Wifi,
} as const;

interface Mark {
    icon: string;
    label: string;
}

const COL = 'px-6 py-4 text-[10px] font-black uppercase tracking-[0.16em] text-text-secondary';

export default function FleetPage({ params }: FleetPageProps) {
    const { locale } = use(params);
    const t = useTranslations('fleetPage');
    const fleet = getFleet(locale);

    const trust = t.raw('trust') as Mark[];
    const included = t.raw('included') as Mark[];

    const bookLink = (name: string, price: number) =>
        whatsappLink(`${t('waIntro')} ${name} (${t('colPrice')} €${price})`);

    return (
        <main className="min-h-screen bg-background">
            {/* ---------- 1. hero ---------- */}
            <section className="relative flex min-h-[calc(100svh-2rem)] flex-col justify-end overflow-hidden bg-[#171009]">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src="/images/heroes/fleet-hero.webp"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="scale-105 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45" />
                </div>
                <div className="xg-grain" aria-hidden="true" />

                <div className="container-custom relative pb-16 pt-40 md:pb-20">
                    <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '4rem', opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="mb-7 block h-[2px] bg-secondary"
                        aria-hidden="true"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="mb-5 text-[10px] uppercase tracking-[0.35em] text-secondary-light/90 md:text-[11px]"
                    >
                        {t('kicker')}
                    </motion.p>

                    <motion.div initial="hidden" animate="visible" className="overflow-hidden py-[0.06em]">
                        <motion.div
                            variants={{
                                hidden: { y: '110%' },
                                visible: { y: '0%', transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <TwoTone
                                as="h1"
                                lead={t('heroLead')}
                                accent={t('heroAccent')}
                                className="text-[clamp(2.4rem,7vw,5.4rem)] leading-[0.95]"
                                leadClassName="text-white"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                        className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base"
                    >
                        {t('heroSubtitle')}
                    </motion.p>
                </div>
            </section>

            {/* ---------- 2. trust strip ---------- */}
            <div className="border-b border-border bg-background-cream">
                <div className="container-custom">
                    <ul className="grid grid-cols-1 divide-border sm:grid-cols-3 sm:divide-x">
                        {trust.map((mark) => {
                            const Icon = ICONS[mark.icon as keyof typeof ICONS] ?? ShieldCheck;
                            return (
                                <li
                                    key={mark.label}
                                    className="flex items-center justify-center gap-2.5 px-3 py-5 md:py-6"
                                >
                                    <Icon
                                        className="h-4 w-4 shrink-0 text-secondary-dark"
                                        strokeWidth={1.6}
                                        aria-hidden="true"
                                    />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary md:text-[10px]">
                                        {mark.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* ---------- 3. the collection ---------- */}
            <section className="bg-background py-20 md:py-24">
                <div className="container-custom">
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
                                {t('gridLabel')}
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
                                        lead={t('gridLead')}
                                        accent={t('gridAccent')}
                                        className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02]"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-4 block shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-text-tertiary/70 md:mt-0"
                        >
                            {t('countLabel', { count: fleet.length })}
                        </motion.span>
                    </div>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {fleet.map((vehicle) => (
                            <motion.li
                                key={vehicle.id}
                                variants={{
                                    hidden: { opacity: 0, y: 36 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <a
                                    href={bookLink(vehicle.name, vehicle.fromPrice)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block border border-border bg-white transition-colors duration-500 hover:border-border-dark"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-background-cream">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
                                        />
                                        {/* booking bar rises out of the photo's bottom edge */}
                                        <span
                                            className={`absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 px-4 py-3 text-[9px] font-black uppercase tracking-[0.18em] transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 ${WA_BUTTON}`}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <WhatsAppIcon className="h-3.5 w-3.5" />
                                                {t('bookVehicle')}
                                            </span>
                                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </span>
                                    </div>

                                    <div className="px-5 py-5">
                                        <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-secondary-dark">
                                            {vehicle.category}
                                        </span>
                                        <h3 className="mt-2 font-serif text-lg font-black uppercase leading-tight tracking-tight text-text-primary transition-colors group-hover:text-primary md:text-xl">
                                            {vehicle.name}
                                        </h3>

                                        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border-light pt-4">
                                            <span className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-text-tertiary">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Users className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                                    {t('paxUpTo', { count: vehicle.pax })}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Briefcase className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                                    {vehicle.luggage}
                                                </span>
                                            </span>
                                            <span className="font-serif text-xl font-black leading-none text-primary">
                                                €{vehicle.fromPrice}
                                                <span className="align-top text-[10px] text-secondary-dark">+</span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* ---------- 4. band ---------- */}
            <section className="relative overflow-hidden py-24 md:py-28">
                <div className="absolute inset-0" aria-hidden="true">
                    <Image
                        src="/images/fleet/ford-tourneo-custom.webp"
                        alt=""
                        fill
                        sizes="100vw"
                        className="scale-110 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />
                </div>
                <div className="xg-grain" aria-hidden="true" />

                <div className="container-custom relative text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="overflow-hidden py-[0.06em]"
                    >
                        <motion.div
                            variants={{
                                hidden: { y: '105%' },
                                visible: { y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <TwoTone
                                lead={t('bandLead')}
                                accent={t('bandAccent')}
                                stacked
                                className="mx-auto max-w-4xl text-[clamp(1.8rem,4.6vw,3.4rem)] leading-[1.06]"
                                leadClassName="text-white"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ---------- 5. included in every vehicle ---------- */}
            <div className="border-b border-border bg-background-cream">
                <div className="container-custom py-10 md:py-12">
                    <p className="mb-7 text-center text-[9px] font-black uppercase tracking-[0.28em] text-secondary-dark md:text-[10px]">
                        {t('includedLabel')}
                    </p>
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
                        className="grid grid-cols-2 gap-y-7 md:grid-cols-4"
                    >
                        {included.map((mark) => {
                            const Icon = ICONS[mark.icon as keyof typeof ICONS] ?? ShieldCheck;
                            return (
                                <motion.li
                                    key={mark.label}
                                    variants={{
                                        hidden: { opacity: 0, y: 14 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                                    }}
                                    className="flex flex-col items-center gap-2.5 px-3 text-center"
                                >
                                    <Icon
                                        className="h-5 w-5 text-secondary-dark"
                                        strokeWidth={1.5}
                                        aria-hidden="true"
                                    />
                                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-text-secondary md:text-[10px]">
                                        {mark.label}
                                    </span>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
            </div>

            {/* ---------- 6. at a glance ---------- */}
            <section className="bg-background py-20 md:py-24">
                <div className="container-custom">
                    <div className="mb-10 md:mb-12">
                        <p className="mb-4 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.28em] text-secondary-dark md:text-[10px]">
                            <span className="inline-block h-px w-8 bg-secondary" aria-hidden="true" />
                            {t('glanceLabel')}
                        </p>
                        <TwoTone
                            lead={t('glanceLead')}
                            accent={t('glanceAccent')}
                            className="text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className="overflow-x-auto border border-border bg-white"
                    >
                        <table className="w-full min-w-[680px] text-left">
                            <thead>
                                <tr className="border-b border-border bg-background-cream">
                                    <th className={COL}>{t('colVehicle')}</th>
                                    <th className={COL}>{t('colCategory')}</th>
                                    <th className={COL}>{t('colPax')}</th>
                                    <th className={COL}>{t('colLuggage')}</th>
                                    <th className={`${COL} text-right`}>{t('colPrice')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fleet.map((vehicle) => (
                                    <tr
                                        key={vehicle.id}
                                        className="border-b border-border-light transition-colors last:border-0 hover:bg-background"
                                    >
                                        <td className="px-6 py-4 font-serif text-sm font-black text-text-primary">
                                            {vehicle.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="border border-border bg-background px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-text-secondary">
                                                {vehicle.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">{vehicle.pax}</td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">{vehicle.luggage}</td>
                                        <td className="px-6 py-4 text-right font-serif text-base font-black text-primary">
                                            €{vehicle.fromPrice}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* ---------- 7. not sure which vehicle? ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.12 }}
                        className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-white p-8 md:flex-row md:items-center md:p-10"
                    >
                        <div>
                            <h3 className="font-serif text-xl font-black text-text-primary md:text-2xl">
                                {t('notSureTitle')}
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-tertiary md:text-base">
                                {t('notSureText')}
                            </p>
                        </div>
                        <a
                            href={whatsappLink(t('notSureTitle'))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex shrink-0 items-center gap-2.5 px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#25D366]/25 ${WA_BUTTON}`}
                        >
                            <WhatsAppIcon className="h-4 w-4" />
                            {t('notSureCta')}
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* CTA — Google Reviews follows via layout */}
            <CTASection />
        </main>
    );
}
