import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { fetchData } from '@/lib/firebase/services/psychologists';
import { FavoritesState, Psychologist } from '@/lib/definitions';
import {
  fetchUserFavorites,
  updateUserFavorites,
} from '@/lib/firebase/services/user';

export const fetchFavoritesData = createAsyncThunk(
  'favorites/fetchFavoritesData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

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
    } catch (error) {
      console.error('Error fetching favorites data:', error);
      return rejectWithValue('Failed to fetch favorites data');
    }
  }
);

export const fetchAllFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (userId: string, { rejectWithValue }) => {
    try {
      return fetchUserFavorites(userId);
    } catch (error) {
      console.error('Error fetching all favorites:', error);
      return rejectWithValue('Failed to fetch all favorites');
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (
    { userId, psychologist }: { userId: string; psychologist: Psychologist },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { favorites: { data: Psychologist[] } };

      const isFavorite = state.favorites.data.some(
        fav => fav.id === psychologist.id
      );
      const updatedFavorites = isFavorite
        ? state.favorites.data.filter(fav => fav.id !== psychologist.id)
        : [...state.favorites.data, psychologist];
      await updateUserFavorites(userId, updatedFavorites);

      return { psychologist, isFavorite };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return rejectWithValue('Failed to toggle favorite');
    }
  }
);
