import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Future of AI in Enterprise | Algoguido Technologies',
  description:
    'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
  metadataBase: new URL('https://algoguido.com'),
  alternates: {
    canonical: '/blog/future-of-ai-in-enterprise',
  },
  openGraph: {
    title: 'The Future of AI in Enterprise | Algoguido Technologies',
    description:
      'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
    url: 'https://algoguido.com/blog/future-of-ai-in-enterprise',
    siteName: 'Algoguido Technologies',
    images: [
      {
        url: '/blog/humans_and_robots.png',
        width: 1200,
        height: 630,
        alt: 'The Future of AI in Enterprise — Algoguido',
      },
    ],
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Future of AI in Enterprise | Algoguido Technologies',
    description:
      'How multi-agent AI, RAG pipelines, and agentic workflows are reshaping enterprise operations globally — and what it means for your business.',
    images: ['https://algoguido.com/blog/humans_and_robots.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
