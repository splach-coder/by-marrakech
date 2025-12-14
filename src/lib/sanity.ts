// src/lib/sanity.ts

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// --- YOUR SANITY CONFIGURATION ---
export const client = createClient({
  projectId: 'yqu0ijt0', // Your Project ID
  dataset: 'production',
  apiVersion: '2025-01-01', 
  useCdn: false, // Recommended for Next.js to leverage server-side caching
});

const builder = imageUrlBuilder(client);

// Helper function for generating Next.js compatible image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type { SanityImageSource };

// Helper function to fetch data and pass the locale (unchanged)
export async function sanityFetch<T>({
  query,
  params = {},
  locale,
}: {
  query: string;
  params?: Record<string, any>;
  locale: string; // 'en' or 'fr'
}): Promise<T> {
  const fetchParams = { ...params, locale };
  
  // Use revalidateTag for cache control if you are using Next.js 13+ fetch caching
  return client.fetch(query, fetchParams, {
    // You may add next: { revalidate: 60 } here for time-based revalidation
  });
}