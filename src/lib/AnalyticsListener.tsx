// src/lib/AnalyticsListener.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as gtag from './gtag';

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Compose URL similar to what GA expects
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}
