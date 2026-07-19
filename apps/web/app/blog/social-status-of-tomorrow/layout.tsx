import type { Metadata } from 'next';

const getMetadataBase = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL('https://algoguido.com');
};

export const metadata: Metadata = {
  title: 'The Social Status of Tomorrow | Algoguido Technologies',
  description:
    'Explore how AI, robotics, and evolving social norms are redefining love, family, and human connection in the coming decades.',
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: 'https://algoguido.com/blog/social-status-of-tomorrow',
  },
  openGraph: {
    title: 'The Social Status of Tomorrow | Algoguido Technologies',
    description:
      'Explore how AI, robotics, and evolving social norms are redefining love, family, and human connection in the coming decades.',
    url: 'https://algoguido.com/blog/social-status-of-tomorrow',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/blog/humans_and_robots.png',
        secureUrl: '/blog/humans_and_robots.png',
        width: 1200,
        height: 630,
        alt: 'The Social Status of Tomorrow — Algoguido Technologies',
        type: 'image/png',
      },
    ],
    type: 'article',
    locale: 'en_IN',
    authors: ['Dr. Mostaque Hassan, PhD'],
    publishedTime: '2025-01-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Social Status of Tomorrow | Algoguido Technologies',
    description:
      'Explore how AI, robotics, and evolving social norms are redefining love, family, and human connection in the coming decades.',
    images: ['/blog/humans_and_robots.png'],
    site: '@algoguido',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
