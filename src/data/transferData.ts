// ============================================================
// Transfer / Fleet / FAQ / Google Reviews data — Marrakech
// Architecture mirrors justluxurytransfers.com (see docs/reference-audit/)
// with by-marrakech design + Marrakech-based content.
//
// ⚠️ PLACEHOLDER CONTENT: prices and Google reviews must be confirmed by
// the client before launch. Vehicle photos are our own fleet renders.
// ============================================================

export interface FleetVehicle {
    id: string;
    name: string;
    category: string; // SEDAN | VIP | VAN | MINIBUS | 4X4
    pax: number;
    luggage: number;
    fromPrice: number; // EUR, per transfer
    image: string;
    description: string;
    features: string[];
}

export interface TransferRoute {
    id: string;
    from: string;
    to: string;
    distance: string;
    duration: string;
    fromPrice: number; // EUR, per vehicle
    image: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface GoogleReview {
    name: string;
    date: string;
    rating: number;
    text: string;
}

const fleetEN: FleetVehicle[] = [
    {
        id: 'ford-tourneo-1',
        name: 'Ford Tourneo Custom',
        category: 'VAN',
        pax: 7,
        luggage: 7,
        fromPrice: 130,
        image: '/images/fleet/ford-tourneo-custom.webp',
        description: 'A modern 7-seater van, ideal for families and small groups heading to the medina, the Atlas or the coast.',
        features: ['Up to 7 passengers', 'Full air conditioning', 'Generous luggage space', 'Comfort suspension'],
    },
    {
        id: 'ford-tourneo-2',
        name: 'Ford Tourneo Custom',
        category: 'VAN',
        pax: 7,
        luggage: 7,
        fromPrice: 130,
        image: '/images/fleet/ford-tourneo-custom.webp',
        description: 'A modern 7-seater van, ideal for families and small groups heading to the medina, the Atlas or the coast.',
        features: ['Up to 7 passengers', 'Full air conditioning', 'Generous luggage space', 'Comfort suspension'],
    },
    {
        id: 'ford-tourneo-3',
        name: 'Ford Tourneo Custom',
        category: 'VAN',
        pax: 7,
        luggage: 7,
        fromPrice: 130,
        image: '/images/fleet/ford-tourneo-custom.webp',
        description: 'A modern 7-seater van, ideal for families and small groups heading to the medina, the Atlas or the coast.',
        features: ['Up to 7 passengers', 'Full air conditioning', 'Generous luggage space', 'Comfort suspension'],
    },
    {
        id: 'fiat-scudo-1',
        name: 'Fiat Scudo',
        category: 'VAN',
        pax: 7,
        luggage: 6,
        fromPrice: 130,
        image: '/images/fleet/fiat-scudo.webp',
        description: 'Compact and easy through the medina lanes — a nimble 7-seater for city transfers and short excursions.',
        features: ['Up to 7 passengers', 'Air conditioning', 'Easy medina access', 'USB charging'],
    },
    {
        id: 'fiat-scudo-2',
        name: 'Fiat Scudo',
        category: 'VAN',
        pax: 7,
        luggage: 6,
        fromPrice: 130,
        image: '/images/fleet/fiat-scudo.webp',
        description: 'Compact and easy through the medina lanes — a nimble 7-seater for city transfers and short excursions.',
        features: ['Up to 7 passengers', 'Air conditioning', 'Easy medina access', 'USB charging'],
    },
    {
        id: 'fiat-scudo-3',
        name: 'Fiat Scudo',
        category: 'VAN',
        pax: 7,
        luggage: 6,
        fromPrice: 130,
        image: '/images/fleet/fiat-scudo.webp',
        description: 'Compact and easy through the medina lanes — a nimble 7-seater for city transfers and short excursions.',
        features: ['Up to 7 passengers', 'Air conditioning', 'Easy medina access', 'USB charging'],
    },
    {
        id: 'volkswagen-crafter-1',
        name: 'Volkswagen Crafter',
        category: 'MINIBUS',
        pax: 17,
        luggage: 17,
        fromPrice: 170,
        image: '/images/fleet/volkswagen-crafter.webp',
        description: 'Group travel without compromise — up to 17 guests in air-conditioned comfort, with room for every case.',
        features: ['Up to 17 passengers', 'Full air conditioning', 'High roof, easy boarding', 'Large luggage hold'],
    },
    {
        id: 'volkswagen-crafter-2',
        name: 'Volkswagen Crafter',
        category: 'MINIBUS',
        pax: 17,
        luggage: 17,
        fromPrice: 170,
        image: '/images/fleet/volkswagen-crafter.webp',
        description: 'Group travel without compromise — up to 17 guests in air-conditioned comfort, with room for every case.',
        features: ['Up to 17 passengers', 'Full air conditioning', 'High roof, easy boarding', 'Large luggage hold'],
    },
    {
        id: 'man-tge-1',
        name: 'MAN TGE',
        category: 'MINIBUS',
        pax: 17,
        luggage: 17,
        fromPrice: 170,
        image: '/images/fleet/man-tge.webp',
        description: 'Our 17-seat minibus for weddings, corporate groups and multi-family trips.',
        features: ['Up to 17 passengers', 'Full air conditioning', 'PA-ready cabin', 'Trailer on request'],
    },
    {
        id: 'man-tge-2',
        name: 'MAN TGE',
        category: 'MINIBUS',
        pax: 17,
        luggage: 17,
        fromPrice: 170,
        image: '/images/fleet/man-tge.webp',
        description: 'Our 17-seat minibus for weddings, corporate groups and multi-family trips.',
        features: ['Up to 17 passengers', 'Full air conditioning', 'PA-ready cabin', 'Trailer on request'],
    },
];

// FLEET — FR (same vehicles, localised copy)
const fleetFR: FleetVehicle[] = fleetEN.map((vehicle) => {
    const copy: Record<string, { description: string; features: string[] }> = {
        'Ford Tourneo Custom': {
            description: 'Un van moderne 7 places, idéal pour les familles et les petits groupes en route vers la médina, l\'Atlas ou la côte.',
            features: ['Jusqu\'à 7 passagers', 'Climatisation intégrale', 'Grand espace bagages', 'Suspension confort'],
        },
        'Fiat Scudo': {
            description: 'Compact et agile dans les ruelles de la médina — un 7 places maniable pour les transferts en ville et les courtes excursions.',
            features: ['Jusqu\'à 7 passagers', 'Climatisation', 'Accès facile à la médina', 'Recharge USB'],
        },
        'Volkswagen Crafter': {
            description: 'Le voyage en groupe sans compromis — jusqu\'à 17 passagers dans un confort climatisé, avec de la place pour chaque valise.',
            features: ['Jusqu\'à 17 passagers', 'Climatisation intégrale', 'Toit haut, accès facile', 'Grande soute à bagages'],
        },
        'MAN TGE': {
            description: 'Notre minibus de 17 places — pour les mariages, les groupes d\'entreprise et les voyages multi-familles.',
            features: ['Jusqu\'à 17 passagers', 'Climatisation intégrale', 'Cabine sonorisée', 'Remorque sur demande'],
        },
    };
    return { ...vehicle, ...(copy[vehicle.name] ?? {}) };
});

// ------------------------------------------------------------
// TRANSFER ROUTES — from Marrakech (RAK)
// TODO(client): confirm prices — currently market-realistic placeholders
// ------------------------------------------------------------
const routesEN: TransferRoute[] = [
    { id: 'rak-medina', from: 'Marrakech Airport (RAK)', to: 'Medina & City Center', distance: '6 km', duration: '15 min', fromPrice: 15, image: '/images/marrakech.webp' },
    { id: 'rak-palmeraie', from: 'Marrakech Airport (RAK)', to: 'Palmeraie & Resorts', distance: '12 km', duration: '25 min', fromPrice: 20, image: '/images/hero.jpeg' },
    { id: 'marrakech-ourika', from: 'Marrakech', to: 'Ourika Valley (Atlas)', distance: '60 km', duration: '1h', fromPrice: 30, image: '/images/Ourika Valley.webp' },
    { id: 'marrakech-essaouira', from: 'Marrakech', to: 'Essaouira', distance: '190 km', duration: '2h 45', fromPrice: 95, image: '/images/Essaouira.webp' },
    { id: 'marrakech-ouarzazate', from: 'Marrakech', to: 'Ouarzazate & Aït Ben Haddou', distance: '200 km', duration: '3h 30', fromPrice: 120, image: '/images/ouarzazate.webp' },
    { id: 'marrakech-casablanca', from: 'Marrakech', to: 'Casablanca (CMN)', distance: '240 km', duration: '2h 45', fromPrice: 140, image: '/images/casablanca.webp' },
];

const routesFR: TransferRoute[] = [
    { ...routesEN[0], from: 'Aéroport de Marrakech (RAK)', to: 'Médina & Centre-ville' },
    { ...routesEN[1], from: 'Aéroport de Marrakech (RAK)', to: 'Palmeraie & Resorts' },
    { ...routesEN[2], from: 'Marrakech', to: 'Vallée de l\'Ourika (Atlas)' },
    { ...routesEN[3], from: 'Marrakech', to: 'Essaouira' },
    { ...routesEN[4], from: 'Marrakech', to: 'Ouarzazate & Aït Ben Haddou' },
    { ...routesEN[5], from: 'Marrakech', to: 'Casablanca (CMN)' },
];

// ------------------------------------------------------------
// FAQ — mirrors the reference site's 7 objections, Marrakech-flavoured
// ------------------------------------------------------------
const faqEN: FaqItem[] = [
    {
        question: 'Is the price per vehicle or per person?',
        answer: 'All our prices are per vehicle, not per person. The price you see covers the whole car — whether you travel alone or fill every seat, it never changes.',
    },
    {
        question: 'Are your transfers private?',
        answer: 'Yes — 100% private. You will never share the vehicle with strangers. Your driver waits for you, your luggage travels with you, and you leave when you are ready.',
    },
    {
        question: 'Do you track delayed flights?',
        answer: 'We monitor every arrival into Marrakech Menara Airport (RAK) in real time. If your flight is delayed, your driver adjusts automatically — at no extra cost.',
    },
    {
        question: 'Is there free waiting time?',
        answer: 'Yes. Airport pickups include 60 minutes of free waiting after landing, with meet & greet in the arrivals hall. Hotel and riad pickups include 15 minutes.',
    },
    {
        question: 'Do you provide child seats?',
        answer: 'Yes — baby seats and boosters are available free of charge. Just tell us the ages of your children when booking and we will have them installed.',
    },
    {
        question: 'Can we pay in cash?',
        answer: 'Yes. You can pay the driver in cash in EUR or MAD, or settle in advance by bank transfer. No prepayment is required to confirm your booking.',
    },
    {
        question: 'My riad is inside the medina — where will I be dropped off?',
        answer: 'Most of the medina is pedestrian-only. Your driver will take you to the closest accessible gate and, on request, arrange a porter to walk you and your luggage to the door of your riad.',
    },
];

const faqFR: FaqItem[] = [
    {
        question: 'Le prix est-il par véhicule ou par personne ?',
        answer: 'Tous nos prix s\'entendent par véhicule, et non par personne. Le prix affiché couvre toute la voiture — que vous voyagiez seul ou à pleine capacité, il ne change jamais.',
    },
    {
        question: 'Vos transferts sont-ils privés ?',
        answer: 'Oui — 100 % privés. Vous ne partagerez jamais le véhicule avec des inconnus. Votre chauffeur vous attend, vos bagages voyagent avec vous, et vous partez quand vous êtes prêt.',
    },
    {
        question: 'Suivez-vous les vols retardés ?',
        answer: 'Nous suivons en temps réel chaque arrivée à l\'aéroport Marrakech Ménara (RAK). Si votre vol est retardé, votre chauffeur s\'adapte automatiquement — sans frais supplémentaires.',
    },
    {
        question: 'Y a-t-il un temps d\'attente gratuit ?',
        answer: 'Oui. Les prises en charge à l\'aéroport incluent 60 minutes d\'attente gratuite après l\'atterrissage, avec accueil personnalisé dans le hall des arrivées. Les prises en charge en hôtel ou riad incluent 15 minutes.',
    },
    {
        question: 'Fournissez-vous des sièges enfants ?',
        answer: 'Oui — sièges bébé et rehausseurs sont disponibles gratuitement. Indiquez-nous simplement l\'âge de vos enfants lors de la réservation.',
    },
    {
        question: 'Peut-on payer en espèces ?',
        answer: 'Oui. Vous pouvez régler le chauffeur en espèces en EUR ou MAD, ou à l\'avance par virement bancaire. Aucun prépaiement n\'est requis pour confirmer votre réservation.',
    },
    {
        question: 'Mon riad est dans la médina — où serai-je déposé ?',
        answer: 'La médina est en grande partie piétonne. Votre chauffeur vous conduira à la porte accessible la plus proche et, sur demande, organisera un porteur pour vous accompagner jusqu\'à votre riad.',
    },
];

// ------------------------------------------------------------
// GOOGLE REVIEWS
// ⚠️ TODO(client): replace with REAL Google reviews + real rating/count/link.
// These placeholders exist only to demonstrate the section.
// ------------------------------------------------------------
export const googleReviewsConfig = {
    rating: 5.0,
    reviewCount: 127, // TODO(client): real count
    mapsUrl: 'https://maps.google.com', // TODO(client): real Google Maps listing URL
};

const googleReviews: GoogleReview[] = [
    {
        name: 'Sophie Laurent',
        date: 'a month ago',
        rating: 5,
        text: 'Perfect from start to finish. Our driver was waiting at Marrakech airport with a name sign, helped with all our bags and got us to our riad gate in no time — he even arranged a porter through the medina. Will book again!',
    },
    {
        name: 'James Whitfield',
        date: '2 months ago',
        rating: 5,
        text: 'We used Xhosen Gate for a day trip to Ourika Valley and a transfer to Essaouira. Both times: immaculate car, safe driving, fair fixed price agreed upfront. The WhatsApp booking took two minutes.',
    },
    {
        name: 'Elena Rossi',
        date: '2 months ago',
        rating: 5,
        text: 'Our flight landed 1h late and the driver was still there waiting with a smile — no extra charge. The van was spotless and the kids\' seats were already installed. Highly recommended for families.',
    },
    {
        name: 'Karim Benali',
        date: '3 months ago',
        rating: 5,
        text: 'Professional team. I booked the 4x4 for an Agafay desert evening — the driver knew every track and the sunset stop was unforgettable. Transparent pricing, no surprises.',
    },
    {
        name: 'Anna Schmidt',
        date: '4 months ago',
        rating: 5,
        text: 'Very reliable. They tracked our delayed flight, messaged us on WhatsApp before landing and the car was cool and ready. The best transfer experience we have had in Morocco.',
    },
    {
        name: 'Lucas Moreau',
        date: '5 months ago',
        rating: 5,
        text: 'Excellent service pour notre groupe de 14 personnes — minibus impeccable, chauffeur ponctuel et très arrangeant sur les horaires. Je recommande vivement.',
    },
];

// ------------------------------------------------------------
// Getters
// ------------------------------------------------------------
export function getFleet(locale: string): FleetVehicle[] {
    return locale === 'fr' ? fleetFR : fleetEN;
}

export function getRoutes(locale: string): TransferRoute[] {
    return locale === 'fr' ? routesFR : routesEN;
}

export function getFaq(locale: string): FaqItem[] {
    return locale === 'fr' ? faqFR : faqEN;
}

export function getGoogleReviews(): GoogleReview[] {
    return googleReviews;
}

// Re-exported from lib/contact so the many callers here keep working while the
// number itself lives in one place.
export { WHATSAPP_NUMBER, whatsappLink } from '@/lib/contact';
