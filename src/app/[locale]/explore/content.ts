// Self-contained copy for the /explore catalogue page.
// Kept out of messages/*.json on purpose — this page owns its own voice.
//
// /explore is the ONLY catalogue page on the site. Tours, excursions,
// activities and ground services are four collections on one page, and
// /tours, /experiences, /activities and /services redirect into its anchors.
//
// Layout follows an editorial catalogue structure:
//   hero → trust bar → sticky collection nav → featured journey →
//   four collections → interstitial band → concierge process → finale
// Two-tone headings (ink lead + gold italic accent) are the page's signature;
// every heading below is authored as a lead/accent pair for that reason.

export type ExploreLocale = 'en' | 'fr';

// Item shape and formatting live in @/lib/catalogue — the driver pages render
// the same items and need the same cleanup. Re-exported here so this page's
// components can keep importing everything from one place.
export type { CatalogueItem as ExploreItem } from '@/lib/catalogue';
export {
    locationName,
    cleanTitle,
    splitTitle,
    tidyDuration,
    metaLine,
    priceLabel,
} from '@/lib/catalogue';

export type CollectionId = 'journeys' | 'escapes' | 'moments' | 'services';

/** Detail-page route for each collection — the index pages redirect here now. */
export const COLLECTION_ROUTE: Record<CollectionId, string> = {
    journeys: 'tours',
    escapes: 'experiences',
    moments: 'activities',
    services: 'services',
};

const en = {
    meta: {
        title: 'Tours, Excursions, Activities & Transfers in Morocco | Xhosen Gate',
        description:
            'Everything we run — grand Sahara journeys, one-day escapes from Marrakech, hands-on activities and the airport and city transfers that carry them — gathered on a single page.',
    },
    hero: {
        eyebrow: 'Tours · Excursions · Activities · Transfers',
        titleLead: 'CURATED',
        titleAccent: 'MOROCCO',
        sub: 'Grand desert journeys, day escapes from Marrakech, moments you will retell forever — and the drivers who carry you between them.',
        scrollCue: 'Scroll',
    },
    trust: [
        { icon: 'shield', label: 'Private & exclusive' },
        { icon: 'users', label: 'Your own local driver' },
        { icon: 'car', label: 'Premium fleet included' },
        { icon: 'tag', label: 'Fixed prices, no surprises' },
    ],
    nav: {
        label: 'Jump to',
        items: [
            // Labels carry the search terms people actually type — the poetic
            // names (Journeys / Escapes / Moments) stay on the section headings.
            { id: 'journeys', label: 'Multi-Day Tours' },
            { id: 'escapes', label: 'Day Trips' },
            { id: 'moments', label: 'Activities' },
            { id: 'services', label: 'Airport Transfers' },
        ],
    },
    featured: {
        tag: "Editor's pick",
        kicker: 'Featured journey',
        fromLabel: 'from',
        cta: 'View details',
        secondaryCta: 'Ask a question',
    },
    collections: {
        journeys: {
            kicker: 'Several days, one road',
            headLead: 'Grand',
            headAccent: 'Journeys',
            blurb: 'Cross the High Atlas, sleep under Saharan stars, wake to dunes on fire with sunrise. Planned to the hour, felt for a lifetime.',
        },
        escapes: {
            kicker: 'Out after breakfast, back by dark',
            headLead: 'Day',
            headAccent: 'Escapes',
            blurb: 'Hand-built day trips out of Marrakech — waterfalls, ocean ramparts, kasbahs and imperial cities. One sunrise, one world away.',
        },
        moments: {
            kicker: 'A few hours that stay with you',
            headLead: 'Signature',
            headAccent: 'Moments',
            blurb: 'A balloon lifting at dawn. A tagine you cooked yourself. Dunes at full throttle. Short on hours, heavy on memory.',
        },
        services: {
            kicker: 'The part you never think about',
            headLead: 'Ground',
            headAccent: 'Services',
            blurb: 'Airport arrivals, hotel doors, long runs between cities. Fixed prices, tracked flights, and a driver who already knows where you are going.',
        },
    },
    itemCta: 'Explore',
    band: {
        headLead: 'One country.',
        headAccent: 'Your route.',
        copy: 'Nothing here is fixed. Tell us your dates and your pace and we will thread journeys, escapes, moments and transfers into a single seamless itinerary — one driver, zero logistics on your side.',
        cta: 'Build my itinerary',
    },
    process: {
        kicker: 'How it works',
        headLead: 'Our Concierge',
        headAccent: 'Process',
        steps: [
            { n: '01', title: 'Choose', copy: 'Browse the collections above and shortlist whatever catches your eye.' },
            { n: '02', title: 'Customise', copy: 'Tell us your dates, your group and anything you would rather skip.' },
            { n: '03', title: 'Confirm', copy: 'We send the finished itinerary and a fixed price on WhatsApp.' },
            { n: '04', title: 'Travel', copy: 'Your driver is waiting. Everything else is already handled.' },
        ],
    },
    finale: {
        headLead: 'READY TO EXPLORE',
        headAccent: 'MOROCCO?',
        primaryCta: 'Start planning',
        secondaryCta: 'WhatsApp concierge',
        waIntro: 'Hello Xhosen Gate! I am planning a trip to Morocco and would like some help putting it together.',
        browseLabel: 'Or go deeper:',
        browseLinks: [
            { label: 'Our drivers', href: '/drivers' },
            { label: 'The fleet', href: '/fleet' },
            { label: 'Travel guides', href: '/guides' },
        ],
    },
};

const fr: typeof en = {
    meta: {
        title: 'Circuits, Excursions, Activités & Transferts au Maroc | Xhosen Gate',
        description:
            'Tout ce que nous organisons — grands circuits du Sahara, escapades d’une journée depuis Marrakech, activités immersives et les transferts aéroport et ville qui les relient — sur une seule page.',
    },
    hero: {
        eyebrow: 'Circuits · Excursions · Activités · Transferts',
        titleLead: 'LE MAROC',
        titleAccent: 'CHOISI',
        sub: 'Grands voyages dans le désert, escapades au départ de Marrakech, moments que vous raconterez toute votre vie — et les chauffeurs qui vous portent entre les deux.',
        scrollCue: 'Défiler',
    },
    trust: [
        { icon: 'shield', label: 'Privé & exclusif' },
        { icon: 'users', label: 'Votre chauffeur local' },
        { icon: 'car', label: 'Flotte premium incluse' },
        { icon: 'tag', label: 'Prix fixes, sans surprise' },
    ],
    nav: {
        label: 'Aller à',
        items: [
            { id: 'journeys', label: 'Circuits Plusieurs Jours' },
            { id: 'escapes', label: 'Excursions 1 Jour' },
            { id: 'moments', label: 'Activités' },
            { id: 'services', label: 'Transferts Aéroport' },
        ],
    },
    featured: {
        tag: 'Coup de cœur',
        kicker: 'Circuit à la une',
        fromLabel: 'dès',
        cta: 'Voir le détail',
        secondaryCta: 'Poser une question',
    },
    collections: {
        journeys: {
            kicker: 'Plusieurs jours, une seule route',
            headLead: 'Grands',
            headAccent: 'Circuits',
            blurb: 'Traversez le Haut Atlas, dormez sous les étoiles du Sahara, réveillez-vous face aux dunes embrasées par l’aube. Planifiés à l’heure près, ressentis pour la vie.',
        },
        escapes: {
            kicker: 'Partir après le petit-déjeuner, rentrer à la nuit',
            headLead: 'Escapades',
            headAccent: 'd’un Jour',
            blurb: 'Des excursions d’une journée au départ de Marrakech — cascades, remparts sur l’océan, kasbahs et villes impériales. Un lever de soleil, un autre monde.',
        },
        moments: {
            kicker: 'Quelques heures qui restent',
            headLead: 'Moments',
            headAccent: 'Signature',
            blurb: 'Une montgolfière à l’aube. Un tajine cuisiné de vos mains. Les dunes à plein régime. Courts en heures, immenses en souvenirs.',
        },
        services: {
            kicker: 'Ce à quoi vous ne penserez jamais',
            headLead: 'Services',
            headAccent: 'au Sol',
            blurb: 'Arrivées à l’aéroport, portes d’hôtel, longues liaisons entre les villes. Prix fixes, vols suivis, et un chauffeur qui sait déjà où vous allez.',
        },
    },
    itemCta: 'Découvrir',
    band: {
        headLead: 'Un pays.',
        headAccent: 'Votre route.',
        copy: 'Rien n’est figé. Donnez-nous vos dates et votre rythme : nous relierons circuits, escapades, moments et transferts en un seul itinéraire fluide — un chauffeur, zéro logistique de votre côté.',
        cta: 'Composer mon itinéraire',
    },
    process: {
        kicker: 'Comment ça marche',
        headLead: 'Notre Service',
        headAccent: 'Conciergerie',
        steps: [
            { n: '01', title: 'Choisir', copy: 'Parcourez les collections ci-dessus et retenez ce qui vous attire.' },
            { n: '02', title: 'Adapter', copy: 'Dites-nous vos dates, votre groupe et ce que vous préférez éviter.' },
            { n: '03', title: 'Confirmer', copy: 'Nous envoyons l’itinéraire finalisé et un prix fixe sur WhatsApp.' },
            { n: '04', title: 'Partir', copy: 'Votre chauffeur vous attend. Tout le reste est déjà réglé.' },
        ],
    },
    finale: {
        headLead: 'PRÊT À DÉCOUVRIR',
        headAccent: 'LE MAROC ?',
        primaryCta: 'Commencer à planifier',
        secondaryCta: 'Conciergerie WhatsApp',
        waIntro: 'Bonjour Xhosen Gate ! Je prépare un voyage au Maroc et j’aimerais de l’aide pour l’organiser.',
        browseLabel: 'Ou allez plus loin :',
        browseLinks: [
            { label: 'Nos chauffeurs', href: '/drivers' },
            { label: 'La flotte', href: '/fleet' },
            { label: 'Guides de voyage', href: '/guides' },
        ],
    },
};

export const exploreCopy: Record<ExploreLocale, typeof en> = { en, fr };

export const getExploreCopy = (locale: string) =>
    exploreCopy[(locale === 'fr' ? 'fr' : 'en') as ExploreLocale];

