import { db } from '@/app/lib/firebase/firebase';
import {
  ref,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
  get,
  startAt,
  endAt,
} from 'firebase/database';
import { Psychologist } from '../definitions';

export const getData = async (
  filter: string | null = null,
  startAfterKey: string | null = null,
  limit: number = 3
): Promise<{
  psychologists: Psychologist[];
  lastKey: string | null;
  hasMore: boolean;
}> => {
  try {
    console.log('Fetching psychologists data with filter:', filter);
    console.log('startAfterKey:', startAfterKey);

    const psychologistsRef = ref(db, '/');
    let psychologistsQuery;
    let orderField = 'name';

    switch (filter) {
      case 'A to Z':
        orderField = 'name';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          ...(startAfterKey ? [startAfter(startAfterKey)] : []),
          limitToFirst(limit + 1)
        );
        break;
      case 'Z to A':
        orderField = 'name';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          ...(startAfterKey ? [startAfter(startAfterKey)] : []),
          limitToFirst(limit + 1)
        );
        break;
      case 'Less than 10$':
        orderField = 'price_per_hour';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          endAt(10),
          limitToFirst(limit + 1)
        );
        break;
      case 'Greater than 10$':
        orderField = 'price_per_hour';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          startAt(10),
          limitToFirst(limit + 1)
        );
        break;
      case 'Popular':
        orderField = 'rating';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          startAt(4.8),
          limitToFirst(limit + 1)
        );
        break;
      case 'Not popular':
        orderField = 'rating';
        psychologistsQuery = query(
          psychologistsRef,
          orderByChild(orderField),
          endAt(4.8),
          limitToFirst(limit + 1)
        );
        break;
      case 'Show all':
      default:
        psychologistsQuery = query(psychologistsRef, limitToFirst(limit + 1));
    }

    console.log('Constructed Query:', psychologistsQuery);

    const snapshot = await get(psychologistsQuery);
    const data = snapshot.val();

    if (!data) {
      console.log('No data found');
      return { psychologists: [], lastKey: null, hasMore: false };
    }

    console.log('Data:', data);

    const psychologistsArray: Psychologist[] = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));

    console.log('Psychologists array:', psychologistsArray);

    const hasMore = psychologistsArray.length > limit;

    console.log('Has more:', hasMore);

    return {
      psychologists: hasMore
        ? psychologistsArray.slice(0, limit)
        : psychologistsArray,
      lastKey: hasMore
        ? psychologistsArray[limit - 1]?.[
            orderField as keyof Psychologist
          ]?.toString() || null
        : null,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
