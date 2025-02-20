import { get, set, ref } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';
import { Psychologist } from '@/lib/definitions';

export const getUserFavorites = async (
  userId: string
): Promise<Psychologist[]> => {
  if (!userId) return [];
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  const snapshot = await get(userFavoritesRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const updateUserFavorites = async (
  userId: string,
  favorites: Psychologist[]
): Promise<void> => {
  if (!userId) return;
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  await set(userFavoritesRef, favorites);
};

export const getUserFavoritesData = async (
  userId: string,
  sortBy: string | null = null,
  limit: number = 3
): Promise<{
  psychologists: Psychologist[];
  lastValue: string | number | null;
  hasMore: boolean;
}> => {
  if (!userId) return { psychologists: [], lastValue: null, hasMore: false };

  console.log('getUserFavoritesData', { userId, sortBy, limit });

  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  const snapshot = await get(userFavoritesRef);
  const favoriteIds = snapshot.exists()
    ? (Object.values(snapshot.val()) as string[])
    : [];

  console.log('getUserFavoritesData', { favoriteIds });

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

  const psychologistsData = await Promise.all(
    favoriteIds.map(async psychologistId => {
      const psychologistRef = ref(db, `psychologists/${psychologistId}`);
      const psychologistSnapshot = await get(psychologistRef);
      return psychologistSnapshot.exists()
        ? { id: psychologistId, ...psychologistSnapshot.val() }
        : null;
    })
  );

  console.log('getUserFavoritesData', { psychologistsData });

  const filteredPsychologists = psychologistsData.filter(
    Boolean
  ) as Psychologist[];

  console.log('getUserFavoritesData', { filteredPsychologists });

  switch (sortBy) {
    case 'Name (A to Z)':
      filteredPsychologists.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Name (Z to A)':
      filteredPsychologists.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Price: Low to High':
      filteredPsychologists.sort((a, b) => a.price_per_hour - b.price_per_hour);
      break;
    case 'Price: High to Low':
      filteredPsychologists.sort((a, b) => b.price_per_hour - a.price_per_hour);
      break;
    case 'Highest rating first':
      filteredPsychologists.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  const hasMore = filteredPsychologists.length > limit;
  const newLastValue = hasMore
    ? filteredPsychologists[limit - 1]?.[orderField] || null
    : null;

  console.log('getUserFavoritesData', { hasMore, newLastValue });

  return {
    psychologists: hasMore
      ? filteredPsychologists.slice(0, limit)
      : filteredPsychologists,
    lastValue: newLastValue,
    hasMore,
  };
};
