'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchFavoritesData } from '@/lib/redux/favorites/operations';
import { clearData, setSortBy } from '@/lib/redux/favorites/slice';
import { selectFavorites } from '@/lib/redux/favorites/selectors';
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
  const { favorites, loading, hasMore } = useAppSelector(selectFavorites);

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

        {loading && favorites.length === 0 ? (
          <ListSkeleton />
        ) : (
          <PsychologistsList psychologists={favorites} />
        )}

        {!loading && favorites.length === 0 && (
          <p className="text-center text-xl">
            No psychologists have been added to favorites
          </p>
        )}

        {favorites.length > 0 && hasMore ? (
          <Button
            type="button"
            onClick={() => {
              dispatch(fetchFavoritesData());
            }}
            variant="filled"
            className="mt-[64px] mx-auto block"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        ) : favorites.length > 1 && !loading ? (
          <div className="mt-[64px] mx-auto block text-center">
            <p>No more favorites found</p>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
