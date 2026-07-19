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
  title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
  description:
    'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: 'https://algoguido.com/blog/low-cost-lead-generation',
  },
  openGraph: {
    title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
    description:
      'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
    url: 'https://algoguido.com/blog/low-cost-lead-generation',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/logo.png',
        secureUrl: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Low Cost Lead Generation — Algoguido Technologies',
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
    title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
    description:
      'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
    images: ['/logo.png'],
    site: '@algoguido',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
