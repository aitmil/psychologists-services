'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <p>Could not found psychologist</p>
      <Link href="/psychologists" className="text-orange-light">
        Back to psychologists
      </Link>
    </div>
  );
}
