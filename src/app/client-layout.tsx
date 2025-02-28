'use client';

import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/auth-provider';
import Header from '@/ui/header/header';
import store from '@/lib/redux/store';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <body
      className={`min-h-screen flex flex-col ${
        isHomePage
          ? 'bg-gradient-to-br from-main-background to-orange-transparent'
          : ''
      }`}
    >
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <main className={``}>{children}</main>
          <ToastContainer
            position="top-right"
            theme="light"
            closeOnClick
            newestOnTop
            autoClose={2000}
          />
        </AuthProvider>
      </Provider>{' '}
    </body>
  );
}
