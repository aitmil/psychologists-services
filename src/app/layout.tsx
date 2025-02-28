import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Psychologists Services',
  description:
    'Service for searching and booking appointments with psychologists',
  metadataBase: new URL('https://psychologists-services-xi.vercel.app/'),
  keywords:
    'psychologists, mental health, therapy, counseling, booking, appointments, GoIT projects, frontend projects',
  icons: {
    icon: '/favicon.svg',
  },
  authors: [{ name: 'Anna Taranchuk' }],
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <head />
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
