export interface NavigationItem {
    label: string;
    href: string;
}

export interface NavigationSection {
    title: string;
    path: string;
    items: NavigationItem[];
}

// Tours, experiences, activities and services all live on the single /explore
// page now — each section is an anchor on it rather than its own index page.
export function getNavigationSections(locale: string): NavigationSection[] {
    return [
        {
            title: 'Explore',
            path: `/${locale}/explore`,
            items: [
                { label: 'Grand Journeys', href: `/${locale}/explore#journeys` },
                { label: 'Day Escapes', href: `/${locale}/explore#escapes` },
                { label: 'Signature Moments', href: `/${locale}/explore#moments` },
                { label: 'Services', href: `/${locale}/explore#services` },
            ]
        },
        {
            title: 'Drivers',
            path: `/${locale}/drivers`,
            items: [
                { label: 'All Drivers', href: `/${locale}/drivers` },
            ]
        },
        // Add other sections as necessary
    ];
}
