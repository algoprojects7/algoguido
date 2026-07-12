import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Algoguido Technologies',
  description:
    'Terms of Service of Algoguido Technologies Private Limited outlining usage guidelines, user accounts, intellectual property, and billing policies.',
};

const LAST_UPDATED = 'July 12, 2026';

const termsData = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    paragraphs: [
      'Welcome to Algoguido Technologies Private Limited ("Algoguido", "we", "our", or "us"). By accessing or using our website https://algoguido.com, or purchasing and using any of our enterprise products, SaaS platforms, custom software development tools, or educational training services (collectively, "Services"), you agree to be bound by these Terms of Service ("Terms").',
      'Please read these Terms carefully. If you do not agree with any part of these Terms, you must immediately discontinue using our website and Services. These Terms constitute a binding legal agreement between you and Algoguido Technologies Private Limited.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'description-services',
    title: 'Description of Services',
    paragraphs: [
      'Algoguido Technologies is an enterprise-grade AI-first technology company. We design, develop, deploy, and maintain custom software products, enterprise SaaS applications (such as LeadGrowAI, eduAI365, Nidaan Polyclinic, and Apply4Jobs), cloud infrastructures, and digital transformation architectures for government, corporate, and private enterprise clients.',
      'We also conduct professional training programs, research projects, and academic internship collaborations. Any new feature, update, or extension of current Services shall automatically be subject to these Terms.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'user-accounts',
    title: 'User Registration & Accounts',
    paragraphs: [
      'To access certain premium features or customer consoles of our Services, you may be required to register and create a user account. You agree to:',
    ],
    subsections: [],
    bullets: [
      'Provide accurate, current, and complete information during registration.',
      'Maintain the security of your password and credentials.',
      'Promptly update your account details to keep them accurate and complete.',
      'Take full responsibility for all activities that occur under your account.',
      'Notify us immediately at info@algoguido.com if you suspect any unauthorized access or breach of account security.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'User Conduct & Acceptable Use',
    paragraphs: [
      'You are solely responsible for your conduct while using our website or Services. You agree not to engage in any of the following prohibited behaviors:',
    ],
    subsections: [],
    bullets: [
      'Violating any local, state, national, or international law or regulation.',
      'Infringing upon the intellectual property rights of Algoguido or any third party.',
      'Transmitting harmful, defamatory, offensive, or malicious materials, including viruses or trojans.',
      'Attempting to reverse engineer, decompile, or copy the source code of any Algoguido product or software.',
      'Using automated systems, scrapers, or bots to harvest data from our pages without express written consent.',
      'Interfering with or disrupting the server infrastructure, APIs, networks, or databases linked to our platforms.',
      'Representing yourself as an employee, agent, or representative of Algoguido unless explicitly authorized in writing.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    paragraphs: [
      'All materials, software, algorithms, codebases, visuals, text, design layouts, graphics, trademarks, logos, and patents featured on our platforms are the exclusive intellectual property of Algoguido Technologies Private Limited or its licensors, protected by Indian and international copyright, trademark, and patent laws.',
      'You are granted a limited, non-exclusive, non-transferable, and revocable license to access our public website for informational purposes. No part of our corporate intellectual property may be copied, reproduced, distributed, republished, downloaded, displayed, or transmitted in any form or by any means without our prior written authorization.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'payment-billing',
    title: 'Payment, Billing, & Refunds',
    paragraphs: [
      'When purchasing our products, subscribing to SaaS tiers, or registering for paid training modules, you agree to comply with our commercial terms:',
    ],
    subsections: [
      { heading: 'Billing Details', text: 'All prices are billed according to quotes, statements of work, or published subscription fees. Payments must be completed using authorized cards, net banking, UPI, or corporate invoice systems.' },
      { heading: 'Taxes', text: 'Fees are subject to applicable taxes, including GST in India, which will be detailed clearly at payment portals or invoice receipts.' },
      { heading: 'Refund Policy', text: 'Unless specified otherwise in a signed contract (SOW), all sales, subscription payments, and software licensing fees are final and non-refundable due to the nature of digital goods and customized custom integrations.' },
    ],
    bullets: [],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links & Services',
    paragraphs: [
      'Our platforms may feature references or links to third-party portals, services, APIs, payment gateways, or documentation. We do not control or endorse these external sites and are not responsible for their contents, policies, operations, or safety.',
      'Your interactions with any third-party providers are governed solely by their terms and privacy disclosures, and you assume all risks associated with using such external resources.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by applicable law, Algoguido Technologies Private Limited, its directors, employees, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, system outages, goodwill, or other intangible losses.',
      'Our total cumulative liability for any claims arising out of or related to these Terms or the use of our platforms and Services shall not exceed the amount paid by you to Algoguido in the twelve (15) months immediately preceding the event giving rise to the claim.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    paragraphs: [
      'You agree to indemnify, defend, and hold harmless Algoguido Technologies Private Limited, its subsidiaries, officers, directors, developers, and licensing partners from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys\' fees) arising out of or in connection with:',
    ],
    subsections: [],
    bullets: [
      'Your misuse of our Services or website.',
      'Your breach of any portion of these Terms of Service.',
      'Your violation of any laws, rules, regulations, or third-party rights (including intellectual property or privacy rights).',
      'Any content or inputs you submit or transmit through our systems.',
    ],
  },
  {
    id: 'disclaimer-warranties',
    title: 'Disclaimer of Warranties',
    paragraphs: [
      'Our Services and website are provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties or conditions of any kind, whether express, implied, or statutory.',
      'Algoguido explicitly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, quiet enjoyment, and non-infringement.',
      'We do not guarantee that the Services will meet your exact requirements, operate without interruptions, be secure, be error-free, or be completely free of vulnerabilities or malware.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Jurisdiction',
    paragraphs: [
      'These Terms of Service, along with any disputes or claims arising out of or in connection with them, shall be governed by, and interpreted in accordance with, the laws of India, without regard to its conflict of law principles.',
      'You agree that any legal action, suit, or proceeding arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Guwahati, Assam, India.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'changes-terms',
    title: 'Changes to Terms',
    paragraphs: [
      'We reserve the right, in our sole discretion, to modify, update, or replace these Terms of Service at any time. When updates occur, we will post the revised terms on our website and adjust the "Last Updated" date at the top of this page.',
      'Your continued use of our platforms or Services after any changes are published constitutes your explicit acceptance of the revised Terms. We encourage you to review these Terms periodically to stay informed.',
    ],
    subsections: [],
    bullets: [],
  },
  {
    id: 'contact-info',
    title: 'Contact Information',
    paragraphs: ['For any questions, concerns, clarification requests, or feedback regarding these Terms, please reach out to us at:'],
    subsections: [],
    bullets: [],
    isContactSection: true,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0052cc] via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,200,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-blue-400/10 rounded-full blur-3xl" />

        {/* Navbar strip */}
        <div className="relative z-10 border-b border-white/10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Algoguido Logo" className="h-8 w-8 object-contain brightness-0 invert" />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white tracking-tight leading-tight">Algoguido</span>
                <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest leading-none">Technologies Pvt. Ltd.</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors uppercase tracking-wide">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Standard Agreement
            </span>
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-5">Terms of Service</h1>
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
              Understand your rights, usage policies, and the legal guidelines associated with our website, platforms, SaaS products, and enterprise services.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/60">
              <span>Last updated: <strong className="text-white/80">{LAST_UPDATED}</strong></span>
              <span className="text-white/30">·</span>
              <span>Effective Date: <strong className="text-white/80">January 1, 2024</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h2>
                <nav className="flex flex-col gap-1">
                  {termsData.map((section, idx) => (
                    <a key={section.id} href={`#${section.id}`} className="text-xs text-slate-600 hover:text-[#0052cc] hover:pl-2 transition-all duration-200 py-1 border-l-2 border-transparent hover:border-[#0052cc] pl-3 leading-snug">
                      {idx + 1}. {section.title}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#0052cc] to-blue-700 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Legal Questions?</p>
                <p className="text-xs text-white/80 leading-relaxed mb-3">Get in touch with our legal or compliance team for clarity on our policies.</p>
                <a href="mailto:info@algoguido.com" className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/25 text-white rounded-lg px-3 py-2 transition-all">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@algoguido.com
                </a>
              </div>
            </div>
          </aside>

          {/* Terms Content */}
          <main className="lg:col-span-3">
            {/* Agreement Notice Banner */}
            <div className="mb-10 p-6 rounded-2xl bg-amber-50 border border-amber-200/70 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">Contractual Binding Agreement</p>
                <p className="text-sm text-amber-700 leading-relaxed">By choosing to navigate our web pages or purchase any of our custom system builds, you consent to these Terms in full. If you disagree, you are prohibited from utilizing any of our tools, SaaS interfaces, or services.</p>
              </div>
            </div>

            {/* Terms sections */}
            <div className="space-y-12">
              {termsData.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 h-8 w-8 rounded-lg bg-[#0052cc]/10 text-[#0052cc] flex items-center justify-center text-xs font-extrabold">{idx + 1}</div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{section.title}</h2>
                  </div>
                  <div className="ml-12 text-slate-600 leading-relaxed text-sm space-y-3">
                    {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    {section.subsections.length > 0 && (
                      <div className="space-y-4 mt-2">
                        {section.subsections.map((sub, i) => (
                          <div key={i}>
                            <h3 className="text-sm font-bold text-slate-800 mb-1">{sub.heading}</h3>
                            <p className="text-slate-600">{sub.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mt-2">
                        {section.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                    {'isContactSection' in section && section.isContactSection && (
                      <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-[#0052cc]/5 to-blue-50 border border-[#0052cc]/10">
                        <p className="font-bold text-slate-800 text-base">Algoguido Technologies Private Limited</p>
                        <p className="text-slate-600 mt-1">Pub Nizarapur Path, AEC Road, Sundarbari</p>
                        <p className="text-slate-600">Jalukbari, Guwahati - 781014, Assam, India</p>
                        <p className="text-slate-600 mt-2">
                          <span className="font-semibold">Mobile / WhatsApp:</span>{' '}
                          <a href="tel:+918638526521" className="text-[#0052cc] hover:underline">+91-8638526521</a>
                          {', '}
                          <a href="tel:+916003526521" className="text-[#0052cc] hover:underline">+91-6003526521</a>
                        </p>
                        <p className="text-slate-600 mt-1">
                          <span className="font-semibold">Email:</span>{' '}
                          <a href="mailto:info@algoguido.com" className="text-[#0052cc] hover:underline">info@algoguido.com</a>
                        </p>
                        <p className="text-slate-600 mt-1">
                          <span className="font-semibold">Website:</span>{' '}
                          <a href="https://algoguido.com" className="text-[#0052cc] hover:underline" target="_blank" rel="noopener noreferrer">https://algoguido.com</a>
                        </p>
                      </div>
                    )}
                  </div>
                  {idx < termsData.length - 1 && <div className="mt-10 border-t border-slate-100" />}
                </section>
              ))}
            </div>

            {/* Closing card */}
            <div className="mt-16 p-6 rounded-2xl bg-slate-900 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Algoguido Technologies Private Limited</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                By purchasing licenses or retaining Algoguido for custom development models, you acknowledge that you are bound by the versions of these Terms in effect. Any updates made will automatically govern client-agency relationships from their date of posting onward.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/" className="text-xs text-[#0052cc] hover:text-blue-400 transition-colors font-medium">
                  Back to Home
                </Link>
                <a href="mailto:info@algoguido.com" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">info@algoguido.com</a>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-[#0a0f1e] border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slate-400">
            {'\u00A9'} {new Date().getFullYear()} Algoguido Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[11px] text-slate-400 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600 text-[10px]">·</span>
            <Link href="/privacy-policy" className="text-[11px] text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-600 text-[10px]">·</span>
            <Link href="/terms-of-service" className="text-[11px] text-white font-medium">Terms of Service</Link>
            <span className="text-slate-600 text-[10px]">·</span>
            <Link href="/sitemap" className="text-[11px] text-slate-400 hover:text-white transition-colors">Sitemap</Link>
            <span className="text-slate-600 text-[10px]">·</span>
            <a href="mailto:info@algoguido.com" className="text-[11px] text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
