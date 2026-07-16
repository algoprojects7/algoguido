import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Algoguido Technologies',
  description:
    'Read the Privacy Policy of Algoguido Technologies Private Limited. Learn how we collect, protect, and process personal data in our enterprise SaaS systems.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Algoguido Technologies',
    description: 'Privacy Policy and data security guidelines of Algoguido Technologies Private Limited.',
    url: 'https://algoguido.com/privacy-policy',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Algoguido Technologies Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Algoguido Technologies',
    description: 'Privacy Policy and data security guidelines of Algoguido Technologies Private Limited.',
    images: ['/hero-image.png'],
  },
};

const LAST_UPDATED = 'July 12, 2026';

const policyData = [
  {
    id: 'introduction',
    title: 'Introduction',
    paragraphs: [
      'Welcome to Algoguido Technologies Private Limited ("Algoguido", "we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://algoguido.com or use any of our products and services.',
      'Please read this policy carefully. If you disagree with its terms, please discontinue use of our site and services. We reserve the right to make changes to this policy at any time, and will alert you by updating the "Last Updated" date at the top of this page.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'information-collected',
    title: 'Information We Collect',
    paragraphs: ['We may collect information about you in a variety of ways. The information we may collect includes:'],
    subsections: [
      { heading: '2.1 Personal Data', text: 'Personally identifiable information, such as your name, email address, telephone number, organization name, and other similar contact data that you voluntarily give to us when you fill out a contact form, subscribe to our newsletter, register for an account, or otherwise contact us directly.' },
      { heading: '2.2 Derivative Data', text: 'Information our servers automatically collect when you access our site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing our website.' },
      { heading: '2.3 Financial Data', text: 'Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, or request information about our services. We store only very limited financial information that we collect. Otherwise, all financial information is stored by our payment processors.' },
      { heading: '2.4 Data From Social Networks', text: 'User information from social networking sites, such as LinkedIn, Facebook, Twitter/X, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.' },
      { heading: '2.5 Mobile Device Data', text: 'Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access our site from a mobile device.' },
      { heading: '2.6 Third-Party Data', text: 'Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant permission to share information.' },
    ],
    bullets: [],
  },
  {
    id: 'use-of-information',
    title: 'Use of Your Information',
    paragraphs: ['Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via our website or services to:'],
    subsections: [],
    bullets: [
      'Create and manage your account.',
      'Process your transactions and send related information, including purchase confirmations and invoices.',
      'Send technical notices, updates, security alerts, and support and administrative messages.',
      'Respond to your comments, questions, and requests and provide customer service.',
      'Send communications about products, services, offers, promotions, rewards, and events.',
      'Monitor and analyze trends, usage, and activities in connection with our services.',
      'Detect, investigate, and prevent fraudulent transactions and other illegal activities.',
      'Personalize your experience and deliver content relevant to your interests.',
      'Facilitate account creation and logon process.',
      'Compile anonymous statistical data and analysis for use internally or with third parties.',
      'Assist law enforcement and respond to legal process.',
      'Administer promotions, surveys, or contests.',
      'Deliver targeted advertising, newsletters, and other information.',
      'Enable user-to-user communications.',
      'Fulfill and manage purchases, orders, payments, and other transactions.',
      'Generate a personal profile to make future visits more personalized.',
      'Increase the efficiency and operation of our website and services.',
      'Prevent fraudulent transactions and protect against criminal activity.',
      'Request feedback and contact you about your use of our services.',
      'Resolve disputes and troubleshoot problems.',
    ],
  },
  {
    id: 'disclosure-of-information',
    title: 'Disclosure of Your Information',
    paragraphs: ['We may share information we have collected about you in certain situations. Your information may be disclosed as follows:'],
    subsections: [
      { heading: '4.1 By Law or to Protect Rights', text: 'If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.' },
      { heading: '4.2 Business Transfers', text: 'We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.' },
      { heading: '4.3 Third-Party Service Providers', text: 'We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.' },
      { heading: '4.4 Marketing Communications', text: 'With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.' },
      { heading: '4.5 Interactions with Other Users', text: 'If you interact with other users of our site, those users may see your name, profile photo, and descriptions of your activity.' },
      { heading: '4.6 Online Postings', text: 'When you post comments, contributions, or other content to our site, your posts may be viewed by all users and may be publicly distributed outside the site in perpetuity.' },
      { heading: '4.7 Affiliates', text: 'We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.' },
      { heading: '4.8 Business Partners', text: 'We may share your information with our business partners to offer you certain products, services, or promotions.' },
    ],
    bullets: [],
  },
  {
    id: 'tracking-technologies',
    title: 'Tracking Technologies',
    paragraphs: [],
    subsections: [
      { heading: 'Cookies and Web Beacons', text: 'We may use cookies, web beacons, tracking pixels, and other tracking technologies on our site to help customize the site and improve your experience. When you access our site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site.' },
      { heading: 'Internet-Based Advertising', text: 'Additionally, we may use third-party software to serve ads on our site, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us.' },
      { heading: 'Website Analytics', text: 'We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on our site through the use of first-party cookies and third-party cookies, to analyze and track users\' use of our site, determine the popularity of certain content, and better understand online activity.' },
    ],
    bullets: [],
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    paragraphs: [
      'Our site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave our site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.',
      'Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services, or applications that may be linked to or from our site.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'security',
    title: 'Security of Your Information',
    paragraphs: [
      'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.',
      'Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information. We implement the following security practices:',
    ],
    subsections: [],
    bullets: [
      'SSL/TLS encryption for all data transmission between your browser and our servers.',
      'Regular security assessments and penetration testing.',
      'Strict access controls and multi-factor authentication for internal systems.',
      'Data encryption at rest for sensitive information.',
      'Regular employee training on data protection and privacy practices.',
      'Incident response plan for potential data breaches.',
    ],
  },
  {
    id: 'policy-for-minors',
    title: 'Policy for Minors',
    paragraphs: [
      'We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.',
      'Our services are intended for use by adults and individuals who are at least 18 years of age. By using our services, you represent that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'controls-for-dnt',
    title: 'Controls for Do-Not-Track Features',
    paragraphs: [
      'Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized.',
      'As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'options-regarding-your-information',
    title: 'Options Regarding Your Information',
    paragraphs: [],
    subsections: [
      { heading: 'Account Information', text: 'You may at any time review or change the information in your account or terminate your account by logging into your account settings and updating your account, or by contacting us using the contact information provided below. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use, and/or comply with legal requirements.' },
      { heading: 'Emails and Communications', text: 'If you no longer wish to receive correspondence, emails, or other communications from us, you may opt out by noting your preferences at the time you register your account with our website, logging into your account settings and updating your preferences, contacting us using the contact information provided below, or using the unsubscribe link at the bottom of any promotional email we send. If you no longer wish to receive correspondence from third parties, you are responsible for contacting the third party directly.' },
    ],
    bullets: [],
  },
  {
    id: 'your-rights',
    title: 'Your Rights Under Data Protection Laws',
    paragraphs: ['Depending on your location, you may have the following rights regarding your personal data:'],
    subsections: [],
    bullets: [
      'Right to Access: You have the right to request copies of your personal data.',
      'Right to Rectification: You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.',
      'Right to Erasure: You have the right to request that we erase your personal data, under certain conditions.',
      'Right to Restrict Processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.',
      'Right to Object to Processing: You have the right to object to our processing of your personal data, under certain conditions.',
      'Right to Data Portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
      'Right to Withdraw Consent: Where we rely on consent to process your personal information, you have the right to withdraw consent at any time.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    paragraphs: [
      'We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.',
      'We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our service, or we are legally obligated to retain this data for longer time periods.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    paragraphs: ['If you have questions or comments about this Privacy Policy, please contact us at:'],
    subsections: [],
    bullets: [],
    isContactSection: true,
  },
];

import Image from 'next/image';

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://algoguido.com/privacy-policy/#webpage',
        'url': 'https://algoguido.com/privacy-policy',
        'name': 'Privacy Policy | Algoguido Technologies',
        'description':
          'Read the Privacy Policy of Algoguido Technologies Private Limited. Learn how we collect, protect, and process personal data in our enterprise SaaS systems.',
        'publisher': {
          '@id': 'https://algoguido.com/#organization',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://algoguido.com/privacy-policy/#breadcrumb',
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
            'name': 'Privacy Policy',
            'item': 'https://algoguido.com/privacy-policy',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0052cc] via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,200,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-blue-400/10 rounded-full blur-3xl" />

        {/* Navbar strip */}
        <div className="relative z-10 border-b border-white/10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Algoguido Home">
              <Image
                src="/logo.png"
                alt="Algoguido Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain brightness-0 invert"
                priority
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white tracking-tight leading-tight">Algoguido</span>
                <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest leading-none">Technologies Pvt. Ltd.</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors uppercase tracking-wide" aria-label="Back to Home">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold text-white/70 uppercase tracking-[0.2em] mb-5 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Legal &amp; Compliance
            </span>
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-5">Privacy Policy</h1>
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
              At Algoguido Technologies, your privacy is a fundamental right, not an afterthought. This policy explains how we collect, use, and protect your personal data with the highest standards of transparency and security.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/60">
              <span>Last updated: <time className="font-bold text-white" dateTime="2026-07-12">{LAST_UPDATED}</time></span>
              <span className="text-white/30">·</span>
              <span>Effective Date: <time className="font-bold text-white" dateTime="2024-01-01">January 1, 2024</time></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h2>
                <nav className="flex flex-col gap-1" aria-label="Table of Contents">
                  {policyData.map((section, idx) => (
                    <a key={section.id} href={`#${section.id}`} className="text-xs text-slate-600 hover:text-[#0052cc] hover:pl-2 transition-all duration-200 py-1 border-l-2 border-transparent hover:border-[#0052cc] pl-3 leading-snug">
                      {idx + 1}. {section.title}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#0052cc] to-blue-700 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Privacy Questions?</p>
                <p className="text-xs text-white/80 leading-relaxed mb-3">Reach out to our data protection team for any privacy-related inquiries.</p>
                <a href="mailto:info@algoguido.com" className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/25 text-white rounded-lg px-3 py-2 transition-all" aria-label="Email support team">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@algoguido.com
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <article className="lg:col-span-3">
            {/* Important notice banner */}
            <div className="mb-10 p-6 rounded-2xl bg-amber-50 border border-amber-200/70 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center" aria-hidden="true">
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">Important Notice</p>
                <p className="text-sm text-amber-700 leading-relaxed">By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with these terms, please discontinue use of our services.</p>
              </div>
            </div>

            {/* Policy sections */}
            <div className="space-y-12">
              {policyData.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 h-8 w-8 rounded-lg bg-[#0052cc]/10 text-[#0052cc] flex items-center justify-center text-xs font-extrabold" aria-hidden="true">{idx + 1}</div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{section.title}</h2>
                  </div>
                  <div className="ml-12 text-slate-655 leading-relaxed text-sm space-y-3">
                    {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    {section.subsections.length > 0 && (
                      <div className="space-y-4 mt-2">
                        {section.subsections.map((sub, i) => (
                          <div key={i}>
                            <h3 className="text-sm font-bold text-slate-800 mb-1">{sub.heading}</h3>
                            <p className="text-slate-655">{sub.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-655 mt-2">
                        {section.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                    {'isContactSection' in section && section.isContactSection && (
                      <address className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-[#0052cc]/5 to-blue-50 border border-[#0052cc]/10 not-italic">
                        <p className="font-bold text-slate-800 text-base">Algoguido Technologies Private Limited</p>
                        <p className="text-slate-655 mt-1">Pub Nizarapur Path, AEC Road, Sundarbari</p>
                        <p className="text-slate-655">Jalukbari, Guwahati - 781014, Assam, India</p>
                        <p className="text-slate-655 mt-2">
                          <span className="font-semibold">Mobile / WhatsApp:</span>{' '}
                          <a href="tel:+918638526521" className="text-[#0052cc] hover:underline">+91-8638526521</a>
                          {', '}
                          <a href="tel:+916003526521" className="text-[#0052cc] hover:underline">+91-6003526521</a>
                        </p>
                        <p className="text-slate-655 mt-1">
                          <span className="font-semibold">Email:</span>{' '}
                          <a href="mailto:info@algoguido.com" className="text-[#0052cc] hover:underline">info@algoguido.com</a>
                        </p>
                        <p className="text-slate-655 mt-1">
                          <span className="font-semibold">Website:</span>{' '}
                          <a href="https://algoguido.com" className="text-[#0052cc] hover:underline" target="_blank" rel="noopener noreferrer">https://algoguido.com</a>
                        </p>
                      </address>
                    )}
                  </div>
                  {idx < policyData.length - 1 && <div className="mt-10 border-t border-slate-100" aria-hidden="true" />}
                </section>
              ))}
            </div>

            {/* Closing card */}
            <div className="mt-16 p-6 rounded-2xl bg-slate-900 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Algoguido Technologies Private Limited</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                This Privacy Policy was last updated on <time dateTime="2026-07-12" className="text-white">{LAST_UPDATED}</time>. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the service after we post any modifications will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/" className="text-xs text-[#0052cc] hover:text-blue-400 transition-colors font-medium">
                  Back to Home
                </Link>
                <a href="mailto:info@algoguido.com" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">info@algoguido.com</a>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="bg-[#0a0f1e] border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slate-400">
            {'\u00A9'} {new Date().getFullYear()} Algoguido Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[11px] text-slate-400 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <Link href="/privacy-policy" className="text-[11px] text-white font-medium">Privacy Policy</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <Link href="/sitemap" className="text-[11px] text-slate-400 hover:text-white transition-colors">Sitemap</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <a href="https://razorpay.me/@algoguidotechnologiesprivatel" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-white transition-colors">Pay Online</a>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <a href="mailto:info@algoguido.com" className="text-[11px] text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
