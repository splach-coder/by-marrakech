const siteData = {
    services: [
        {
            id: 501,
            title: "Private Driver & Luxury Car Service",
            url: "#",
            description: "Experience Morocco your way with our exclusive private driver service. Choose your personal driver from our curated selection of experienced, multilingual professionals, each with their own portfolio showcasing their expertise, preferred routes, and fleet of premium vehicles. Whether you're looking to explore our handpicked tours and excursions with a driver who knows every hidden gem, or simply need the freedom to wander the city at your own pace, our drivers are at your service. Browse through detailed profiles featuring photo galleries, language capabilities, vehicle options, and specialty routes to find your perfect match. Once you've selected your driver, you can either choose from our carefully designed tours or create your own adventure – the choice is entirely yours. Contact your chosen driver directly to discuss your plans and preferences, ensuring a personalized experience tailored to your unique travel vision. From sunrise in the Sahara to sunset in Marrakech's medinas, your dedicated driver becomes your local expert, guide, and companion on the journey.",
            categories: ["Services", "Luxury"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Private Luxury Driver in Morocco"
            },
            banner_image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Private Luxury Driver Service"
            },
            gallery: [
                { url: "/images/services/luxury_driver_service.webp", alt: "Private Chauffeur" },
            ],
            highlights: [
                "Curated selection of multilingual professionals",
                "Detailed driver portfolios with photo galleries",
                "Fleet of premium luxury vehicles",
                "Total flexibility: Tours or freeform exploration",
                "Direct communication for personalized planning"
            ],
            suitable_for: ["Luxury Travelers", "Couples", "VIPs", "Custom Itineraries"],
            price: "Custom Quote",
            reviews: []
        },
        {
            id: 421,
            title: "Airport Transfer Service In Morocco",
            url: "https://your-morocco.com/airport-transfer-service-in-morocco/",
            description: "Start your Moroccan journey the right way with a reliable airport transfer. We provide comfortable, air-conditioned vehicles and professional drivers to ensure a smooth arrival.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Airport Transfer Service"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Airport Transfer Service"
            },
            gallery: [
                { url: "/images/services/transport_from_airport.webp", alt: "Comfortable Transfer" },
                { url: "/images/casablanca/casablanca.webp", alt: "Casablanca Airport Transfer" },
                { url: "/images/marrakech/marrakech.webp", alt: "Marrakech Arrival" }
            ],
            highlights: [
                "24/7 availability",
                "Professional and multilingual drivers",
                "Comfortable, air-conditioned vehicles",
                "Flight tracking for delayed arrivals",
                "Fixed prices with no hidden fees"
            ],
            suitable_for: ["Solo travelers", "Families", "Groups", "Business travelers"],
            price: `From ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}25`,
            reviews: [
                { name: "Michael Chang", country: "USA", rating: 5, text: "Driver was waiting for us with a sign. Very professional and smooth drive to the city." },
                { name: "Linda Moore", country: "UK", rating: 5, text: "Clean car, safe driving. Much better than haggling with taxis." }
            ],
        },
        {
            id: 419,
            title: "Hotel Transfer Service In Morocco",
            url: "https://your-morocco.com/hotel-transfer-service-in-morocco/",
            description: "Arriving in a new country can be overwhelming, especially after a long flight. Our hotel transfer service ensures you get to your accommodation safely and comfortably.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Hotel Transfer Service"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Hotel Transfer Service"
            },
            gallery: [
                { url: "/images/services/transport_from_hotel.webp", alt: "Hotel Pickup" },
                { url: "/images/rabat/rabat.webp", alt: "City Transfer" },
                { url: "/images/fes/Fes.webp", alt: "Comfortable Ride" }
            ],
            highlights: [
                "Door-to-door service",
                "Help with luggage",
                "Comfortable vehicles",
                "Knowledgeable local drivers",
                "Safe and reliable"
            ],
            suitable_for: ["All travelers"],
            price: `From ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}30`,
            reviews: [
                { name: "Carlos Rodriguez", country: "Spain", rating: 5, text: "Picked us up on time from our hotel. The van was spacious for all our luggage." },
                { name: "Sophie Anderson", country: "Australia", rating: 4, text: "Reliable service. The driver helped us with our bags which was great." }
            ],
        },
        {
            id: 417,
            title: "Rent Private Car & Driver In Morocco",
            url: "https://your-morocco.com/rent-private-car-driver-in-morocco/",
            description: "Rent Private Car & Driver in Morocco. Traveling through Morocco at your own pace is the best way to discover the country. Our private car and driver service gives you the freedom to explore.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Private Car Rental"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Private Car Rental"
            },
            gallery: [
                { url: "/images/services/car_rental.webp", alt: "Luxury Car Rental" },
                { url: "/images/ouarzazate/ouarzazate.webp", alt: "Road Trip" },
                { url: "/images/merzouga/merzouga1.webp", alt: "Desert Driving" }
            ],
            highlights: [
                "Flexible itinerary",
                "Professional driver/guide",
                "Luxury or standard vehicle options",
                "Fuel and insurance included",
                "Local insights and tips"
            ],
            suitable_for: ["Couples", "Families", "Small groups", "Photographers"],
            price: `From ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}50/day`,
            reviews: [
                { name: "James Wilson", country: "USA", rating: 5, text: "Renting a car with a driver was the best decision. Our driver knew all the best photo spots." },
                { name: "Emma Schmidt", country: "Germany", rating: 5, text: "Total freedom to explore but with the safety of a local driver. Highly recommended." }
            ],
        }
    ],

    tours: [
        {
            id: 465,
            trip_code: "WT-CODE 465",
            title: "Merzouga Desert 3 Days Tour",
            url: "https://your-morocco.com/itinerary/merzouga-desert-3-days-tour/",
            duration: "3 Day(s) 2 Night(s)",
            locations: [
                { name: "Marrakech" },
                { name: "Merzouga" },
                { name: "Ouarzazate" }
            ],
            group_size: "unlimited",
            description: "Experience the Sahara on a 3-day Merzouga desert tour from Marrakech. Visit Ait Ben Haddou, ride camels at sunset, and sleep under the stars.",
            image: {
                url: "/images/merzouga/merzouga5.webp",
                alt: "Visit Merzouga Morocco"
            },
            banner_image: {
                url: "/images/merzouga/merzouga1.webp",
                alt: "Visit Merzouga Morocco"
            },
            gallery: [
                { url: "/images/merzouga/merzouga2.webp", alt: "Merzouga Camel Trek" },
                { url: "/images/merzouga/merzouga3.webp", alt: "Desert Camp" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Sahara Dunes" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Merzouga Sunset" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Desert Landscape" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Berber Life" }
            ],
            highlights: [
                "Scenic drive through the Atlas Mountains",
                "Visit the Kasbah of Ait Ben Haddou",
                "Sunset camel ride in Erg Chebbi dunes",
                "Night in a Berber desert camp with music",
                "Sunrise over the Sahara Desert"
            ],
            suitable_for: ["Couples", "Friends", "Solo travelers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}180`,
            reviews: [
                { name: "Sarah Jenkins", country: "USA", rating: 5, text: "The 3-day desert tour was the highlight of our Morocco trip. The camel ride at sunset was magical, and the starry sky in the desert is something I'll never forget." },
                { name: "David Brown", country: "UK", rating: 4, text: "Great experience overall. The drive is long but the scenery through the Atlas Mountains keeps you engaged. Our guide was very friendly." },
                { name: "Emma Larsson", country: "Sweden", rating: 5, text: "Everything was perfectly organized. The desert camp was much more comfortable than I expected. Highly comfortably!" }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Marrakech to Dades Valley",
                    location: "Dades Valley",
                    description: "Depart from Marrakech and cross the High Atlas Mountains via the Tizi n'Tichka pass. Visit the UNESCO World Heritage site of Ait Ben Haddou and continue to Dades Valley.",
                    highlights: ["Cross the High Atlas Mountains", "Visit Ait Ben Haddou Kasbah", "Photo stops at scenic viewpoints", "Overnight in Dades Valley"]
                },
                {
                    day: 2,
                    title: "Dades Valley to Merzouga Desert",
                    location: "Merzouga",
                    description: "Journey through Todra Gorges and continue to the Sahara Desert. Experience a camel trek at sunset and spend the night in a traditional Berber camp under the stars.",
                    highlights: ["Explore Todra Gorges", "Camel trek in the Sahara", "Watch the sunset over the dunes", "Traditional dinner and Berber music", "Overnight in desert camp"]
                },
                {
                    day: 3,
                    title: "Merzouga to Marrakech",
                    location: "Marrakech",
                    description: "Wake up early for sunrise, then travel back to Marrakech through the Draa Valley and Agdez, arriving in the evening.",
                    highlights: ["Sunrise over the dunes", "Drive through Draa Valley", "Scenario stops", "Return to Marrakech"]
                }
            ]
        },
        {
            id: 467,
            trip_code: "WT-CODE 467",
            title: "Marrakech to Merzouga 4 Days Tour",
            url: "https://your-morocco.com/itinerary/marrakech-to-ouarzazate-4-days-trip/",
            duration: "4 Day(s) 3 Night(s)",
            locations: [
                { name: "Marrakech" },
                { name: "Merzouga" },
                { name: "Ouarzazate" }
            ],
            group_size: "unlimited",
            description: "Discover southern Morocco on a 4-day tour from Marrakech to Ouarzazate. Visit Dadès Gorges, ride camels in Merzouga, and explore desert landscapes and ancient kasbahs.",
            image: {
                url: "/images/merzouga/merzouga1.webp",
                alt: "Visit Merzouga Morocco"
            },
            banner_image: {
                url: "/images/merzouga/merzouga2.webp",
                alt: "Visit Merzouga Morocco"
            },
            gallery: [
                { url: "/images/merzouga/merzouga1.webp", alt: "Sahara Dunes" },
                { url: "/images/merzouga/merzouga3.webp", alt: "Desert Camp" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Camel Trekking" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Merzouga Landscape" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Desert Adventure" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Berber Tent" }
            ],
            highlights: [
                "Cross the High Atlas Mountains via Tizi n'Tichka pass",
                "Visit the UNESCO World Heritage site of Ait Ben Haddou",
                "Explore the Dades and Todra Gorges",
                "Camel trek in the Merzouga Sahara Desert",
                "Overnight stay in a traditional desert camp"
            ],
            suitable_for: ["Adventure seekers", "Families", "Couples", "Groups"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}240`,
            reviews: [
                { name: "Jessica Thompson", country: "Australia", rating: 5, text: "Taking 4 days instead of 3 was a great decision. We felt much less rushed and could really enjoy the stops. Merzouga is breathtaking." },
                { name: "Robert Parker", country: "USA", rating: 5, text: "Our driver was excellent—safe and knowledgeable. The hotels selected were charming and authentic. A must-do tour." },
                { name: "Elena Rossi", country: "Italy", rating: 5, text: "Bellissimo! The Dades Gorges and the Sahara were spectacular. Food was delicious everywhere we went." }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Marrakech to Dades Gorges",
                    location: "Dades Gorges",
                    description: "Drive through the High Atlas Mountains, visit Ait Ben Haddou, and continue to the beautiful Dades Gorges for the night.",
                    highlights: ["Tizi n'Tichka Pass", "Ait Ben Haddou Kasbah", "Ouarzazate", "Dades Valley"]
                },
                {
                    day: 2,
                    title: "Dades Gorges to Merzouga",
                    location: "Merzouga",
                    description: "Visit Todra Gorges, then head to Merzouga. Embark on a camel trek into the dunes and spend the night in a desert camp.",
                    highlights: ["Todra Gorges", "Camel Trek", "Sunset in Sahara", "Berber Camp"]
                },
                {
                    day: 3,
                    title: "Explore Merzouga Region",
                    location: "Merzouga",
                    description: "A full day to explore the desert region. Visit Khamlia village for Gnawa music, meet nomadic families, and enjoy the dunes.",
                    highlights: ["Gnawa Music", "Visit Nomads", "4x4 Desert Tour", "Relax in Dunes"]
                },
                {
                    day: 4,
                    title: "Merzouga to Marrakech",
                    location: "Marrakech",
                    description: "Return to Marrakech via a different route through Alnif, Tazarine, and the Draa Valley.",
                    highlights: ["Alnif & Tazarine", "Draa Valley Palms", "Anti-Atlas Mountains", "Arrival in Marrakech"]
                }
            ]
        },
        {
            id: 463,
            trip_code: "WT-CODE 463",
            title: "5 Days Tour From Marrakech",
            url: "https://your-morocco.com/itinerary/5-days-tour-from-marrakech/",
            duration: "5 Day(s) 4 Night(s)",
            locations: [
                { name: "Chefchaouen" },
                { name: "Fes" },
                { name: "Merzouga" }
            ],
            group_size: "unlimited",
            description: "Experience Morocco's highlights on a 5-day tour from Marrakech to Merzouga, Fes, Chefchaouen, and Casablanca. Camel rides, historic sites, and stunning landscapes await.",
            image: {
                url: "/images/marrakech/marrakech3.webp",
                alt: "Visit Marrakech Morocco"
            },
            banner_image: {
                url: "/images/marrakech/marrakech.webp",
                alt: "Visit Marrakech Morocco"
            },
            gallery: [
                { url: "/images/marrakech/marrakech1.webp", alt: "Marrakech City" },
                { url: "/images/marrakech/marrakech2.webp", alt: "Medina Streets" },
                { url: "/images/marrakech/marrakech3.webp", alt: "Traditional Architecture" },
                { url: "/images/marrakech/marrakech4.webp", alt: "Busy Souks" },
                { url: "/images/marrakech/marrakech5.webp", alt: "Moroccan Design" },
                { url: "/images/marrakech/marrakech6.webp", alt: "City Views" }
            ],
            highlights: [
                "Comprehensive tour of Morocco's imperial cities",
                "Desert experience in Merzouga",
                "Visit the blue city of Chefchaouen",
                "Explore the labyrinthine medina of Fes",
                "See the Hassan II Mosque in Casablanca"
            ],
            suitable_for: ["Culture lovers", "History buffs", "Adventurers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}380`,
            reviews: [
                { name: "William Clark", country: "UK", rating: 5, text: "This tour covers all the main sights. Fes was fascinating with its labyrinthine streets. Highly recommend for first-time visitors." },
                { name: "Sophia Martin", country: "France", rating: 5, text: "Chefchaouen was a dream came true, so blue and beautiful. The organization of the tour was flawless." },
                { name: "Oliver Smit", country: "Netherlands", rating: 4, text: "A busy schedule but you see so much. Marrakech and Fes were my favorites. Good value for money." }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Marrakech to Casablanca to Fes",
                    location: "Fes",
                    description: "Depart Marrakech for Casablanca to see the Hassan II Mosque, then continue to Fes for the night.",
                    highlights: ["Hassan II Mosque", "Drive to Fes"]
                },
                {
                    day: 2,
                    title: "Explore Fes",
                    location: "Fes",
                    description: "Full day guided tour of Fes. Visit the Medina, tanneries, Madrasas, and Royal Palace.",
                    highlights: ["Fes Medina", "Tanneries", "Al Quaraouiyine", "Souks"]
                },
                {
                    day: 3,
                    title: "Fes to Chefchaouen",
                    location: "Chefchaouen",
                    description: "Travel to the Blue City, Chefchaouen like journey through the Rif Mountains.",
                    highlights: ["Rif Mountains", "Blue City Streets", "Spanish Mosque"]
                },
                {
                    day: 4,
                    title: "Chefchaouen to Rabat to Casablanca",
                    location: "Casablanca",
                    description: "Drive to Rabat to visit the Hassan Tower and Oudayas Kasbah, then continue to Casablanca.",
                    highlights: ["Hassan Tower", "Oudayas Kasbah", "Rabat City"]
                },
                {
                    day: 5,
                    title: "Casablanca to Marrakech",
                    location: "Marrakech",
                    description: "Morning in Casablanca/Rabat if time permits, then return drive to Marrakech.",
                    highlights: ["Return trip", "End of services"]
                }
            ]
        }
    ],

    excursions: [
        {
            id: 296,
            trip_code: "WT-CODE 296",
            title: "Zagora 2 Days Excursion",
            url: "https://your-morocco.com/itinerary/zagora-2-days-excursion/",
            duration: "2 Day(s) 1 Night(s)",
            locations: [
                { name: "Zagora" }
            ],
            group_size: "unlimited",
            description: "Book a two day excursion from Marrakech to Zagora including camel rides, a night in a Berber camp, and visits to Ait Ben Haddou.",
            image: {
                url: "/images/Zagoura/gabriele-stravinskaite--mKpYC4RacA-unsplash.webp",
                alt: "Visit ZAGORA Morocco"
            },
            banner_image: {
                url: "/images/Zagoura/marvin-meyer-X0XRRXSVLU4-unsplash.webp",
                alt: "Visit ZAGORA Morocco"
            },
            gallery: [
                { url: "/images/Zagoura/darolti-dan-GJw9zRK_VBs-unsplash.webp", alt: "Zagora Desert" },
                { url: "/images/Zagoura/gabriele-stravinskaite--mKpYC4RacA-unsplash.webp", alt: "Camel Trek" },
                { url: "/images/Zagoura/ismail-el-youssefi-geeSPCxnKzU-unsplash.webp", alt: "Desert Landscape" },
                { url: "/images/Zagoura/kristijan-nikodinovski-RfK4AQchykw-unsplash.webp", alt: "Berber Camp" },
                { url: "/images/Zagoura/raul-mermans-garcia-oWzVpeYyJ-w-unsplash.webp", alt: "Zagora Sunset" }
            ],
            highlights: [
                "Drive through the Draa Valley",
                "Visit Ait Ben Haddou Kasbah",
                "Camel ride in Zagora desert",
                "Overnight in a traditional camp",
                "Stargazing in the desert"
            ],
            suitable_for: ["Short stay travelers", "Families", "Couples"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}150`,
            reviews: [
                { name: "Liam Nielsen", country: "Ireland", rating: 4, text: "If you are short on time, this is a great option. Zagora is beautiful, though simpler than Merzouga. The camel ride was fun." },
                { name: "Olivia Wilson", country: "USA", rating: 5, text: "Sleeping under the stars in the Berber camp was unforgettable. The drive through the Draa Valley is full of palm trees and Kasbahs." }
            ],
            programSteps: [
                { time: "07:30", title: "Departure", description: "Pick up from your hotel in Marrakech" },
                { time: "10:30", title: "Tizi n'Tichka Pass", description: "Scenic stop in the High Atlas Mountains" },
                { time: "12:00", title: "Ait Ben Haddou", description: "Visit the UNESCO World Heritage Site kasbah" },
                { time: "13:30", title: "Lunch", description: "Traditional lunch at a local restaurant in Ouarzazate" },
                { time: "15:00", title: "Draa Valley", description: "Drive through the palm groves and ancient kasbahs" },
                { time: "17:30", title: "Zagora Arrival", description: "Arrive in Zagora desert area" },
                { time: "18:00", title: "Camel Trek", description: "Sunset camel ride to the Berber camp" },
                { time: "20:00", title: "Dinner & Evening", description: "Traditional dinner and music around campfire" },
                { time: "06:00", title: "Sunrise", description: "Optional sunrise viewing in the desert" },
                { time: "08:00", title: "Breakfast", description: "Berber breakfast at the camp" },
                { time: "09:00", title: "Return Camel Ride", description: "Camel ride back to Zagora village" },
                { time: "11:00", title: "Departure", description: "Begin return journey to Marrakech" },
                { time: "13:00", title: "Lunch", description: "Lunch stop in Ouarzazate" },
                { time: "18:00", title: "Arrival", description: "Drop off at your hotel in Marrakech" }
            ]
        },
        {
            id: 294,
            trip_code: "WT-CODE 294",
            title: "Ouzoud Waterfalls 1 Day Excursion",
            url: "https://your-morocco.com/itinerary/ouzoud-waterfalls-1-day-excursion/",
            duration: "1 Day",
            locations: [
                { name: "Marrakech" },
                { name: "Ouzoud Waterfalls" }
            ],
            group_size: "unlimited",
            description: "Escape to nature with a full-day trip to Ouzoud Waterfalls from Marrakech. Enjoy scenic hikes, boat rides, and breathtaking views on this relaxing day trip.",
            image: {
                url: "/images/ouzoud/selina-bubendorfer-jP51Ai2tQGE-unsplash.webp",
                alt: "visit OUZOUD Waterfalls"
            },
            banner_image: {
                url: "/images/ouzoud/rihards-sarma-mJGl8l1SiJk-unsplash.webp",
                alt: "visit OUZOUD Waterfalls"
            },
            gallery: [
                { url: "/images/ouzoud/danai-tsoutreli-tqLc6On9KIA-unsplash.webp", alt: "Ouzoud Falls" },
                { url: "/images/ouzoud/selina-bubendorfer-jP51Ai2tQGE-unsplash.webp", alt: "Waterfalls Nature" },
                { url: "/images/ouzoud/sergio-teixeira-svdabxVg7-4-unsplash.webp", alt: "Scenic View" },
                { url: "/images/ouzoud/tobias-pfeifer-F8TGlff-qks-unsplash.webp", alt: "Barbary Macaque" },
                { url: "/images/ouzoud/tobias-pfeifer-IBT7zZDTtNg-unsplash.webp", alt: "Ouzoud Landscape" }
            ],
            highlights: [
                "See the highest waterfalls in North Africa",
                "Hike through olive groves",
                "Spot wild Barbary macaques",
                "Optional boat ride near the falls",
                "Lunch with a view of the waterfalls"
            ],
            suitable_for: ["Nature lovers", "Families", "Photographers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}55`,
            reviews: [
                { name: "Noah Garcia", country: "Canada", rating: 5, text: "The waterfalls are massive! We took the boat ride to get close to the falls, totally worth it. Saw lots of monkeys too." },
                { name: "Ava Davies", country: "UK", rating: 5, text: "A refreshing break from the heat of the city. The hike is manageable and the views are spectacular." }
            ],
            programSteps: [
                { time: "08:00", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
                { time: "10:30", title: "Arrival", description: "Arrive at Ouzoud Waterfalls parking area" },
                { time: "11:00", title: "Guided Hike", description: "Hike down to the waterfalls with local guide" },
                { time: "12:00", title: "Waterfalls View", description: "Admire the spectacular 110m high waterfalls" },
                { time: "13:00", title: "Lunch", description: "Traditional lunch at a restaurant overlooking the falls" },
                { time: "14:30", title: "Free Time", description: "Free time for photos, boat ride, or monkey watching" },
                { time: "16:00", title: "Return Hike", description: "Hike back up to the parking area" },
                { time: "16:30", title: "Departure", description: "Begin return journey to Marrakech" },
                { time: "19:00", title: "Drop off", description: "Drop off at your hotel or riad in Marrakech" }
            ]
        },
        {
            id: 289,
            trip_code: "WT-CODE 289",
            title: "Ourika Valley 1 Day Excursion",
            url: "https://your-morocco.com/itinerary/ourika-valley-1-day-excursion/",
            duration: "1 Day",
            locations: [
                { name: "Marrakech" },
                { name: "Ourika Valley" }
            ],
            group_size: "unlimited",
            description: "Discover the beauty of the Ourika Valley on a 1 day excursion from Marrakech. Enjoy scenic views, Berber villages, waterfalls, and a peaceful escape.",
            image: {
                url: "/images/ourika/abderrahman-kamal-MilM52Qj32g-unsplash.webp",
                alt: "visit OURIKA VALLEY MOROCCO"
            },
            banner_image: {
                url: "/images/ourika/hassan-ahrouch-CfmIZwBvxNY-unsplash.webp",
                alt: "visit OURIKA VALLEY MOROCCO"
            },
            gallery: [
                { url: "/images/ourika/abdelhamid-azoui-BGU0uaY0tJs-unsplash.webp", alt: "Ourika Valley" },
                { url: "/images/ourika/abderrahman-kamal-MilM52Qj32g-unsplash.webp", alt: "River Side" },
                { url: "/images/ourika/matthew-fainman-3yonP2JaGTU-unsplash.webp", alt: "Atlas Mountains" }
            ],
            highlights: [
                "Visit a traditional Berber house",
                "Hike to the Setti Fatma waterfalls",
                "Enjoy the cool mountain air",
                "Shop for local crafts and argan oil",
                "Lunch by the river"
            ],
            suitable_for: ["Families", "Nature lovers", "Hikers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}45`,
            reviews: [
                { name: "Ethan Hunt", country: "Australia", rating: 4, text: "A lovely day trip. We had lunch with our feet in the river, which was a unique experience. The valley is very green." },
                { name: "Mia Foster", country: "USA", rating: 5, text: "Nature is beautiful here. The hike to the seven waterfalls requires good shoes but is fun. Our guide helped us heaps." }
            ],
            programSteps: [
                { time: "08:30", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
                { time: "09:30", title: "Scenic Drive", description: "Drive through the Ourika Valley with photo stops" },
                { time: "10:30", title: "Berber House Visit", description: "Visit a traditional Berber family home" },
                { time: "11:30", title: "Argan Oil Cooperative", description: "See how argan oil is produced traditionally" },
                { time: "12:30", title: "Lunch", description: "Traditional lunch by the Ourika River" },
                { time: "14:00", title: "Waterfalls Hike", description: "Hike to the Setti Fatma waterfalls (optional)" },
                { time: "16:00", title: "Free Time", description: "Free time to explore or relax by the river" },
                { time: "16:30", title: "Return", description: "Depart for Marrakech" },
                { time: "18:00", title: "Drop off", description: "Drop off at your hotel or riad" }
            ]
        },
        {
            id: 259,
            trip_code: "WT-CODE 259",
            title: "Casablanca Excursion",
            url: "https://your-morocco.com/itinerary/casablanca-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Casablanca" }
            ],
            group_size: "unlimited",
            description: "Explore Casablanca on a guided day tour. Visit the Hassan II Mosque, Art Deco landmarks, Habous Quarter, and the Corniche on this cultural day trip.",
            image: {
                url: "/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.webp",
                alt: "visit Casablanca Morocco"
            },
            banner_image: {
                url: "/images/casablanca/oussama-rahib-NNECQHl9bJc-unsplash.webp",
                alt: "visit Casablanca Morocco"
            },
            gallery: [
                { url: "/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.webp", alt: "Hassan II Mosque" },
                { url: "/images/casablanca/imad-ghazal-gRE6Be-o_Hw-unsplash.webp", alt: "Casablanca Streets" },
                { url: "/images/casablanca/kristijan-nikodinovski-nkav4Pi-UwY-unsplash.webp", alt: "City Architecture" },
                { url: "/images/casablanca/mannie-nami-_aNm8TMzbUI-unsplash.webp", alt: "Urban View" },
                { url: "/images/casablanca/mehdi-sakout-54nOsVV1xI4-unsplash.webp", alt: "Casablanca Life" },
                { url: "/images/casablanca/zakaria-zayane-aBywMnV7ibk-unsplash.webp", alt: "Corniche" }
            ],
            highlights: [
                "Visit the magnificent Hassan II Mosque",
                "Stroll along the Corniche",
                "Explore the Habous Quarter",
                "See the Art Deco architecture",
                "Visit Mohammed V Square"
            ],
            suitable_for: ["Culture lovers", "Architecture enthusiasts"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}85`,
            reviews: [
                { name: "Lucas Jimenez", country: "Spain", rating: 5, text: "The Hassan II Mosque is breathtakingly huge and detailed. A true architectural wonder. Glad we visited." },
                { name: "Charlotte Koch", country: "Germany", rating: 4, text: "Good overview of Casablanca. We saw the main spots efficiently. The corniche walk was nice." }
            ],
            programSteps: [
                { time: "07:00", title: "Pick up", description: "Pick up from your hotel in Marrakech (or meet in Casablanca)" },
                { time: "10:30", title: "Hassan II Mosque", description: "Guided tour of the mosque interior and exterior" },
                { time: "12:00", title: "Corniche", description: "Walk along the coastal promenade" },
                { time: "13:00", title: "Lunch", description: "Seafood lunch at a local restaurant" },
                { time: "14:30", title: "Habous Quarter", description: "Explore the French-built new medina" },
                { time: "15:30", title: "Art Deco District", description: "See the historic 1930s architecture" },
                { time: "16:30", title: "Mohammed V Square", description: "Visit the central square and surrounding landmarks" },
                { time: "17:30", title: "Return", description: "Depart for Marrakech" },
                { time: "20:30", title: "Drop off", description: "Drop off at your hotel in Marrakech" }
            ]
        },
        {
            id: 255,
            trip_code: "WT-CODE 255",
            title: "Essaouira 1 Day Excursion",
            url: "https://your-morocco.com/itinerary/essaouira-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Essaouira" },
                { name: "Marrakech" }
            ],
            group_size: "unlimited",
            description: "Explore Essaouira on a full-day trip from Marrakech. Visit the medina, enjoy the beach, and discover local crafts in this charming coastal city.",
            image: {
                url: "/images/essaouira/peter-schulz--leOF2nzJQ8-unsplash.webp",
                alt: "Visit ESSAOUIRA MOROCCO"
            },
            banner_image: {
                url: "/images/essaouira/rigel-ibisQEDxODo-unsplash.webp",
                alt: "Visit ESSAOUIRA MOROCCO"
            },
            gallery: [
                { url: "/images/essaouira/hamza-omlacho-M9GO4Gsd2SM-unsplash.webp", alt: "Essaouira Port" },
                { url: "/images/essaouira/mostapha-abidour-h9L1GfDgp0s-unsplash.webp", alt: "Blue Boats" },
                { url: "/images/essaouira/pete-bread-4eZeMUKdV-8-unsplash.webp", alt: "Medina Walls" },
                { url: "/images/essaouira/peter-schulz--leOF2nzJQ8-unsplash.webp", alt: "Essaouira Beach" },
                { url: "/images/essaouira/rigel-No_Y3bn4lNQ-unsplash.webp", alt: "Coastal View" },
                { url: "/images/essaouira/rigel-QWJjSOB9t0Y-unsplash.webp", alt: "Skala de la Ville" },
                { url: "/images/essaouira/youssef-aboutaleb-ad1FM2Xj0QQ-unsplash.webp", alt: "Essaouira Streets" }
            ],
            highlights: [
                "Walk through the historic Medina (UNESCO site)",
                "Visit the Skala de la Ville fortress",
                "Relax on the sandy beach",
                "See the fishing port and blue boats",
                "Shop for thuya wood crafts"
            ],
            suitable_for: ["Beach lovers", "History buffs", "Relaxation seekers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}65`,
            reviews: [
                { name: "Amelia Bennett", country: "UK", rating: 5, text: "Loved the vibe of Essaouira. Much more relaxed than Marrakech. The fresh fish lunch at the port was delicious." },
                { name: "Harper Lewis", country: "USA", rating: 4, text: "It was a bit windy but beautiful. The Medina is charming and the blue boats make for great photos." }
            ],
            programSteps: [
                { time: "08:00", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
                { time: "10:30", title: "Arrival", description: "Arrive in Essaouira and meet your local guide" },
                { time: "11:00", title: "Medina Tour", description: "Guided walking tour of the UNESCO-listed medina" },
                { time: "12:00", title: "Skala de la Ville", description: "Visit the historic sea fortress and cannons" },
                { time: "13:00", title: "Lunch", description: "Fresh seafood lunch at the port (optional)" },
                { time: "14:30", title: "Port Visit", description: "See the traditional blue fishing boats" },
                { time: "15:30", title: "Free Time", description: "Free time for shopping, beach, or exploring" },
                { time: "16:30", title: "Return", description: "Depart for Marrakech" },
                { time: "19:00", title: "Drop off", description: "Drop off at your hotel or riad" }
            ]
        },
        {
            id: 253,
            trip_code: "WT-CODE 253",
            title: "Rabat Excursion",
            url: "https://your-morocco.com/itinerary/rabat-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Rabat" }
            ],
            group_size: "unlimited",
            description: "Visit Morocco's capital on a guided Rabat excursion. Explore Hassan Tower, Kasbah of the Udayas, Chellah ruins, and the Royal Palace in a day.",
            image: {
                url: "/images/rabat/framopia-EZqHkkyc0wg-unsplash.webp",
                alt: "visit Rabat Morocco"
            },
            banner_image: {
                url: "/images/rabat/niklas-VqouWpsuziE-unsplash.webp",
                alt: "visit Rabat Morocco"
            },
            gallery: [
                { url: "/images/rabat/framopia-EZqHkkyc0wg-unsplash.webp", alt: "Hassan Tower" },
                { url: "/images/rabat/hamza-nouasria-7zVLZu5twJs-unsplash.webp", alt: "Kasbah of the Udayas" },
                { url: "/images/rabat/mehdi-lamaaffar-PqX7EELWjh0-unsplash.webp", alt: "Rabat Architecture" },
                { url: "/images/rabat/soulaymane-elyoussfi-oDSEPEtrQFo-unsplash.webp", alt: "Mausoleum of Mohammed V" },
                { url: "/images/rabat/yous-gil-2Kyh6kB5Yh8-unsplash.webp", alt: "Rabat City View" }
            ],
            highlights: [
                "See the Hassan Tower and Mausoleum of Mohammed V",
                "Explore the Kasbah of the Udayas",
                "Visit the Chellah Necropolis",
                "View the Royal Palace exterior",
                "Stroll through the Andalusian Gardens"
            ],
            suitable_for: ["History buffs", "Culture lovers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}90`,
            reviews: [
                { name: "Elijah Van Dijk", country: "Netherlands", rating: 5, text: "Surprised by how clean and green Rabat is. The Hassan Tower looks impressive even unfinished." },
                { name: "Abigail Scott", country: "Canada", rating: 5, text: "Great history lesson. The Kasbah of the Udayas feels like a Greek island with its blue and white walls." }
            ],
            programSteps: [
                { time: "07:00", title: "Pick up", description: "Pick up from your hotel in Marrakech (or meet in Rabat)" },
                { time: "10:30", title: "Hassan Tower", description: "Visit the 12th-century minaret and Mausoleum of Mohammed V" },
                { time: "12:00", title: "Kasbah of the Udayas", description: "Explore the historic fortress and blue-painted streets" },
                { time: "13:00", title: "Lunch", description: "Lunch at a traditional restaurant in the medina" },
                { time: "14:30", title: "Chellah Necropolis", description: "Visit the Roman and medieval ruins" },
                { time: "15:30", title: "Royal Palace", description: "View the exterior of the King's palace" },
                { time: "16:30", title: "Andalusian Gardens", description: "Relax in the peaceful botanical gardens" },
                { time: "17:30", title: "Return", description: "Depart for Marrakech" },
                { time: "20:30", title: "Drop off", description: "Drop off at your hotel in Marrakech" }
            ]
        },
        {
            id: 251,
            trip_code: "WT-CODE 251",
            title: "Fes Excursion",
            url: "https://your-morocco.com/itinerary/fes-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Fes" }
            ],
            group_size: "unlimited",
            description: "Explore the cultural heart of Morocco with a guided Fes excursion. Visit Al Quaraouiyine, Chouara Tannery, and the old medina in one unforgettable day.",
            image: {
                url: "/images/fes/ben-ostrower-bjNv5Bg6h4U-unsplash.webp",
                alt: "Visit Fez Morocco"
            },
            banner_image: {
                url: "/images/fes/mauro-lima-buvA1ofvTMY-unsplash.webp",
                alt: "Visit Fez Morocco"
            },
            gallery: [
                { url: "/images/fes/ben-ostrower-bjNv5Bg6h4U-unsplash.webp", alt: "Fes Tannery" },
                { url: "/images/fes/hamza-demnati-CJ_DC8Nd2Fk-unsplash.webp", alt: "Fes Medina" },
                { url: "/images/fes/hazy-momo-YSTtLgsvRa8-unsplash.webp", alt: "Medina Streets" },
                { url: "/images/fes/mauro-lima-mPD9BJ_QGXw-unsplash.webp", alt: "Bab Bou Jeloud" },
                { url: "/images/fes/toni-DBNhQdCG-XA-unsplash.webp", alt: "Traditional Crafts" }
            ],
            highlights: [
                "Get lost in the Medina of Fes el-Bali",
                "Visit the Chouara Tannery",
                "See the Al Quaraouiyine University",
                "Admire the Bou Inania Madrasa",
                "Explore the souks and artisan workshops"
            ],
            suitable_for: ["Culture lovers", "History buffs", "Shoppers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}95`,
            reviews: [
                { name: "James Peterson", country: "USA", rating: 5, text: "The medina is crazy big! Explore it with a guide is a must. It feels like stepping back in time." },
                { name: "Emily Robinson", country: "UK", rating: 4, text: "History in every corner. The tannery smell is strong as they say, but it's fascinating to watch the process." }
            ],
            programSteps: [
                { time: "07:00", title: "Pick up", description: "Pick up from your hotel in Marrakech (or meet in Fes)" },
                { time: "10:30", title: "Medina Entrance", description: "Enter through Bab Bou Jeloud (Blue Gate)" },
                { time: "11:00", title: "Chouara Tannery", description: "Visit the ancient leather tannery with overview" },
                { time: "12:00", title: "Al Quaraouiyine", description: "See the oldest university in the world (exterior)" },
                { time: "13:00", title: "Lunch", description: "Traditional Moroccan lunch in the medina" },
                { time: "14:30", title: "Bou Inania Madrasa", description: "Visit the exquisite Islamic school" },
                { time: "15:30", title: "Artisan Quarters", description: "Explore pottery, weaving, and metalwork souks" },
                { time: "16:30", title: "Royal Palace", description: "View the grand exterior of the Royal Palace" },
                { time: "17:30", title: "Return", description: "Depart for Marrakech" },
                { time: "20:30", title: "Drop off", description: "Drop off at your hotel in Marrakech" }
            ]
        },
        {
            id: 40,
            trip_code: "WT-CODE 40",
            title: "Ouarzazate 1 Day Excursion",
            url: "https://your-morocco.com/itinerary/ouarzazate-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Ouarzazate" }
            ],
            group_size: "unlimited",
            description: "Join a full-day trip from Marrakech to Ouarzazate and Ait Ben Haddou. Visit film studios, ancient kasbahs, and enjoy scenic views through the Atlas Mountains.",
            image: {
                url: "/images/ouarzazate/abdou-faiz-lA-P8-vagrI-unsplash.webp",
                alt: "Ouarzazate Morocco tour"
            },
            banner_image: {
                url: "/images/ouarzazate/hassan-ouajbir-INcADDyMwwo-unsplash.webp",
                alt: "Ouarzazate Morocco tour"
            },
            gallery: [
                { url: "/images/ouarzazate/abdou-faiz-lA-P8-vagrI-unsplash.webp", alt: "Ait Ben Haddou" },
                { url: "/images/ouarzazate/abdou-faiz-mBo2EUfJ7sY-unsplash.webp", alt: "Kasbah Taourirt" },
                { url: "/images/ouarzazate/abdou-faiz-wGy7RhTKODg-unsplash.webp", alt: "Film Studios" },
                { url: "/images/ouarzazate/cristiano-pinto-knB5iCogf5Q-unsplash.webp", alt: "Desert Architecture" },
                { url: "/images/ouarzazate/laurent-gence-UMEcD4j--_I-unsplash.webp", alt: "Ouarzazate Landscape" },
                { url: "/images/ouarzazate/sergio-otoya--3uyPo-2cOE-unsplash.webp", alt: "Atlas Views" }
            ],
            highlights: [
                "Cross the Tizi n'Tichka pass",
                "Visit Atlas Film Studios",
                "Explore Taourirt Kasbah",
                "Walk through Ait Ben Haddou",
                "Enjoy desert landscapes"
            ],
            suitable_for: ["Film fans", "History buffs", "Sightseers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}70`,
            reviews: [
                { name: "Alexander Mitchell", country: "Australia", rating: 5, text: "Hollywood of Africa! Cool to see where Gladiator and GOT were filmed. Ait Ben Haddou is stunning." },
                { name: "Isabella Tucci", country: "Italy", rating: 5, text: "The architecture is amazing. The kasbahs made of clay against the blue sky are beautiful." }
            ],
            programSteps: [
                { time: "07:00", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
                { time: "09:30", title: "Tizi n'Tichka Pass", description: "Photo stop at the highest point (2,260m)" },
                { time: "11:00", title: "Ait Ben Haddou", description: "Guided tour of the UNESCO World Heritage kasbah" },
                { time: "12:30", title: "Lunch", description: "Lunch at a restaurant with views of the kasbah" },
                { time: "14:00", title: "Atlas Film Studios", description: "Tour of the Hollywood of Africa film studios" },
                { time: "15:00", title: "Taourirt Kasbah", description: "Explore the largest kasbah in Morocco" },
                { time: "16:00", title: "Return Journey", description: "Depart for Marrakech via the Atlas Mountains" },
                { time: "19:00", title: "Drop off", description: "Drop off at your hotel or riad in Marrakech" }
            ]
        },
        {
            id: 41,
            trip_code: "WT-CODE 41",
            title: "Merzouga 3 Days Excursion",
            url: "https://your-morocco.com/itinerary/merzouga-excursion/",
            duration: "3 Day(s) 2 Night(s)",
            locations: [
                { name: "Merzouga" }
            ],
            group_size: "unlimited",
            description: "Join a 3 day desert tour from Marrakech to Merzouga. Visit Ait Ben Haddou, ride camels, sleep in a Berber camp, and explore the Sahara.",
            image: {
                url: "/images/merzouga/merzouga6.webp",
                alt: "Visit Merzouga Morocco"
            },
            banner_image: {
                url: "/images/merzouga/merzouga3.webp",
                alt: "Visit Merzouga Morocco"
            },
            gallery: [
                { url: "/images/merzouga/merzouga1.webp", alt: "Camel Trek" },
                { url: "/images/merzouga/merzouga2.webp", alt: "Desert Camp Night" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Merzouga Dunes" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Sahara Sunset" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Desert Life" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Berber Traditions" }
            ],
            highlights: [
                "Experience the Sahara Desert",
                "Camel trek at sunset",
                "Overnight in a desert camp",
                "Visit Todra Gorges",
                "See the starry night sky"
            ],
            suitable_for: ["Adventure seekers", "Nature lovers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}180`,
            reviews: [
                { name: "Benjamin Carter", country: "USA", rating: 5, text: "The desert is calling! Amazing 3 days. The sunrise over the dunes is worth the early wake up." },
                { name: "Sofia Garcia", country: "Spain", rating: 5, text: "Top notch organization. Driver was friendly and the van was comfortable for the long drive." }
            ],
            programSteps: [
                { time: "07:00", title: "Day 1: Departure", description: "Pick up from your hotel in Marrakech" },
                { time: "10:30", title: "Ait Ben Haddou", description: "Visit the famous kasbah (UNESCO site)" },
                { time: "13:00", title: "Lunch", description: "Lunch in Ouarzazate" },
                { time: "15:00", title: "Draa Valley", description: "Drive through the longest valley in Morocco" },
                { time: "18:00", title: "Arrival", description: "Arrive at hotel in Zagora or similar" },
                { time: "20:00", title: "Dinner", description: "Dinner and overnight at hotel" },
                { time: "08:00", title: "Day 2: Breakfast", description: "Breakfast at hotel" },
                { time: "09:00", title: "Departure", description: "Continue journey to Merzouga" },
                { time: "12:30", title: "Todra Gorges", description: "Visit the impressive canyon (300m high)" },
                { time: "13:30", title: "Lunch", description: "Lunch near Todra Gorges" },
                { time: "16:00", title: "Merzouga Arrival", description: "Arrive at the edge of Erg Chebbi dunes" },
                { time: "17:00", title: "Camel Trek", description: "Sunset camel ride into the desert" },
                { time: "19:00", title: "Desert Camp", description: "Arrive at Berber camp, dinner and music" },
                { time: "06:00", title: "Day 3: Sunrise", description: "Optional sunrise camel ride or viewing" },
                { time: "08:00", title: "Breakfast", description: "Breakfast at the desert camp" },
                { time: "09:00", title: "Return", description: "Camel ride back to Merzouga village" },
                { time: "10:00", title: "Departure", description: "Begin return journey to Marrakech" },
                { time: "13:00", title: "Lunch", description: "Lunch stop in Ouarzazate" },
                { time: "20:00", title: "Arrival", description: "Drop off at your hotel in Marrakech" }
            ]
        },
        {
            id: 38,
            trip_code: "WT-CODE 38",
            title: "Marrakech Excursion",
            url: "https://your-morocco.com/itinerary/marrakech-excursion/",
            duration: "1 Day(s)",
            locations: [
                { name: "Marrakech" }
            ],
            group_size: "unlimited",
            description: "Explore Marrakech in one day with a guided city tour. Visit the medina, Bahia Palace, Majorelle Garden, and Jemaa el-Fnaa for a complete experience.",
            image: {
                url: "/images/marrakech/marrakech5.webp",
                alt: "Visit Marrakech Morocco"
            },
            banner_image: {
                url: "/images/marrakech/marrakech1.webp",
                alt: "Visit Marrakech Morocco"
            },
            gallery: [
                { url: "/images/marrakech/marrakech2.webp", alt: "Marrakech Streets" },
                { url: "/images/marrakech/marrakech3.webp", alt: "Majorelle Garden" },
                { url: "/images/marrakech/marrakech4.webp", alt: "Jemaa el-Fnaa" },
                { url: "/images/marrakech/marrakech5.webp", alt: "Koutoubia Mosque" },
                { url: "/images/marrakech/marrakech6.webp", alt: "Souks" },
                { url: "/images/marrakech/marrakech7.webp", alt: "Bahia Palace" },
                { url: "/images/marrakech/marrakech8.webp", alt: "Medina" },
                { url: "/images/marrakech/marrakech9.webp", alt: "Moroccan Architecture" },
                { url: "/images/marrakech/marrakech10.webp", alt: "Traditional Crafts" }
            ],
            highlights: [
                "Visit the Koutoubia Mosque",
                "Explore the Bahia Palace",
                "Wander through the Majorelle Garden",
                "Experience Jemaa el-Fnaa square",
                "Shop in the souks"
            ],
            suitable_for: ["City explorers", "Culture lovers", "Shoppers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}50`,
            reviews: [
                { name: "Daniel Harris", country: "UK", rating: 5, text: "There is so much to see. The palaces are intricate and beautiful. Jemaa el-Fnaa is wild at night!" },
                { name: "Grace Foster", country: "USA", rating: 5, text: "Great intro to the city. Majorelle Garden is a peaceful oasis amidst the chaos. Loved it." }
            ],
            programSteps: [
                { time: "09:00", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
                { time: "09:30", title: "Koutoubia Mosque", description: "Visit the iconic 12th-century mosque (exterior)" },
                { time: "10:30", title: "Bahia Palace", description: "Guided tour of the 19th-century palace and gardens" },
                { time: "12:00", title: "Saadian Tombs", description: "Visit the royal tombs from the Saadian dynasty" },
                { time: "13:00", title: "Lunch", description: "Traditional Moroccan lunch in the medina" },
                { time: "14:30", title: "Majorelle Garden", description: "Explore the botanical garden and Berber Museum" },
                { time: "16:00", title: "Souk Exploration", description: "Guided walk through the traditional markets" },
                { time: "17:30", title: "Jemaa el-Fnaa", description: "Experience the famous square coming to life" },
                { time: "18:30", title: "Free Time", description: "Free time for dinner or further exploration" },
                { time: "20:00", title: "Drop off", description: "Drop off at your hotel or riad" }
            ]
        }
    ],

    activities: [
        {
            id: 265,
            title: "Cooking Class Activity In Morocco",
            url: "https://your-morocco.com/cooking-class-in-morocco/",
            description: "Experiencing Morocco goes far beyond visiting its famous monuments and landscapes. One of the most memorable ways to connect with Moroccan culture is through its food. At Your-Morocco, we invite you to take part in an immersive cooking class that allows you to discover the country's rich culinary heritage in a friendly and authentic atmosphere.",
            categories: ["Activities", "Blog"],
            image: {
                url: "/images/cooking-class/florian-d-bazac-PitkCiuzigI-unsplash.webp",
                alt: "Cooking Class Activity In Morocco"
            },
            banner_image: {
                url: "/images/cooking-class/aziz-acharki-UBEcFUvkrcc-unsplash.webp",
                alt: "Cooking Class Activity In Morocco"
            },
            gallery: [
                { url: "/images/cooking-class/florian-d-bazac-PitkCiuzigI-unsplash.webp", alt: "Fresh Ingredients" },
                { url: "/images/cooking-class/hamza-nouasria-q11NM0cFFzY-unsplash.webp", alt: "Cooking Process" },
                { url: "/images/cooking-class/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.webp", alt: "Moroccan Spices" },
                { url: "/images/cooking-class/sour-moha-4Tgjeh1fWCc-unsplash.webp", alt: "Traditional Tagine" }
            ],
            highlights: [
                "Learn to prepare iconic dishes like tagine, couscous, pastilla, and traditional pastries",
                "Guided visit to local souk or market to select fresh ingredients",
                "Hands-on cooking session in traditional riad or family home",
                "Learn about Moroccan spices, techniques, and cultural significance",
                "Enjoy the meal you helped create with fellow travelers and hosts"
            ],
            locations: ["Marrakech", "Fes", "Essaouira", "Ouarzazate", "Merzouga"],
            duration: "Flexible - available throughout your journey",
            suitable_for: ["Solo travelers", "Couples", "Families", "Groups", "Special occasions", "Team-building events"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}45 `,
            reviews: [
                { name: "Chloe Walker", country: "Australia", rating: 5, text: "So much fun! Exploring the market and then cooking was a highlight. The tagine we made was delicious." },
                { name: "Jack Davies", country: "UK", rating: 5, text: "Learned a lot about spices. The host family was very welcoming and patient with us." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Full name" },
                    { name: "country", type: "text", required: true, label: "Country" },
                    { name: "phone_number", type: "text", required: true, label: "Phone number" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Group size", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Trip code or describe your personalized tour", placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.." }
                ],
                submit_text: "BOOK"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Reserve Now, Pay Later"
        },
        {
            id: 274,
            title: "Quad Biking Activity In Morocco",
            url: "https://your-morocco.com/quad-biking-activity-in-morocco/",
            description: "If you're looking for excitement, stunning landscapes, and a sense of adventure, quad biking in Morocco is the perfect activity. With Your-Morocco, you can experience the thrill of riding a quad bike across some of the country's most breathtaking terrains from the rocky trails of the Agafay Desert to the golden dunes near Merzouga, and the palm groves just outside Marrakech.",
            categories: ["Activities", "Blog"],
            image: {
                url: "/images/quad-biking/devon-janse-van-rensburg-08HCHS7EULI-unsplash.webp",
                alt: "Quad Biking Activity In Morocco"
            },
            banner_image: {
                url: "/images/quad-biking/adrien-delforge-VH2HRylVsiM-unsplash.webp",
                alt: "Quad Biking Activity In Morocco"
            },
            gallery: [
                { url: "/images/quad-biking/devon-janse-van-rensburg-08HCHS7EULI-unsplash.webp", alt: "Desert Adventure" },
                { url: "/images/quad-biking/haris-khan-v40H7tLOZII-unsplash.webp", alt: "Quad Biking Group" },
                { url: "/images/quad-biking/mayar-zidan-LVNcykwlDEg-unsplash.webp", alt: "Scenic Route" },
                { url: "/images/quad-biking/nils-5RfEgsnxeHo-unsplash.webp", alt: "Off-road Fun" }
            ],
            highlights: [
                "Ride across diverse terrains: Agafay Desert, Merzouga dunes, palm groves",
                "Safety briefing and training for all skill levels",
                "Guided rides with scenic breaks and photo opportunities",
                "Traditional Moroccan tea in villages or desert camps",
                "Combine with camel rides, lunch, or village visits"
            ],
            locations: ["Agafay Desert", "Merzouga", "Marrakech outskirts", "Various regions"],
            duration: "Flexible - short adventures to full-day experiences",
            suitable_for: ["Couples", "Groups of friends", "Families with teens", "Corporate team-building", "Adventure seekers"],
            skill_level: "All levels (beginner to experienced)",
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}65 `,
            reviews: [
                { name: "Ryan Brooks", country: "USA", rating: 5, text: "Adrenalaine rush! The Agafay desert looks like the moon. Great quads and good safety gear provided." },
                { name: "Zoe Murphy", country: "Canada", rating: 5, text: "Super fun afternoon. Dust and speed! The tea break in the middle was a nice touch." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Full name" },
                    { name: "country", type: "text", required: true, label: "Country" },
                    { name: "phone_number", type: "text", required: true, label: "Phone number" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Group size", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Trip code or describe your personalized tour", placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.." }
                ],
                submit_text: "BOOK"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Reserve Now, Pay Later"
        },
        {
            id: 272,
            title: "Camel Riding Activity In Morocco",
            url: "https://your-morocco.com/camel-riding-activity-in-morocco/",
            description: "Camel riding is one of the most iconic and peaceful ways to explore the beauty of Morocco. With Your-Morocco, you can enjoy a guided camel experience across stunning landscapes such as the golden dunes of the Sahara Desert, the rocky Agafay Desert near Marrakech, or the lush palm groves around traditional Berber villages.",
            categories: ["Activities", "Blog"],
            image: {
                url: "/images/camel-riding/dave-meckler-ZzVc3uZXnr8-unsplash.webp",
                alt: "Camel Riding Activity In Morocco"
            },
            banner_image: {
                url: "/images/camel-riding/dan-calderwood-7CPopIsaCkc-unsplash.webp",
                alt: "Camel Riding Activity In Morocco"
            },
            gallery: [
                { url: "/images/camel-riding/dave-meckler-ZzVc3uZXnr8-unsplash.webp", alt: "Desert Trek" },
                { url: "/images/camel-riding/oussama-rahib-f7F8URbIx08-unsplash.webp", alt: "Sunset Ride" },
                { url: "/images/camel-riding/peter-thomas-PotqZeNaUZ4-unsplash.webp", alt: "Camel Caravan" },
                { url: "/images/camel-riding/peter-thomas-nF8-ekoE0qw-unsplash.webp", alt: "Sahara Experience" },
                { url: "/images/camel-riding/sheila-c-KuXu8rx_1-8-unsplash.webp", alt: "Golden Dunes" },
                { url: "/images/camel-riding/tamar-dCMvzMV1jfc-unsplash.webp", alt: "Camel Close-up" }
            ],
            highlights: [
                "Ride through golden Sahara dunes, Agafay Desert, or palm groves",
                "Experienced local guides ensuring safety and comfort",
                "Traditional scarves and comfortable saddles provided",
                "Learn about nomadic culture and enjoy mint tea",
                "Options: 1-hour rides to full desert experiences with overnight stays"
            ],
            locations: ["Merzouga", "Zagora", "Agafay Desert", "Essaouira outskirts", "Various regions"],
            duration_options: ["1-hour rides", "Half-day journeys", "Full desert experiences with overnight stays"],
            suitable_for: ["All ages", "Couples", "Families", "Groups", "Peaceful adventure seekers"],
            price: `From ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}35`,
            reviews: [
                { name: "Luke Sullivan", country: "Ireland", rating: 4, text: "Peaceful ride. The camels were well treated. Sunset view was pretty amazing." },
                { name: "Lily Anderson", country: "UK", rating: 5, text: "Classic Morocco photo op! A bit bumpy but definitely a fun experience to remember." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Full name" },
                    { name: "country", type: "text", required: true, label: "Country" },
                    { name: "phone_number", type: "text", required: true, label: "Phone number" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Group size", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Trip code or describe your personalized tour", placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.." }
                ],
                submit_text: "BOOK"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Reserve Now, Pay Later"
        },
        {
            id: 278,
            title: "Food Tour Activity In Morocco",
            url: "https://your-morocco.com/food-tour-activity-in-morocco/",
            description: "A journey through Morocco is not complete without tasting its incredible street food and regional specialties. At Your-Morocco, we offer curated food tours that allow you to explore the country's culinary landscape while walking through its vibrant medinas, local neighborhoods, and hidden food corners. These tours are designed for curious travelers who want to eat like locals and understand the stories behind every bite.",
            categories: ["Activities", "Blog"],
            image: {
                url: "/images/food-tour/annie-spratt-_V4v7BbG338-unsplash.webp",
                alt: "Food Tour Activity In Morocco"
            },
            banner_image: {
                url: "/images/food-tour/adil-elouardii-_fcZ5jncgAw-unsplash.webp",
                alt: "Food Tour Activity In Morocco"
            },
            gallery: [
                { url: "/images/food-tour/annie-spratt-_V4v7BbG338-unsplash.webp", alt: "Local Delicacies" },
                { url: "/images/food-tour/annie-spratt-wGzO3Qvp98Q-unsplash.webp", alt: "Street Food" },
                { url: "/images/food-tour/florian-d-bazac-PitkCiuzigI-unsplash.webp", alt: "Traditional Dish" },
                { url: "/images/food-tour/il-vagabiondo-SW7mMXu12Ws-unsplash.webp", alt: "Market Spices" },
                { url: "/images/food-tour/louis-hansel-k2ZCm7LCj8E-unsplash.webp", alt: "Fresh Bread" },
                { url: "/images/food-tour/rigel-Zsw9CvJIeiw-unsplash.webp", alt: "Moroccan Tea" },
                { url: "/images/food-tour/sour-moha-4Tgjeh1fWCc-unsplash.webp", alt: "Tagine" },
                { url: "/images/food-tour/sour-moha-5t2SP3vQz28-unsplash.webp", alt: "Culinary Art" }
            ],
            highlights: [
                "Explore vibrant medinas and hidden food corners",
                "Taste street food: harira soup, brochettes, msemen, snail soup, fresh bread",
                "Visit family-run bakeries, spice shops, traditional cafés",
                "Learn about Morocco's diverse culinary influences",
                "Meet friendly vendors and observe cooking techniques"
            ],
            locations: ["Marrakech", "Fes", "Casablanca", "Other culturally rich cities"],
            tour_types: ["Street food tours", "Vegetarian dishes", "Sweets and pastries", "Adventurous tasting"],
            suitable_for: ["Couples", "Solo travelers", "Families", "Small groups", "Honeymoon trips", "Photography tours", "Business travel"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}55 `,
            reviews: [
                { name: "Nathan Roberts", country: "USA", rating: 5, text: "We ate so much! The snail soup was surprisingly good. Highly recommend for any foodies visiting." },
                { name: "Ella King", country: "France", rating: 5, text: "Great way to discover hidden spots in the Medina that we would never have found on our own." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Full name" },
                    { name: "country", type: "text", required: true, label: "Country" },
                    { name: "phone_number", type: "text", required: true, label: "Phone number" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Group size", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Trip code or describe your personalized tour", placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.." }
                ],
                submit_text: "BOOK"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Reserve Now, Pay Later"
        },
        {
            id: 263,
            title: "Air Balloon Activity In Morocco",
            url: "https://your-morocco.com/air-balloon-activity-in-morocco/",
            description: "For travelers seeking a breathtaking and peaceful adventure, an air balloon ride over Morocco is an experience like no other. With Your-Morocco, you can soar above beautiful landscapes at sunrise, enjoying panoramic views of red earth hills, scattered Berber villages, and the majestic Atlas Mountains in the distance.",
            categories: ["Activities", "Blog"],
            image: {
                url: "/images/airballon/justyna-jozefowicz-hZig-RKimQM-unsplash.webp",
                alt: "Air Balloon Activity In Morocco"
            },
            banner_image: {
                url: "/images/airballon/danai-tsoutreli-3NAlBV5PlmE-unsplash.webp",
                alt: "Air Balloon Activity In Morocco"
            },
            gallery: [
                { url: "/images/airballon/danai-tsoutreli-hqeYq7qSI7c-unsplash.webp", alt: "Balloon View" },
                { url: "/images/airballon/justyna-jozefowicz-hZig-RKimQM-unsplash.webp", alt: "Sunrise Flight" },
                { url: "/images/airballon/manoa-angelo-w7jeZ5NFSvQ-unsplash.webp", alt: "Atlas Mountains" },
                { url: "/images/airballon/matthieu-gouiffes-6JZhmw5VhsA-unsplash.webp", alt: "Aerial Landscape" },
                { url: "/images/airballon/mengyu-xu-Hu3DS4Rx4ts-unsplash.webp", alt: "Desert From Above" },
                { url: "/images/airballon/paul-lucyk-b_ZJPTbpUJw-unsplash.webp", alt: "Balloon Shadow" },
                { url: "/images/airballon/wouter-groote-veldman-6NDiNzFdOyI-unsplash.webp", alt: "Preparing Flight" },
                { url: "/images/airballon/wouter-groote-veldman-hGGyMkSSTZY-unsplash.webp", alt: "Sky High" }
            ],
            highlights: [
                "Sunrise balloon ride with panoramic views",
                "Fly over red earth hills, Berber villages, Atlas Mountains",
                "Silent, peaceful sky experience",
                "Traditional Moroccan breakfast after landing",
                "Flight certificate souvenir"
            ],
            locations: ["Marrakech region", "Other regions upon request"],
            duration: "Approximately 1 hour flight + breakfast",
            schedule: "Early morning pickup, sunrise flight",
            suitable_for: ["Couples", "Honeymooners", "Families", "Small private groups", "Special occasions"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}220 `,
            reviews: [
                { name: "Hannah Powell", country: "UK", rating: 5, text: "Worth every penny. The views of the Atlas Mountains at sunrise are incredibly peaceful and beautiful." },
                { name: "Caleb Johnson", country: "USA", rating: 5, text: "Magical experience. Very smooth flight and the breakfast afterwards was delicious." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Full name" },
                    { name: "country", type: "text", required: true, label: "Country" },
                    { name: "phone_number", type: "text", required: true, label: "Phone number" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Group size", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Trip code or describe your personalized tour", placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.." }
                ],
                submit_text: "BOOK"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Reserve Now, Pay Later"
        }
    ],

    filter_options: {
        trip_types: ["Tour", "Excursion"],
        locations: [
            "Marrakech", "Fes", "Casablanca", "Rabat", "Ouarzazate",
            "Merzouga", "Essaouira", "Chefchaouen", "Zagora",
            "Ourika Valley", "Ouzoud Waterfalls"
        ],
        price_sort: ["Price low to high", "Price high to low"],
        date_sort: ["Ascending", "Descending"],
        name_sort: ["Ascending", "Descending"]
    }
};

const siteDataFR = {
    services: [
        {
            id: 501,
            title: "Chauffeur Privé & Service de Véhicules de Luxe",
            url: "#",
            description: "Découvrez le Maroc à votre façon avec notre service exclusif de chauffeur privé. Choisissez votre chauffeur personnel parmi notre sélection de professionnels expérimentés et multilingues, chacun possédant son propre portfolio mettant en valeur son expertise, ses itinéraires préférés et sa flotte de véhicules haut de gamme. Que vous souhaitiez explorer nos circuits et excursions triés sur le volet avec un chauffeur connaissant chaque trésor caché, ou simplement avoir la liberté de flâner dans la ville à votre rythme, nos chauffeurs sont à votre service. Parcourez des profils détaillés comprenant des galeries photos, les langues parlées, les options de véhicules et les itinéraires spécialisés pour trouver votre partenaire idéal. Une fois votre chauffeur sélectionné, vous pouvez choisir parmi nos circuits soigneusement conçus ou créer votre propre aventure – le choix vous appartient entièrement. Contactez directement votre chauffeur choisi pour discuter de vos plans et préférences, assurant une expérience personnalisée adaptée à votre vision unique du voyage. Du lever de soleil dans le Sahara au coucher de soleil dans les médinas de Marrakech, votre chauffeur dévoué devient votre expert local, guide et compagnon de route.",
            categories: ["Services", "Luxe"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Chauffeur Privé de Luxe au Maroc"
            },
            banner_image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Service de Chauffeur Privé de Luxe"
            },
            gallery: [
                { url: "/images/services/luxury_driver_service.webp", alt: "Chauffeur Privé" },
            ],
            highlights: [
                "Sélection de professionnels multilingues",
                "Portfolios détaillés des chauffeurs avec galeries photos",
                "Flotte de véhicules de luxe premium",
                "Flexibilité totale : Circuits ou exploration libre",
                "Communication directe pour une planification personnalisée"
            ],
            suitable_for: ["Voyageurs de Luxe", "Couples", "VIPS", "Itinéraires Personnalisés"],
            price: "Sur Devis",
            reviews: []
        },
        {
            id: 421,
            title: "Service de Transfert Aéroport au Maroc",
            url: "https://your-morocco.com/airport-transfer-service-in-morocco/",
            description: "Commencez votre voyage marocain du bon pied avec un transfert aéroport fiable. Nous fournissons des véhicules confortables et climatisés avec des chauffeurs professionnels pour assurer une arrivée en douceur.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Service de Transfert Aéroport"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Service de Transfert Aéroport"
            },
            gallery: [
                { url: "/images/services/transport_from_airport.webp", alt: "Transfert Confortable" },
                { url: "/images/casablanca/casablanca.webp", alt: "Transfert Aéroport Casablanca" },
                { url: "/images/marrakech/marrakech.webp", alt: "Arrivée à Marrakech" }
            ],
            highlights: [
                "Disponibilité 24h/24 et 7j/7",
                "Chauffeurs professionnels et multilingues",
                "Véhicules confortables et climatisés",
                "Suivi des vols pour les arrivées retardées",
                "Prix fixes sans frais cachés"
            ],
            suitable_for: ["Voyageurs solos", "Familles", "Groupes", "Voyageurs d'affaires"],
            price: `À partir de ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}25`,
            reviews: [
                { name: "Jean Martin", country: "France", rating: 5, text: "Le chauffeur nous attendait avec une pancarte. Très professionnel et conduite fluide." },
                { name: "Marie Dubois", country: "Belgique", rating: 5, text: "Voiture propre, conduite sûre. Bien mieux que de négocier avec les taxis." }
            ],
        },
        {
            id: 419,
            title: "Service de Transfert Hôtelier au Maroc",
            url: "https://your-morocco.com/hotel-transfer-service-in-morocco/",
            description: "Arriver dans un nouveau pays peut être stressant, surtout après un long vol. Notre service de transfert hôtelier vous garantit d'arriver à votre hébergement en toute sécurité et confort.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Service de Transfert Hôtelier"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Service de Transfert Hôtelier"
            },
            gallery: [
                { url: "/images/services/transport_from_hotel.webp", alt: "Prise en charge à l'hôtel" },
                { url: "/images/rabat/rabat.webp", alt: "Transfert en ville" },
                { url: "/images/fes/Fes.webp", alt: "Trajet Confortable" }
            ],
            highlights: [
                "Service porte-à-porte",
                "Aide avec les bagages",
                "Véhicules confortables",
                "Chauffeurs locaux compétents",
                "Sécuritaire et fiable"
            ],
            suitable_for: ["Tous les voyageurs"],
            price: `À partir de ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}30`,
            reviews: [
                { name: "Pierre Leroy", country: "France", rating: 5, text: "Prise en charge à l'heure à notre hôtel. Le van était spacieux pour tous nos bagages." },
                { name: "Sophie Moreau", country: "Suisse", rating: 4, text: "Service fiable. Le chauffeur nous a aidés avec nos valises, c'était super." }
            ],
        },
        {
            id: 417,
            title: "Location de Voiture Privée avec Chauffeur au Maroc",
            url: "https://your-morocco.com/rent-private-car-driver-in-morocco/",
            description: "Voyager à travers le Maroc à votre propre rythme est la meilleure façon de découvrir le pays. Notre service de voiture privée avec chauffeur vous donne la liberté d'explorer.",
            categories: ["Blog", "Services"],
            image: {
                url: "/images/services/luxury_driver_service.webp",
                alt: "Location de Voiture Privée"
            },
            banner_image: {
                url: "/images/services/banner.webp",
                alt: "Location de Voiture Privée"
            },
            gallery: [
                { url: "/images/services/car_rental.webp", alt: "Location de Voiture de Luxe" },
                { url: "/images/ouarzazate/ouarzazate.webp", alt: "Road Trip" },
                { url: "/images/merzouga/merzouga1.webp", alt: "Conduite dans le désert" }
            ],
            highlights: [
                "Itinéraire flexible",
                "Chauffeur/guide professionnel",
                "Options de véhicules de luxe ou standard",
                "Carburant et assurance inclus",
                "Conseils et informations locales"
            ],
            suitable_for: ["Couples", "Familles", "Petits groupes", "Photographes"],
            price: `À partir de ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}50/jour`,
            reviews: [
                { name: "Lucas Bernard", country: "France", rating: 5, text: "Louer une voiture avec chauffeur était la meilleure décision. Notre chauffeur connaissait tous les meilleurs spots photo." },
                { name: "Isabelle Petit", country: "Canada", rating: 5, text: "Totale liberté d'explorer mais avec la sécurité d'un chauffeur local. Je recommande vivement." }
            ],
        }
    ],

    tours: [
        {
            id: 465,
            trip_code: "WT-CODE 465",
            title: "Tour du Désert de Merzouga 3 Jours",
            url: "https://your-morocco.com/itinerary/merzouga-desert-3-days-tour/",
            duration: "3 Jour(s) 2 Nuit(s)",
            locations: [
                { name: "Marrakech" },
                { name: "Merzouga" },
                { name: "Ouarzazate" }
            ],
            group_size: "illimité",
            description: "Découvrez le Sahara lors d'un tour de 3 jours dans le désert de Merzouga depuis Marrakech. Visitez Aït Benhaddou, faites une balade à dos de chameau au coucher du soleil et dormez sous les étoiles.",
            image: {
                url: "/images/merzouga/merzouga5.webp",
                alt: "Visiter Merzouga Maroc"
            },
            banner_image: {
                url: "/images/merzouga/merzouga1.webp",
                alt: "Visiter Merzouga Maroc"
            },
            gallery: [
                { url: "/images/merzouga/merzouga2.webp", alt: "Randonnée à chameau à Merzouga" },
                { url: "/images/merzouga/merzouga3.webp", alt: "Campement dans le désert" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Dunes du Sahara" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Coucher de soleil à Merzouga" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Paysage désertique" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Vie Berbère" }
            ],
            highlights: [
                "Trajet pittoresque à travers les montagnes de l'Atlas",
                "Visite de la Kasbah d'Aït Benhaddou",
                "Balade à dos de chameau au coucher du soleil dans les dunes d'Erg Chebbi",
                "Nuit dans un campement berbère avec musique traditionnelle",
                "Lever de soleil sur le désert du Sahara"
            ],
            suitable_for: ["Couples", "Amis", "Voyageurs solos"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}180`,
            reviews: [
                { name: "Jean Dupont", country: "France", rating: 5, text: "Une expérience inoubliable. Le désert est magique et notre guide était super." },
                { name: "Marie Leclerc", country: "Belgique", rating: 5, text: "Très bien organisé. Le bivouac était confortable et la nourriture excellente." },
                { name: "Thomas Martin", country: "Suisse", rating: 4, text: "Long trajet mais les paysages en valent la peine. Le coucher de soleil est magnifique." }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "De Marrakech à la Vallée du Dadès",
                    location: "Vallée du Dadès",
                    description: "Départ de Marrakech et traversée du Haut Atlas via le col de Tizi n'Tichka. Visite du site classé au patrimoine mondial de l'UNESCO d'Aït Benhaddou et continuation vers la vallée du Dadès.",
                    highlights: ["Traversée du Haut Atlas", "Visite de la Kasbah d'Aït Benhaddou", "Arrêts photos aux points de vue panoramiques", "Nuit dans la vallée du Dadès"]
                },
                {
                    day: 2,
                    title: "De la Vallée du Dadès au Désert de Merzouga",
                    location: "Merzouga",
                    description: "Voyage à travers les gorges de Todra et continuation vers le désert du Sahara. Expérience d'une balade à chameau au coucher du soleil et nuit dans un campement berbère traditionnel sous les étoiles.",
                    highlights: ["Exploration des gorges de Todra", "Randonnée à chameau dans le Sahara", "Coucher de soleil sur les dunes", "Dîner traditionnel et musique berbère", "Nuit au campement du désert"]
                },
                {
                    day: 3,
                    title: "De Merzouga à Marrakech",
                    location: "Marrakech",
                    description: "Réveil matinal pour le lever du soleil, puis retour vers Marrakech à travers la vallée du Draâ et Agdez, arrivée en soirée.",
                    highlights: ["Lever de soleil sur les dunes", "Conduite à travers la vallée du Draâ", "Arrêts panoramiques", "Retour à Marrakech"]
                }
            ]
        },
        {
            id: 467,
            trip_code: "WT-CODE 467",
            title: "Tour de Marrakech à Merzouga 4 Jours",
            url: "https://your-morocco.com/itinerary/marrakech-to-ouarzazate-4-days-trip/",
            duration: "4 Jour(s) 3 Nuit(s)",
            locations: [
                { name: "Marrakech" },
                { name: "Merzouga" },
                { name: "Ouarzazate" }
            ],
            group_size: "illimité",
            description: "Découvrez le sud du Maroc lors d'un tour de 4 jours de Marrakech à Ouarzazate. Visitez les gorges du Dadès, faites une balade à dos de chameau à Merzouga et explorez les paysages désertiques et les kasbahs anciennes.",
            image: {
                url: "/images/merzouga/merzouga1.webp",
                alt: "Visiter Merzouga Maroc"
            },
            banner_image: {
                url: "/images/merzouga/merzouga2.webp",
                alt: "Visiter Merzouga Maroc"
            },
            gallery: [
                { url: "/images/merzouga/merzouga1.webp", alt: "Dunes du Sahara" },
                { url: "/images/merzouga/merzouga3.webp", alt: "Campement dans le désert" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Randonnée à chameau" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Paysage de Merzouga" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Aventure dans le désert" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Tente Berbère" }
            ],
            highlights: [
                "Traversée des Haut-Atlas via le col de Tizi n'Tichka",
                "Visite du site classé au patrimoine mondial de l'UNESCO : Aït Benhaddou",
                "Exploration des gorges du Dadès et de Todra",
                "Randonnée à chameau dans le désert du Sahara à Merzouga",
                "Séjour nocturne dans un campement traditionnel du désert"
            ],
            suitable_for: ["Chercheurs d'aventure", "Familles", "Couples", "Groupes"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}240`,
            reviews: [
                { name: "Sophie Dubois", country: "France", rating: 5, text: "Prendre 4 jours était une excellente décision. On profite beaucoup plus des visites." },
                { name: "Nicolas Leroy", country: "Canada", rating: 5, text: "Le guide Ahmed était très compétent. Les hôtels étaient pleins de charme." },
                { name: "Camille Moreau", country: "France", rating: 5, text: "Un voyage de rêve. Les gorges du Dadès sont spectaculaires." }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "De Marrakech aux Gorges du Dadès",
                    location: "Gorges du Dadès",
                    description: "Conduite à travers le Haut Atlas, visite d'Aït Benhaddou et continuation vers les magnifiques gorges du Dadès pour la nuit.",
                    highlights: ["Col de Tizi n'Tichka", "Kasbah d'Aït Benhaddou", "Ouarzazate", "Vallée du Dadès"]
                },
                {
                    day: 2,
                    title: "Des Gorges du Dadès à Merzouga",
                    location: "Merzouga",
                    description: "Visite des gorges de Todra, puis direction Merzouga. Randonnée à chameau dans les dunes et nuit dans un campement du désert.",
                    highlights: ["Gorges de Todra", "Randonnée à chameau", "Coucher de soleil au Sahara", "Campement Berbère"]
                },
                {
                    day: 3,
                    title: "Exploration de la Région de Merzouga",
                    location: "Merzouga",
                    description: "Une journée complète pour explorer la région du désert. Visite du village de Khamlia pour la musique Gnawa, rencontre avec des familles nomades et plaisir des dunes.",
                    highlights: ["Musique Gnawa", "Visite des nomades", "Tour en 4x4 dans le désert", "Détente dans les dunes"]
                },
                {
                    day: 4,
                    title: "De Merzouga à Marrakech",
                    location: "Marrakech",
                    description: "Retour à Marrakech par une route différente passant par Alnif, Tazarine et la vallée du Draâ.",
                    highlights: ["Alnif & Tazarine", "Palmeraies de la vallée du Draâ", "Anti-Atlas", "Arrivée à Marrakech"]
                }
            ]
        },
        {
            id: 463,
            trip_code: "WT-CODE 463",
            title: "Tour de 5 Jours depuis Marrakech",
            url: "https://your-morocco.com/itinerary/5-days-tour-from-marrakech/",
            duration: "5 Jour(s) 4 Nuit(s)",
            locations: [
                { name: "Chefchaouen" },
                { name: "Fès" },
                { name: "Merzouga" }
            ],
            group_size: "illimité",
            description: "Découvrez les points forts du Maroc lors d'un tour de 5 jours de Marrakech à Merzouga, Fès, Chefchaouen et Casablanca. Balades à chameau, sites historiques et paysages époustouflants vous attendent.",
            image: {
                url: "/images/marrakech/marrakech3.webp",
                alt: "Visiter Marrakech Maroc"
            },
            banner_image: {
                url: "/images/marrakech/marrakech.webp",
                alt: "Visiter Marrakech Maroc"
            },
            gallery: [
                { url: "/images/marrakech/marrakech1.webp", alt: "Ville de Marrakech" },
                { url: "/images/marrakech/marrakech2.webp", alt: "Ruelles de la Médina" },
                { url: "/images/marrakech/marrakech3.webp", alt: "Architecture Traditionnelle" },
                { url: "/images/marrakech/marrakech4.webp", alt: "Souks Animés" },
                { url: "/images/marrakech/marrakech5.webp", alt: "Design Marocain" },
                { url: "/images/marrakech/marrakech6.webp", alt: "Vues sur la Ville" }
            ],
            highlights: [
                "Tour complet des villes impériales du Maroc",
                "Expérience désertique à Merzouga",
                "Visite de la ville bleue de Chefchaouen",
                "Exploration de la médina labyrinthique de Fès",
                "Visite de la Mosquée Hassan II à Casablanca"
            ],
            suitable_for: ["Amateurs de culture", "Passionnés d'histoire", "Aventuriers"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}380`,
            reviews: [
                { name: "Pierre Laurent", country: "France", rating: 5, text: "Le meilleur moyen de voir les villes impériales. Fès est fascinante." },
                { name: "Isabelle Petit", country: "Belgique", rating: 5, text: "Chefchaouen est magnifique avec tout ce bleu. Organisation parfaite." },
                { name: "Lucas Bernard", country: "Suisse", rating: 4, text: "Programme chargé mais on voit énormément de choses. Bon rapport qualité-prix." }
            ],
            itinerary: [
                {
                    day: 1,
                    title: "De Marrakech à Casablanca à Fès",
                    location: "Fès",
                    description: "Départ de Marrakech pour Casablanca pour voir la Mosquée Hassan II, puis continuation vers Fès pour la nuit.",
                    highlights: ["Mosquée Hassan II", "Trajet vers Fès"]
                },
                {
                    day: 2,
                    title: "Exploration de Fès",
                    location: "Fès",
                    description: "Journée complète de visite guidée de Fès. Visite de la médina, des tanneries, des médersas et du Palais Royal.",
                    highlights: ["Médina de Fès", "Tanneries", "Al Quaraouiyine", "Souks"]
                },
                {
                    day: 3,
                    title: "De Fès à Chefchaouen",
                    location: "Chefchaouen",
                    description: "Voyage vers la ville bleue, Chefchaouen, à travers les montagnes du Rif.",
                    highlights: ["Montagnes du Rif", "Rues bleues", "Mosquée Espagnole"]
                },
                {
                    day: 4,
                    title: "De Chefchaouen à Rabat à Casablanca",
                    location: "Casablanca",
                    description: "Conduite vers Rabat pour visiter la Tour Hassan et la Kasbah des Oudayas, puis continuation vers Casablanca.",
                    highlights: ["Tour Hassan", "Kasbah des Oudayas", "Ville de Rabat"]
                },
                {
                    day: 5,
                    title: "De Casablanca à Marrakech",
                    location: "Marrakech",
                    description: "Matinée à Casablanca/Rabat si le temps le permet, puis retour vers Marrakech.",
                    highlights: ["Trajet de retour", "Fin des services"]
                }
            ]
        }
    ],

    excursions: [
        {
            id: 296,
            trip_code: "WT-CODE 296",
            title: "Excursion à Zagora 2 Jours",
            url: "https://your-morocco.com/itinerary/zagora-2-days-excursion/",
            duration: "2 Jour(s) 1 Nuit(s)",
            locations: [
                { name: "Zagora" }
            ],
            group_size: "illimité",
            description: "Réservez une excursion de deux jours de Marrakech à Zagora incluant des balades à dos de chameau, une nuit dans un campement berbère et des visites d'Aït Benhaddou.",
            image: {
                url: "/images/Zagoura/gabriele-stravinskaite--mKpYC4RacA-unsplash.webp",
                alt: "Visiter ZAGORA Maroc"
            },
            banner_image: {
                url: "/images/Zagoura/marvin-meyer-X0XRRXSVLU4-unsplash.webp",
                alt: "Visiter ZAGORA Maroc"
            },
            gallery: [
                { url: "/images/Zagoura/darolti-dan-GJw9zRK_VBs-unsplash.webp", alt: "Désert de Zagora" },
                { url: "/images/Zagoura/gabriele-stravinskaite--mKpYC4RacA-unsplash.webp", alt: "Randonnée à chameau" },
                { url: "/images/Zagoura/ismail-el-youssefi-geeSPCxnKzU-unsplash.webp", alt: "Paysage désertique" },
                { url: "/images/Zagoura/kristijan-nikodinovski-RfK4AQchykw-unsplash.webp", alt: "Campement Berbère" },
                { url: "/images/Zagoura/raul-mermans-garcia-oWzVpeYyJ-w-unsplash.webp", alt: "Coucher de soleil à Zagora" }
            ],
            highlights: [
                "Trajet à travers la vallée du Draâ",
                "Visite de la Kasbah d'Aït Benhaddou",
                "Balade à dos de chameau dans le désert de Zagora",
                "Nuitée dans un campement traditionnel",
                "Observation des étoiles dans le désert"
            ],
            suitable_for: ["Voyageurs en court séjour", "Familles", "Couples"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}150`,
            reviews: [
                { name: "Julien Robert", country: "France", rating: 4, text: "Très bien pour un court séjour. Zagora est belle, même si les dunes sont plus petites qu'à Merzouga." },
                { name: "Élise Richard", country: "Canada", rating: 5, text: "Dormir sous les étoiles était magique. La vallée du Draâ est superbe." }
            ],
            programSteps: [
                { time: "07:30", title: "Départ", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "10:30", title: "Col de Tizi n'Tichka", description: "Arrêt panoramique dans les montagnes du Haut Atlas" },
                { time: "12:00", title: "Aït Benhaddou", description: "Visite de la kasbah classée au patrimoine mondial de l'UNESCO" },
                { time: "13:30", title: "Déjeuner", description: "Déjeuner traditionnel dans un restaurant local à Ouarzazate" },
                { time: "15:00", title: "Vallée du Draâ", description: "Trajet à travers les palmeraies et les kasbahs anciennes" },
                { time: "17:30", title: "Arrivée à Zagora", description: "Arrivée dans la région désertique de Zagora" },
                { time: "18:00", title: "Balade à chameau", description: "Balade à dos de chameau au coucher du soleil vers le campement berbère" },
                { time: "20:00", title: "Dîner & Soirée", description: "Dîner traditionnel et musique autour du feu de camp" },
                { time: "06:00", title: "Lever du soleil", description: "Observation optionnelle du lever du soleil dans le désert" },
                { time: "08:00", title: "Petit-déjeuner", description: "Petit-déjeuner berbère au campement" },
                { time: "09:00", title: "Retour à chameau", description: "Balade à dos de chameau retour vers le village de Zagora" },
                { time: "11:00", title: "Départ", description: "Début du trajet de retour vers Marrakech" },
                { time: "13:00", title: "Déjeuner", description: "Arrêt déjeuner à Ouarzazate" },
                { time: "18:00", title: "Arrivée", description: "Dépose à votre hôtel ou riad à Marrakech" }
            ]
        },
        {
            id: 294,
            trip_code: "WT-CODE 294",
            title: "Excursion aux Cascades d'Ouzoud 1 Jour",
            url: "https://your-morocco.com/itinerary/ouzoud-waterfalls-1-day-excursion/",
            duration: "1 Jour",
            locations: [
                { name: "Marrakech" },
                { name: "Cascades d'Ouzoud" }
            ],
            group_size: "illimité",
            description: "Échappez-vous dans la nature avec une excursion d'une journée aux cascades d'Ouzoud depuis Marrakech. Profitez de randonnées pittoresques, de promenades en bateau et de vues à couper le souffle lors de cette journée de détente.",
            image: {
                url: "/images/ouzoud/selina-bubendorfer-jP51Ai2tQGE-unsplash.webp",
                alt: "Visiter les Cascades d'OUZOUD"
            },
            banner_image: {
                url: "/images/ouzoud/rihards-sarma-mJGl8l1SiJk-unsplash.webp",
                alt: "Visiter les Cascades d'OUZOUD"
            },
            gallery: [
                { url: "/images/ouzoud/danai-tsoutreli-tqLc6On9KIA-unsplash.webp", alt: "Cascades d'Ouzoud" },
                { url: "/images/ouzoud/selina-bubendorfer-jP51Ai2tQGE-unsplash.webp", alt: "Nature des Cascades" },
                { url: "/images/ouzoud/sergio-teixeira-svdabxVg7-4-unsplash.webp", alt: "Vue Scénique" },
                { url: "/images/ouzoud/tobias-pfeifer-F8TGlff-qks-unsplash.webp", alt: "Macaque de Barbarie" },
                { url: "/images/ouzoud/tobias-pfeifer-IBT7zZDTtNg-unsplash.webp", alt: "Paysage d'Ouzoud" }
            ],
            highlights: [
                "Découvrez les plus hautes cascades d'Afrique du Nord",
                "Randonnée à travers les oliveraies",
                "Observation des macaques de Barbarie sauvages",
                "Promenade en bateau optionnelle près des cascades",
                "Déjeuner avec vue sur les cascades"
            ],
            suitable_for: ["Amoureux de la nature", "Familles", "Photographes"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}55`,
            reviews: [
                { name: "Manon Durand", country: "France", rating: 5, text: "Les cascades sont impressionnantes ! La petite balade en bateau vaut le coup." },
                { name: "Antoine Simon", country: "Belgique", rating: 5, text: "Une pause rafraîchissante. La randonnée est accessible et les singes sont amusants." }
            ],
            programSteps: [
                { time: "08:00", title: "Prise en charge", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "10:30", title: "Arrivée", description: "Arrivée au parking des cascades d'Ouzoud" },
                { time: "11:00", title: "Randonnée guidée", description: "Descente vers les cascades avec guide local" },
                { time: "12:00", title: "Vue des cascades", description: "Admirez les spectaculaires cascades de 110m de haut" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner traditionnel dans un restaurant surplombant les cascades" },
                { time: "14:30", title: "Temps libre", description: "Temps libre pour photos, promenade en bateau ou observation des singes" },
                { time: "16:00", title: "Retour", description: "Remontée vers le parking" },
                { time: "16:30", title: "Départ", description: "Début du trajet de retour vers Marrakech" },
                { time: "19:00", title: "Dépose", description: "Dépose à votre hôtel ou riad à Marrakech" }
            ]
        },
        {
            id: 289,
            trip_code: "WT-CODE 289",
            title: "Excursion à la Vallée de l'Ourika 1 Jour",
            url: "https://your-morocco.com/itinerary/ourika-valley-1-day-excursion/",
            duration: "1 Jour",
            locations: [
                { name: "Marrakech" },
                { name: "Vallée de l'Ourika" }
            ],
            group_size: "illimité",
            description: "Découvrez la beauté de la vallée de l'Ourika lors d'une excursion d'une journée depuis Marrakech. Profitez de vues pittoresques, de villages berbères, de cascades et d'une escapade paisible.",
            image: {
                url: "/images/ourika/abderrahman-kamal-MilM52Qj32g-unsplash.webp",
                alt: "Visiter la VALLÉE DE L'OURIKA MAROC"
            },
            banner_image: {
                url: "/images/ourika/hassan-ahrouch-CfmIZwBvxNY-unsplash.webp",
                alt: "Visiter la VALLÉE DE L'OURIKA MAROC"
            },
            gallery: [
                { url: "/images/ourika/abdelhamid-azoui-BGU0uaY0tJs-unsplash.webp", alt: "Vallée de l'Ourika" },
                { url: "/images/ourika/abderrahman-kamal-MilM52Qj32g-unsplash.webp", alt: "Bord de rivière" },
                { url: "/images/ourika/matthew-fainman-3yonP2JaGTU-unsplash.webp", alt: "Montagnes de l'Atlas" }
            ],
            highlights: [
                "Visite d'une maison berbère traditionnelle",
                "Randonnée vers les cascades de Setti Fatma",
                "Profitez de l'air frais de la montagne",
                "Shopping d'artisanat local et d'huile d'argan",
                "Déjeuner au bord de la rivière"
            ],
            suitable_for: ["Familles", "Amoureux de la nature", "Randonneurs"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}45`,
            reviews: [
                { name: "Chloé Michel", country: "France", rating: 4, text: "Belle journée. Le déjeuner les pieds dans l'eau était une expérience unique." },
                { name: "Alexandre David", country: "Suisse", rating: 5, text: "La nature est belle. Il faut de bonnes chaussures pour marcher jusqu'aux cascades." }
            ],
            programSteps: [
                { time: "08:30", title: "Prise en charge", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "09:30", title: "Trajet panoramique", description: "Trajet à travers la vallée de l'Ourika avec arrêts photos" },
                { time: "10:30", title: "Visite maison berbère", description: "Visite d'une maison de famille berbère traditionnelle" },
                { time: "11:30", title: "Coopérative d'huile d'argan", description: "Découverte de la production traditionnelle d'huile d'argan" },
                { time: "12:30", title: "Déjeuner", description: "Déjeuner traditionnel au bord de la rivière Ourika" },
                { time: "14:00", title: "Randonnée aux cascades", description: "Randonnée vers les cascades de Setti Fatma (optionnel)" },
                { time: "16:00", title: "Temps libre", description: "Temps libre pour explorer ou se détendre au bord de la rivière" },
                { time: "16:30", title: "Retour", description: "Départ pour Marrakech" },
                { time: "18:00", title: "Dépose", description: "Dépose à votre hôtel ou riad" }
            ]
        },
        {
            id: 259,
            trip_code: "WT-CODE 259",
            title: "Excursion à Casablanca",
            url: "https://your-morocco.com/itinerary/casablanca-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Casablanca" }
            ],
            group_size: "illimité",
            description: "Explorez Casablanca lors d'une visite guidée d'une journée. Visitez la Mosquée Hassan II, les monuments Art déco, le quartier des Habous et la Corniche lors de cette excursion culturelle.",
            image: {
                url: "/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.webp",
                alt: "Visiter Casablanca Maroc"
            },
            banner_image: {
                url: "/images/casablanca/oussama-rahib-NNECQHl9bJc-unsplash.webp",
                alt: "Visiter Casablanca Maroc"
            },
            gallery: [
                { url: "/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.webp", alt: "Mosquée Hassan II" },
                { url: "/images/casablanca/imad-ghazal-gRE6Be-o_Hw-unsplash.webp", alt: "Rues de Casablanca" },
                { url: "/images/casablanca/kristijan-nikodinovski-nkav4Pi-UwY-unsplash.webp", alt: "Architecture de la ville" },
                { url: "/images/casablanca/mannie-nami-_aNm8TMzbUI-unsplash.webp", alt: "Vue urbaine" },
                { url: "/images/casablanca/mehdi-sakout-54nOsVV1xI4-unsplash.webp", alt: "Vie à Casablanca" },
                { url: "/images/casablanca/zakaria-zayane-aBywMnV7ibk-unsplash.webp", alt: "Corniche" }
            ],
            highlights: [
                "Visite de la magnifique Mosquée Hassan II",
                "Promenade le long de la Corniche",
                "Exploration du quartier des Habous",
                "Découverte de l'architecture Art déco",
                "Visite de la place Mohammed V"
            ],
            suitable_for: ["Amoureux de la culture", "Passionnés d'architecture"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}85`,
            reviews: [
                { name: "Sarah Bertrand", country: "France", rating: 5, text: "La mosquée Hassan II est époustouflante. Un chef-d'œuvre architectural à voir absolument." },
                { name: "Maxime Thomas", country: "Canada", rating: 4, text: "Bon aperçu de Casablanca. Nous avons vu l'essentiel efficacement." }
            ],
            programSteps: [
                { time: "07:00", title: "Prise en charge", description: "Prise en charge à votre hôtel à Marrakech (ou rendez-vous à Casablanca)" },
                { time: "10:30", title: "Mosquée Hassan II", description: "Visite guidée de l'intérieur et extérieur de la mosquée" },
                { time: "12:00", title: "Corniche", description: "Promenade le long de la promenade côtière" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner fruits de mer dans un restaurant local" },
                { time: "14:30", title: "Quartier des Habous", description: "Exploration de la nouvelle médina construite par les Français" },
                { time: "15:30", title: "Quartier Art déco", description: "Découverte de l'architecture historique des années 1930" },
                { time: "16:30", title: "Place Mohammed V", description: "Visite de la place centrale et des monuments environnants" },
                { time: "17:30", title: "Retour", description: "Départ pour Marrakech" },
                { time: "20:30", title: "Dépose", description: "Dépose à votre hôtel à Marrakech" }
            ]
        },
        {
            id: 255,
            trip_code: "WT-CODE 255",
            title: "Excursion à Essaouira 1 Jour",
            url: "https://your-morocco.com/itinerary/essaouira-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Essaouira" },
                { name: "Marrakech" }
            ],
            group_size: "illimité",
            description: "Explorez Essaouira lors d'une excursion d'une journée depuis Marrakech. Visitez la médina, profitez de la plage et découvrez l'artisanat local dans cette charmante ville côtière.",
            image: {
                url: "/images/essaouira/peter-schulz--leOF2nzJQ8-unsplash.webp",
                alt: "Visiter ESSAOUIRA MAROC"
            },
            banner_image: {
                url: "/images/essaouira/rigel-ibisQEDxODo-unsplash.webp",
                alt: "Visiter ESSAOUIRA MAROC"
            },
            gallery: [
                { url: "/images/essaouira/hamza-omlacho-M9GO4Gsd2SM-unsplash.webp", alt: "Port d'Essaouira" },
                { url: "/images/essaouira/mostapha-abidour-h9L1GfDgp0s-unsplash.webp", alt: "Bateaux bleus" },
                { url: "/images/essaouira/pete-bread-4eZeMUKdV-8-unsplash.webp", alt: "Remparts de la médina" },
                { url: "/images/essaouira/peter-schulz--leOF2nzJQ8-unsplash.webp", alt: "Plage d'Essaouira" },
                { url: "/images/essaouira/rigel-No_Y3bn4lNQ-unsplash.webp", alt: "Vue côtière" },
                { url: "/images/essaouira/rigel-QWJjSOB9t0Y-unsplash.webp", alt: "Skala de la Ville" },
                { url: "/images/essaouira/youssef-aboutaleb-ad1FM2Xj0QQ-unsplash.webp", alt: "Rues d'Essaouira" }
            ],
            highlights: [
                "Promenade dans la médina historique (site UNESCO)",
                "Visite de la forteresse Skala de la Ville",
                "Détente sur la plage de sable",
                "Visite du port de pêche et des bateaux bleus",
                "Shopping d'artisanat en bois de thuya"
            ],
            suitable_for: ["Amoureux de la plage", "Passionnés d'histoire", "Chercheurs de détente"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}65`,
            reviews: [
                { name: "Léa Garcia", country: "Espagne", rating: 5, text: "J'ai adoré l'ambiance d'Essaouira. Très détendu et le poisson frais est délicieux." },
                { name: "Hugo Martinez", country: "France", rating: 4, text: "Il y avait du vent mais c'est charmant. La médina et les remparts sont superbes." }
            ],
            programSteps: [
                { time: "08:00", title: "Prise en charge", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "10:30", title: "Arrivée", description: "Arrivée à Essaouira et rencontre avec votre guide local" },
                { time: "11:00", title: "Visite de la médina", description: "Visite guidée à pied de la médina classée UNESCO" },
                { time: "12:00", title: "Skala de la Ville", description: "Visite de la forteresse historique et des canons" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner fruits de mer frais au port (optionnel)" },
                { time: "14:30", title: "Visite du port", description: "Découverte des traditionnels bateaux de pêche bleus" },
                { time: "15:30", title: "Temps libre", description: "Temps libre pour shopping, plage ou exploration" },
                { time: "16:30", title: "Retour", description: "Départ pour Marrakech" },
                { time: "19:00", title: "Dépose", description: "Dépose à votre hôtel ou riad" }
            ]
        },
        {
            id: 253,
            trip_code: "WT-CODE 253",
            title: "Excursion à Rabat",
            url: "https://your-morocco.com/itinerary/rabat-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Rabat" }
            ],
            group_size: "illimité",
            description: "Visitez la capitale du Maroc lors d'une excursion guidée à Rabat. Explorez la Tour Hassan, la Kasbah des Oudayas, les ruines de Chellah et le Palais Royal en une journée.",
            image: {
                url: "/images/rabat/framopia-EZqHkkyc0wg-unsplash.webp",
                alt: "Visiter Rabat Maroc"
            },
            banner_image: {
                url: "/images/rabat/niklas-VqouWpsuziE-unsplash.webp",
                alt: "Visiter Rabat Maroc"
            },
            gallery: [
                { url: "/images/rabat/framopia-EZqHkkyc0wg-unsplash.webp", alt: "Tour Hassan" },
                { url: "/images/rabat/hamza-nouasria-7zVLZu5twJs-unsplash.webp", alt: "Kasbah des Oudayas" },
                { url: "/images/rabat/mehdi-lamaaffar-PqX7EELWjh0-unsplash.webp", alt: "Architecture de Rabat" },
                { url: "/images/rabat/soulaymane-elyoussfi-oDSEPEtrQFo-unsplash.webp", alt: "Mausolée de Mohammed V" },
                { url: "/images/rabat/yous-gil-2Kyh6kB5Yh8-unsplash.webp", alt: "Vue sur la ville de Rabat" }
            ],
            highlights: [
                "Visite de la Tour Hassan et du Mausolée de Mohammed V",
                "Exploration de la Kasbah des Oudayas",
                "Visite de la Nécropole de Chellah",
                "Vue extérieure du Palais Royal",
                "Promenade dans les Jardins Andaloux"
            ],
            suitable_for: ["Passionnés d'histoire", "Amoureux de la culture"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}90`,
            reviews: [
                { name: "Arthur Roux", country: "Belgique", rating: 5, text: "Rabat est une capitale très verte et propre. La Tour Hassan est impressionnante." },
                { name: "Juliette Fournier", country: "France", rating: 5, text: "Belle leçon d'histoire. La Kasbah des Oudayas ressemble à un village grec." }
            ],
            programSteps: [
                { time: "07:00", title: "Prise en charge", description: "Prise en charge à votre hôtel à Marrakech (ou rendez-vous à Rabat)" },
                { time: "10:30", title: "Tour Hassan", description: "Visite du minaret du 12ème siècle et du Mausolée de Mohammed V" },
                { time: "12:00", title: "Kasbah des Oudayas", description: "Exploration de la forteresse historique et des rues peintes en bleu" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner dans un restaurant traditionnel de la médina" },
                { time: "14:30", title: "Nécropole de Chellah", description: "Visite des ruines romaines et médiévales" },
                { time: "15:30", title: "Palais Royal", description: "Vue extérieure du palais du Roi" },
                { time: "16:30", title: "Jardins Andaloux", description: "Détente dans les jardins botaniques paisibles" },
                { time: "17:30", title: "Retour", description: "Départ pour Marrakech" },
                { time: "20:30", title: "Dépose", description: "Dépose à votre hôtel à Marrakech" }
            ]
        },
        {
            id: 251,
            trip_code: "WT-CODE 251",
            title: "Excursion à Fès",
            url: "https://your-morocco.com/itinerary/fes-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Fès" }
            ],
            group_size: "illimité",
            description: "Explorez le cœur culturel du Maroc avec une excursion guidée à Fès. Visitez Al Quaraouiyine, la Tannerie Chouara et la vieille médina en une journée inoubliable.",
            image: {
                url: "/images/fes/ben-ostrower-bjNv5Bg6h4U-unsplash.webp",
                alt: "Visiter Fès Maroc"
            },
            banner_image: {
                url: "/images/fes/mauro-lima-buvA1ofvTMY-unsplash.webp",
                alt: "Visiter Fès Maroc"
            },
            gallery: [
                { url: "/images/fes/ben-ostrower-bjNv5Bg6h4U-unsplash.webp", alt: "Tannerie de Fès" },
                { url: "/images/fes/hamza-demnati-CJ_DC8Nd2Fk-unsplash.webp", alt: "Médina de Fès" },
                { url: "/images/fes/hazy-momo-YSTtLgsvRa8-unsplash.webp", alt: "Ruelles de la médina" },
                { url: "/images/fes/mauro-lima-mPD9BJ_QGXw-unsplash.webp", alt: "Bab Bou Jeloud" },
                { url: "/images/fes/toni-DBNhQdCG-XA-unsplash.webp", alt: "Artisanat traditionnel" }
            ],
            highlights: [
                "Perdez-vous dans la Médina de Fès el-Bali",
                "Visite de la Tannerie Chouara",
                "Découverte de l'Université Al Quaraouiyine",
                "Admirez la Médersa Bou Inania",
                "Exploration des souks et des ateliers d'artisans"
            ],
            suitable_for: ["Amoureux de la culture", "Passionnés d'histoire", "Acheteurs"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}95`,
            reviews: [
                { name: "Gabriel Morel", country: "France", rating: 5, text: "La médina est un labyrinthe incroyable ! Avoir un guide est indispensable." },
                { name: "Emma Girard", country: "Suisse", rating: 4, text: "L'histoire est partout. L'odeur des tanneries est forte mais c'est fascinant à voir." }
            ],
            programSteps: [
                { time: "07:00", title: "Prise en charge", description: "Prise en charge à votre hôtel à Marrakech (ou rendez-vous à Fès)" },
                { time: "10:30", title: "Entrée de la médina", description: "Entrée par Bab Bou Jeloud (Porte Bleue)" },
                { time: "11:00", title: "Tannerie Chouara", description: "Visite de l'ancienne tannerie de cuir avec vue d'ensemble" },
                { time: "12:00", title: "Al Quaraouiyine", description: "Découverte de la plus ancienne université du monde (extérieur)" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner marocain traditionnel dans la médina" },
                { time: "14:30", title: "Médersa Bou Inania", description: "Visite de l'exquise école islamique" },
                { time: "15:30", title: "Quartiers d'artisans", description: "Exploration des souks de poterie, tissage et métallurgie" },
                { time: "16:30", title: "Palais Royal", description: "Vue extérieure du grand Palais Royal" },
                { time: "17:30", title: "Retour", description: "Départ pour Marrakech" },
                { time: "20:30", title: "Dépose", description: "Dépose à votre hôtel à Marrakech" }
            ]
        },
        {
            id: 40,
            trip_code: "WT-CODE 40",
            title: "Excursion à Ouarzazate 1 Jour",
            url: "https://your-morocco.com/itinerary/ouarzazate-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Ouarzazate" }
            ],
            group_size: "illimité",
            description: "Rejoignez une excursion d'une journée de Marrakech à Ouarzazate et Aït Benhaddou. Visitez les studios de cinéma, les kasbahs anciennes et profitez de vues panoramiques à travers les montagnes de l'Atlas.",
            image: {
                url: "/images/ouarzazate/abdou-faiz-lA-P8-vagrI-unsplash.webp",
                alt: "Tour à Ouarzazate Maroc"
            },
            banner_image: {
                url: "/images/ouarzazate/hassan-ouajbir-INcADDyMwwo-unsplash.webp",
                alt: "Tour à Ouarzazate Maroc"
            },
            gallery: [
                { url: "/images/ouarzazate/abdou-faiz-lA-P8-vagrI-unsplash.webp", alt: "Aït Benhaddou" },
                { url: "/images/ouarzazate/abdou-faiz-mBo2EUfJ7sY-unsplash.webp", alt: "Kasbah Taourirt" },
                { url: "/images/ouarzazate/abdou-faiz-wGy7RhTKODg-unsplash.webp", alt: "Studios de cinéma" },
                { url: "/images/ouarzazate/cristiano-pinto-knB5iCogf5Q-unsplash.webp", alt: "Architecture désertique" },
                { url: "/images/ouarzazate/laurent-gence-UMEcD4j--_I-unsplash.webp", alt: "Paysage d'Ouarzazate" },
                { url: "/images/ouarzazate/sergio-otoya--3uyPo-2cOE-unsplash.webp", alt: "Vues sur l'Atlas" }
            ],
            highlights: [
                "Traversée du col de Tizi n'Tichka",
                "Visite des studios de cinéma Atlas",
                "Exploration de la Kasbah Taourirt",
                "Promenade à travers Aït Benhaddou",
                "Profitez des paysages désertiques"
            ],
            suitable_for: ["Fans de cinéma", "Passionnés d'histoire", "Touristes"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}70`,
            reviews: [
                { name: "Raphaël Bonnet", country: "France", rating: 5, text: "Le Hollywood de l'Afrique ! Génial de voir les décors de Gladiator. Aït Benhaddou est magique." },
                { name: "Jade Lambert", country: "Canada", rating: 5, text: "L'architecture en terre est magnifique sous le ciel bleu." }
            ],
            programSteps: [
                { time: "07:00", title: "Prise en charge", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "09:30", title: "Col de Tizi n'Tichka", description: "Arrêt photo au point culminant (2 260m)" },
                { time: "11:00", title: "Aït Benhaddou", description: "Visite guidée de la kasbah classée UNESCO" },
                { time: "12:30", title: "Déjeuner", description: "Déjeuner dans un restaurant avec vue sur la kasbah" },
                { time: "14:00", title: "Studios de cinéma Atlas", description: "Visite des studios de cinéma d'Hollywood en Afrique" },
                { time: "15:00", title: "Kasbah Taourirt", description: "Exploration de la plus grande kasbah du Maroc" },
                { time: "16:00", title: "Retour", description: "Départ pour Marrakech via les montagnes de l'Atlas" },
                { time: "19:00", title: "Dépose", description: "Dépose à votre hôtel ou riad à Marrakech" }
            ]
        },
        {
            id: 41,
            trip_code: "WT-CODE 41",
            title: "Excursion à Merzouga 3 Jours",
            url: "https://your-morocco.com/itinerary/merzouga-excursion/",
            duration: "3 Jour(s) 2 Nuit(s)",
            locations: [
                { name: "Merzouga" }
            ],
            group_size: "illimité",
            description: "Rejoignez un tour de 3 jours dans le désert depuis Marrakech jusqu'à Merzouga. Visitez Aït Benhaddou, faites une balade à dos de chameau, dormez dans un campement berbère et explorez le Sahara.",
            image: {
                url: "/images/merzouga/merzouga6.webp",
                alt: "Visiter Merzouga Maroc"
            },
            banner_image: {
                url: "/images/merzouga/merzouga3.webp",
                alt: "Visiter Merzouga Maroc"
            },
            gallery: [
                { url: "/images/merzouga/merzouga1.webp", alt: "Randonnée à chameau" },
                { url: "/images/merzouga/merzouga2.webp", alt: "Nuit au campement du désert" },
                { url: "/images/merzouga/merzouga4.webp", alt: "Dunes de Merzouga" },
                { url: "/images/merzouga/merzouga5.webp", alt: "Coucher de soleil dans le Sahara" },
                { url: "/images/merzouga/merzouga6.webp", alt: "Vie dans le désert" },
                { url: "/images/merzouga/merzouga7.webp", alt: "Traditions berbères" }
            ],
            highlights: [
                "Expérience du désert du Sahara",
                "Randonnée à chameau au coucher du soleil",
                "Nuitée dans un campement du désert",
                "Visite des gorges de Todra",
                "Observation du ciel étoilé"
            ],
            suitable_for: ["Chercheurs d'aventure", "Amoureux de la nature"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}180`,
            reviews: [
                { name: "Louis Faure", country: "France", rating: 5, text: "Le désert est unique. 3 jours incroyables. Le lever du soleil vaut le réveil matinal." },
                { name: "Clara Dupuis", country: "Belgique", rating: 5, text: "Organisation au top. Chauffeur très sympa et van confortable." }
            ],
            programSteps: [
                { time: "07:00", title: "Jour 1 : Départ", description: "Prise en charge à votre hôtel à Marrakech" },
                { time: "10:30", title: "Aït Benhaddou", description: "Visite de la kasbah célèbre (site UNESCO)" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner à Ouarzazate" },
                { time: "15:00", title: "Vallée du Draâ", description: "Trajet à travers la plus longue vallée du Maroc" },
                { time: "18:00", title: "Arrivée", description: "Arrivée à l'hôtel à Zagora ou similaire" },
                { time: "20:00", title: "Dîner", description: "Dîner et nuit à l'hôtel" },
                { time: "08:00", title: "Jour 2 : Petit-déjeuner", description: "Petit-déjeuner à l'hôtel" },
                { time: "09:00", title: "Départ", description: "Poursuite du voyage vers Merzouga" },
                { time: "12:30", title: "Gorges de Todra", description: "Visite du canyon impressionnant (300m de haut)" },
                { time: "13:30", title: "Déjeuner", description: "Déjeuner près des gorges de Todra" },
                { time: "16:00", title: "Arrivée à Merzouga", description: "Arrivée au bord des dunes de l'Erg Chebbi" },
                { time: "17:00", title: "Balade à chameau", description: "Balade à dos de chameau au coucher du soleil" },
                { time: "19:00", title: "Campement du désert", description: "Arrivée au campement berbère, dîner et musique" },
                { time: "06:00", title: "Jour 3 : Lever du soleil", description: "Balade à chameau optionnelle au lever du soleil" },
                { time: "08:00", title: "Petit-déjeuner", description: "Petit-déjeuner au campement du désert" },
                { time: "09:00", title: "Retour", description: "Balade à dos de chameau retour vers le village de Merzouga" },
                { time: "10:00", title: "Départ", description: "Début du trajet de retour vers Marrakech" },
                { time: "13:00", title: "Déjeuner", description: "Arrêt déjeuner à Ouarzazate" },
                { time: "20:00", title: "Arrivée", description: "Dépose à votre hôtel à Marrakech" }
            ]
        },
        {
            id: 38,
            trip_code: "WT-CODE 38",
            title: "Excursion à Marrakech",
            url: "https://your-morocco.com/itinerary/marrakech-excursion/",
            duration: "1 Jour(s)",
            locations: [
                { name: "Marrakech" }
            ],
            group_size: "illimité",
            description: "Explorez Marrakech en une journée avec une visite guidée de la ville. Visitez la médina, le Palais Bahia, le Jardin Majorelle et la place Jemaa el-Fnaa pour une expérience complète.",
            image: {
                url: "/images/marrakech/marrakech5.webp",
                alt: "Visiter Marrakech Maroc"
            },
            banner_image: {
                url: "/images/marrakech/marrakech1.webp",
                alt: "Visiter Marrakech Maroc"
            },
            gallery: [
                { url: "/images/marrakech/marrakech2.webp", alt: "Rues de Marrakech" },
                { url: "/images/marrakech/marrakech3.webp", alt: "Jardin Majorelle" },
                { url: "/images/marrakech/marrakech4.webp", alt: "Jemaa el-Fnaa" },
                { url: "/images/marrakech/marrakech5.webp", alt: "Mosquée Koutoubia" },
                { url: "/images/marrakech/marrakech6.webp", alt: "Souks" },
                { url: "/images/marrakech/marrakech7.webp", alt: "Palais Bahia" },
                { url: "/images/marrakech/marrakech8.webp", alt: "Médina" },
                { url: "/images/marrakech/marrakech9.webp", alt: "Architecture marocaine" },
                { url: "/images/marrakech/marrakech10.webp", alt: "Artisanat traditionnel" }
            ],
            highlights: [
                "Visite de la Mosquée Koutoubia",
                "Exploration du Palais Bahia",
                "Promenade dans le Jardin Majorelle",
                "Expérience de la place Jemaa el-Fnaa",
                "Shopping dans les souks"
            ],
            suitable_for: ["Explorateurs urbains", "Amoureux de la culture", "Acheteurs"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}50`,
            reviews: [
                { name: "Adam Rousseau", country: "France", rating: 5, text: "Tant de choses à voir. Les palais sont magnifiques. Jemaa el-Fnaa est unique le soir !" },
                { name: "Inès Blanc", country: "Suisse", rating: 5, text: "Super introduction à la ville. Le Jardin Majorelle est un havre de paix." }
            ],
            programSteps: [
                { time: "09:00", title: "Prise en charge", description: "Prise en charge à votre hôtel ou riad à Marrakech" },
                { time: "09:30", title: "Mosquée Koutoubia", description: "Visite de la mosquée emblématique du 12ème siècle (extérieur)" },
                { time: "10:30", title: "Palais Bahia", description: "Visite guidée du palais du 19ème siècle et des jardins" },
                { time: "12:00", title: "Tombeaux Saadiens", description: "Visite des tombeaux royaux de la dynastie saadienne" },
                { time: "13:00", title: "Déjeuner", description: "Déjeuner marocain traditionnel dans la médina" },
                { time: "14:30", title: "Jardin Majorelle", description: "Exploration du jardin botanique et du Musée Berbère" },
                { time: "16:00", title: "Exploration des souks", description: "Promenade guidée dans les marchés traditionnels" },
                { time: "17:30", title: "Jemaa el-Fnaa", description: "Expérience de la célèbre place qui s'anime" },
                { time: "18:30", title: "Temps libre", description: "Temps libre pour dîner ou exploration supplémentaire" },
                { time: "20:00", title: "Dépose", description: "Dépose à votre hôtel ou riad" }
            ]
        }
    ],

    activities: [
        {
            id: 265,
            title: "Atelier de Cuisine au Maroc",
            url: "https://your-morocco.com/cooking-class-in-morocco/",
            description: "Découvrir le Maroc va bien au-delà de la visite de ses monuments et paysages célèbres. L'une des façons les plus mémorables de se connecter à la culture marocaine est à travers sa cuisine. Chez Your-Morocco, nous vous invitons à participer à un atelier de cuisine immersif qui vous permet de découvrir le riche patrimoine culinaire du pays dans une atmosphère chaleureuse et authentique.",
            categories: ["Activités", "Blog"],
            image: {
                url: "/images/cooking-class/florian-d-bazac-PitkCiuzigI-unsplash.webp",
                alt: "Atelier de Cuisine au Maroc"
            },
            banner_image: {
                url: "/images/cooking-class/aziz-acharki-UBEcFUvkrcc-unsplash.webp",
                alt: "Atelier de Cuisine au Maroc"
            },
            gallery: [
                { url: "/images/cooking-class/florian-d-bazac-PitkCiuzigI-unsplash.webp", alt: "Ingrédients frais" },
                { url: "/images/cooking-class/hamza-nouasria-q11NM0cFFzY-unsplash.webp", alt: "Processus de cuisson" },
                { url: "/images/cooking-class/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.webp", alt: "Épices marocaines" },
                { url: "/images/cooking-class/sour-moha-4Tgjeh1fWCc-unsplash.webp", alt: "Tagine traditionnel" }
            ],
            highlights: [
                "Apprenez à préparer des plats emblématiques comme le tagine, le couscous, la pastilla et les pâtisseries traditionnelles",
                "Visite guidée du souk ou du marché local pour sélectionner des ingrédients frais",
                "Session de cuisine pratique dans un riad traditionnel ou une maison familiale",
                "Apprenez-en plus sur les épices, techniques et significations culturelles marocaines",
                "Dégustez le repas que vous avez aidé à créer avec d'autres voyageurs et vos hôtes"
            ],
            locations: ["Marrakech", "Fès", "Essaouira", "Ouarzazate", "Merzouga"],
            duration: "Flexible - disponible tout au long de votre voyage",
            suitable_for: ["Voyageurs solos", "Couples", "Familles", "Groupes", "Occasions spéciales", "Événements de team-building"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}45 `,
            reviews: [
                { name: "Théo Guerin", country: "France", rating: 5, text: "Très amusant ! Faire le marché puis cuisiner était top. Le tagine était délicieux." },
                { name: "Louise Mercier", country: "Canada", rating: 5, text: "On a beaucoup appris sur les épices. La famille d'accueil était adorable." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Nom complet" },
                    { name: "country", type: "text", required: true, label: "Pays" },
                    { name: "phone_number", type: "text", required: true, label: "Numéro de téléphone" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Taille du groupe", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Code du voyage ou décrivez votre tour personnalisé", placeholder: "Prise en charge à l'aéroport/hôtel de Marrakech, tour de 5 jours au Maroc, souhait de visiter le désert, Essaouira & Casablanca, je veux aussi vivre une activité de balade à chameau, tour gastronomique, montgolfière..." }
                ],
                submit_text: "RÉSERVER"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Réservez maintenant, payez plus tard"
        },
        {
            id: 274,
            title: "Activité Quad au Maroc",
            url: "https://your-morocco.com/quad-biking-activity-in-morocco/",
            description: "Si vous cherchez de l'excitation, des paysages à couper le souffle et une sensation d'aventure, le quad au Maroc est l'activité parfaite. Avec Your-Morocco, vous pouvez vivre la sensation de conduire un quad à travers certains des terrains les plus époustouflants du pays, des sentiers rocheux du désert d'Agafay aux dunes dorées près de Merzouga, et les palmeraies juste à l'extérieur de Marrakech.",
            categories: ["Activités", "Blog"],
            image: {
                url: "/images/quad-biking/devon-janse-van-rensburg-08HCHS7EULI-unsplash.webp",
                alt: "Activité Quad au Maroc"
            },
            banner_image: {
                url: "/images/quad-biking/adrien-delforge-VH2HRylVsiM-unsplash.webp",
                alt: "Activité Quad au Maroc"
            },
            gallery: [
                { url: "/images/quad-biking/devon-janse-van-rensburg-08HCHS7EULI-unsplash.webp", alt: "Aventure dans le désert" },
                { url: "/images/quad-biking/haris-khan-v40H7tLOZII-unsplash.webp", alt: "Groupe de quad" },
                { url: "/images/quad-biking/mayar-zidan-LVNcykwlDEg-unsplash.webp", alt: "Route panoramique" },
                { url: "/images/quad-biking/nils-5RfEgsnxeHo-unsplash.webp", alt: "Fun hors route" }
            ],
            highlights: [
                "Conduisez à travers des terrains variés : désert d'Agafay, dunes de Merzouga, palmeraies",
                "Briefing de sécurité et formation pour tous les niveaux de compétence",
                "Randonnées guidées avec pauses panoramiques et opportunités de photos",
                "Thé marocain traditionnel dans les villages ou campements du désert",
                "Combine avec des balades à chameau, déjeuner ou visites de villages"
            ],
            locations: ["Désert d'Agafay", "Merzouga", "Périphérie de Marrakech", "Diverses régions"],
            duration: "Flexible - courtes aventures à expériences d'une journée complète",
            suitable_for: ["Couples", "Groupes d'amis", "Familles avec adolescents", "Team-building d'entreprise", "Chercheurs d'aventure"],
            skill_level: "Tous niveaux (débutant à expérimenté)",
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}65 `,
            reviews: [
                { name: "Maël Lefebvre", country: "France", rating: 5, text: "Sensations fortes ! Le désert d'Agafay ressemble à la lune. Super quads." },
                { name: "Zoé Gauthier", country: "Belgique", rating: 5, text: "Après-midi géniale. Poussière et vitesse ! La pause thé était sympa." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Nom complet" },
                    { name: "country", type: "text", required: true, label: "Pays" },
                    { name: "phone_number", type: "text", required: true, label: "Numéro de téléphone" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Taille du groupe", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Code du voyage ou décrivez votre tour personnalisé", placeholder: "Prise en charge à l'aéroport/hôtel de Marrakech, tour de 5 jours au Maroc, souhait de visiter le désert, Essaouira & Casablanca, je veux aussi vivre une activité de balade à chameau, tour gastronomique, montgolfière..." }
                ],
                submit_text: "RÉSERVER"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Réservez maintenant, payez plus tard"
        },
        {
            id: 272,
            title: "Activité Balade à Chameau au Maroc",
            url: "https://your-morocco.com/camel-riding-activity-in-morocco/",
            description: "La balade à chameau est l'une des façons les plus iconiques et paisibles d'explorer la beauté du Maroc. Avec Your-Morocco, vous pouvez profiter d'une expérience de chameau guidée à travers des paysages époustouflants tels que les dunes dorées du désert du Sahara, le désert rocheux d'Agafay près de Marrakech, ou les palmeraies luxuriantes autour des villages berbères traditionnels.",
            categories: ["Activités", "Blog"],
            image: {
                url: "/images/camel-riding/dave-meckler-ZzVc3uZXnr8-unsplash.webp",
                alt: "Activité Balade à Chameau au Maroc"
            },
            banner_image: {
                url: "/images/camel-riding/dan-calderwood-7CPopIsaCkc-unsplash.webp",
                alt: "Activité Balade à Chameau au Maroc"
            },
            gallery: [
                { url: "/images/camel-riding/dave-meckler-ZzVc3uZXnr8-unsplash.webp", alt: "Randonnée dans le désert" },
                { url: "/images/camel-riding/oussama-rahib-f7F8URbIx08-unsplash.webp", alt: "Balade au coucher du soleil" },
                { url: "/images/camel-riding/peter-thomas-PotqZeNaUZ4-unsplash.webp", alt: "Caravane de chameaux" },
                { url: "/images/camel-riding/peter-thomas-nF8-ekoE0qw-unsplash.webp", alt: "Expérience du Sahara" },
                { url: "/images/camel-riding/sheila-c-KuXu8rx_1-8-unsplash.webp", alt: "Dunes dorées" },
                { url: "/images/camel-riding/tamar-dCMvzMV1jfc-unsplash.webp", alt: "Gros plan sur chameau" }
            ],
            highlights: [
                "Balade à travers les dunes dorées du Sahara, le désert d'Agafay ou les palmeraies",
                "Guides locaux expérimentés assurant sécurité et confort",
                "Écharpes traditionnelles et selles confortables fournies",
                "Apprenez-en plus sur la culture nomade et profitez du thé à la menthe",
                "Options : balades d'1 heure à expériences complètes du désert avec nuitées"
            ],
            locations: ["Merzouga", "Zagora", "Désert d'Agafay", "Périphérie d'Essaouira", "Diverses régions"],
            duration_options: ["Balades d'1 heure", "Excursions d'une demi-journée", "Expériences complètes du désert avec nuitées"],
            suitable_for: ["Tous âges", "Couples", "Familles", "Groupes", "Chercheurs d'aventure paisible"],
            price: `À partir de ${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}35`,
            reviews: [
                { name: "Noah Perrin", country: "Suisse", rating: 4, text: "Promenade paisible. Les chameaux étaient bien traités. Le coucher de soleil était beau." },
                { name: "Alice Robin", country: "France", rating: 5, text: "La photo classique du Maroc ! Un peu secouant mais un super souvenir." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Nom complet" },
                    { name: "country", type: "text", required: true, label: "Pays" },
                    { name: "phone_number", type: "text", required: true, label: "Numéro de téléphone" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Taille du groupe", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Code du voyage ou décrivez votre tour personnalisé", placeholder: "Prise en charge à l'aéroport/hôtel de Marrakech, tour de 5 jours au Maroc, souhait de visiter le désert, Essaouira & Casablanca, je veux aussi vivre une activité de balade à chameau, tour gastronomique, montgolfière..." }
                ],
                submit_text: "RÉSERVER"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Réservez maintenant, payez plus tard"
        },
        {
            id: 278,
            title: "Tour Gastronomique au Maroc",
            url: "https://your-morocco.com/food-tour-activity-in-morocco/",
            description: "Un voyage à travers le Maroc n'est pas complet sans goûter à son incroyable street food et ses spécialités régionales. Chez Your-Morocco, nous proposons des tours gastronomiques soigneusement sélectionnés qui vous permettent d'explorer le paysage culinaire du pays tout en vous promenant dans ses médinas vibrantes, ses quartiers locaux et ses coins gastronomiques cachés. Ces visites sont conçues pour les voyageurs curieux qui veulent manger comme des locaux et comprendre les histoires derrière chaque bouchée.",
            categories: ["Activités", "Blog"],
            image: {
                url: "/images/food-tour/annie-spratt-_V4v7BbG338-unsplash.webp",
                alt: "Tour Gastronomique au Maroc"
            },
            banner_image: {
                url: "/images/food-tour/adil-elouardii-_fcZ5jncgAw-unsplash.webp",
                alt: "Tour Gastronomique au Maroc"
            },
            gallery: [
                { url: "/images/food-tour/annie-spratt-_V4v7BbG338-unsplash.webp", alt: "Délices locaux" },
                { url: "/images/food-tour/annie-spratt-wGzO3Qvp98Q-unsplash.webp", alt: "Street food" },
                { url: "/images/food-tour/florian-d-bazac-PitkCiuzigI-unsplash.webp", alt: "Plat traditionnel" },
                { url: "/images/food-tour/il-vagabiondo-SW7mMXu12Ws-unsplash.webp", alt: "Épices du marché" },
                { url: "/images/food-tour/louis-hansel-k2ZCm7LCj8E-unsplash.webp", alt: "Pain frais" },
                { url: "/images/food-tour/rigel-Zsw9CvJIeiw-unsplash.webp", alt: "Thé marocain" },
                { url: "/images/food-tour/sour-moha-4Tgjeh1fWCc-unsplash.webp", alt: "Tagine" },
                { url: "/images/food-tour/sour-moha-5t2SP3vQz28-unsplash.webp", alt: "Art culinaire" }
            ],
            highlights: [
                "Explorez les médinas vibrantes et les coins gastronomiques cachés",
                "Goûtez à la street food : soupe harira, brochettes, msemen, soupe d'escargots, pain frais",
                "Visitez des boulangeries familiales, des épiceries, des cafés traditionnels",
                "Apprenez-en plus sur les influences culinaires diverses du Maroc",
                "Rencontrez des vendeurs sympathiques et observez les techniques de cuisson"
            ],
            locations: ["Marrakech", "Fès", "Casablanca", "Autres villes riches en culture"],
            tour_types: ["Tours de street food", "Plats végétariens", "Douceurs et pâtisseries", "Dégustation aventureuse"],
            suitable_for: ["Couples", "Voyageurs solos", "Familles", "Petits groupes", "Voyages de lune de miel", "Tours photographiques", "Voyages d'affaires"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}55 `,
            reviews: [
                { name: "Liam Clement", country: "Canada", rating: 5, text: "On a tellement mangé ! La soupe d'escargots était étonnamment bonne. Je recommande." },
                { name: "Mila Lucas", country: "France", rating: 5, text: "Super façon de découvrir des endroits cachés de la médina." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Nom complet" },
                    { name: "country", type: "text", required: true, label: "Pays" },
                    { name: "phone_number", type: "text", required: true, label: "Numéro de téléphone" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Taille du groupe", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Code du voyage ou décrivez votre tour personnalisé", placeholder: "Prise en charge à l'aéroport/hôtel de Marrakech, tour de 5 jours au Maroc, souhait de visiter le désert, Essaouira & Casablanca, je veux aussi vivre une activité de balade à chameau, tour gastronomique, montgolfière..." }
                ],
                submit_text: "RÉSERVER"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Réservez maintenant, payez plus tard"
        },
        {
            id: 263,
            title: "Activité Montgolfière au Maroc",
            url: "https://your-morocco.com/air-balloon-activity-in-morocco/",
            description: "Pour les voyageurs à la recherche d'une aventure époustouflante et paisible, un vol en montgolfière au-dessus du Maroc est une expérience unique en son genre. Avec Your-Morocco, vous pouvez survoler de magnifiques paysages au lever du soleil, profitant de vues panoramiques sur les collines de terre rouge, les villages berbères éparpillés et les majestueuses montagnes de l'Atlas au loin.",
            categories: ["Activités", "Blog"],
            image: {
                url: "/images/airballon/justyna-jozefowicz-hZig-RKimQM-unsplash.webp",
                alt: "Activité Montgolfière au Maroc"
            },
            banner_image: {
                url: "/images/airballon/danai-tsoutreli-3NAlBV5PlmE-unsplash.webp",
                alt: "Activité Montgolfière au Maroc"
            },
            gallery: [
                { url: "/images/airballon/danai-tsoutreli-hqeYq7qSI7c-unsplash.webp", alt: "Vue depuis la montgolfière" },
                { url: "/images/airballon/justyna-jozefowicz-hZig-RKimQM-unsplash.webp", alt: "Vol au lever du soleil" },
                { url: "/images/airballon/manoa-angelo-w7jeZ5NFSvQ-unsplash.webp", alt: "Montagnes de l'Atlas" },
                { url: "/images/airballon/matthieu-gouiffes-6JZhmw5VhsA-unsplash.webp", alt: "Paysage aérien" },
                { url: "/images/airballon/mengyu-xu-Hu3DS4Rx4ts-unsplash.webp", alt: "Désert vu d'en haut" },
                { url: "/images/airballon/paul-lucyk-b_ZJPTbpUJw-unsplash.webp", alt: "Ombre de la montgolfière" },
                { url: "/images/airballon/wouter-groote-veldman-6NDiNzFdOyI-unsplash.webp", alt: "Préparation du vol" },
                { url: "/images/airballon/wouter-groote-veldman-hGGyMkSSTZY-unsplash.webp", alt: "Dans les hauteurs" }
            ],
            highlights: [
                "Vol en montgolfière au lever du soleil avec vues panoramiques",
                "Survolez les collines de terre rouge, les villages berbères, les montagnes de l'Atlas",
                "Expérience aérienne silencieuse et paisible",
                "Petit-déjeuner marocain traditionnel après l'atterrissage",
                "Certificat de vol souvenir"
            ],
            locations: ["Région de Marrakech", "Autres régions sur demande"],
            duration: "Environ 1 heure de vol + petit-déjeuner",
            schedule: "Prise en charge tôt le matin, vol au lever du soleil",
            suitable_for: ["Couples", "Lune de miel", "Familles", "Petits groupes privés", "Occasions spéciales"],
            price: `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL}220 `,
            reviews: [
                { name: "Rose Henry", country: "Royaume-Uni", rating: 5, text: "Ça vaut le coup. La vue sur l'Atlas au lever du soleil est incroyablement paisible." },
                { name: "Sacha Masson", country: "France", rating: 5, text: "Expérience magique. Vol très doux et petit-déjeuner délicieux." }
            ],
            booking_form: {
                fields: [
                    { name: "full_name", type: "text", required: true, label: "Nom complet" },
                    { name: "country", type: "text", required: true, label: "Pays" },
                    { name: "phone_number", type: "text", required: true, label: "Numéro de téléphone" },
                    { name: "email", type: "email", required: true, label: "Email" },
                    { name: "group_size", type: "range", required: false, label: "Taille du groupe", min: 1, max: 17, default: 1 },
                    { name: "trip_details", type: "textarea", required: true, label: "Code du voyage ou décrivez votre tour personnalisé", placeholder: "Prise en charge à l'aéroport/hôtel de Marrakech, tour de 5 jours au Maroc, souhait de visiter le désert, Essaouira & Casablanca, je veux aussi vivre une activité de balade à chameau, tour gastronomique, montgolfière..." }
                ],
                submit_text: "RÉSERVER"
            },
            contact_email: "book@your-morocco.com",
            booking_note: "Réservez maintenant, payez plus tard"
        }
    ],

    filter_options: {
        trip_types: ["Tour", "Excursion"],
        locations: [
            "Marrakech", "Fès", "Casablanca", "Rabat", "Ouarzazate",
            "Merzouga", "Essaouira", "Chefchaouen", "Zagora",
            "Vallée de l'Ourika", "Cascades d'Ouzoud"
        ],
        price_sort: ["Prix croissant", "Prix décroissant"],
        date_sort: ["Croissant", "Décroissant"],
        name_sort: ["Croissant", "Décroissant"]
    }
};

export const getSiteData = (locale: string) => {
    return locale === 'fr' ? siteDataFR : siteData;
};

export { siteData, siteDataFR };