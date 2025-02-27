'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/auth-provider';
import Header from '@/ui/header/header';
import store from '@/lib/redux/store';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
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
        className={`${inter.className} antialiased min-h-screen flex flex-col ${
          isHomePage
            ? 'bg-gradient-to-br from-main-background to-orange-transparent'
            : ''
        }`}
      >
        <Provider store={store}>
          <AuthProvider>
            <Header />
            {children}
            <ToastContainer
              position="top-right"
              theme="light"
              closeOnClick
              newestOnTop
              autoClose={2000}
            />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
