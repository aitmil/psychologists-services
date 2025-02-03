'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RegisterFormModal from '@/ui/auth/register-form-modal';

export default function Page() {
  const router = useRouter();

  return <RegisterFormModal show={true} onClose={() => router.back()} />;
}
