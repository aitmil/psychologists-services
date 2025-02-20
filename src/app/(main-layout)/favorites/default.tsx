'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchFavoritesData } from '@/lib/redux/favorites/operations';
import { clearData, setSortBy } from '@/lib/redux/favorites/slice';
import {
  selectIsLoading,
  selectHasMore,
  selectFavorites,
} from '@/lib/redux/favorites/selectors';
import { SortBy } from '@/lib/definitions';
import Container from '@/ui/container';
import SortMenu from '@/ui/psychologists/sort-menu';
import PsychologistsList from '@/ui/psychologists/psychologists-list';
import Section from '@/ui/section';
import Button from '@/ui/button';

export default function PsychologistsPage() {
  const dispatch = useAppDispatch();
  const psychologists = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const [currentSortBy, selectCurrentSortBy] =
    useState<string>('Name (A to Z)');

  useEffect(() => {
    dispatch(fetchFavoritesData());
  }, [dispatch]);

  const handleSortByChange = (sortBy: SortBy) => {
    if (currentSortBy !== sortBy.name) {
      selectCurrentSortBy(sortBy.name);
      dispatch(setSortBy(sortBy.name));
      dispatch(clearData());
      dispatch(fetchFavoritesData());
    }
  };

  return (
    <Section variant="home">
      <Container>
        <SortMenu onSortByChange={handleSortByChange} />

        {psychologists.length === 0 && !isLoading ? (
          <p className="text-center text-xl">
            No psychologists have been added to favorites
          </p>
        ) : (
          <PsychologistsList psychologists={psychologists} />
        )}

        {psychologists.length !== 0 && hasMore ? (
          <Button
            type="button"
            onClick={() => {
              dispatch(fetchFavoritesData());
            }}
            variant="filled"
            className="mt-[64px] mx-auto block"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        ) : (
          <div className="mt-[64px] mx-auto block text-center">
            <p>No more psychologists found</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
