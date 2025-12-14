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
        image: '/images/drivers/hassan.jpg',
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
        gallery: ['/images/drivers/car-suv.jpg', '/images/drivers/hassan-driving.jpg'],
        features: ['Free Wi-Fi', 'Bottled Water', 'Child Seats', 'USB Charging', 'Local Snacks']
    },
    {
        id: '2',
        name: 'Youssef Benali',
        image: '/images/drivers/youssef.jpg',
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
        gallery: ['/images/drivers/car-sedan.jpg', '/images/drivers/youssef-coastal.jpg'],
        features: ['Free Wi-Fi', 'Bottled Water', 'Bluetooth Music', 'A/C Control']
    },
    {
        id: '3',
        name: 'Omar Zaid',
        image: '/images/drivers/omar.jpg',
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
        gallery: ['/images/drivers/car-van.jpg', '/images/drivers/omar-road.jpg'],
        features: ['Free Wi-Fi', 'Bottled Water', 'Reclining Seats', 'Luggage Assistance', 'First Aid Kit']
    },
    {
        id: '4',
        name: 'Karim Tazi',
        image: '/images/drivers/karim.jpg',
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
        gallery: ['/images/drivers/car-suv-2.jpg', '/images/drivers/karim-food.jpg'],
        features: ['Free Wi-Fi', 'Child Seats', 'Tablet for Kids', 'Snacks']
    }
];
