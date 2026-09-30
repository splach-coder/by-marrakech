/**
 * Real app marks — the icons people recognise from their own home screen.
 *
 * Generic lucide glyphs (a speech bubble, a video camera) read as "chat" and
 * "video call", not as iMessage and FaceTime, so a traveller scanning a row of
 * options has to read every label. These are the app marks themselves, each in
 * its own colour.
 *
 * Every mark sits on the same tile — a square with a small radius — so a row
 * of them reads as one set rather than a mix of circles and squircles. The
 * white glyph is inset to the same optical size on every tile.
 *
 * Each mark fills the 24×24 box it is given, so callers size them with one
 * className (h-9 w-9, h-11 w-11 …) and nothing else.
 */

interface MarkProps {
    className?: string;
}

/** Shared tile radius — small, so it reads as a square, not an app squircle. */
const R = 5;

/** Glyphs drawn on a full 24 grid are scaled into the tile's inner 15×15. */
const INSET = 'translate(4.5 4.5) scale(0.625)';

/** iOS Messages — white bubble on the green tile. */
export function IMessageMark({ className = 'h-9 w-9' }: MarkProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="im-g" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#5BF675" />
                    <stop offset="1" stopColor="#0CBC32" />
                </linearGradient>
            </defs>
            <rect width="24" height="24" rx={R} fill="url(#im-g)" />
            <path
                fill="#fff"
                d="M12 5.4c-3.6 0-6.5 2.33-6.5 5.2 0 1.64.96 3.1 2.46 4.06.13.08.19.23.15.38-.16.6-.48 1.39-1 1.99-.14.15 0 .4.2.35 1.25-.3 2.16-.8 2.69-1.15a.4.4 0 0 1 .32-.05c.53.14 1.1.21 1.68.21 3.6 0 6.5-2.33 6.5-5.2S15.6 5.4 12 5.4Z"
            />
        </svg>
    );
}

/** FaceTime — white camera on the green tile. */
export function FaceTimeMark({ className = 'h-9 w-9' }: MarkProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="ft-g" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#5BF675" />
                    <stop offset="1" stopColor="#0CBC32" />
                </linearGradient>
            </defs>
            <rect width="24" height="24" rx={R} fill="url(#ft-g)" />
            <rect x="4.8" y="7.8" width="9.2" height="8.4" rx="2.2" fill="#fff" />
            <path
                fill="#fff"
                d="M15.4 11.33l2.9-2.2c.35-.27.85-.02.85.42v4.9c0 .44-.5.69-.85.42l-2.9-2.2a.53.53 0 0 1 0-.84Z"
            />
        </svg>
    );
}

/** WhatsApp — the official glyph in white on the WhatsApp-green tile. */
export function WhatsAppMark({ className = 'h-9 w-9' }: MarkProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
            <rect width="24" height="24" rx={R} fill="#25D366" />
            <g transform={INSET}>
                <path
                    fill="#fff"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.015-.52-.074-.149-.669-1.612-.916-2.207-.24-.579-.486-.5-.668-.51-.171-.008-.367-.01-.563-.01-.196 0-.516.074-.785.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                />
            </g>
        </svg>
    );
}

/** Messenger — white bolt-in-bubble on the blue-violet tile. */
export function MessengerMark({ className = 'h-9 w-9' }: MarkProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="ms-g" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FF5280" />
                    <stop offset="0.35" stopColor="#A033FF" />
                    <stop offset="0.75" stopColor="#0099FF" />
                    <stop offset="1" stopColor="#00C6FF" />
                </linearGradient>
            </defs>
            <rect width="24" height="24" rx={R} fill="url(#ms-g)" />
            <path
                fill="#fff"
                d="M12 5c-3.98 0-7 2.9-7 6.82 0 2.05.84 3.82 2.2 5.05.12.1.19.26.2.42l.03 1.25c.02.4.43.66.8.5l1.39-.61c.12-.06.26-.07.38-.03.64.18 1.32.27 2 .27 3.98 0 7-2.9 7-6.85S15.98 5 12 5Zm4.2 5.25-2.06 3.26a1.05 1.05 0 0 1-1.52.28l-1.64-1.23a.42.42 0 0 0-.51 0l-2.21 1.68c-.3.23-.68-.12-.48-.44l2.06-3.26a1.05 1.05 0 0 1 1.52-.28l1.64 1.23c.15.11.36.11.51 0l2.21-1.67c.3-.23.68.12.48.43Z"
            />
        </svg>
    );
}

/** Call — the house red, so it reads as "ring the agency", not a third app. */
export function CallMark({ className = 'h-9 w-9' }: MarkProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
            <rect width="24" height="24" rx={R} fill="#912b2b" />
            <path
                fill="#fff"
                d="M9.02 6.2c.3-.06.6.09.74.36l1.2 2.3c.13.25.09.55-.1.76l-.96 1.05c-.16.18-.2.44-.09.66.5 1.02 1.4 1.93 2.44 2.45.22.11.48.07.66-.1l1.06-.96c.2-.19.5-.23.75-.1l2.3 1.2c.27.14.42.44.36.74l-.32 1.5a.79.79 0 0 1-.62.6c-.6.12-1.2.14-1.8.06-3.6-.5-6.55-3.45-7.05-7.05-.08-.6-.06-1.2.06-1.8a.79.79 0 0 1 .6-.62l1.5-.32Z"
            />
        </svg>
    );
}

