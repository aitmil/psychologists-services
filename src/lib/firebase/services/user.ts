import { set, ref, push } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';
import { Psychologist } from '@/lib/definitions';

export const updateUserFavorites = async (
  userId: string,
  favorites: Psychologist[]
): Promise<void> => {
  if (!userId) return;
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  await set(userFavoritesRef, favorites);
};

export const saveAppointmentToUser = async (
  userId: string,
  psychologistId: string,
  time: string
): Promise<void> => {
  const appointmentsRef = ref(db, `users/${userId}/appointments`);
  const newAppointmentRef = push(appointmentsRef);
  await set(newAppointmentRef, {
    psychologistId,
    time,
  });
};
