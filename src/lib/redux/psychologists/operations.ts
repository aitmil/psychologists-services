import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPsychologistsData,
  getUserFavorites,
} from '@/lib/firebase/services/favorites';
import { fetchAllPsychologists } from '@/lib/firebase/services/psychologists';
import { getAuth } from 'firebase/auth';
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
  async () => {
    return await fetchPsychologistsData();
  }
);

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async (_, { getState }) => {
    const state = getState() as { psychologists: PsychologistState };
    const { filter, lastKey } = state.psychologists;
    const response = await fetchAllPsychologists(filter, lastKey, 3);
    return response;
  }
);
