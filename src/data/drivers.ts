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
}

export const driversData: Driver[] = [
    {
        id: '1',
        name: 'Hassan Amrani',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        experienceYears: 12,
        languages: ['English', 'French', 'Arabic', 'Spanish'],
        bio: 'Born in the Atlas Mountains, I have spent over a decade sharing the hidden secrets of Morocco with travelers. My passion is connecting you with authentic local culture.',
        vehicleTypes: ['Luxury SUV', 'Minivan'],
        specialties: ['Atlas Mountains', 'Desert Expeditions', 'Family Trips'],
        locations: ['Marrakech', 'Ouarzazate', 'Merzouga'],
        preferredTours: ['Atlas Valleys & Waterfalls', 'Sahara Desert Adventure'],
        pricePerDay: 150,
        badges: ['Top Rated', 'History Expert', 'Photographer'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80'
        ],
        features: ['Free Wi-Fi', 'Bottled Water', 'Child Seats', 'USB Charging', 'Local Snacks']
    },
    {
        id: '2',
        name: 'Youssef Benali',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        experienceYears: 8,
        languages: ['English', 'German', 'Arabic'],
        bio: 'I specialize in creating relaxed, flexible itineraries for couples and photographers. I know the best times to visit popular spots to avoid crowds.',
        vehicleTypes: ['Luxury Sedan', 'SUV'],
        specialties: ['Coastal Routes', 'City Tours', 'Photography'],
        locations: ['Essaouira', 'Agadir', 'Marrakech'],
        preferredTours: ['Essaouira Coastal Escape', 'Marrakech City Tour'],
        pricePerDay: 140,
        badges: ['Photography Expert', 'Coastal Specialist'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
        ],
        features: ['Free Wi-Fi', 'Bottled Water', 'Bluetooth Music', 'A/C Control']
    },
    {
        id: '3',
        name: 'Omar Zaid',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        experienceYears: 15,
        languages: ['English', 'French', 'Italian', 'Arabic'],
        bio: 'A veteran driver who loves long-distance journeys. Whether it is the Imperial Cities or the deep Sahara, I ensure comfort and safety every mile.',
        vehicleTypes: ['Luxury Van', 'Minibus'],
        specialties: ['Imperial Cities', 'Grand Tours', 'Groups'],
        locations: ['Fes', 'Meknes', 'Rabat', 'Casablanca'],
        preferredTours: ['Imperial Cities Tour', 'Fes Medina Discovery'],
        pricePerDay: 180,
        badges: ['Group Specialist', 'History Buff'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
        ],
        features: ['Free Wi-Fi', 'Bottled Water', 'Reclining Seats', 'Luggage Assistance', 'First Aid Kit']
    },
    {
        id: '4',
        name: 'Karim Tazi',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        experienceYears: 6,
        languages: ['English', 'French', 'Arabic'],
        bio: 'Young, energetic, and full of local tips. I love showing the modern side of Morocco alongside its ancient traditions. Great with families and kids.',
        vehicleTypes: ['SUV', 'Luxury Sedan'],
        specialties: ['Food Tours', 'Modern Morocco', 'Family Friendly'],
        locations: ['Marrakech', 'Casablanca'],
        preferredTours: ['Marrakech Food Tour', 'Casablanca Highlights'],
        pricePerDay: 130,
        badges: ['Family Friendly', 'Foodie'],
        availability: false,
        gallery: [
            'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80'
        ],
        features: ['Free Wi-Fi', 'Child Seats', 'Tablet for Kids', 'Snacks']
    }
];

export const driversDataFr: Driver[] = [
    {
        id: '1',
        name: 'Hassan Amrani',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80 ',
        rating: 5.0,
        experienceYears: 12,
        languages: ['Anglais', 'Français', 'Arabe', 'Espagnol'],
        bio: 'Né dans les montagnes de l’Atlas, j’ai passé plus de dix ans à partager les secrets cachés du Maroc avec les voyageurs. Ma passion : vous connecter avec la culture locale authentique.',
        vehicleTypes: ['SUV de luxe', 'Monospace'],
        specialties: ['Montagnes de l’Atlas', 'Expéditions dans le désert', 'Voyages en famille'],
        locations: ['Marrakech', 'Ouarzazate', 'Merzouga'],
        preferredTours: ['Vallées de l’Atlas & Cascades', 'Aventure dans le désert du Sahara'],
        pricePerDay: 150,
        badges: ['Meilleur note', 'Expert en histoire', 'Photographe'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80 ',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80 '
        ],
        features: ['Wi-Fi gratuit', 'Eau embouteillée', 'Sièges bébé', 'Chargeurs USB', 'En-cas locaux']
    },
    {
        id: '2',
        name: 'Youssef Benali',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80 ',
        rating: 4.9,
        experienceYears: 8,
        languages: ['Anglais', 'Allemand', 'Arabe'],
        bio: 'Je crée des itinéraires détendus et flexibles pour les couples et les photographes. Je connais les meilleurs moments pour visiter les sites populaires en évitant les foules.',
        vehicleTypes: ['Berline de luxe', 'SUV'],
        specialties: ['Routes côtières', 'Visites de ville', 'Photographie'],
        locations: ['Essaouira', 'Agadir', 'Marrakech'],
        preferredTours: ['Évasion côtière à Essaouira', 'Visite de la ville de Marrakech'],
        pricePerDay: 140,
        badges: ['Expert en photo', 'Spécialiste côte'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80 ',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80 '
        ],
        features: ['Wi-Fi gratuit', 'Eau embouteillée', 'Musique Bluetooth', 'Climatisation']
    },
    {
        id: '3',
        name: 'Omar Zaid',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80 ',
        rating: 4.8,
        experienceYears: 15,
        languages: ['Anglais', 'Français', 'Italien', 'Arabe'],
        bio: 'Chauffeur vétéran passionné par les longs trajets. Que ce soit les villes impériales ou le Sahara profond, je garantis confort et sécurité à chaque kilomètre.',
        vehicleTypes: ['Van de luxe', 'Minibus'],
        specialties: ['Villes impériales', 'Grands circuits', 'Groupes'],
        locations: ['Fès', 'Meknès', 'Rabat', 'Casablanca'],
        preferredTours: ['Circuit des villes impériales', 'Découverte de la médina de Fès'],
        pricePerDay: 180,
        badges: ['Spécialiste groupes', 'Passionné d’histoire'],
        availability: true,
        gallery: [
            'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=600&q=80 ',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80 '
        ],
        features: ['Wi-Fi gratuit', 'Eau embouteillée', 'Sièges inclinables', 'Aide aux bagages', 'Trousse de secours']
    },
    {
        id: '4',
        name: 'Karim Tazi',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80 ',
        rating: 5.0,
        experienceYears: 6,
        languages: ['Anglais', 'Français', 'Arabe'],
        bio: 'Jeune, dynamique et plein de bons plans locaux. J’adore montrer le Maroc moderne aux côtés de ses traditions millénaires. Parfait avec les familles et les enfants.',
        vehicleTypes: ['SUV', 'Berline de luxe'],
        specialties: ['Circuits gourmands', 'Maroc moderne', 'Familles'],
        locations: ['Marrakech', 'Casablanca'],
        preferredTours: ['Circuit gourmand Marrakech', 'Incontournables Casablanca'],
        pricePerDay: 130,
        badges: ['Familles bienvenues', 'Gourmand'],
        availability: false,
        gallery: [
            'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=600&q=80 ',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80 '
        ],
        features: ['Wi-Fi gratuit', 'Sièges bébé', 'Tablette pour enfants', 'En-cas']
    }
];