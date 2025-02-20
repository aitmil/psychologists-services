import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { fetchData } from '@/lib/firebase/services/psychologists';
import { FavoritesState } from '@/lib/definitions';

export const fetchFavoritesData = createAsyncThunk(
  'psychologists/fetchFavoritesData',
  async (_, { getState }) => {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const state = getState() as { favorites: FavoritesState };
    const { sortBy, lastKey } = state.favorites;

    const response = await fetchData(
      `users/${user.uid}/favorites`,
      sortBy,
      lastKey,
      3
    );
    return response;
  }
);
