export interface Place {
    id: string;
    slug: string;
    title: string;
    category: string;
    shortDescription: string;
    image: string;
    featured?: boolean;
    duration?: string;
    entryFee?: string;
}

export const places: Place[] = [
    {
        id: '1',
        slug: 'jemaa-el-fnaa',
        title: 'Jemaa el-Fnaa',
        category: 'landmarks',
        shortDescription: 'The beating heart of Marrakech, this UNESCO World Heritage square comes alive with storytellers, musicians, snake charmers, and food stalls.',
        image: '/images/marrakech/jemaa-el-fnaa.webp',
        featured: true,
        duration: '2-3 hours',
        entryFee: 'Free'
    },
    {
        id: '2',
        slug: 'koutoubia-mosque',
        title: 'Koutoubia Mosque',
        category: 'landmarks',
        shortDescription: 'The largest mosque in Marrakech, featuring a stunning 77-meter minaret that dominates the city skyline.',
        image: '/images/marrakech/koutoubia.webp',
        featured: true,
        duration: '1 hour',
        entryFee: 'Free (exterior only)'
    },
    {
        id: '3',
        slug: 'bahia-palace',
        title: 'Bahia Palace',
        category: 'palaces',
        shortDescription: 'A masterpiece of Moroccan architecture with beautiful gardens, intricate tilework, and painted ceilings.',
        image: '/images/marrakech/bahia-palace.webp',
        featured: true,
        duration: '1-2 hours',
        entryFee: '70 MAD'
    },
    {
        id: '4',
        slug: 'majorelle-garden',
        title: 'Majorelle Garden',
        category: 'gardens',
        shortDescription: 'An enchanting botanical garden created by French painter Jacques Majorelle, featuring exotic plants and vibrant blue buildings.',
        image: '/images/marrakech/majorelle.webp',
        featured: true,
        duration: '1-2 hours',
        entryFee: '150 MAD'
    },
    {
        id: '5',
        slug: 'saadian-tombs',
        title: 'Saadian Tombs',
        category: 'historical',
        shortDescription: 'Dating from the 16th century, these ornate tombs house members of the Saadian dynasty.',
        image: '/images/marrakech/saadian-tombs.webp',
        duration: '45 minutes',
        entryFee: '70 MAD'
    },
    {
        id: '6',
        slug: 'ben-youssef-madrasa',
        title: 'Ben Youssef Madrasa',
        category: 'historical',
        shortDescription: 'A stunning Islamic college featuring intricate Arabic calligraphy, zellige tilework, and carved cedar.',
        image: '/images/marrakech/ben-youssef.webp',
        duration: '1 hour',
        entryFee: '50 MAD'
    },
    {
        id: '7',
        slug: 'souks',
        title: 'Marrakech Souks',
        category: 'shopping',
        shortDescription: 'A labyrinth of traditional markets selling everything from spices and textiles to leather goods and lanterns.',
        image: '/images/marrakech/souks.webp',
        featured: true,
        duration: '2-4 hours',
        entryFee: 'Free'
    },
    {
        id: '8',
        slug: 'el-badi-palace',
        title: 'El Badi Palace',
        category: 'palaces',
        shortDescription: 'The ruins of a once-magnificent palace, offering panoramic views and insights into Morocco\'s golden age.',
        image: '/images/marrakech/el-badi.webp',
        duration: '1 hour',
        entryFee: '70 MAD'
    },
    {
        id: '9',
        slug: 'menara-gardens',
        title: 'Menara Gardens',
        category: 'gardens',
        shortDescription: 'A peaceful olive grove with a large reflecting pool and pavilion, offering views of the Atlas Mountains.',
        image: '/images/marrakech/menara.webp',
        duration: '1 hour',
        entryFee: 'Free'
    }
];

export function getAllCategories(): string[] {
    const categories = new Set(places.map(place => place.category));
    return Array.from(categories);
}

export function getPlacesByCategory(category: string): Place[] {
    return places.filter(place => place.category === category);
}

export function getFeaturedPlaces(): Place[] {
    return places.filter(place => place.featured);
}

export function getPlaceBySlug(slug: string): Place | undefined {
    return places.find(place => place.slug === slug);
}
