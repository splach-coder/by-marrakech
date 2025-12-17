export interface BrandInfo {
    logo?: string;
    banner?: string;
    description?: string;
    companyName?: string;
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
    gallery: string[];
    features: string[]; // Wifi, Water, Child Seat, etc.
    hasBrand?: boolean;
    brandInfo?: BrandInfo;
}

export const driversData: Driver[] = [
    {
        id: 'fetah',
        name: 'Fetah',
        image: '/images/drivers/fetah/driver.jpeg',
        rating: 5.0,
        experienceYears: 15,
        languages: ['English', 'French', 'Arabic', 'Spanish'],
        bio: 'Fetah is not just a driver; he is the founder of a premier transport service dedicated to luxury and comfort. With over 15 years of experience, he leads a team of professionals committed to excellence. His deep knowledge of Morocco’s history and hidden gems ensures every journey is an exclusive adventure.',
        vehicleTypes: ['Luxury Mercedes V-Class', 'Luxury SUV'],
        specialties: ['VIP Services', 'Custom Itineraries', 'Grand Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fes', 'Tangier'],
        preferredTours: ['The Grand Morocco Tour', 'Imperial Cities Luxury'],
        pricePerDay: 200,
        badges: ['Agency Owner', 'VIP Specialist', 'Luxury Expert'],
        availability: true,
        hasBrand: true,
        brandInfo: {
            companyName: 'Prestige Morocco Travels',
            banner: '/images/drivers/fetah/brand2.jpeg',
            logo: '/images/drivers/fetah/brand1.jpeg',
            description: 'Experience the pinnacle of Moroccan hospitality with Fetah’s exclusive transport service.'
        },
        gallery: [
            '/images/drivers/fetah/car1.jpeg',
            '/images/drivers/fetah/car2.jpeg',
            '/images/drivers/fetah/car3.jpeg',
            '/images/drivers/fetah/car4.jpeg'
        ],
        features: ['Premium Wi-Fi', 'Refreshments', 'Concierge Service', 'Luxury Interiors', 'Massage Seats']
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.jpeg',
        rating: 4.9,
        experienceYears: 8,
        languages: ['English', 'French', 'Arabic'],
        bio: 'Ayoub is a passionate independent driver known for his warm smile and safe driving. Specializing in family trips and couples seeking a relaxed pace, he knows exactly how to curate a stress-free experience. His love for photography means he always knows the best spots for your vacation photos.',
        vehicleTypes: ['Comfort SUV', 'Minivan'],
        specialties: ['Family Trips', 'Atlas Mountains', 'Photography'],
        locations: ['Marrakech', 'Ourika Valley', 'Essaouira'],
        preferredTours: ['Atlas Mountains Day Trip', 'Essaouira Coastal Escape'],
        pricePerDay: 130,
        badges: ['Family Favorite', 'Safe Driver', 'Local Expert'],
        availability: true,
        hasBrand: false,
        gallery: [
            '/images/drivers/ayoub/car1.jpeg',
            '/images/drivers/ayoub/car2.jpeg'
        ],
        features: ['Free Wi-Fi', 'Child Seats', 'Bottled Water', 'USB Charging']
    }
];

export const driversDataFr: Driver[] = [
    {
        id: 'fetah',
        name: 'Fetah',
        image: '/images/drivers/fetah/driver.jpeg',
        rating: 5.0,
        experienceYears: 15,
        languages: ['Anglais', 'Français', 'Arabe', 'Espagnol'],
        bio: 'Fetah n’est pas seulement un chauffeur ; il est le fondateur d’un service de transport de premier plan dédié au luxe et au confort. Avec plus de 15 ans d’expérience, il dirige une équipe de professionnels dévoués à l’excellence. Sa connaissance approfondie de l’histoire du Maroc et de ses trésors cachés garantit que chaque voyage est une aventure exclusive.',
        vehicleTypes: ['Mercedes Classe V Luxe', 'SUV de Luxe'],
        specialties: ['Services VIP', 'Itinéraires sur mesure', 'Grands Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fès', 'Tanger'],
        preferredTours: ['Le Grand Tour du Maroc', 'Luxe des Villes Impériales'],
        pricePerDay: 200,
        badges: ['Propriétaire d’agence', 'Spécialiste VIP', 'Expert Luxe'],
        availability: true,
        hasBrand: true,
        brandInfo: {
            companyName: 'Prestige Morocco Travels',
            banner: '/images/drivers/fetah/brand2.jpeg',
            logo: '/images/drivers/fetah/brand1.jpeg',
            description: 'Vivez le summum de l’hospitalité marocaine avec le service de transport exclusif de Fetah.'
        },
        gallery: [
            '/images/drivers/fetah/car1.jpeg',
            '/images/drivers/fetah/car2.jpeg',
            '/images/drivers/fetah/car3.jpeg',
            '/images/drivers/fetah/car4.jpeg'
        ],
        features: ['Wi-Fi Premium', 'Rafraîchissements', 'Service Conciergerie', 'Intérieurs de Luxe', 'Sièges Massants']
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.jpeg',
        rating: 4.9,
        experienceYears: 8,
        languages: ['Anglais', 'Français', 'Arabe'],
        bio: 'Ayoub est un chauffeur indépendant passionné, connu pour son sourire chaleureux et sa conduite sûre. Spécialisé dans les voyages en famille et les couples cherchant un rythme détendu, il sait exactement comment organiser une expérience sans stress. Son amour pour la photographie signifie qu’il connaît toujours les meilleurs endroits pour vos photos de vacances.',
        vehicleTypes: ['SUV Confort', 'Minivan'],
        specialties: ['Voyages en famille', 'Montagnes de l’Atlas', 'Photographie'],
        locations: ['Marrakech', 'Vallée de l’Ourika', 'Essaouira'],
        preferredTours: ['Excursion dans l’Atlas', 'Évasion à Essaouira'],
        pricePerDay: 130,
        badges: ['Favori des familles', 'Chauffeur prudent', 'Expert local'],
        availability: true,
        hasBrand: false,
        gallery: [
            '/images/drivers/ayoub/car1.jpeg',
            '/images/drivers/ayoub/car2.jpeg'
        ],
        features: ['Wi-Fi gratuit', 'Sièges bébé', 'Eau embouteillée', 'Chargeurs USB']
    }
];