'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  Calendar, Clock, Minus, Plus, ArrowRight, ArrowUpDown, ShieldCheck,
  PlaneLanding, CalendarX, Star, X,
} from 'lucide-react';
import { getRoutes, whatsappLink, googleReviewsConfig } from '@/data/transferData';
import { getSiteData } from '@/data/siteData';

type Tab = 'transfer' | 'excursion';

// Known pickup/dropoff aliases → route matching for instant prices
const PLACE_ALIASES: Record<string, string[]> = {
  airport: ['airport', 'rak', 'menara', 'aeroport', 'aéroport'],
  medina: ['medina', 'médina', 'city center', 'centre', 'center', 'jemaa', 'jamaa', 'riad', 'marrakech city'],
  palmeraie: ['palmeraie', 'palm', 'resort'],
  ourika: ['ourika', 'atlas', 'setti fatma'],
  essaouira: ['essaouira', 'mogador'],
  ouarzazate: ['ouarzazate', 'ait ben haddou', 'aït ben haddou'],
  casablanca: ['casablanca', 'casa', 'cmn'],
};

// Any Marrakech-side pickup point matches the intercity routes
const MARRAKECH_SIDE = ['airport', 'medina', 'palmeraie'];

const ROUTE_MATCH: Record<string, { from: string[]; to: string[] }> = {
  'rak-medina': { from: ['airport'], to: ['medina'] },
  'rak-palmeraie': { from: ['airport'], to: ['palmeraie'] },
  'marrakech-ourika': { from: MARRAKECH_SIDE, to: ['ourika'] },
  'marrakech-essaouira': { from: MARRAKECH_SIDE, to: ['essaouira'] },
  'marrakech-ouarzazate': { from: MARRAKECH_SIDE, to: ['ouarzazate'] },
  'marrakech-casablanca': { from: MARRAKECH_SIDE, to: ['casablanca'] },
};

function matchPlace(input: string): string | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const [key, aliases] of Object.entries(PLACE_ALIASES)) {
    if (aliases.some(a => q.includes(a))) return key;
  }
  return null;
}

export default function QuoteWidget() {
  const locale = useLocale();
  const t = useTranslations('home.quote');
  const routes = useMemo(() => getRoutes(locale), [locale]);
  const excursions = useMemo(
    () => ((getSiteData(locale).excursions || []) as Array<{ id: number; title: string }>).map(x => x.title),
    [locale]
  );

  const [tab, setTab] = useState<Tab>('transfer');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [excursion, setExcursion] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [withReturn, setWithReturn] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [pax, setPax] = useState(2);

  // Live price: match typed from/to against known routes (either direction)
  const matchedRoute = useMemo(() => {
    const f = matchPlace(from);
    const g = matchPlace(to);
    if (!f || !g) return null;
    for (const r of routes) {
      const m = ROUTE_MATCH[r.id];
      if (m && ((m.from.includes(f) && m.to.includes(g)) || (m.from.includes(g) && m.to.includes(f)))) return r;
    }
    return null;
  }, [from, to, routes]);

  const price = matchedRoute ? matchedRoute.fromPrice * (withReturn ? 2 : 1) : null;

  const buildWhatsApp = () => {
    if (tab === 'transfer') {
      return whatsappLink(
        `${t('waTransferIntro')}\n` +
        `🚘 ${from || '—'} → ${to || '—'}${withReturn ? ` (${t('return')})` : ''}\n` +
        `📅 ${date || '—'} ${time ? `· ${time}` : ''}${withReturn && returnDate ? `\n🔁 ${t('return')}: ${returnDate}` : ''}\n` +
        `👥 ${pax} ${t('waPax')}` +
        (price ? `\n💶 ${t('priceFrom')} €${price}` : '')
      );
    }
    return whatsappLink(
      `${t('waExcursionIntro')}\n` +
      `🧭 ${excursion || '—'}\n` +
      `📅 ${date || '—'}\n` +
      `👥 ${pax} ${t('waPax')}`
    );
  };

  const fieldWrap = 'bg-white border border-border-light rounded-sm px-4 py-3';
  const fieldLabel = 'block text-[10px] font-black uppercase tracking-[0.18em] text-text-tertiary mb-1';
  const fieldInput = 'w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary/60 focus:outline-none';

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-md md:rounded-md shadow-2xl overflow-hidden text-left">
        {/* Tabs — gold underline style like the reference */}
        <div className="flex items-center gap-8 px-6 pt-5 border-b border-border-light">
          {(['transfer', 'excursion'] as Tab[]).map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`relative pb-3.5 text-[12px] font-black uppercase tracking-[0.18em] transition-colors ${
                tab === k ? 'text-primary' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              {k === 'transfer' ? t('tabTransfers') : t('tabExcursions')}
              {tab === k && (
                <motion.span layoutId="quote-tab" className="absolute left-0 right-0 -bottom-px h-0.5 bg-secondary" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-6 space-y-3">
          {tab === 'transfer' ? (
            <>
              {/* FROM / TO with swap */}
              <div className="relative space-y-3">
                <div className={fieldWrap}>
                  <label className={fieldLabel}>{t('from')}</label>
                  <input
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    placeholder={t('fromPlaceholder')}
                    list="qw-places"
                    className={fieldInput}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setFrom(to); setTo(from); }}
                  aria-label="Swap"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-dark hover:scale-105 transition-all"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
                <div className={fieldWrap}>
                  <label className={fieldLabel}>{t('to')}</label>
                  <input
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    placeholder={t('toPlaceholder')}
                    list="qw-places"
                    className={fieldInput}
                  />
                </div>
                <datalist id="qw-places">
                  <option value={locale === 'fr' ? 'Aéroport de Marrakech (RAK)' : 'Marrakech Airport (RAK)'} />
                  <option value={locale === 'fr' ? 'Médina / Centre-ville' : 'Medina / City Center'} />
                  <option value="Palmeraie" />
                  <option value="Gueliz" />
                  <option value="Hivernage" />
                  <option value={locale === 'fr' ? 'Vallée de l\'Ourika' : 'Ourika Valley'} />
                  <option value="Essaouira" />
                  <option value="Ouarzazate" />
                  <option value="Casablanca" />
                  <option value="Agadir" />
                </datalist>
              </div>

              {/* DATE / TIME */}
              <div className="grid grid-cols-2 gap-3">
                <div className={fieldWrap}>
                  <label className={fieldLabel}>
                    <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" />
                    {t('date')}
                  </label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className={fieldInput} />
                </div>
                <div className={fieldWrap}>
                  <label className={fieldLabel}>
                    <Clock className="w-3 h-3 inline mr-1 -mt-0.5" />
                    {t('time')}
                  </label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className={fieldInput} />
                </div>
              </div>

              {/* Add return */}
              {withReturn ? (
                <div className={`${fieldWrap} flex items-end gap-3`}>
                  <div className="flex-1">
                    <label className={fieldLabel}>{t('returnDate')}</label>
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className={fieldInput} />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setWithReturn(false); setReturnDate(''); }}
                    className="pb-0.5 text-text-tertiary hover:text-primary transition-colors"
                    aria-label={t('removeReturn')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setWithReturn(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 border border-dashed border-border-dark rounded-sm text-sm font-semibold text-text-secondary hover:border-secondary hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t('addReturn')}
                </button>
              )}
            </>
          ) : (
            <>
              {/* Excursion picker */}
              <div className={fieldWrap}>
                <label className={fieldLabel}>{t('excursionLabel')}</label>
                <select value={excursion} onChange={e => setExcursion(e.target.value)} className={fieldInput}>
                  <option value="">{t('selectExcursion')}</option>
                  {excursions.map(x => (
                    <option key={x} value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className={fieldWrap}>
                <label className={fieldLabel}>
                  <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" />
                  {t('date')}
                </label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className={fieldInput} />
              </div>
            </>
          )}

          {/* Passengers */}
          <div className={`${fieldWrap} flex items-center justify-between`}>
            <span className="text-sm font-semibold text-text-secondary">{t('guests')}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-dark text-text-primary hover:bg-secondary/20 hover:border-secondary transition-colors"
                aria-label="Fewer passengers"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-text-primary">{pax}</span>
              <button
                type="button"
                onClick={() => setPax(Math.min(17, pax + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-dark text-text-primary hover:bg-secondary/20 hover:border-secondary transition-colors"
                aria-label="More passengers"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live price */}
          {tab === 'transfer' && price && (
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-text-tertiary">
                {t('priceFrom')} ({matchedRoute!.duration} · {matchedRoute!.distance})
              </span>
              <span className="text-2xl font-bold text-primary font-serif leading-none">
                €{price}
                <span className="text-[11px] font-sans font-medium text-text-secondary ml-1">{t('perVehicle')}</span>
              </span>
            </div>
          )}

          {/* CTA */}
          <a
            href={buildWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-secondary text-[#3b2f2f] rounded-sm font-black text-sm uppercase tracking-[0.18em] transition-all duration-300 hover:bg-secondary-dark hover:shadow-lg"
          >
            <span>{t('cta')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Trust ticks 2×2 like the reference */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
            <span className="flex items-center gap-2 text-[11px] text-text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary-dark shrink-0" />
              {t('trustFixed')}
            </span>
            <span className="flex items-center gap-2 text-[11px] text-text-secondary">
              <PlaneLanding className="w-3.5 h-3.5 text-secondary-dark shrink-0" />
              {t('trustFlight')}
            </span>
            <span className="flex items-center gap-2 text-[11px] text-text-secondary">
              <CalendarX className="w-3.5 h-3.5 text-secondary-dark shrink-0" />
              {t('trustCancel')}
            </span>
            <span className="flex items-center gap-2 text-[11px] text-text-secondary">
              <Star className="w-3.5 h-3.5 text-secondary-dark shrink-0" />
              {googleReviewsConfig.rating.toFixed(1)} {t('trustGoogle')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
