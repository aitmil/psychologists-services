'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/app/ui/header/header';
import './globals.css';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen ${
          isHomePage
            ? 'bg-gradient-to-br from-main-background to-orange-transparent'
            : ''
        }`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
