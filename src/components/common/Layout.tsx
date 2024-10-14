import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: '16px',
            marginTop: '80px',
          },
        }}
      />
      {children}
    </>
  );
}
