'use client';

/**
 * Fixed chapter rail (desktop) — Roman numerals I / II / III that light up
 * as each chapter crosses the middle of the viewport. Appears once the
 * reader has left the hero.
 */

import { useEffect, useState } from 'react';
import { getExploreCopy } from '../content';

export default function ChapterRail({ locale }: { locale: string }) {
    const rail = getExploreCopy(locale).rail;
    const [active, setActive] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: '-40% 0px -40% 0px' }
        );
        rail.forEach((r) => {
            const el = document.getElementById(r.id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, [rail]);

    // Chapter II is a dark room — the rail flips to light ink there
    const onDark = active === 'escapes';
    const idle = onDark ? 'text-white/35 hover:text-white/70' : 'text-text-primary/35 hover:text-text-primary/70';

    return (
        <nav
            aria-label="Chapters"
            className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 transition-opacity duration-700 xl:flex ${
                visible ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
        >
            {rail.map((r) => {
                const isActive = active === r.id;
                return (
                    <a
                        key={r.id}
                        href={`#${r.id}`}
                        className={`group flex flex-col items-center gap-1.5 transition-all duration-500 ${
                            isActive ? 'scale-110 text-[#D4AF37]' : idle
                        }`}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        <span className="font-serif text-sm font-black">{r.numeral}</span>
                        <span
                            className={`h-6 w-px transition-colors duration-500 ${
                                isActive ? 'bg-[#D4AF37]' : 'bg-current opacity-40'
                            }`}
                            aria-hidden="true"
                        />
                        <span className="text-[8px] uppercase tracking-[0.25em] opacity-0 transition-opacity duration-300 [writing-mode:vertical-rl] group-hover:opacity-100">
                            {r.label}
                        </span>
                    </a>
                );
            })}
        </nav>
    );
}
