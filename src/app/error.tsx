'use client';

import Button from '@/ui/button';
import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col gap-6 items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Something went wrong globally</h1>
        <p className="text-lg">{error.message}</p>
        <Button type="button" variant="filled" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
