'use client';

/**
 * Three channel cards — pick your medium. Centred icon, title, one line of
 * copy, one outlined button. The WhatsApp card keeps WhatsApp's green so it
 * reads as the fast option; the other two stay on brand red.
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Phone } from 'lucide-react';
import { whatsappLink } from '@/data/transferData';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const PHONE_RAW = process.env.NEXT_PUBLIC_BUSINESS_PHONE_RAW || '+212600000000';
const EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@xhosen.com';

interface Channel {
    key: string;
    title: string;
    copy: string;
    cta: string;
}

export default function ChannelCards() {
    const t = useTranslations('contactPage');
    const channels = t.raw('channels') as Channel[];

    const config: Record<string, { href: string; external: boolean; icon: React.ReactNode; button: string }> = {
        whatsapp: {
            href: whatsappLink(t('wa.directIntro')),
            external: true,
            icon: <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />,
            button: 'border-[#25D366] text-[#04331d] hover:bg-[#25D366]',
        },
        phone: {
            href: `tel:${PHONE_RAW}`,
            external: false,
            icon: <Phone className="h-6 w-6 text-secondary-dark" strokeWidth={1.5} aria-hidden="true" />,
            button: 'border-border-dark text-text-secondary hover:border-primary hover:bg-primary hover:text-white',
        },
        email: {
            href: `mailto:${EMAIL}`,
            external: false,
            icon: <Mail className="h-6 w-6 text-secondary-dark" strokeWidth={1.5} aria-hidden="true" />,
            button: 'border-border-dark text-text-secondary hover:border-primary hover:bg-primary hover:text-white',
        },
    };

    return (
        <section className="bg-background-cream py-20 md:py-24">
            <div className="container-custom">
                <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}
                    className="grid grid-cols-1 gap-px bg-border md:grid-cols-3"
                >
                    {channels.map((channel) => {
                        const cfg = config[channel.key] ?? config.email;
                        return (
                            <motion.li
                                key={channel.key}
                                variants={{
                                    hidden: { opacity: 0, y: 26 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                                }}
                                className="flex flex-col items-center bg-white px-7 py-11 text-center transition-colors duration-500 hover:bg-background-light"
                            >
                                {cfg.icon}
                                <h3 className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-text-primary">
                                    {channel.title}
                                </h3>
                                <p className="mx-auto mt-3 max-w-[18rem] flex-1 text-sm leading-relaxed text-text-tertiary">
                                    {channel.copy}
                                </p>
                                <a
                                    href={cfg.href}
                                    {...(cfg.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className={`mt-7 inline-flex w-full max-w-[16rem] items-center justify-center gap-2 border px-6 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${cfg.button}`}
                                >
                                    {channel.cta}
                                </a>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}
