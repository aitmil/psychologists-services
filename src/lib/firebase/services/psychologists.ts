import { db } from '@/lib/firebase/firebase';
import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  get,
  Query,
  startAfter,
} from 'firebase/database';
import { Psychologist } from '@/lib/definitions';

export const fetchAllPsychologists = async (
  filter: string | null = null,
  lastValue: string | number | null = null,
  limit: number = 3
): Promise<{
  psychologists: Psychologist[];
  lastValue: string | number | null;
  hasMore: boolean;
}> => {
  try {
    console.log(
      `Fetching psychologists with filter: ${filter}, lastValue: ${lastValue}, limit: ${limit}`
    );

    const psychologistsRef = ref(db, 'psychologists');
    let psychologistsQuery: Query;
    let orderField: keyof Psychologist = 'name';

    psychologistsQuery = query(psychologistsRef, limitToFirst(limit + 1));

    switch (filter) {
      case 'Name (A to Z)':
        orderField = 'name';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
      case 'Name (Z to A)':
        orderField = 'name';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
      case 'Price: Low to High':
        orderField = 'price_per_hour';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
      case 'Price: High to Low':
        orderField = 'price_per_hour';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
      case 'Highest rating first':
        orderField = 'rating';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
      default:
        orderField = 'name';
        psychologistsQuery = query(
          psychologistsQuery,
          orderByChild(orderField)
        );
        break;
    }

    if (lastValue !== null) {
      console.log(`Starting after lastValue: ${lastValue}`);
      psychologistsQuery = query(psychologistsQuery, startAfter(lastValue));
    }

    const snapshot = await get(psychologistsQuery);
    const data = snapshot.val();

    console.log('Snapshot:', data);

    if (!data) {
      console.log('No data found');
      return { psychologists: [], lastValue: null, hasMore: false };
    }

    const psychologistsArray: Psychologist[] = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));

    console.log('Psychologists array:', psychologistsArray);

    let filteredPsychologists = [...psychologistsArray];

    switch (filter) {
      case 'Name (A to Z)':
        filteredPsychologists = filteredPsychologists.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 'Name (Z to A)':
        filteredPsychologists = filteredPsychologists.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case 'Price: Low to High':
        filteredPsychologists = filteredPsychologists.sort(
          (a, b) => a.price_per_hour - b.price_per_hour
        );
        break;
      case 'Price: High to Low':
        filteredPsychologists = filteredPsychologists.sort(
          (a, b) => b.price_per_hour - a.price_per_hour
        );
        break;
      case 'Highest rating first':
        filteredPsychologists = filteredPsychologists.sort(
          (a, b) => b.rating - a.rating
        );
        break;
      default:
        break;
    }

    console.log('Filtered psychologists:', filteredPsychologists);

    const hasMore = filteredPsychologists.length > limit;
    const newLastValue = hasMore
      ? filteredPsychologists[limit - 1]?.name
      : null;

    console.log(
      `Returning ${hasMore ? 'more' : 'no more'} psychologists, lastValue: ${
        newLastValue ?? 'null'
      }`
    );

    return {
      psychologists: hasMore
        ? filteredPsychologists.slice(0, limit)
        : filteredPsychologists,
      lastValue: newLastValue,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
