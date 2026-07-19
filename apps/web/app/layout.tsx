import type { Metadata } from 'next';
import { AIProcessingLoader } from '@algoguido/ui';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

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
  title: 'Algoguido Technologies | AI Solutions, Enterprise Software, Data Analytics & Research',
  description:
    'Algoguido Technologies Private Limited delivers AI solutions, enterprise software, research, data analytics, cloud applications, internships, education and digital transformation solutions.',
  keywords: [
    'Algoguido Technologies',
    'Algoguido Technologies Private Limited',
    'Artificial Intelligence',
    'AI Development',
    'Machine Learning',
    'Deep Learning',
    'Enterprise AI',
    'Cloud',
    'ERP',
    'CRM',
    'Automation',
    'Data Analytics',
    'Data Science',
    'Business Intelligence',
    'Power BI',
    'Tableau',
    'Python',
    'Research',
    'Education',
    'Internship',
    'LeadGrowAI',
    'EduAI365',
    'Apply4Jobs',
    'TheHireAMe',
    'AI Workforce for Business',
    'Healthcare AI',
    'Agriculture AI',
    'Generative AI',
    'LLM',
    'NLP',
    'Computer Vision',
    'Digital Transformation',
    'Software Development',
    'Technology Consulting',
    'Guwahati',
    'Assam',
    'India',
  ],
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
    yandex: 'yandex-verification-placeholder',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'Algoguido Team', url: 'https://algoguido.com' }],
  creator: 'Algoguido Technologies Private Limited',
  publisher: 'Algoguido Technologies Private Limited',
  category: 'Technology',
  classification: 'AI & Enterprise Software',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://algoguido.com',
    siteName: 'Algoguido Technologies',
    title: 'Algoguido Technologies | AI Solutions, Enterprise Software & Research',
    description:
      'Enterprise-grade AI solutions, custom software engineering, cloud applications, professional internships, and digital transformation architectures.',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Algoguido Technologies - Engineering the Future with Artificial Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Algoguido Technologies | AI Solutions & Enterprise Software',
    description:
      'We build intelligent enterprise software, AI-powered products, cloud-native platforms, and digital ecosystems.',
    images: ['/hero-image.png'],
    creator: '@algoguido',
    site: '@algoguido',
  },
  appleWebApp: {
    capable: true,
    title: 'Algoguido',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define site-wide JSON-LD schema
  const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Corporation',
        '@id': 'https://algoguido.com/#organization',
        'name': 'Algoguido Technologies Private Limited',
        'alternateName': 'Algoguido Technologies',
        'url': 'https://algoguido.com',
        'logo': 'https://algoguido.com/logo.png',
        'email': 'info@algoguido.com',
        'telephone': '+91-XXXXXXXXXX',
        'foundingDate': '2026',
        'founder': {
          '@type': 'Person',
          'name': 'Hassan',
          'jobTitle': 'Founder & Director',
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Guwahati IT Hub',
          'addressLocality': 'Guwahati',
          'addressRegion': 'Assam',
          'postalCode': '781001',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 26.1445,
          'longitude': 91.7362,
        },
        'areaServed': [
          {
            '@type': 'Country',
            'name': 'India',
          },
          {
            '@type': 'Country',
            'name': 'United States',
          },
        ],
        'knowsAbout': [
          'Artificial Intelligence',
          'Machine Learning',
          'Data Science',
          'Enterprise Software',
          'Cloud Computing',
          'ERP Software',
          'CRM Systems',
          'Software Engineering',
        ],
        'sameAs': [
          'https://www.linkedin.com/company/algoguido-technologies',
          'https://youtube.com/@algoguidotechnologies',
          'https://www.facebook.com/profile.php?id=61586078301070&sk=about',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://algoguido.com/#website',
        'url': 'https://algoguido.com',
        'name': 'Algoguido Technologies',
        'description':
          'Enterprise-grade AI solutions, custom software engineering, and cloud platforms.',
        'publisher': {
          '@id': 'https://algoguido.com/#organization',
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://algoguido.com/sitemap?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased min-h-screen flex flex-col bg-mesh">
        {children}
        <AIProcessingLoader />
        <Analytics />
      </body>
    </html>
  );
}

