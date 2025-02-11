'use client';

import React from 'react';
import Container from '@/ui/container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-4 justify-center items-center h-[calc(100vh-200px)]">
        <p className="text-3xl font-bold">404 | Could not found psychologist</p>
        <button
          onClick={() => (window.location.href = '/psychologists')}
          className="text-3xl font-bold text-orange-dark underline"
        >
          Back to psychologists
        </button>
      </div>
    </Container>
  );
}
