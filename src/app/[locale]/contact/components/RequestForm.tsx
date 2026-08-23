'use client';

/**
 * "Send a request" panel — underline-style fields on a white panel, two to a
 * row, message below, then the send button with the response promise beside it
 * and a direct-WhatsApp escape hatch under a hairline.
 *
 * There is no backend on this site, so rather than a form that pretends to
 * submit (the old one console.logged and told the visitor nothing), this
 * composes what they typed into a WhatsApp message and opens the chat. That is
 * also what the button says it does.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/data/transferData';
import WhatsAppIcon, { WA_BUTTON } from '@/components/WhatsAppIcon';

const FIELD =
    'w-full border-0 border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder-text-tertiary/40 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-0';
const LABEL = 'mb-1 block text-[9px] font-black uppercase tracking-[0.22em] text-text-tertiary';

export default function RequestForm() {
    const t = useTranslations('contactPage');
    const options = t.raw('form.serviceOptions') as string[];

    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

    const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value }));

    /** Everything they filled in, as one readable WhatsApp message. */
    const composeMessage = () => {
        const rows: string[] = [t('wa.intro'), ''];
        const push = (label: string, value: string) => {
            if (value.trim()) rows.push(`${label}: ${value.trim()}`);
        };
        push(t('wa.name'), form.name);
        push(t('wa.email'), form.email);
        push(t('wa.phone'), form.phone);
        push(t('wa.service'), form.service);
        if (form.message.trim()) rows.push('', `${t('wa.message')}: ${form.message.trim()}`);
        return rows.join('\n');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.open(whatsappLink(composeMessage()), '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border bg-white px-6 py-10 md:px-10 md:py-12"
        >
            <h2 className="mb-9 font-serif text-xl font-black uppercase tracking-[0.08em] text-text-primary md:text-2xl">
                {t('form.title')}
            </h2>

            <form onSubmit={handleSubmit} noValidate={false}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                    <div>
                        <label className={LABEL} htmlFor="contact-name">
                            {t('form.name')}
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={set('name')}
                            placeholder={t('form.namePlaceholder')}
                            className={FIELD}
                        />
                    </div>

                    <div>
                        <label className={LABEL} htmlFor="contact-email">
                            {t('form.email')}
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={set('email')}
                            placeholder={t('form.emailPlaceholder')}
                            className={FIELD}
                        />
                    </div>

                    <div>
                        <label className={LABEL} htmlFor="contact-phone">
                            {t('form.phone')}
                        </label>
                        <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={set('phone')}
                            placeholder={t('form.phonePlaceholder')}
                            className={FIELD}
                        />
                    </div>

                    <div>
                        <label className={LABEL} htmlFor="contact-service">
                            {t('form.service')}
                        </label>
                        <select
                            id="contact-service"
                            name="service"
                            value={form.service}
                            onChange={set('service')}
                            className={`${FIELD} ${form.service ? '' : 'text-text-tertiary/40'}`}
                        >
                            <option value="">{t('form.servicePlaceholder')}</option>
                            {options.map((option) => (
                                <option key={option} value={option} className="text-text-primary">
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-7">
                    <label className={LABEL} htmlFor="contact-message">
                        {t('form.message')}
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder={t('form.messagePlaceholder')}
                        className={`${FIELD} resize-none`}
                    />
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <button
                        type="submit"
                        className={`inline-flex items-center gap-2.5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] ${WA_BUTTON}`}
                    >
                        <WhatsAppIcon className="h-4 w-4" />
                        {t('form.submit')}
                    </button>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-text-tertiary/70">
                        {t('form.responseNote')}
                    </span>
                </div>
            </form>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border-light pt-7 text-sm text-text-tertiary">
                <span>{t('form.directLabel')}</span>
                <a
                    href={whatsappLink(t('wa.directIntro'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:text-[#1a8f4a]"
                >
                    {t('form.directCta')}
                    <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                </a>
            </div>
        </motion.div>
    );
}
