'use client';

import React from 'react';
import Button from '@/ui/button';
import Container from '@/ui/container';

export interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <Container>
      <div className="flex flex-col gap-10 justify-center items-center h-[calc(100vh-200px)]">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-lg">{error.message}</p>
        <Button type="button" variant="filled" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </Container>
  );
}
