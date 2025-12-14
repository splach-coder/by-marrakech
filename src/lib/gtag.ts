// src/lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  if (!window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = (params: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const { action, category, label, value } = params;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
