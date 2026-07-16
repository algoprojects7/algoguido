import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://algoguido.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Google-Extended',
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'facebookexternalhit',
          'Twitterbot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
