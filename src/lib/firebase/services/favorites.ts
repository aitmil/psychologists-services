import { get, set, ref } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  if (!userId) return [];
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  const snapshot = await get(userFavoritesRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const updateUserFavorites = async (
  userId: string,
  favorites: string[]
): Promise<void> => {
  if (!userId) return;
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  await set(userFavoritesRef, favorites);
};

export const fetchPsychologistsData = async () => {
  const psychologistsRef = ref(db, 'psychologists');
  const snapshot = await get(psychologistsRef);
  return snapshot.exists()
    ? Object.keys(snapshot.val()).map(key => ({
        ...snapshot.val()[key],
        id: key,
      }))
    : [];
};
