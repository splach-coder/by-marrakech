// app/[locale]/provider.tsx
'use client';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export default function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
