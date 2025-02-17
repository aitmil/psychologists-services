'use client';

import { notFound } from 'next/navigation';
import React from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import AppointmentForm from '@/ui/psychologists/appointment-form';
import Container from '@/ui/container';
import { selectPsychologists } from '@/lib/redux/psychologists/selectors';

export default function Page({ params }: { params: { name: string } }) {
  const psychologists = useAppSelector(selectPsychologists);
  const psychologist = psychologists.find(p => p.name === params.name);

  if (!psychologist) {
    return notFound();
  }

  return (
    <Container>
      <div className="flex justify-center">
        <div className="bg-white max-w-[566px] p-[64px] mt-9 rounded-[30px]">
          <AppointmentForm />
        </div>
      </div>
    </Container>
  );
}

// TODO: still not found
