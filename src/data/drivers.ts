// Drivers — individual professional chauffeurs, each with their own page
// (/drivers/[id]) and their own personal fleet. No company/brand concept.
//
// Vehicle photography: every vehicle carries a real photograph of that model,
// shared with the /fleet page from public/images/fleet/. Credits and licences
// are recorded in docs/fleet-image-credits.md. When a driver sends a photo of
// his own vehicle, point `image` at it instead.

export type VehicleClass = 'sedan' | 'suv' | 'van' | 'minibus';

export interface DriverVehicle {
    name: string;
    vehicleClass: VehicleClass;
    pax: number;
    luggage: number;
    image: string;
}

/** Display name for a vehicle class, used under the photo on driver pages. */
const CLASS_LABELS: Record<VehicleClass, { en: string; fr: string }> = {
    sedan: { en: 'Sedan', fr: 'Berline' },
    suv: { en: 'SUV', fr: 'SUV' },
    van: { en: 'Van', fr: 'Van' },
    minibus: { en: 'Minibus', fr: 'Minibus' },
};

export const vehicleClassLabel = (vehicleClass: VehicleClass, locale: string) =>
    CLASS_LABELS[vehicleClass][locale === 'fr' ? 'fr' : 'en'];

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
    badges: string[]; // e.g., "History Buff", "Desert Expert"
    availability: boolean;
    fleet: DriverVehicle[]; // the driver's own vehicles
    gallery: string[];
    features: string[]; // Wifi, Water, Child Seat, etc.
}

export const driversData: Driver[] = [
    {
        id: 'fathallah',
        name: 'Fathallah',
        image: '/images/drivers/fathallah/driver.webp',
        rating: 5.0,
        experienceYears: 15,
        languages: ['English', 'French', 'Arabic', 'Spanish'],
        bio: "Fathallah has spent more than fifteen years on Morocco's roads and knows them the way most people know their own street. Impeccably punctual, discreet and endlessly patient, he is the driver our executive clients ask for by name — and the one families trust with a 4am airport run. Whether it is a VIP pickup at Marrakech Menara or a week-long loop through the imperial cities, he plans the day to the hour and leaves you nothing to worry about.",
        vehicleTypes: ['Ford Tourneo Custom', 'Skoda Kodiaq'],
        specialties: ['VIP Transfers', 'Custom Itineraries', 'Grand Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fes', 'Tangier'],
        preferredTours: ['The Grand Morocco Tour', 'Imperial Cities Luxury'],
        badges: ['VIP Specialist', 'Long-Distance Expert', 'Top Rated'],
        availability: true,
        fleet: [
            { name: 'Ford Tourneo Custom', vehicleClass: 'van', pax: 8, luggage: 8, image: '/images/fleet/ford-tourneo-custom.webp' },
            { name: 'Skoda Kodiaq', vehicleClass: 'suv', pax: 5, luggage: 4, image: '/images/fleet/skoda-kodiaq.webp' },
        ],
        gallery: ['/images/drivers/fathallah/driver.webp'],
        features: ['Premium Wi-Fi', 'Refreshments', 'Concierge Service', 'Leather Interior', 'Child Seats'],
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.webp',
        rating: 4.9,
        experienceYears: 10,
        languages: ['English', 'French', 'Arabic'],
        bio: "Ayoub is the one you want when there are a lot of you. Between his Scudo, his Crafter and his MAN TGE he can move a couple or a party of nineteen with the same calm, and he has the rare gift of keeping a whole minibus of tired travellers in good spirits. Ten years of Atlas passes and coastal roads have made him a genuinely relaxed driver — and a keen photographer, so he always knows where to stop for the shot you did not know you wanted.",
        vehicleTypes: ['Fiat Scudo', 'Volkswagen Crafter', 'MAN TGE'],
        specialties: ['Groups & Families', 'Atlas Mountains', 'Photography Stops'],
        locations: ['Marrakech', 'Ourika Valley', 'Essaouira'],
        preferredTours: ['Atlas Mountains Day Trip', 'Essaouira Coastal Escape'],
        badges: ['Group Specialist', 'Family Favorite', 'Safe Driver'],
        availability: true,
        fleet: [
            { name: 'Fiat Scudo', vehicleClass: 'van', pax: 8, luggage: 6, image: '/images/fleet/fiat-scudo.webp' },
            { name: 'Volkswagen Crafter', vehicleClass: 'minibus', pax: 16, luggage: 16, image: '/images/fleet/volkswagen-crafter.webp' },
            { name: 'MAN TGE', vehicleClass: 'minibus', pax: 19, luggage: 19, image: '/images/fleet/man-tge.webp' },
        ],
        gallery: ['/images/drivers/ayoub/driver.webp'],
        features: ['Free Wi-Fi', 'Child Seats', 'Bottled Water', 'USB Charging', 'Extra Luggage Space'],
    },
    {
        id: 'hassan',
        name: 'Hassan',
        image: '/images/drivers/hassan/driver.webp',
        rating: 5.0,
        experienceYears: 22,
        languages: ['English', 'French', 'Arabic'],
        bio: "Twenty-two years behind the wheel make Hassan the most senior driver on our roster, and it shows in the little things — the smoothest ride of anyone here, a sixth sense for traffic in the medina, and a story for every kasbah between Marrakech and Merzouga. He runs the same big-group fleet as Ayoub, so no party is too large, and he treats every passenger like a guest in his own home.",
        vehicleTypes: ['Fiat Scudo', 'Volkswagen Crafter', 'MAN TGE'],
        specialties: ['Groups & Coaches', 'Desert Routes', 'Local History'],
        locations: ['Marrakech', 'Ouarzazate', 'Merzouga', 'Zagora'],
        preferredTours: ['Merzouga Desert 3 Days Tour', 'Zagora Desert Experience'],
        badges: ['Most Experienced', 'Desert Expert', 'Top Rated'],
        availability: true,
        fleet: [
            { name: 'Fiat Scudo', vehicleClass: 'van', pax: 8, luggage: 6, image: '/images/fleet/fiat-scudo.webp' },
            { name: 'Volkswagen Crafter', vehicleClass: 'minibus', pax: 16, luggage: 16, image: '/images/fleet/volkswagen-crafter.webp' },
            { name: 'MAN TGE', vehicleClass: 'minibus', pax: 19, luggage: 19, image: '/images/fleet/man-tge.webp' },
        ],
        gallery: ['/images/drivers/hassan/driver.webp'],
        features: ['Free Wi-Fi', 'Bottled Water', 'Child Seats', 'Cool Box', 'Extra Luggage Space'],
    },
];

export const driversDataFr: Driver[] = [
    {
        id: 'fathallah',
        name: 'Fathallah',
        image: '/images/drivers/fathallah/driver.webp',
        rating: 5.0,
        experienceYears: 15,
        languages: ['Anglais', 'Français', 'Arabe', 'Espagnol'],
        bio: "Fathallah a passé plus de quinze ans sur les routes du Maroc et les connaît comme sa propre rue. Ponctuel à la minute, discret et d'une patience infinie, c'est le chauffeur que nos clients d'affaires réclament par son nom — et celui à qui les familles confient un transfert à 4h du matin. Accueil VIP à Marrakech Menara ou boucle d'une semaine à travers les villes impériales : il planifie la journée à l'heure près et ne vous laisse rien à gérer.",
        vehicleTypes: ['Ford Tourneo Custom', 'Skoda Kodiaq'],
        specialties: ['Transferts VIP', 'Itinéraires sur mesure', 'Grands Tours'],
        locations: ['Marrakech', 'Casablanca', 'Fès', 'Tanger'],
        preferredTours: ['Le Grand Tour du Maroc', 'Luxe des Villes Impériales'],
        badges: ['Spécialiste VIP', 'Expert longue distance', 'Meilleures Notes'],
        availability: true,
        fleet: [
            { name: 'Ford Tourneo Custom', vehicleClass: 'van', pax: 8, luggage: 8, image: '/images/fleet/ford-tourneo-custom.webp' },
            { name: 'Skoda Kodiaq', vehicleClass: 'suv', pax: 5, luggage: 4, image: '/images/fleet/skoda-kodiaq.webp' },
        ],
        gallery: ['/images/drivers/fathallah/driver.webp'],
        features: ['Wi-Fi Premium', 'Rafraîchissements', 'Service Conciergerie', 'Intérieur cuir', 'Sièges bébé'],
    },
    {
        id: 'ayoub',
        name: 'Ayoub',
        image: '/images/drivers/ayoub/driver.webp',
        rating: 4.9,
        experienceYears: 10,
        languages: ['Anglais', 'Français', 'Arabe'],
        bio: "Ayoub, c'est le chauffeur qu'il vous faut quand vous êtes nombreux. Entre son Scudo, son Crafter et son MAN TGE, il déplace un couple ou un groupe de dix-neuf personnes avec le même calme, et il a le don rare de garder tout un minibus de voyageurs fatigués de bonne humeur. Dix ans de cols de l'Atlas et de routes côtières en ont fait un conducteur vraiment détendu — et un photographe passionné, qui sait toujours où s'arrêter pour la photo que vous ne saviez pas vouloir.",
        vehicleTypes: ['Fiat Scudo', 'Volkswagen Crafter', 'MAN TGE'],
        specialties: ['Groupes & Familles', "Montagnes de l'Atlas", 'Arrêts photo'],
        locations: ['Marrakech', "Vallée de l'Ourika", 'Essaouira'],
        preferredTours: ["Excursion dans l'Atlas", 'Évasion à Essaouira'],
        badges: ['Spécialiste groupes', 'Favori des familles', 'Chauffeur prudent'],
        availability: true,
        fleet: [
            { name: 'Fiat Scudo', vehicleClass: 'van', pax: 8, luggage: 6, image: '/images/fleet/fiat-scudo.webp' },
            { name: 'Volkswagen Crafter', vehicleClass: 'minibus', pax: 16, luggage: 16, image: '/images/fleet/volkswagen-crafter.webp' },
            { name: 'MAN TGE', vehicleClass: 'minibus', pax: 19, luggage: 19, image: '/images/fleet/man-tge.webp' },
        ],
        gallery: ['/images/drivers/ayoub/driver.webp'],
        features: ['Wi-Fi gratuit', 'Sièges bébé', 'Eau embouteillée', 'Chargeurs USB', 'Grand coffre'],
    },
    {
        id: 'hassan',
        name: 'Hassan',
        image: '/images/drivers/hassan/driver.webp',
        rating: 5.0,
        experienceYears: 22,
        languages: ['Anglais', 'Français', 'Arabe'],
        bio: "Vingt-deux ans au volant font de Hassan le chauffeur le plus expérimenté de notre équipe, et cela se sent dans les détails — la conduite la plus douce de tous, un sixième sens pour la circulation de la médina, et une histoire pour chaque kasbah entre Marrakech et Merzouga. Il dispose de la même flotte grands groupes qu'Ayoub : aucun groupe n'est trop grand, et il traite chaque passager comme un invité chez lui.",
        vehicleTypes: ['Fiat Scudo', 'Volkswagen Crafter', 'MAN TGE'],
        specialties: ['Groupes & Autocars', 'Routes du désert', 'Histoire locale'],
        locations: ['Marrakech', 'Ouarzazate', 'Merzouga', 'Zagora'],
        preferredTours: ['Circuit de 3 jours au désert de Merzouga', 'Expérience du désert de Zagora'],
        badges: ['Le plus expérimenté', 'Expert du désert', 'Meilleures Notes'],
        availability: true,
        fleet: [
            { name: 'Fiat Scudo', vehicleClass: 'van', pax: 8, luggage: 6, image: '/images/fleet/fiat-scudo.webp' },
            { name: 'Volkswagen Crafter', vehicleClass: 'minibus', pax: 16, luggage: 16, image: '/images/fleet/volkswagen-crafter.webp' },
            { name: 'MAN TGE', vehicleClass: 'minibus', pax: 19, luggage: 19, image: '/images/fleet/man-tge.webp' },
        ],
        gallery: ['/images/drivers/hassan/driver.webp'],
        features: ['Wi-Fi gratuit', 'Eau embouteillée', 'Sièges bébé', 'Glacière', 'Grand coffre'],
    },
];
