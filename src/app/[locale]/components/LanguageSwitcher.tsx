'use client';

import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params?.locale ?? routing.defaultLocale;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    if (newLocale === currentLocale) return;

    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="relative flex items-center gap-1.5">
      <Globe className="w-4 h-4" />
      <div className="relative">
        <select
          value={currentLocale}
          onChange={handleChange}
          disabled={isPending}
          className="appearance-none bg-transparent border-none text-white font-medium pr-6 pl-1 py-0.5 cursor-pointer focus:outline-none focus:ring-0"
        >
          {routing.locales.map((locale) => (
            <option 
              key={locale} 
              value={locale}
              className="bg-primary text-white"
            >
              {locale.toUpperCase()}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}