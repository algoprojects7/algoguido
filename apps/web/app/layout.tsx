import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Algoguido Technologies | AI-Powered Enterprise Solutions',
  description:
    'Algoguido Technologies is an enterprise-grade technology company specializing in AI-powered SaaS products, ERP, CRM, and cloud services.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 font-sans antialiased min-h-screen flex flex-col bg-mesh">
        {children}
      </body>
    </html>
  );
}
