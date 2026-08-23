'use client';

/**
 * Sticky collection nav.
 *
 * The reference layout has a single collection, so it needs no in-page nav.
 * Ours holds four on one page, which is exactly the case where a reader gets
 * lost — so this is the one addition to the layout: a slim sticky rail that
 * names the four collections, carries their counts, and underlines whichever
 * one you are currently reading.
 */

import { useEffect, useState } from 'react';
import { getExploreCopy, type CollectionId } from '../content';

interface CollectionNavProps {
    locale: string;
    counts: Record<CollectionId, number>;
}

export default function CollectionNav({ locale, counts }: CollectionNavProps) {
    const copy = getExploreCopy(locale).nav;
    const [active, setActive] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            // a section counts as "current" while it crosses the middle band
            { rootMargin: '-35% 0px -55% 0px' }
        );

        copy.items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [copy.items]);

    return (
        <nav
            aria-label={copy.label}
            // sits directly under the site header, which goes fixed (~56/64px tall) once scrolled
            className="sticky top-14 z-40 border-y border-border bg-background/92 backdrop-blur-md md:top-16"
        >
            <div className="container-custom">
                <ul className="no-scrollbar -mx-1 flex items-stretch gap-1 overflow-x-auto md:justify-center">
                    {copy.items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <li key={item.id} className="shrink-0">
                                <a
                                    href={`#${item.id}`}
                                    aria-current={isActive ? 'true' : undefined}
                                    className={`group relative flex items-baseline gap-2 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 md:px-6 ${
                                        isActive ? 'text-primary' : 'text-text-tertiary hover:text-text-primary'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`font-serif text-[9px] tabular-nums transition-colors duration-300 ${
                                            isActive ? 'text-secondary-dark' : 'text-text-tertiary/45'
                                        }`}
                                    >
                                        {counts[item.id as CollectionId]}
                                    </span>
                                    {/* gold underline draws in on the active item */}
                                    <span
                                        className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-secondary transition-transform duration-500 md:inset-x-5 ${
                                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                        aria-hidden="true"
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
