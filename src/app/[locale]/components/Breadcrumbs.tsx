// /app/[locale]/components/Breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { getNavigationSections } from '@/lib/navigation'; // Import the navigation data
import { ChevronRight, Home } from 'lucide-react';
import { useEffect, useRef } from 'react';

/**
 * A smart navigation component that displays a sub-navigation bar for complex
 * sections or a simple breadcrumb trail for standalone pages.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Breadcrumbs');
  const navigationSections = getNavigationSections(locale);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  // This effect runs when the component mounts or the path changes.
  // It finds the active link and scrolls it into the center of the view.
  useEffect(() => {
    if (activeLinkRef.current) {
      activeLinkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [pathname]);


  // Split the pathname and remove the initial empty string and locale
  const pathSegments = pathname.split('/').filter(segment => segment && segment !== locale);

  // Don't render anything on the homepage
  if (pathSegments.length === 0) {
    return null;
  }

  // Find the current main section based on the URL path, with a special check for rooms/rates
  const currentSection = navigationSections.find(section => {
    if (pathname.startsWith(section.path)) return true;
    // Special check to correctly associate /rooms/[slug] and /rates with the main section
    if (section.title === "ROOMS & RATES" && (pathname.startsWith(`/${locale}/rooms`) || pathname.startsWith(`/${locale}/rates`))) {
        return true;
    }
    return false;
  });

  const formatLabel = (label: string) => {
    return label.replace(/ and /gi, ' & ').replace(/-/g, ' ');
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-[#EAE4D9] py-2 border-y border-stone-300">
      <div className="container mx-auto max-w-7xl">
        {/* RENDER SUB-NAVIGATION BAR if the section has multiple items */}
        {currentSection && currentSection.items.length > 1 ? (
          <div className="flex overflow-x-auto pb-1 -mb-1">
            <div className="flex-shrink-0">
              <Link 
                ref={pathname === currentSection.path ? activeLinkRef : null}
                href={currentSection.path} 
                className={`block px-2 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                  pathname === currentSection.path 
                  ? 'bg-[#C8BBA8] text-[#4A3F35]' 
                  : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                {formatLabel(currentSection.title)}
              </Link>
            </div>
            {currentSection.items.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <Link 
                  ref={pathname === item.href ? activeLinkRef : null}
                  href={item.href} 
                  className={`block px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href 
                    ? 'bg-[#C8BBA8] text-[#4A3F35]' 
                    : 'text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {formatLabel(item.label)}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* RENDER SIMPLE BREADCRUMB for standalone pages */
          <ol className="flex items-center space-x-2 text-sm text-stone-600">
            <li>
              <Link href={`/${locale}`} className="flex items-center hover:text-[#4A3F35] transition-colors">
                <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                {t('home')}
              </Link>
            </li>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const href = `/${locale}/${pathSegments.slice(0, index + 1).join('/')}`;
              return (
                <li key={segment} className="flex items-center capitalize">
                  <ChevronRight className="h-4 w-4 text-stone-400" />
                  {isLast ? (
                    <span className="ml-2 text-[#4A3F35]">
                      {formatLabel(segment)}
                    </span>
                  ) : (
                     <Link href={href} className="ml-2 hover:text-[#4A3F35] transition-colors">
                        {formatLabel(segment)}
                     </Link>
                  )}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </nav>
  );
}
