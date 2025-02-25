'use client';

import React from 'react';
import Container from '@/ui/container';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-4 justify-center items-center h-[calc(100vh-200px)]">
        <p className="text-3xl font-bold">404 | Could not found the page</p>
        <div className="flex gap-2 text-2xl font-medium text-orange-dark">
          <p>Back to </p>
          <Link href="/" className="underline">
            home
          </Link>
        </div>
      </div>
    </Container>
  );
}
