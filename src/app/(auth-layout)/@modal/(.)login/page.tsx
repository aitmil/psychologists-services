'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginFormModal from '@/ui/auth/login-form-modal';

export default function Page() {
  const router = useRouter();

  return <LoginFormModal show={true} onClose={() => router.back()} />;
}
