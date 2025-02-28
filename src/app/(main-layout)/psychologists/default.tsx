'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPsychologists } from '@/lib/redux/psychologists/operations';
import { clearData, setSortBy } from '@/lib/redux/psychologists/slice';
import { selectPsychologists } from '@/lib/redux/psychologists/selectors';
import { SortBy } from '@/lib/definitions';
import Container from '@/ui/container';
import SortMenu from '@/ui/psychologists/sort-menu';
import PsychologistsList from '@/ui/psychologists/psychologists-list';
import ScrollToTopButton from '@/ui/psychologists/scroll-to-top-btn';
import Section from '@/ui/section';
import Button from '@/ui/button';
import { ListSkeleton } from '@/ui/skeletons';
import { scrollDown } from '@/lib/scroll';

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

  const handleLoadMore = () => {
    dispatch(fetchPsychologists())
      .unwrap()
      .then(scrollDown)
      .catch(() => {
        toast.error('Failed to load more psychologists');
      });
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
            onClick={handleLoadMore}
            variant="filled"
            className="px-[32px] sm:px-[36px] lg:px-[40px] py-[10px] sm:py-[12px] lg:py-[14px] mt-[44px] sm:mt-[54x] lg:mt-[64px] mx-auto block"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        ) : psychologists.length > 0 && !loading ? (
          <div className="mt-[44px] sm:mt-[54x] lg:mt-[64px] mx-auto block text-center">
            <p>No more psychologists found</p>
          </div>
        ) : null}
      </Container>
      <ScrollToTopButton />
    </Section>
  );
}
