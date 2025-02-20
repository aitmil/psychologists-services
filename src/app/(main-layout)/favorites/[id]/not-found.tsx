'use client';

import React from 'react';
import Container from '@/ui/container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-4 justify-center items-center h-[calc(100vh-200px)]">
        <p className="text-3xl font-bold">
          404 | Could not found favorites psychologists
        </p>
        <button
          onClick={() => (window.location.href = '/favorites')}
          className="text-2xl font-medium text-orange-dark underline"
        >
          Back to favorites psychologists
        </button>
      </div>
    </Container>
  );
}
