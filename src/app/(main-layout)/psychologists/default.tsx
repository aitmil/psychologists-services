'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPsychologists } from '@/lib/redux/psychologists/operations';
import { clearData, setSortBy } from '@/lib/redux/psychologists/slice';
import { selectPsychologists } from '@/lib/redux/psychologists/selectors';
import { SortBy } from '@/lib/definitions';
import Container from '@/ui/container';
import SortMenu from '@/ui/psychologists/sort-menu';
import PsychologistsList from '@/ui/psychologists/psychologists-list';
import Section from '@/ui/section';
import Button from '@/ui/button';
import { ListSkeleton } from '@/ui/skeletons';

export default function PsychologistsPage() {
  const [currentSortBy, selectCurrentSortBy] =
    useState<string>('Name (A to Z)');

  const dispatch = useAppDispatch();
  const { psychologists, loading, hasMore } =
    useAppSelector(selectPsychologists);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const handleSortByChange = (sortBy: SortBy) => {
    if (currentSortBy !== sortBy.name) {
      selectCurrentSortBy(sortBy.name);
      dispatch(setSortBy(sortBy.name));
      dispatch(clearData());
      dispatch(fetchPsychologists());
    }
  };

  return (
    <Section variant="home">
      <Container>
        <SortMenu onSortByChange={handleSortByChange} />

        {loading && psychologists.length === 0 ? (
          <ListSkeleton />
        ) : (
          <PsychologistsList psychologists={psychologists} />
        )}

        {psychologists.length > 0 && hasMore ? (
          <Button
            type="button"
            onClick={() => {
              dispatch(fetchPsychologists());
            }}
            variant="filled"
            className="mt-[64px] mx-auto block"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        ) : psychologists.length > 0 && !loading ? (
          <div className="mt-[64px] mx-auto block text-center">
            <p>No more psychologists found</p>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
