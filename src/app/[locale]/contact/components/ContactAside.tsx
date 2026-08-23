'use client';

/**
 * The aside beside the form: a panel of direct lines (icon + tiny caps label +
 * value per row, WhatsApp carrying its own chat button), then the map under a
 * gold "Our base" kicker.
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { whatsappLink } from '@/data/transferData';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+212 600 000 000';
const PHONE_RAW = process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212600000000';
const EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@xhosen.com';
const ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Marrakech, Morocco';

const MAP_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108704.22922718712!2d-8.077885489726833!3d31.63474853046036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus';

const ROW = 'flex items-start gap-4 py-5';
const ROW_LABEL = 'mb-1 block text-[9px] font-black uppercase tracking-[0.22em] text-text-tertiary';
const ROW_VALUE = 'block font-serif text-base font-black text-text-primary md:text-lg';

export default function ContactAside() {
    const t = useTranslations('contactPage');

    return (
        <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
        >
            {/* direct lines */}
            <div className="border border-border bg-background-cream px-6 py-4 md:px-8">
                <ul className="divide-y divide-border-dark/25">
                    <li className={ROW}>
                        <Phone className="mt-1 h-4 w-4 shrink-0 text-secondary-dark" strokeWidth={1.7} aria-hidden="true" />
                        <div className="min-w-0">
                            <span className={ROW_LABEL}>{t('details.phone')}</span>
                            <a href={`tel:${PHONE_RAW}`} className={`${ROW_VALUE} transition-colors hover:text-primary`}>
                                {PHONE}
                            </a>
                        </div>
                    </li>

                    <li className={`${ROW} flex-wrap justify-between gap-y-4`}>
                        <div className="flex items-start gap-4">
                            <WhatsAppIcon className="mt-1 h-4 w-4 shrink-0 text-[#25D366]" />
                            <div className="min-w-0">
                                <span className={ROW_LABEL}>{t('details.whatsapp')}</span>
                                <span className={ROW_VALUE}>{t('details.whatsappValue')}</span>
                            </div>
                        </div>
                        <a
                            href={whatsappLink(t('wa.directIntro'))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-2 border border-[#25D366] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#04331d] transition-all duration-300 hover:bg-[#25D366]"
                        >
                            <WhatsAppIcon className="h-3.5 w-3.5" />
                            {t('details.whatsappCta')}
                        </a>
                    </li>

                    <li className={ROW}>
                        <Mail className="mt-1 h-4 w-4 shrink-0 text-secondary-dark" strokeWidth={1.7} aria-hidden="true" />
                        <div className="min-w-0">
                            <span className={ROW_LABEL}>{t('details.email')}</span>
                            <a
                                href={`mailto:${EMAIL}`}
                                className={`${ROW_VALUE} break-all transition-colors hover:text-primary`}
                            >
                                {EMAIL}
                            </a>
                        </div>
                    </li>

                    <li className={ROW}>
                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-secondary-dark" strokeWidth={1.7} aria-hidden="true" />
                        <div className="min-w-0">
                            <span className={ROW_LABEL}>{t('details.address')}</span>
                            <span className={ROW_VALUE}>{ADDRESS}</span>
                        </div>
                    </li>

                    <li className={ROW}>
                        <Clock className="mt-1 h-4 w-4 shrink-0 text-secondary-dark" strokeWidth={1.7} aria-hidden="true" />
                        <div className="min-w-0">
                            <span className={ROW_LABEL}>{t('details.hours')}</span>
                            <span className={ROW_VALUE}>{t('details.hoursValue')}</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* map */}
            <div>
                <p className="mb-4 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.28em] text-secondary-dark md:text-[10px]">
                    <span className="inline-block h-px w-8 bg-secondary" aria-hidden="true" />
                    {t('details.baseLabel')}
                </p>
                <div className="relative h-[300px] overflow-hidden border border-border bg-background-cream md:h-[340px]">
                    <iframe
                        src={MAP_SRC}
                        title={t('details.mapTitle')}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 saturate-[0.85] transition-all duration-700 hover:saturate-100"
                    />
                </div>
            </div>
        </motion.div>
    );
}
