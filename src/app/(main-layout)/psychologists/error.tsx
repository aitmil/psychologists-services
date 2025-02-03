'use client';

import React from 'react';
import Button from '@/ui/button';

export interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div>
      <p>{`Something went wrong. ${error.message}`}</p>
      <Button type="button" variant="outlined" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
