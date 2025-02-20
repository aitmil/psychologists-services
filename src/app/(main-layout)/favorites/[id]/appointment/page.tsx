'use client';

import { notFound, useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import AppointmentForm from '@/ui/psychologists/appointment-form';
import Container from '@/ui/container';
import { selectFavorites } from '@/lib/redux/favorites/selectors';

export default function Page() {
  const params = useParams();
  const { id } = params;
  const psychologists = useAppSelector(selectFavorites);
  const psychologist = psychologists.find(p => p.id === id);

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
