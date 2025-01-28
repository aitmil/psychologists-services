import { db } from '@/app/lib/firebase/firebase';
import { ref, get } from 'firebase/database';

import { Psychologist } from '../definitions';

export const getData = async (): Promise<Psychologist[]> => {
  try {
    const headerRef = ref(db, '/');
    const snapshot = await get(headerRef);
    return snapshot.val();
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
