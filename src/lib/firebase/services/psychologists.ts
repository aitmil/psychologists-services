import { db } from '@/lib/firebase/firebase';
import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  limitToLast,
  get,
  Query,
  startAfter,
  endBefore,
} from 'firebase/database';
import { Psychologist } from '@/lib/definitions';

export const fetchAllPsychologists = async (
  sortBy: string | null = null,
  lastValue: string | number | null = null,
  limit: number = 3
): Promise<{
  psychologists: Psychologist[];
  lastValue: string | number | null;
  hasMore: boolean;
}> => {
  try {
    const psychologistsRef = ref(db, 'psychologists');
    let psychologistsQuery: Query;
    let orderField: keyof Psychologist = 'name';

    switch (sortBy) {
      case 'Name (A to Z)':
      case 'Name (Z to A)':
        orderField = 'name';
        break;
      case 'Price: Low to High':
      case 'Price: High to Low':
        orderField = 'price_per_hour';
        break;
      case 'Highest rating first':
        orderField = 'rating';
        break;
      default:
        orderField = 'name';
        break;
    }

    if (
      sortBy === 'Name (Z to A)' ||
      sortBy === 'Price: High to Low' ||
      sortBy === 'Highest rating first'
    ) {
      psychologistsQuery = query(
        psychologistsRef,
        orderByChild(orderField),
        limitToLast(limit + 1)
      );
    } else {
      psychologistsQuery = query(
        psychologistsRef,
        orderByChild(orderField),
        limitToFirst(limit + 1)
      );
    }

    if (lastValue !== null) {
      if (
        sortBy === 'Name (Z to A)' ||
        sortBy === 'Price: High to Low' ||
        sortBy === 'Highest rating first'
      ) {
        psychologistsQuery = query(psychologistsQuery, endBefore(lastValue));
      } else {
        psychologistsQuery = query(psychologistsQuery, startAfter(lastValue));
      }
    }

    const snapshot = await get(psychologistsQuery);
    const data = snapshot.val();

    if (!data) {
      return { psychologists: [], lastValue: null, hasMore: false };
    }

    const psychologistsArray: Psychologist[] = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));

    const sortedPsychologists = [...psychologistsArray];

    switch (sortBy) {
      case 'Name (A to Z)':
        sortedPsychologists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z to A)':
        sortedPsychologists.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Price: Low to High':
        sortedPsychologists.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case 'Price: High to Low':
        sortedPsychologists.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case 'Highest rating first':
        sortedPsychologists.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    const hasMore = sortedPsychologists.length > limit;
    const newLastValue = hasMore
      ? sortedPsychologists[limit - 1]?.[orderField] || null
      : null;

    return {
      psychologists: hasMore
        ? sortedPsychologists.slice(0, limit)
        : sortedPsychologists,
      lastValue: newLastValue,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
