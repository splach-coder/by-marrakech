import { MetadataRoute } from 'next';
import { siteData } from '@/data/siteData';
import { getGuides } from '@/data/guidesData';
import { driversData } from '@/data/drivers';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://xhosengate.com';
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/booking`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/fleet`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/drivers`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // One driver page per chauffeur, straight from the roster
        ...driversData.map((driver) => ({
            url: `${baseUrl}/drivers/${driver.id}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
        // /tours, /experiences, /activities and /services now redirect here —
        // the whole catalogue lives on one page.
        {
            url: `${baseUrl}/explore`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Dynamic tour pages
    const tourPages: MetadataRoute.Sitemap = siteData.tours.map((tour) => ({
        url: `${baseUrl}/tours/${tour.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic activity pages
    const activityPages: MetadataRoute.Sitemap = siteData.activities.map((activity) => ({
        url: `${baseUrl}/activities/${activity.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic experience pages
    const experiencePages: MetadataRoute.Sitemap = siteData.excursions.map((experience) => ({
        url: `${baseUrl}/experiences/${experience.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic service pages
    const servicePages: MetadataRoute.Sitemap = siteData.services.map((service) => ({
        url: `${baseUrl}/services/${service.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Guide article pages
    const guidePages: MetadataRoute.Sitemap = getGuides().map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Combine all pages
    return [
        ...staticPages,
        ...categoryPages,
        ...tourPages,
        ...activityPages,
        ...experiencePages,
        ...servicePages,
        ...guidePages,
    ];
}
