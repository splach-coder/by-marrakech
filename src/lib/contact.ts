/**
 * The business contact line — the single source of truth for the whole site.
 *
 * These deliberately do NOT read NEXT_PUBLIC_* environment variables any more.
 * The number is printed on every page anyway, so there is nothing to keep
 * secret, and routing it through the host's environment made it possible for
 * a stale value in a dashboard to override a correct value in the code — which
 * is exactly what happened: the site shipped the old number even after it had
 * been changed here. Editing this file is now the only way to change it, and a
 * deploy of this commit is enough to make it live.
 *
 * Change all three together.
 */

/** As printed on the page. */
export const PHONE_DISPLAY = '+212 663 227 698';

/** For tel: links and structured data — no spaces. */
export const PHONE_RAW = '+212663227698';

/** For wa.me links — digits only, no plus. */
export const WHATSAPP_NUMBER = '212663227698';

/** Ready-made wa.me link with a prefilled message. */
export const whatsappLink = (message: string): string =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
