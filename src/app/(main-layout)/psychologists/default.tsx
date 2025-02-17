'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import Container from '@/ui/container';
import Filters from '@/ui/psychologists/filters';
import PsychologistsList from '@/ui/psychologists/psychologists-list';
import Section from '@/ui/section';

import {
  selectPsychologists,
  selectIsLoading,
  selectHasMore,
} from '@/lib/redux/psychologists/selectors';
import Button from '@/ui/button';
import { Filter } from '@/lib/definitions';
import { fetchPsychologists } from '@/lib/redux/psychologists/operations';
import { setFilter } from '@/lib/redux/psychologists/slice';

export default function PsychologistsPage() {
  const dispatch = useAppDispatch();
  const psychologists = useAppSelector(selectPsychologists);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const [currentFilter, selectCurrentFilter] = useState<string>('A to Z');

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const handleFilterChange = (filter: Filter) => {
    if (currentFilter !== filter.name) {
      selectCurrentFilter(filter.name);
      dispatch(setFilter(filter.name));
      dispatch(fetchPsychologists());
    }
  };

  return (
    <Section variant="home">
      <Container>
        <Filters onFilterChange={handleFilterChange} />
        <PsychologistsList psychologists={psychologists} />

        {psychologists.length !== 0 && hasMore && (
          <Button
            type="button"
            onClick={() => {
              console.log('Load More button clicked');
              dispatch(fetchPsychologists());
            }}
            variant="filled"
            className="mt-[64px] mx-auto block"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </Container>
    </Section>
  );
}
