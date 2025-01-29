'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@/app/ui/container';
import Filters from '@/app/ui/psychologists/filters';
import PsychologistsList from '@/app/ui/psychologists/psychologists-list';
import Section from '@/app/ui/section';
import { setPsychologists } from '@/app/lib/redux/psychologists/slice';
import { getData } from '@/app/lib/firebase/firebaseService';
import { selectPsychologists } from '@/app/lib/redux/psychologists/selectors';
import Button from '@/app/ui/button';

export default function PsychologistsPage() {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
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

      if (isLoadMore && psychologists) {
        dispatch(setPsychologists([...psychologists, ...newPsychologists]));
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

  return (
    <Section variant="home">
      <Container>
        <Filters />
        <PsychologistsList />

        {psychologists?.length !== 0 && hasMore && (
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
