'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from '@/app/ui/container';
import Filters from '@/app/ui/psychologists/filters';
import PsychologistsList from '@/app/ui/psychologists/psychologists-list';
import Section from '@/app/ui/section';
import { setPsychologists } from '@/app/lib/redux/psychologists/slice';
import { Psychologist } from '@/app/lib/definitions';

import { getData } from '@/app/lib/firebase/firebaseService';

export default function PsychologistsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const data: Psychologist[] = await getData();
        dispatch(setPsychologists(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <Section variant="home">
      <Container>
        <Filters />
        <PsychologistsList />
      </Container>
    </Section>
  );
}
