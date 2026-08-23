/**
 * The real WhatsApp mark.
 *
 * lucide dropped brand glyphs, so every WhatsApp CTA on the site was wearing a
 * generic speech bubble — which reads as "chat", not "WhatsApp". This is the
 * official mark (24×24 grid), filled with currentColor so it takes the ink of
 * whatever button it sits in.
 *
 * Pair it with the WhatsApp green in `WA_BUTTON` below so the affordance is
 * recognisable at a glance.
 */

export interface WhatsAppIconProps {
    className?: string;
}

export default function WhatsAppIcon({ className = 'h-4 w-4' }: WhatsAppIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.015-.52-.074-.149-.669-1.612-.916-2.207-.24-.579-.486-.5-.668-.51-.171-.008-.367-.01-.563-.01-.196 0-.516.074-.785.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

/**
 * Shared WhatsApp button skin.
 *
 * Bright WhatsApp green with near-black-green ink rather than white: white on
 * #25D366 only reaches ~2:1 contrast, which fails AA at the small uppercase
 * sizes these buttons use, and dark-on-bright also pops harder. It matches the
 * site's existing gold-button convention (dark ink on a bright fill).
 *
 * Layout — padding, radius, width, tracking — stays with the caller, so each
 * button keeps the shape of the design it sits in.
 */
export const WA_GREEN = '#25D366';
export const WA_INK = '#04331d';

export const WA_BUTTON =
    'bg-[#25D366] text-[#04331d] hover:bg-[#3DDC7F] transition-all duration-300';

/** Extra pull for WhatsApp buttons sitting on a dark or coloured ground. */
export const WA_BUTTON_GLOW = `${WA_BUTTON} shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40`;
