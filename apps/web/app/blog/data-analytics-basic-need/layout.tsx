import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
  description:
    'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
  metadataBase: new URL('https://algoguido.com'),
  alternates: {
    canonical: '/blog/data-analytics-basic-need',
  },
  openGraph: {
    title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
    description:
      'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
    url: 'https://algoguido.com/blog/data-analytics-basic-need',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/blog/future_humanity_banner.png',
        width: 1200,
        height: 630,
        alt: 'Why Data Analytics is a Basic Need — Algoguido',
      },
    ],
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Data Analytics is a Basic Need | Algoguido Technologies',
    description:
      'In the age of AI, data literacy is no longer optional — it is the foundational skill every professional, institution, and nation must embrace.',
    images: ['https://algoguido.com/blog/future_humanity_banner.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
