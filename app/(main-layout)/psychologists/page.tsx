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
import { selectFilteredPsychologists } from '@/app/lib/redux/psychologists/selectors';
import Button from '@/app/ui/button';
import { Filter } from '@/app/lib/definitions';

export default function PsychologistsPage() {
  const dispatch = useDispatch();
  const filteredPsychologists = useSelector(selectFilteredPsychologists);

  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPsychologists = async (isLoadMore: boolean = false) => {
    setLoading(true);

    try {
      const {
        psychologists: newPsychologists,
        lastKey: newLastKey,
        hasMore: moreAvailable,
      } = await getData(isLoadMore ? lastKey : null, 3);

      if (isLoadMore && filteredPsychologists) {
        dispatch(
          setPsychologists([...filteredPsychologists, ...newPsychologists])
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
    fetchPsychologists();
  }, []);

  const handleFilterChange = (filter: Filter) => {
    dispatch(setFilter(filter.name));
  };

  return (
    <Section variant="home">
      <Container>
        <Filters onFilterChange={handleFilterChange} />
        <PsychologistsList psychologists={filteredPsychologists} />

        {filteredPsychologists?.length !== 0 && hasMore && (
          <Button
            type="button"
            onClick={() => fetchPsychologists(true)}
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
