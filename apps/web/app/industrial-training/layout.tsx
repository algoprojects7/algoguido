import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Training, Professional Training & Paid Internships | Algoguido Technologies',
  description: 'Apply for paid internships, industry-focused professional training, and university-aligned summer/winter projects at Algoguido Technologies.',
  alternates: {
    canonical: '/industrial-training',
  },
  openGraph: {
    title: 'Industrial Training & Paid Developer Internships | Algoguido Technologies',
    description: 'Build real production code with senior mentors. Apply for paid online internships and professional training courses at Algoguido.',
    url: 'https://algoguido.com/industrial-training',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Algoguido Technologies Developer Training Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Training & Developer Internships | Algoguido Technologies',
    description: 'Work on live environments, get daily code reviews, and earn verifiable certificates.',
    images: ['/hero-image.png'],
  },
};

export default function IndustrialTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://algoguido.com/#organization',
        'name': 'Algoguido Technologies Private Limited',
        'url': 'https://algoguido.com',
        'logo': 'https://algoguido.com/logo.png',
      },
      {
        '@type': 'Course',
        '@id': 'https://algoguido.com/industrial-training/#course-internship',
        'name': 'Paid Developer Internship & Industrial Training Program',
        'description': 'Hands-on remote developer training programs and paid internships working on active corporate software projects with daily pull request reviews.',
        'provider': {
          '@id': 'https://algoguido.com/#organization',
        },
        'educationalCredentialAwarded': 'Industry Experience Certificate',
        'hasCourseInstance': {
          '@type': 'CourseInstance',
          'courseMode': 'Online',
          'duration': 'P2M',
          'startDate': '2026-07-01',
          'instructor': {
            '@type': 'Person',
            'name': 'Algoguido Tech Leads',
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://algoguido.com/industrial-training/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the program fee structure?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Industry Internship: \u20B98,000 \u2013 \u20B915,000 (one-time, based on track & duration). Professional Training: \u20B95,000 \u2013 \u20B910,000. Industrial/University Training: \u20B93,000 \u2013 \u20B96,000. All fees are paid to Algoguido before the program begins. No hidden charges.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Why is the internship fee-based (students pay Algoguido)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Algoguido provides access to live production environments, mentorship from senior engineers, dedicated code reviews, real project ownership, and verifiable certificates. This is a professional training investment in your career \u2014 not a job placement. You are paying for industry-grade skill development.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Are the programs fully online?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. All our programs are conducted 100% online in remote mode, featuring daily virtual syncs, online code reviews, and remote pair programming sessions. No commute required.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How do I pay the program fee?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'After your application is reviewed and you receive the selection confirmation, you can pay online via our secure Razorpay payment link. UPI, debit/credit cards, and net banking are all supported.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Will I receive code reviews and mentorship?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Absolutely. Every enrolled student receives daily virtual standups, thorough pull request reviews from tech leads, and a dedicated mentor throughout the program duration.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://algoguido.com/industrial-training/#breadcrumb',
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
            'name': 'Industrial Training',
            'item': 'https://algoguido.com/industrial-training',
          },
        ],
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

