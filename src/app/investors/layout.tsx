import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Portal & Confidential Data Room | ATLAS Travel Club LLC',
  description: 'Confidential investor presentation, private placement prospectus, YC SAFE term sheet, and due diligence repository for ATLAS Travel Club LLC Pre-Seed round ($75,000 / $1.75M cap).',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
