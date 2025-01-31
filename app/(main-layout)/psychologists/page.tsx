'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@/app/ui/container';
import Filters from '@/app/ui/psychologists/filters';
import PsychologistsList from '@/app/ui/psychologists/psychologists-list';
import Section from '@/app/ui/section';
import {
  setFilter,
  setPsychologists,
} from '@/app/lib/redux/psychologists/slice';
import { getData } from '@/app/lib/firebase/firebaseService';
import {
  selectCurrentFilter,
  selectPsychologists,
} from '@/app/lib/redux/psychologists/selectors';
import Button from '@/app/ui/button';
import { Filter } from '@/app/lib/definitions';

export default function PsychologistsPage() {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const currentFilter = useSelector(selectCurrentFilter);

  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPsychologists = async (isLoadMore: boolean = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const {
        psychologists: newPsychologists,
        lastKey: newLastKey,
        hasMore: moreAvailable,
      } = await getData(currentFilter, isLoadMore ? lastKey : null, 3);

      if (isLoadMore) {
        const existingIds = new Set(psychologists.map(p => p.id));
        const filteredNewPsychologists = newPsychologists.filter(
          p => !existingIds.has(p.id)
        );

        dispatch(
          setPsychologists([...psychologists, ...filteredNewPsychologists])
        );
      } else {
        dispatch(setPsychologists(newPsychologists));
      }

      setLastKey(newLastKey);
      setHasMore(moreAvailable);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log('Initial fetch on component mount');
    fetchPsychologists();
  }, []);

  //   TODO: fix filter state, fetching data now by previous filter and Load more only 2nd page

  const handleFilterChange = (filter: Filter) => {
    if (currentFilter !== filter.name) {
      console.log(
        `Filter Changed: currentFilter=${currentFilter}, newFilter=${filter.name}`
      );

      dispatch(setFilter(filter.name));
      setLastKey(null);
      setHasMore(true);
      dispatch(setPsychologists([]));
      fetchPsychologists(false);
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
              fetchPsychologists(true);
            }}
            variant="filled"
            className="mt-[64px] mx-auto block"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </Container>
    </Section>
  );
}
