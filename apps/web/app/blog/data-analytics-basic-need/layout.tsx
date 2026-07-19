import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
  description:
    'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
  metadataBase: new URL('https://algoguido.com'),
  alternates: {
    canonical: 'https://algoguido.com/blog/data-analytics-basic-need',
  },
  openGraph: {
    title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
    description:
      'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
    url: 'https://algoguido.com/blog/data-analytics-basic-need',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: 'https://algoguido.com/blog/future_humanity_banner.png',
        secureUrl: 'https://algoguido.com/blog/future_humanity_banner.png',
        width: 1200,
        height: 630,
        alt: 'Why Data Analytics is a Basic Need — Algoguido Technologies',
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
    title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
    description:
      'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
    images: ['https://algoguido.com/blog/future_humanity_banner.png'],
    site: '@algoguido',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
