import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// Set by `npm run build:cpanel`. Shared hosting has tight disk/inode quotas and
// no sharp binary by default, so that build skips Next's image optimiser and
// serves our pre-sized WebP files directly. Vercel and local dev keep the
// optimiser on.
const isCpanelBuild = process.env.CPANEL_BUILD === 'true';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Only for the cPanel bundle: emits .next/standalone with just the
  // node_modules actually reached at runtime. Vercel wants a normal build and
  // does its own tracing, so this stays off there.
  ...(isCpanelBuild ? { output: 'standalone' as const } : {}),

  images: {
    unoptimized: isCpanelBuild,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // We add the Sanity CDN hostname now to be ready for the future
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
