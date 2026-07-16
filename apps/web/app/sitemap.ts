import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://algoguido.com';

  const routes = [
    '',
    '/industrial-training',
    '/privacy-policy',
    '/terms-of-service',
    '/sitemap',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/industrial-training' ? 0.9 : 0.5,
  }));
}
