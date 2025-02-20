'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppointmentFormModal from '@/ui/psychologists/appointment-form-modal';

export default function Page() {
  const router = useRouter();

  return <AppointmentFormModal show={true} onClose={() => router.back()} />;
}
