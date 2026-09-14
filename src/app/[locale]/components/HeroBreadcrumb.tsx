'use client';

/**
 * Breadcrumb trail for the photographic hero of every detail page.
 *
 * Five pages had grown five slightly different copies of this trail; this is
 * the one implementation. Mobile is the case it is designed for:
 *   · the trail sits in a blurred pill so it stays legible on any photograph
 *     instead of dissolving into the image the way plain white text did;
 *   · the current page is dropped below `md` — the H1 directly underneath
 *     already says it, so a truncated "Air Balloon Activity In Mor…" was
 *     costing a line to repeat the headline badly. It stays in the DOM for
 *     assistive tech, and the full trail is in the page's BreadcrumbList
 *     JSON-LD either way, so nothing is lost to search;
 *   · nothing scrolls sideways and nothing truncates at phone width.
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page — the last item is never a link. */
  href?: string;
}

interface HeroBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const LABEL = 'text-[10px] font-bold uppercase tracking-[0.18em] md:text-[11px]';

export default function HeroBreadcrumb({ items, className = '' }: HeroBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`max-w-full ${className}`}>
      <ol className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-black/30 py-1.5 pl-3 pr-3.5 backdrop-blur-md">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isCurrent = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              // the current page is desktop-only; its separator goes with it
              className={`flex min-w-0 items-center gap-1.5 ${isCurrent && items.length > 1 ? 'hidden md:flex' : ''}`}
            >
              {!isFirst && <ChevronRight className="h-3 w-3 shrink-0 text-white/40" aria-hidden="true" />}
              {isCurrent || !item.href ? (
                <span aria-current="page" className={`${LABEL} truncate text-white md:max-w-[52ch]`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex shrink-0 items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                >
                  {isFirst && <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                  <span className={LABEL}>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
