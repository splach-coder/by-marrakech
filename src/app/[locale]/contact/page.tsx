'use client';

/**
 * /contact — laid out as an editorial contact desk rather than a banner + form.
 *
 *   1  Header          gold kicker + stacked two-tone title (no hero photo, so
 *                      the form sits near the top of the page)
 *   2  Split           request form  |  direct lines + map
 *   3  Channel cards   WhatsApp / call / email — pick your medium
 *   4  FAQ             the five most-asked questions, shared with the homepage
 *   5  Assurances      four hairline reassurance marks
 *   6  Ready to book   closing photographic panel
 *
 * Google reviews follow from the shared layout.
 *
 * Copy lives in messages/*.json under `contactPage`; contact details come from
 * NEXT_PUBLIC_BUSINESS_* so there is one place to change them.
 */

import ContactHeader from './components/ContactHeader';
import RequestForm from './components/RequestForm';
import ContactAside from './components/ContactAside';
import ChannelCards from './components/ChannelCards';
import ContactFaq from './components/ContactFaq';
import AssurancesStrip from './components/AssurancesStrip';
import ReadyToBook from './components/ReadyToBook';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background">
            <ContactHeader />

            {/* the desk: request on the left, direct lines and the map on the right */}
            <section className="bg-background py-14 md:py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                        <RequestForm />
                        <ContactAside />
                    </div>
                </div>
            </section>

            <ChannelCards />

            <ContactFaq />

            <AssurancesStrip />

            <ReadyToBook />
        </main>
    );
}
