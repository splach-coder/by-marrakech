import { driversData, driversDataFr } from '../data/drivers';
import {
    aboutData,
    toursPreviewData,
    experiencesPreviewData,
    testimonialsData,
    eventsData,
    aboutDataFr,
    toursPreviewDataFr,
    experiencesPreviewDataFr,
    testimonialsDataFr,
    eventsDataFr
} from '../data/home-data';

export type Locale = 'en' | 'fr';

/**
 * Get home page data based on locale
 */
export function getHomeData(locale: Locale) {
    return {
        about: locale === 'fr' ? aboutDataFr : aboutData,
        tours: locale === 'fr' ? toursPreviewDataFr : toursPreviewData,
        experiences: locale === 'fr' ? experiencesPreviewDataFr : experiencesPreviewData,
        testimonials: locale === 'fr' ? testimonialsDataFr : testimonialsData,
        events: locale === 'fr' ? eventsDataFr : eventsData,
    };
}

/**
 * Get drivers data based on locale
 */
export function getDriversData(locale: Locale) {
    return locale === 'fr' ? driversDataFr : driversData;
}


