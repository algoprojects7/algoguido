import type { Metadata } from 'next';
import { AIProcessingLoader } from '@algoguido/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Algoguido | Administrative Dashboard',
  description: 'Enterprise System Control Center for Algoguido Technologies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 font-sans antialiased min-h-screen bg-mesh flex flex-col">
        {children}
        <AIProcessingLoader />
      </body>
    </html>
  );
}
