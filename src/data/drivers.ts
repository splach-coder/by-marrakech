// Drivers — individual professional chauffeurs, each with their own page
// (/drivers/[id]) and their own personal fleet. No company/brand concept.

export interface DriverVehicle {
    name: string;
    image: string;
    pax: number;
    luggage: number;
}

export interface Driver {
    id: string;
    name: string;
    image: string;
    rating: number;
    experienceYears: number;
    languages: string[];
    bio: string;
    vehicleTypes: string[];
    specialties: string[];
    locations: string[]; // Mastered regions
    preferredTours: string[]; // IDs or names of tours they like
    pricePerDay: number;
    badges: string[]; // e.g., "History Buff", "Desert Expert"
    availability: boolean;
    fleet: DriverVehicle[]; // the driver's own vehicles
    gallery: string[];
    features: string[]; // Wifi, Water, Child Seat, etc.
}

export const driversData: Driver[] = [
    {
        id: 'fetah',
        name: 'Fetah',
        image: '/images/drivers/fetah/driver.webp',
        rating: 5.0,
        experienceYears: 15,
        languages: ['English', 'French', 'Arabic', 'Spanish'],
        bio: 'Fetah is a professional private driver with over 15 years on Morocco\'s roads. Known for his impeccable punctuality and deep knowledge of the country\'s history and hidden gems, he turns every transfer and tour into an exclusive, comfortable journey — from VIP airport pickups to multi-day grand tours.',
        vehicleTypes: ['Skoda Superb', 'Ford Tourneo Custom'],
        specialties: ['VIP Services', 'Custom Itineraries', 'Grand Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fes', 'Tangier'],
        preferredTours: ['The Grand Morocco Tour', 'Imperial Cities Luxury'],
        pricePerDay: 200,
        badges: ['VIP Specialist', 'Luxury Expert', 'Top Rated'],
        availability: true,
        fleet: [
            { name: 'Skoda Superb', image: '/images/drivers/fetah/car1.webp', pax: 3, luggage: 3 },
            { name: 'Ford Tourneo Custom', image: '/images/drivers/fetah/car3.webp', pax: 8, luggage: 8 },
        ],
        gallery: [
            '/images/drivers/fetah/car1.webp',
            '/images/drivers/fetah/car2.webp',
            '/images/drivers/fetah/car3.webp',
            '/images/drivers/fetah/car4.webp'
        ],
        features: ['Premium Wi-Fi', 'Refreshments', 'Concierge Service', 'Luxury Interiors', 'Massage Seats']
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.webp',
        rating: 4.9,
        experienceYears: 8,
        languages: ['English', 'French', 'Arabic'],
        bio: 'Ayoub is a passionate independent driver known for his warm smile and safe driving. Specializing in family trips and couples seeking a relaxed pace, he knows exactly how to curate a stress-free experience. His love for photography means he always knows the best spots for your vacation photos.',
        vehicleTypes: ['Ford Tourneo Custom'],
        specialties: ['Family Trips', 'Atlas Mountains', 'Photography'],
        locations: ['Marrakech', 'Ourika Valley', 'Essaouira'],
        preferredTours: ['Atlas Mountains Day Trip', 'Essaouira Coastal Escape'],
        pricePerDay: 130,
        badges: ['Family Favorite', 'Safe Driver', 'Local Expert'],
        availability: true,
        fleet: [
            { name: 'Ford Tourneo Custom', image: '/images/drivers/ayoub/car1.webp', pax: 8, luggage: 8 },
        ],
        gallery: [
            '/images/drivers/ayoub/car1.webp',
            '/images/drivers/ayoub/car2.webp'
        ],
        features: ['Free Wi-Fi', 'Child Seats', 'Bottled Water', 'USB Charging']
    }
];

export const driversDataFr: Driver[] = [
    {
        id: 'fetah',
        name: 'Fetah',
        image: '/images/drivers/fetah/driver.webp',
        rating: 5.0,
        experienceYears: 15,
        languages: ['Anglais', 'Français', 'Arabe', 'Espagnol'],
        bio: 'Fetah est un chauffeur privé professionnel avec plus de 15 ans d\'expérience sur les routes du Maroc. Reconnu pour sa ponctualité irréprochable et sa connaissance approfondie de l\'histoire et des trésors cachés du pays, il transforme chaque transfert et chaque circuit en un voyage exclusif et confortable — de l\'accueil VIP à l\'aéroport aux grands tours de plusieurs jours.',
        vehicleTypes: ['Skoda Superb', 'Ford Tourneo Custom'],
        specialties: ['Services VIP', 'Itinéraires sur mesure', 'Grands Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fès', 'Tanger'],
        preferredTours: ['Le Grand Tour du Maroc', 'Luxe des Villes Impériales'],
        pricePerDay: 200,
        badges: ['Spécialiste VIP', 'Expert Luxe', 'Meilleures Notes'],
        availability: true,
        fleet: [
            { name: 'Skoda Superb', image: '/images/drivers/fetah/car1.webp', pax: 3, luggage: 3 },
            { name: 'Ford Tourneo Custom', image: '/images/drivers/fetah/car3.webp', pax: 8, luggage: 8 },
        ],
        gallery: [
            '/images/drivers/fetah/car1.webp',
            '/images/drivers/fetah/car2.webp',
            '/images/drivers/fetah/car3.webp',
            '/images/drivers/fetah/car4.webp'
        ],
        features: ['Wi-Fi Premium', 'Rafraîchissements', 'Service Conciergerie', 'Intérieurs de Luxe', 'Sièges Massants']
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.webp',
        rating: 4.9,
        experienceYears: 8,
        languages: ['Anglais', 'Français', 'Arabe'],
        bio: 'Ayoub est un chauffeur indépendant passionné, connu pour son sourire chaleureux et sa conduite sûre. Spécialisé dans les voyages en famille et les couples cherchant un rythme détendu, il sait exactement comment organiser une expérience sans stress. Son amour pour la photographie signifie qu\'il connaît toujours les meilleurs endroits pour vos photos de vacances.',
        vehicleTypes: ['Ford Tourneo Custom'],
        specialties: ['Voyages en famille', 'Montagnes de l\'Atlas', 'Photographie'],
        locations: ['Marrakech', 'Vallée de l\'Ourika', 'Essaouira'],
        preferredTours: ['Excursion dans l\'Atlas', 'Évasion à Essaouira'],
        pricePerDay: 130,
        badges: ['Favori des familles', 'Chauffeur prudent', 'Expert local'],
        availability: true,
        fleet: [
            { name: 'Ford Tourneo Custom', image: '/images/drivers/ayoub/car1.webp', pax: 8, luggage: 8 },
        ],
        gallery: [
            '/images/drivers/ayoub/car1.webp',
            '/images/drivers/ayoub/car2.webp'
        ],
        features: ['Wi-Fi gratuit', 'Sièges bébé', 'Eau embouteillée', 'Chargeurs USB']
    }
];
