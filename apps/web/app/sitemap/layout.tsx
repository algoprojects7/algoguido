import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | Algoguido Technologies',
  description:
    'Navigate through all corporate sections, proprietary products, custom enterprise solutions, training courses, and maps of Algoguido Technologies Private Limited.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'Sitemap | Algoguido Technologies',
    description: 'Corporate navigation portal and sitemap of Algoguido Technologies.',
    url: 'https://algoguido.com/sitemap',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Algoguido Technologies Sitemap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap | Algoguido Technologies',
    description: 'Corporate navigation portal and sitemap of Algoguido Technologies.',
    images: ['/hero-image.png'],
  },
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://algoguido.com/sitemap/#breadcrumb',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://algoguido.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Sitemap',
        'item': 'https://algoguido.com/sitemap',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

