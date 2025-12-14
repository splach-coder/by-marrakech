export interface NavigationItem {
    label: string;
    href: string;
}

export interface NavigationSection {
    title: string;
    path: string;
    items: NavigationItem[];
}

export function getNavigationSections(locale: string): NavigationSection[] {
    return [
        {
            title: 'Services',
            path: `/${locale}/services`,
            items: [
                { label: 'Private Driver', href: `/${locale}/services/501` },
                { label: 'Airport Transfer', href: `/${locale}/services/502` },
                // Add other services if needed
            ]
        },
        {
            title: 'Tours',
            path: `/${locale}/tours`,
            items: [
                // This can be populated dynamically if needed, or static
                { label: 'All Tours', href: `/${locale}/tours` },
            ]
        },
        {
            title: 'Activities',
            path: `/${locale}/activities`,
            items: [
                { label: 'All Activities', href: `/${locale}/activities` },
            ]
        },
        // Add other sections as necessary
    ];
}
