import { db } from '@/app/lib/firebase/firebase';
import {
  ref,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
  get,
} from 'firebase/database';

import { Psychologist } from '../definitions';

export const getData = async (
  startAfterKey: string | null = null,
  limit: number = 3
): Promise<{
  psychologists: Psychologist[];
  lastKey: string | null;
  hasMore: boolean;
}> => {
  try {
    const psychologistsRef = ref(db, '/');
    let psychologistsQuery;

    if (startAfterKey) {
      psychologistsQuery = query(
        psychologistsRef,
        orderByChild('id'),
        startAfter(startAfterKey),
        limitToFirst(limit + 1)
      );
    } else {
      psychologistsQuery = query(
        psychologistsRef,
        orderByChild('id'),
        limitToFirst(limit + 1)
      );
    }

    const snapshot = await get(psychologistsQuery);
    const data = snapshot.val();

    if (!data) {
      return { psychologists: [], lastKey: null, hasMore: false };
    }

    const psychologistsArray: Psychologist[] = Object.values(data);
    const hasMore = psychologistsArray.length > limit;

    return {
      psychologists: hasMore
        ? psychologistsArray.slice(0, limit)
        : psychologistsArray,
      lastKey: hasMore ? psychologistsArray[limit - 1].id : null,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
