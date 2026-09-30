/**
 * Facebook Messenger glyph — the bubble with the lightning bolt.
 * Drawn here rather than pulled from an icon set so it can inherit colour and
 * sit at the same optical weight as WhatsAppIcon.
 */
export default function MessengerIcon({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.19.16.15.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.99-.88c.17-.07.36-.09.54-.04 1.16.32 2.4.47 3.69.44 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75c.21.16.5.16.72 0l3.16-2.39c.42-.32.97.18.69.62z" />
        </svg>
    );
}
