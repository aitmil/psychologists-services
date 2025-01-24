'use client';

import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';

import { db } from '@/app/lib/firebase';
import Container from '@/app/ui/container';
import Filters from '@/app/ui/psychologists/filters';
import PsychologistsList from '@/app/ui/psychologists/psychologists-list';
import Section from '@/app/ui/section';

export default function PsychologistsPage() {
  useEffect(() => {
    const dataRef = ref(db, '/psychologists');
    onValue(dataRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
    });
  }, []);

  return (
    <Section variant="home">
      <Container>
        <Filters />
        <PsychologistsList />
      </Container>
    </Section>
  );
}
