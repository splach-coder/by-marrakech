'use client';

/**
 * The apps a traveller already has open — one list, every route to the same
 * number. Three shapes: `tiles` on the contact page, `row` under the booking
 * card, `bar` — a segmented strip — in the sticky bar on a phone.
 *
 * The icons are the real app marks (see AppMarks), so the row is recognisable
 * before a single label is read.
 *
 * Apple-only channels are gated on the device: `facetime://` does nothing off
 * Apple hardware, and a dead button is worse than no button. The detection
 * covers iPhone, iPod, iPad (including iPadOS asking for desktop sites, which
 * reports itself as a Mac) and the Mac, where FaceTime and iMessage both run.
 * The message link is `sms:`, which opens iMessage on Apple and the normal SMS
 * app elsewhere, so its label follows the device too.
 */

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    CallMark,
    FaceTimeMark,
    IMessageMark,
    MessengerMark,
    WhatsAppMark,
} from '@/components/AppMarks';
import { PHONE_RAW, whatsappLink } from '@/lib/contact';

/** facebook.com/chosengate → its chat link */
const MESSENGER_URL = 'https://m.me/chosengate';

type Variant = 'tiles' | 'row' | 'bar';

interface QuickChannelsProps {
    variant?: Variant;
    /** Show the call channel — off where a call button already sits nearby. */
    includeCall?: boolean;
    /** Lead with WhatsApp — for places with no WhatsApp button of their own. */
    includeWhatsApp?: boolean;
    /** Prefills WhatsApp and the message app — e.g. the item being viewed. */
    message?: string;
    /** Messenger is dropped where width is scarce, e.g. the sticky bar. */
    includeMessenger?: boolean;
    className?: string;
}

interface Channel {
    key: string;
    href: string;
    label: string;
    mark: (props: { className?: string }) => React.ReactElement;
    external?: boolean;
}

const MARK_SIZE: Record<Variant, string> = {
    tiles: 'h-11 w-11',
    row: 'h-9 w-9',
    bar: 'h-[17px] w-[17px]',
};

export default function QuickChannels({
    variant = 'tiles',
    includeCall = false,
    includeWhatsApp = false,
    message,
    includeMessenger = true,
    className = '',
}: QuickChannelsProps) {
    const t = useTranslations('contactPage.apps');
    const [isApple, setIsApple] = useState(false);

    useEffect(() => {
        // iPadOS in desktop mode claims to be a Mac — and a Mac runs both apps
        // anyway, so either way it qualifies.
        setIsApple(/iPhone|iPod|iPad|Macintosh/.test(navigator.userAgent));
    }, []);

    const markSize = MARK_SIZE[variant];

    /** `?&body=` is the spelling both iOS and Android accept. */
    const smsHref = message
        ? `sms:${PHONE_RAW}?&body=${encodeURIComponent(message)}`
        : `sms:${PHONE_RAW}`;

    const channels: Channel[] = [
        ...(includeWhatsApp
            ? [{
                key: 'whatsapp',
                href: whatsappLink(message ?? ''),
                label: 'WhatsApp',
                mark: WhatsAppMark,
                external: true,
            }]
            : []),
        ...(includeCall
            ? [{ key: 'call', href: `tel:${PHONE_RAW}`, label: t('call'), mark: CallMark }]
            : []),
        {
            key: 'imessage',
            href: smsHref,
            label: isApple ? t('imessage') : t('sms'),
            mark: IMessageMark,
        },
        ...(isApple
            ? [{
                key: 'facetime',
                href: `facetime://${PHONE_RAW}`,
                label: t('facetime'),
                mark: FaceTimeMark,
            }]
            : []),
        ...(includeMessenger
            ? [{
                key: 'messenger',
                href: MESSENGER_URL,
                label: t('messenger'),
                mark: MessengerMark,
                external: true,
            }]
            : []),
    ];

    const linkProps = (channel: Channel) => ({
        href: channel.href,
        'aria-label': channel.label,
        title: channel.label,
        ...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {}),
    });

    // One segmented strip, equal columns — the second line of the sticky bar.
    if (variant === 'bar') {
        return (
            <div
                className={`grid w-full overflow-hidden rounded-xl border border-stone-200/90 bg-white ${className}`}
                style={{ gridTemplateColumns: `repeat(${channels.length}, minmax(0, 1fr))` }}
            >
                {channels.map((channel) => (
                    <a
                        key={channel.key}
                        {...linkProps(channel)}
                        className="flex min-w-0 items-center justify-center gap-1.5 border-l border-stone-200/90 px-1 py-2.5 first:border-l-0 transition-colors duration-200 active:bg-stone-50"
                    >
                        <channel.mark className={markSize} />
                        <span className="truncate text-[8px] font-black uppercase tracking-[0.04em] text-text-secondary">
                            {channel.label}
                        </span>
                    </a>
                ))}
            </div>
        );
    }

    if (variant === 'row') {
        return (
            <div className={`flex items-center justify-center gap-3 ${className}`}>
                {channels.map((channel) => (
                    <a
                        key={channel.key}
                        {...linkProps(channel)}
                        className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
                    >
                        <channel.mark className={markSize} />
                    </a>
                ))}
            </div>
        );
    }

    return (
        <ul className={`grid gap-3 ${channels.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'} ${className}`}>
            {channels.map((channel) => (
                <li key={channel.key}>
                    <a
                        href={channel.href}
                        {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white px-3 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl"
                    >
                        <channel.mark className={`${markSize} transition-transform duration-300 group-hover:scale-110`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-text-primary">
                            {channel.label}
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
