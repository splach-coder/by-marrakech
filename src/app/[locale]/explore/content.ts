// Self-contained copy for the /explore experience hub.
// Kept out of messages/*.json on purpose — this page owns its own voice.

export type ExploreLocale = 'en' | 'fr';

export interface ExploreItem {
    id: number;
    title: string;
    description: string;
    duration?: string;
    price?: string;
    trip_code?: string;
    image: { url: string; alt: string };
    banner_image?: { url: string; alt: string };
    locations?: Array<{ name: string } | string>;
    highlights?: string[];
    itinerary?: Array<{ day: number; title: string; description?: string }>;
    reviews?: Array<{ rating: number }>;
}

export const locationName = (loc: { name: string } | string): string =>
    typeof loc === 'string' ? loc : loc.name;

const en = {
    meta: {
        title: 'Tours, Excursions & Activities in Morocco | Xhosen Gate',
        description:
            'Every experience we run — grand Sahara journeys, one-day escapes from Marrakech and hands-on activities — gathered on a single page and told as one story.',
    },
    hero: {
        eyebrow: 'Tours · Excursions · Activities — the complete collection',
        titleLines: ['CHOOSE', 'YOUR', 'MOROCCO'],
        goldLine: 2, // index of the line rendered in gold
        sub: 'Grand desert journeys, sunrise-to-sunset escapes and moments you will retell forever — everything we run, on one page, told as one story.',
        scrollCue: 'Scroll to begin',
        statLabels: {
            journeys: 'Grand Journeys',
            escapes: 'Day Escapes',
            moments: 'Signature Moments',
            rating: 'Traveller rating',
        },
        chips: [
            { numeral: '01', label: 'Grand Journeys', hint: 'Multi-day Sahara routes', href: '#journeys' },
            { numeral: '02', label: 'Day Escapes', hint: 'One sunrise, one world away', href: '#escapes' },
            { numeral: '03', label: 'Signature Moments', hint: 'Activities you feel in your chest', href: '#moments' },
        ],
    },
    manifesto:
        'Some countries you visit. Morocco you cross, taste, ride and breathe — and it stays with you long after the dust has settled.',
    rail: [
        { id: 'journeys', numeral: '01', label: 'Journeys' },
        { id: 'escapes', numeral: '02', label: 'Escapes' },
        { id: 'moments', numeral: '03', label: 'Moments' },
    ],
    journeys: {
        numeral: '01',
        watermark: 'JOURNEYS',
        label: 'The Journeys',
        title: 'Days that turn into stories',
        blurb:
            'Cross the High Atlas, sleep under Saharan stars, wake to dunes on fire with sunrise. These are our long-form adventures — planned to the hour, felt for a lifetime.',
        itineraryLabel: 'The route, day by day',
        durationLabel: 'Duration',
        fromLabel: 'from',
        cta: 'View full journey',
        routeLabel: 'Route',
    },
    escapes: {
        numeral: '02',
        label: 'The Escapes',
        title: 'One sunrise. One sunset. One world away.',
        blurb:
            'Hand-built day trips out of Marrakech — waterfalls, ocean ramparts, kasbahs and imperial cities. Leave after breakfast, come back with a story.',
        dragHint: 'Keep scrolling — the road unrolls sideways',
        fromLabel: 'from',
        cta: 'Plan this escape',
        counterOf: 'of',
    },
    moments: {
        numeral: '03',
        label: 'The Moments',
        title: 'Small hours. Lifelong memories.',
        blurb:
            'A balloon lifting at dawn. A tagine you cooked yourself. Dunes taken at full throttle. Short on hours, heavy on memory — slot them into any day of your trip.',
        fromLabel: 'from',
        cta: 'Reserve this moment',
        expandHint: 'Hover or tap a panel to open it',
    },
    finale: {
        kicker: "Can't pick one?",
        title: 'Weave them into one itinerary.',
        copy:
            'Tell us your dates, your pace and what makes your heart beat faster — we will thread journeys, escapes and moments into a single seamless route, with one driver and zero logistics on your side.',
        primaryCta: 'Start planning',
        secondaryCta: 'Talk to us',
        browseLabel: 'Or browse the classic way:',
        browseLinks: [
            { label: 'All tours', href: '/tours' },
            { label: 'All excursions', href: '/experiences' },
            { label: 'All activities', href: '/activities' },
        ],
    },
};

const fr: typeof en = {
    meta: {
        title: 'Circuits, Excursions & Activités au Maroc | Xhosen Gate',
        description:
            'Toutes nos expériences — grands circuits du Sahara, escapades d’une journée depuis Marrakech et activités immersives — réunies sur une seule page, racontées comme une seule histoire.',
    },
    hero: {
        eyebrow: 'Circuits · Excursions · Activités — la collection complète',
        titleLines: ['CHOISISSEZ', 'VOTRE', 'MAROC'],
        goldLine: 2,
        sub: 'Grands voyages dans le désert, escapades du lever au coucher du soleil et moments que vous raconterez toute votre vie — tout ce que nous organisons, sur une seule page, raconté comme une seule histoire.',
        scrollCue: 'Faites défiler pour commencer',
        statLabels: {
            journeys: 'Grands Circuits',
            escapes: 'Escapades d’un Jour',
            moments: 'Moments Signature',
            rating: 'Note voyageurs',
        },
        chips: [
            { numeral: '01', label: 'Grands Circuits', hint: 'Routes sahariennes de plusieurs jours', href: '#journeys' },
            { numeral: '02', label: 'Escapades d’un Jour', hint: 'Un lever de soleil, un autre monde', href: '#escapes' },
            { numeral: '03', label: 'Moments Signature', hint: 'Des activités qui font battre le cœur', href: '#moments' },
        ],
    },
    manifesto:
        'Certains pays se visitent. Le Maroc se traverse, se goûte, se chevauche et se respire — et il reste en vous bien après que la poussière est retombée.',
    rail: [
        { id: 'journeys', numeral: '01', label: 'Circuits' },
        { id: 'escapes', numeral: '02', label: 'Escapades' },
        { id: 'moments', numeral: '03', label: 'Moments' },
    ],
    journeys: {
        numeral: '01',
        watermark: 'CIRCUITS',
        label: 'Les Circuits',
        title: 'Des jours qui deviennent des histoires',
        blurb:
            'Traversez le Haut Atlas, dormez sous les étoiles du Sahara, réveillez-vous face aux dunes embrasées par l’aube. Nos aventures au long cours — planifiées à l’heure près, ressenties pour la vie.',
        itineraryLabel: 'La route, jour par jour',
        durationLabel: 'Durée',
        fromLabel: 'dès',
        cta: 'Voir le circuit complet',
        routeLabel: 'Itinéraire',
    },
    escapes: {
        numeral: '02',
        label: 'Les Escapades',
        title: 'Un lever de soleil. Un coucher. Un autre monde.',
        blurb:
            'Des excursions d’une journée au départ de Marrakech — cascades, remparts sur l’océan, kasbahs et villes impériales. Partez après le petit-déjeuner, revenez avec une histoire.',
        dragHint: 'Continuez à défiler — la route se déroule sur le côté',
        fromLabel: 'dès',
        cta: 'Planifier cette escapade',
        counterOf: 'sur',
    },
    moments: {
        numeral: '03',
        label: 'Les Moments',
        title: 'Quelques heures. Des souvenirs pour la vie.',
        blurb:
            'Une montgolfière qui s’élève à l’aube. Un tajine cuisiné de vos mains. Les dunes à plein régime. Courts en heures, immenses en souvenirs — à glisser dans n’importe quelle journée de votre voyage.',
        fromLabel: 'dès',
        cta: 'Réserver ce moment',
        expandHint: 'Survolez ou touchez un panneau pour l’ouvrir',
    },
    finale: {
        kicker: 'Impossible de choisir ?',
        title: 'Tissez-les en un seul itinéraire.',
        copy:
            'Donnez-nous vos dates, votre rythme et ce qui fait battre votre cœur — nous relierons circuits, escapades et moments en une seule route fluide, avec un seul chauffeur et zéro logistique de votre côté.',
        primaryCta: 'Commencer à planifier',
        secondaryCta: 'Parlez-nous',
        browseLabel: 'Ou parcourez à la manière classique :',
        browseLinks: [
            { label: 'Tous les circuits', href: '/tours' },
            { label: 'Toutes les excursions', href: '/experiences' },
            { label: 'Toutes les activités', href: '/activities' },
        ],
    },
};

export const exploreCopy: Record<ExploreLocale, typeof en> = { en, fr };

export const getExploreCopy = (locale: string) =>
    exploreCopy[(locale === 'fr' ? 'fr' : 'en') as ExploreLocale];
