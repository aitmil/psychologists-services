import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import {
  getUserFavorites,
  getUserFavoritesData,
} from '@/lib/firebase/services/favorites';
import { fetchAllPsychologists } from '@/lib/firebase/services/psychologists';
import { PsychologistState } from '@/lib/definitions';
import { setFavorites } from './slice';

export const fetchFavorites = createAsyncThunk(
  'psychologists/fetchFavorites',
  async (_, { dispatch }) => {
    const user = getAuth().currentUser;
    if (user) {
      const favorites = await getUserFavorites(user.uid);
      dispatch(setFavorites(favorites));
    }
  }
);

export const fetchFavoritesPsychologists = createAsyncThunk(
  'psychologists/fetchFavoritesPsychologists',
  async (_, { getState }) => {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const state = getState() as { psychologists: PsychologistState };
    const { sortBy } = state.psychologists;
    const response = await getUserFavoritesData(user.uid, sortBy, 3);
    return response;
  }
);

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async (_, { getState }) => {
    const state = getState() as { psychologists: PsychologistState };
    const { sortBy, lastKey } = state.psychologists;
    const response = await fetchAllPsychologists(sortBy, lastKey, 3);
    return response;
  }
);
