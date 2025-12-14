export interface TourLocation {
    name: string;
}

export interface TourImage {
    url: string;
    alt: string;
}

export interface TourDay {
    day: number;
    title: string;
    description: string;
    location: string;
    highlights: string[];
}

export interface Review {
    name: string;
    country: string;
    rating: number;
    text: string;
}

export interface Tour {
    id: number;
    trip_code: string;
    title: string;
    url: string;
    duration: string;
    locations: TourLocation[];
    group_size: string;
    description: string;
    image: TourImage;
    banner_image?: TourImage;
    gallery?: TourImage[];
    highlights: string[];
    suitable_for?: string[];
    itinerary?: TourDay[];
    price?: string;
    reviews?: Review[];
    categories?: string[];
    location?: string;
    featured?: boolean;
    notForChildren?: boolean;
    category?: string;
    shortDescription?: string;
}
