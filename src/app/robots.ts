import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Replaces a 0-byte public/robots.txt that declared nothing at all.
 *
 * Search-visibility crawlers and AI-search crawlers are allowed explicitly.
 * CCBot is training-data collection rather than a search surface, so blocking
 * it costs nothing in citations.
 */

const AI_SEARCH_CRAWLERS = [
    'GPTBot', // OpenAI — ChatGPT web search
    'OAI-SearchBot', // OpenAI — search features
    'ChatGPT-User', // OpenAI — browsing on a user's behalf
    'ClaudeBot', // Anthropic
    'PerplexityBot', // Perplexity
    'Google-Extended', // Gemini / AI Overviews grounding
    'Applebot-Extended', // Apple Intelligence
];

const TRAINING_ONLY_CRAWLERS = ['CCBot', 'Bytespider', 'anthropic-ai', 'cohere-ai'];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Nothing here is secret; these just have no search value.
                disallow: ['/api/', '/confetti', '/booking?', '/book?'],
            },
            ...AI_SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
            ...TRAINING_ONLY_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
