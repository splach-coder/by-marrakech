'use client';

/**
 * /drivers/[id] — a driver profile built to convert.
 *
 * Identity and bio on the left, a sticky booking panel on the right that puts
 * the WhatsApp button inside the first screenful and keeps it there as you
 * read. On mobile a fixed bottom bar carries the same action, so the way to
 * book is never more than one tap away.
 *
 * This replaces an 850px-tall two-panel card whose booking action sat at the
 * very bottom of the right column — a visitor had to scroll past the entire
 * profile before they could see how to get in touch. The old page was also the
 * last one on the pre-redesign palette (rounded-3xl cards, blue/purple/emerald
 * chips); everything here uses the site's own tokens.
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
    ArrowRight,
    Car,
    Check,
    ChevronRight,
    Globe,
    Home,
    MapPin,
    Shield,
    Star,
    Wifi,
} from 'lucide-react';
import { driversData, driversDataFr, vehicleClassLabel } from '@/data/drivers';
import { getSiteData, siteData } from '@/data/siteData';
import { whatsappLink } from '@/data/transferData';
import { cleanTitle, tidyDuration } from '@/lib/catalogue';
import WhatsAppIcon, { WA_BUTTON } from '@/components/WhatsAppIcon';
import TwoTone from '@/components/TwoTone';

interface DriverPageProps {
    params: Promise<{ id: string; locale: string }>;
}

const CHIP =
    'inline-flex items-center border border-border bg-background px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-text-secondary';
const PANEL_LABEL =
    'flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] text-text-tertiary';

/** Detail route per catalogue group, mirroring /explore's collections. */
const ROUTE_BY_GROUP: Record<string, string> = {
    tours: 'tours',
    escapes: 'experiences',
    moments: 'activities',
};

export default function DriverPage({ params }: DriverPageProps) {
    const { id } = use(params);
    const locale = useLocale();
    const t = useTranslations('common');
    const tDriv = useTranslations('driverDetail');

    const drivers = locale === 'fr' ? driversDataFr : driversData;
    const driver = drivers.find((d) => d.id === id);

    const [bookingMode, setBookingMode] = useState<'custom' | 'tour'>('custom');
    const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<string>(driver?.fleet?.[0]?.name || '');

    const localizedSiteData = getSiteData(locale);

    if (!driver) {
        notFound();
    }

    const firstName = driver.name.split(' ')[0];

    // Everything a visitor can book with him — the whole catalogue, grouped, so
    // the picker is never the reason someone cannot find what they came for.
    const groups = [
        { key: 'tours', label: tDriv('groupTours'), items: localizedSiteData.tours || siteData.tours },
        { key: 'escapes', label: tDriv('groupEscapes'), items: localizedSiteData.excursions || siteData.excursions },
        { key: 'moments', label: tDriv('groupMoments'), items: localizedSiteData.activities || siteData.activities },
    ].map((g) => ({ ...g, items: (g.items as any[]).map((item) => ({ ...item, type: g.key })) }));

    const allBookable = groups.flatMap((g) => g.items);

    // A shorter, curated set for the "Ride with him" rail: trips in the regions
    // he actually drives.
    const allSuggested = allBookable.filter((item) => {
        const hasMatchingLocation =
            item.locations &&
            driver.locations.some((driverLoc: string) =>
                item.locations.some(
                    (itemLoc: any) => (typeof itemLoc === 'string' ? itemLoc : itemLoc.name) === driverLoc
                )
            );
        return driver.preferredTours.includes(item.title) || hasMatchingLocation;
    });

    // six at most, and if that leaves an odd one out it spans the full row
    const suggestedShown = allSuggested.slice(0, 6);
    const oddLast = suggestedShown.length % 2 === 1 ? suggestedShown.length - 1 : -1;

    const selectedItem = allBookable.find((i) => String(i.id) === selectedTourId);
    const bookDisabled = bookingMode === 'tour' && !selectedTourId;

    const bookHref = () =>
        whatsappLink(
            [
                bookingMode === 'custom'
                    ? `Hello Xhosen Gate! I would like to book a custom itinerary with ${driver.name}.`
                    : `Hello Xhosen Gate! I would like to book "${selectedItem?.title ?? ''}" with ${driver.name}.`,
                '',
                `Vehicle: ${selectedVehicle}`,
            ].join('\n')
        );

    return (
        <main className="min-h-screen bg-background pb-24 lg:pb-0">
            {/* breadcrumb — one thin line, not a section of its own */}
            <div className="border-b border-border bg-background-cream pt-28 md:pt-40 lg:pt-48">
                <div className="container-custom py-3">
                    <nav className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary">
                        <Link href={`/${locale}`} className="flex items-center gap-1.5 transition-colors hover:text-primary">
                            <Home className="h-3 w-3" aria-hidden="true" />
                            {t('home')}
                        </Link>
                        <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                        <Link href={`/${locale}/drivers`} className="transition-colors hover:text-primary">
                            {tDriv('backToDrivers')}
                        </Link>
                        <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                        <span className="text-text-primary">{driver.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8 md:py-12">
                <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                    {/* ---------------- left: who he is ---------------- */}
                    <div className="space-y-8">
                        {/* identity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col border border-border bg-white sm:flex-row"
                        >
                            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-background-cream sm:aspect-auto sm:w-56">
                                <Image
                                    src={driver.image}
                                    alt={driver.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 224px"
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            <div className="flex-1 p-6 md:p-8">
                                <p className="mb-3 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.28em] text-secondary-dark">
                                    <span className="inline-block h-px w-6 bg-secondary" aria-hidden="true" />
                                    {tDriv('yourDriver')}
                                </p>

                                <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-none tracking-tight text-text-primary">
                                    {driver.name}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-secondary">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Star className="h-3.5 w-3.5 fill-secondary text-secondary" aria-hidden="true" />
                                        {driver.rating.toFixed(1)}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Shield className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                        {tDriv('verifiedProfessional', { years: driver.experienceYears })}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-start gap-2 text-xs text-text-tertiary">
                                    <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-dark" aria-hidden="true" />
                                    <span className="leading-snug">{driver.languages.join(' · ')}</span>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {driver.specialties.map((s) => (
                                        <span key={s} className={CHIP}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* bio */}
                        <section>
                            <TwoTone
                                as="h2"
                                lead={tDriv('aboutDriver')}
                                accent={firstName}
                                className="text-[clamp(1.3rem,2.4vw,1.8rem)] leading-tight"
                            />
                            <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-[15px]">{driver.bio}</p>
                        </section>

                        {/* regions · comforts · recognition — three tight columns, hairline grid */}
                        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
                            <div className="bg-white p-5">
                                <p className={PANEL_LABEL}>
                                    <MapPin className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {tDriv('regions')}
                                </p>
                                <ul className="mt-3 space-y-1.5">
                                    {driver.locations.map((loc) => (
                                        <li key={loc} className="text-[13px] font-bold text-text-primary">
                                            {loc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-5">
                                <p className={PANEL_LABEL}>
                                    <Wifi className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {tDriv('onboardComforts')}
                                </p>
                                <ul className="mt-3 space-y-1.5">
                                    {(driver.features || []).map((f) => (
                                        <li key={f} className="flex items-start gap-1.5 text-[13px] text-text-secondary">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-secondary-dark" aria-hidden="true" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-5">
                                <p className={PANEL_LABEL}>
                                    <Shield className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {tDriv('badges')}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {driver.badges.map((b) => (
                                        <span key={b} className={CHIP}>
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* what you can do with him */}
                        {allSuggested.length > 0 && (
                            <section>
                                <div className="mb-5 flex items-end justify-between gap-6">
                                    <div>
                                        <TwoTone
                                            as="h2"
                                            lead={tDriv('suggestedTitle')}
                                            accent={tDriv('suggestedAccent')}
                                            className="text-[clamp(1.3rem,2.4vw,1.8rem)] leading-tight"
                                        />
                                        <p className="mt-2 text-sm text-text-tertiary">{tDriv('suggestedSub')}</p>
                                    </div>
                                    <Link
                                        href={`/${locale}/explore`}
                                        className="group hidden shrink-0 items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-all hover:gap-3.5 sm:inline-flex"
                                    >
                                        {tDriv('seeAll')}
                                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                </div>

                                <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
                                    {suggestedShown.map((item, i) => (
                                        <li
                                            key={`${item.type}-${item.id}`}
                                            className={`bg-white ${
                                                oddLast === i ? 'sm:col-span-2' : ''
                                            }`}
                                        >
                                            <Link
                                                href={`/${locale}/${ROUTE_BY_GROUP[item.type]}/${item.id}`}
                                                className="group flex items-center gap-4 p-3 transition-colors hover:bg-background"
                                            >
                                                <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-background-cream">
                                                    <Image
                                                        src={item.image?.url || (item as any).banner_image?.url}
                                                        alt={item.title}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="line-clamp-2 font-serif text-sm font-black leading-tight text-text-primary group-hover:text-primary">
                                                        {cleanTitle(item.title)}
                                                    </h3>
                                                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-text-tertiary">
                                                        {item.duration ? tidyDuration(item.duration) : t('flexible')}
                                                    </p>
                                                </div>
                                                <ChevronRight
                                                    className="h-4 w-4 shrink-0 text-text-tertiary/40 transition-all group-hover:translate-x-1 group-hover:text-primary"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* ---------------- right: book him ---------------- */}
                    <motion.aside
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:sticky lg:top-24"
                    >
                        {/* Bounded so the CTA below can never be pushed off-screen by a
                            long tour list — the middle scrolls instead. The 22rem allows for
                            the panel's own offset down the page at scroll 0, where it has not
                            pinned to the top yet; it scales with the viewport on tall screens. */}
                        <div className="border border-border bg-white lg:flex lg:max-h-[calc(100svh-22rem)] lg:flex-col">
                            {/* panel header — no day rate: every trip is quoted on WhatsApp */}
                            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-light px-6 py-5">
                                <div>
                                    <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-secondary-dark">
                                        {tDriv('startJourney')}
                                    </span>
                                    <span className="mt-1 block font-serif text-xl font-black leading-none text-text-primary">
                                        {driver.name}
                                    </span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-text-primary">
                                    <Star className="h-3.5 w-3.5 fill-secondary text-secondary" aria-hidden="true" />
                                    {driver.rating.toFixed(1)}
                                </span>
                            </div>

                            {/* soft bottom fade so the clipped edge reads as "more below", not broken */}
                            <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:[mask-image:linear-gradient(to_bottom,black_calc(100%-2.5rem),transparent)]">
                            {/* vehicle picker — compact rows with the real photos */}
                            <div className="px-6 py-5">
                                <p className={PANEL_LABEL}>
                                    <Car className="h-3.5 w-3.5 text-secondary-dark" aria-hidden="true" />
                                    {tDriv('pickVehicle')}
                                </p>
                                <div className="mt-3 space-y-2">
                                    {driver.fleet.map((vehicle) => {
                                        const active = selectedVehicle === vehicle.name;
                                        return (
                                            <button
                                                key={vehicle.name}
                                                type="button"
                                                onClick={() => setSelectedVehicle(vehicle.name)}
                                                aria-pressed={active}
                                                className={`flex w-full items-center gap-3 border p-2 text-left transition-colors ${
                                                    active
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-border-dark hover:bg-background'
                                                }`}
                                            >
                                                <div className="relative h-11 w-16 shrink-0 overflow-hidden bg-background-cream">
                                                    <Image
                                                        src={vehicle.image}
                                                        alt={vehicle.name}
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <span
                                                        className={`block truncate text-[11px] font-black uppercase tracking-[0.1em] ${
                                                            active ? 'text-primary' : 'text-text-primary'
                                                        }`}
                                                    >
                                                        {vehicle.name}
                                                    </span>
                                                    <span className="block text-[10px] text-text-tertiary">
                                                        {vehicleClassLabel(vehicle.vehicleClass, locale)} · {vehicle.pax} pax ·{' '}
                                                        {vehicle.luggage} {locale === 'fr' ? 'bagages' : 'bags'}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                                                        active ? 'border-primary bg-primary' : 'border-border-dark'
                                                    }`}
                                                    aria-hidden="true"
                                                >
                                                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* what to book */}
                            <div className="border-t border-border-light px-6 py-5">
                                <div className="flex border border-border">
                                    {(['custom', 'tour'] as const).map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setBookingMode(mode)}
                                            className={`flex-1 px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.14em] transition-colors ${
                                                bookingMode === mode
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white text-text-tertiary hover:text-text-primary'
                                            }`}
                                        >
                                            {mode === 'custom' ? tDriv('customItinerary') : tDriv('bookAgencyTour')}
                                        </button>
                                    ))}
                                </div>

                                {bookingMode === 'custom' ? (
                                    <p className="mt-4 text-[13px] leading-relaxed text-text-tertiary">
                                        {tDriv('totalFlexibilityDesc', { name: firstName })}
                                    </p>
                                ) : (
                                    <>
                                        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-text-tertiary">
                                            {tDriv('availableCount', { count: allBookable.length })}
                                        </p>
                                        <div className="mt-2 max-h-64 space-y-3 overflow-y-auto pr-1 lg:max-h-none lg:overflow-visible">
                                            {groups.map((group) =>
                                                group.items.length === 0 ? null : (
                                                    <div key={group.key}>
                                                        <p className="sticky top-0 bg-white py-1 text-[9px] font-black uppercase tracking-[0.22em] text-secondary-dark">
                                                            {group.label}
                                                        </p>
                                                        <div className="space-y-1.5">
                                                            {group.items.map((item) => {
                                                                const active = selectedTourId === String(item.id);
                                                                return (
                                                                    <button
                                                                        key={`${item.type}-${item.id}`}
                                                                        type="button"
                                                                        onClick={() => setSelectedTourId(String(item.id))}
                                                                        aria-pressed={active}
                                                                        className={`flex w-full items-center gap-2.5 border px-2.5 py-2 text-left transition-colors ${
                                                                            active
                                                                                ? 'border-primary bg-primary/5'
                                                                                : 'border-border hover:border-border-dark hover:bg-background'
                                                                        }`}
                                                                    >
                                                                        <span
                                                                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                                                                                active ? 'border-primary bg-primary' : 'border-border-dark'
                                                                            }`}
                                                                            aria-hidden="true"
                                                                        >
                                                                            {active && <span className="h-1 w-1 rounded-full bg-white" />}
                                                                        </span>
                                                                        <span
                                                                            className={`min-w-0 flex-1 truncate text-[12px] font-bold ${
                                                                                active ? 'text-primary' : 'text-text-primary'
                                                                            }`}
                                                                        >
                                                                            {cleanTitle(item.title)}
                                                                        </span>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            </div>

                            {/* the action — always on screen, in either mode */}
                            <div className="shrink-0 border-t border-border-light px-6 py-5">
                                {bookDisabled ? (
                                    <span className="flex w-full cursor-not-allowed items-center justify-center gap-2.5 bg-border px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-text-tertiary">
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {tDriv('bookWhatsApp')}
                                    </span>
                                ) : (
                                    <a
                                        href={bookHref()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex w-full items-center justify-center gap-2.5 px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] shadow-lg shadow-[#25D366]/25 ${WA_BUTTON}`}
                                    >
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {tDriv('bookWhatsApp')}
                                    </a>
                                )}
                                <p className="mt-3 text-center text-[9px] font-black uppercase tracking-[0.16em] text-text-tertiary/70">
                                    {tDriv('responseNote')}
                                </p>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* mobile: the action follows you down the page */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur-md lg:hidden">
                <div className="container-custom flex items-center gap-4 py-3">
                    {bookDisabled ? (
                        <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 bg-border px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.16em] text-text-tertiary">
                            <WhatsAppIcon className="h-4 w-4" />
                            {tDriv('bookWhatsApp')}
                        </span>
                    ) : (
                        <a
                            href={bookHref()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.16em] ${WA_BUTTON}`}
                        >
                            <WhatsAppIcon className="h-4 w-4" />
                            {tDriv('bookWhatsApp')}
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}
