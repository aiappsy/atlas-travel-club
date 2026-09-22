import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { PlatformProvider } from '@/context/PlatformContext';
import { SidebarProvider } from '@/context/SidebarContext';
import AppLayout from '@/components/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ATLAS | The Private Wholesale Travel & Banking Club',
  description: 'ATLAS is a closed-loop wholesale travel and sovereign banking club with 0% retail markups, co-branded reloadable Visa cards, post-booking price drop refunds, and annual profit dividends.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen bg-slate-50`}>
        <PlatformProvider>
          <AuthProvider>
            <SidebarProvider>
              <AppLayout>{children}</AppLayout>
            </SidebarProvider>
          </AuthProvider>
        </PlatformProvider>
      </body>
    </html>
  );
}
