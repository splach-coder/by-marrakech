import { MetadataRoute } from 'next';
import { siteData } from '@/data/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bymarrakech.com';
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
            url: `${baseUrl}/tours`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/activities`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/experiences`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
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

    // Combine all pages
    return [
        ...staticPages,
        ...categoryPages,
        ...tourPages,
        ...activityPages,
        ...experiencePages,
        ...servicePages,
    ];
}
