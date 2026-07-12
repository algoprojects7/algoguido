import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | Algoguido Technologies',
  description: 'Navigate through all the pages, products, solutions, and research domains of Algoguido Technologies.',
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
