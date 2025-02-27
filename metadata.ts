import { Metadata } from 'next';

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
