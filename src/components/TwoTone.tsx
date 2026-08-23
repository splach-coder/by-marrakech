'use client';

/**
 * The page's signature heading treatment: a lead in ink (or white, on photo)
 * followed by a gold italic accent. Nohemi has no true italic cut, so the
 * browser obliques Medium — which is exactly the light slanted look we want
 * beside the Black lead.
 */

interface TwoToneProps {
    lead: string;
    accent: string;
    /** Rendered element — h1 on the hero, h2 for sections, h3 on cards */
    as?: 'h1' | 'h2' | 'h3' | 'span';
    /** Tailwind size/leading classes for the whole heading */
    className?: string;
    /** Colour of the lead half. Accent is always gold. */
    leadClassName?: string;
    accentClassName?: string;
    /** Accent on its own line instead of flowing inline */
    stacked?: boolean;
    /** Drop the space between lead and accent (the tight "PARADISEVALLEY" look) */
    tight?: boolean;
}

export default function TwoTone({
    lead,
    accent,
    as: Tag = 'h2',
    className = '',
    leadClassName = 'text-text-primary',
    accentClassName = 'text-secondary',
    stacked = false,
    tight = false,
}: TwoToneProps) {
    return (
        <Tag className={`font-serif tracking-tight ${className}`}>
            <span className={`font-black ${leadClassName}`}>{lead}</span>
            {accent && (
                <>
                    {stacked ? <br /> : tight ? null : ' '}
                    <span className={`font-medium italic ${accentClassName}`}>{accent}</span>
                </>
            )}
        </Tag>
    );
}
