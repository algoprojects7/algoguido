import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
  description:
    'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
  metadataBase: new URL('https://algoguido.com'),
  alternates: {
    canonical: '/blog/low-cost-lead-generation',
  },
  openGraph: {
    title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
    description:
      'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
    url: 'https://algoguido.com/blog/low-cost-lead-generation',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/blog/humans_and_robots.png',
        width: 1200,
        height: 630,
        alt: 'Low Cost Lead Generation — Algoguido',
      },
    ],
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Low Cost Lead Generation with Automation | Algoguido Technologies',
    description:
      'Discover how to build a high-quality lead generation pipeline at minimal cost using n8n automation, Razorpay webhooks, and human-in-the-loop workflows.',
    images: ['https://algoguido.com/blog/humans_and_robots.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
