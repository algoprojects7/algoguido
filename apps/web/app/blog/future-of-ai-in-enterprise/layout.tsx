import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Future of AI in Enterprise | Algoguido Technologies',
  description:
    'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
  metadataBase: new URL('https://algoguido.com'),
  alternates: {
    canonical: 'https://algoguido.com/blog/future-of-ai-in-enterprise',
  },
  openGraph: {
    title: 'The Future of AI in Enterprise | Algoguido Technologies',
    description:
      'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
    url: 'https://algoguido.com/blog/future-of-ai-in-enterprise',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/logo.png',
        secureUrl: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'The Future of AI in Enterprise — Algoguido Technologies',
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
    title: 'The Future of AI in Enterprise | Algoguido Technologies',
    description:
      'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
    images: ['/logo.png'],
    site: '@algoguido',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
