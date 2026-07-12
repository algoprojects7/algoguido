import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Training, Professional Training & Paid Internships | Algoguido Technologies',
  description: 'Apply for paid internships, industry-focused professional training, and university-aligned summer/winter projects at Algoguido Technologies.',
};

export default function IndustrialTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
