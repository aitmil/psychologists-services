'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchFavoritesPsychologists } from '@/lib/redux/psychologists/operations';
import { clearPsychologists, setSortBy } from '@/lib/redux/psychologists/slice';
import {
  selectIsLoading,
  selectHasMore,
  selectFavoritePsychologists,
} from '@/lib/redux/psychologists/selectors';
import { SortBy } from '@/lib/definitions';
import Container from '@/ui/container';
import SortMenu from '@/ui/psychologists/sort-menu';
import PsychologistsList from '@/ui/psychologists/psychologists-list';
import Section from '@/ui/section';
import Button from '@/ui/button';

export default function PsychologistsPage() {
  const dispatch = useAppDispatch();
  const psychologists = useAppSelector(selectFavoritePsychologists);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const [currentSortBy, selectCurrentSortBy] =
    useState<string>('Name (A to Z)');

  useEffect(() => {
    dispatch(fetchFavoritesPsychologists());
  }, []);

  const handleSortByChange = (sortBy: SortBy) => {
    if (currentSortBy !== sortBy.name) {
      selectCurrentSortBy(sortBy.name);
      dispatch(setSortBy(sortBy.name));
      dispatch(clearPsychologists());
      dispatch(fetchFavoritesPsychologists());
    }
  };

  return (
    <Section variant="home">
      <Container>
        <SortMenu onSortByChange={handleSortByChange} />
        <PsychologistsList psychologists={psychologists} />

        {psychologists.length !== 0 && hasMore && (
          <Button
            type="button"
            onClick={() => {
              dispatch(fetchFavoritesPsychologists());
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
