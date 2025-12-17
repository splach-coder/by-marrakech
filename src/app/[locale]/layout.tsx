import { NextIntlClientProvider, hasLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/app/[locale]/components/Header";
import SubHeader from "@/app/[locale]/components/SubHeader";
import "../globals.css";

import Script from 'next/script';
import AnalyticsListener from '@/lib/AnalyticsListener';
import Footer from './components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from './components/CartDrawer';

// ---  SEO Metadata
export const metadata = {
  title: {
    default: 'ByMarrakech | Authentic Marrakech Experiences & Tours',
    template: '%s | ByMarrakech',
  },
  description:
    'Discover ByMarrakech — your guide to authentic Moroccan experiences, guided tours, desert adventures, and cultural journeys through Marrakech and beyond.',
  keywords: [
    'ByMarrakech',
    'Marrakech tours',
    'Morocco travel',
    'Desert tours',
    'Atlas Mountains',
    'Moroccan experiences',
    'Marrakech guide',
  ],
  openGraph: {
    title: 'ByMarrakech | Authentic Marrakech Experiences & Tours',
    description:
      'Experience the magic of Marrakech with expert local guides. From vibrant souks to serene desert landscapes.',
    url: 'https://www.bymarrakech.com',
    siteName: 'ByMarrakech',
    images: [
      {
        url: 'https://www.bymarrakech.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ByMarrakech | Authentic Marrakech Experiences & Tours',
    description:
      'Discover authentic Moroccan experiences with expert local guides through Marrakech and beyond.',
    site: '@bymarrakech',
  },
  icons: {
    icon: '/icons/Artboard 1.ico',
  },
};

import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname
            });
          `}
        </Script>

        {/* Chatling Chatbot */}
        <Script id="chatling-config" strategy="afterInteractive">
          {`window.chtlConfig = { chatbotId: "5549145587" }`}
        </Script>
        <Script
          async
          data-id="5549145587"
          id="chtl-script"
          src="https://chatling.ai/js/embed.js"
          strategy="afterInteractive"
        />
      </head>
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <AnalyticsListener />
            <SubHeader />
            <Header />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider >
        </NextIntlClientProvider >
      </body >
    </html >
  );
}
