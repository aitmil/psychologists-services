import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserFavorites } from '@/lib/firebase/services/favorites';

import { getAuth } from 'firebase/auth';
import { Psychologist, PsychologistState } from '@/lib/definitions';
import { fetchFavoritesPsychologists, fetchPsychologists } from './operations';

const initialState: PsychologistState = {
  data: [],
  dataFavorites: [],
  favorites: [],
  filter: 'A to Z',
  lastKey: null,
  hasMore: true,
  isLoading: false,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    clearFavorites: state => {
      state.favorites = [];
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const user = getAuth().currentUser;
      if (!user) return;
      const id = action.payload;
      const isFavorite = state.favorites.includes(id);
      state.favorites = isFavorite
        ? state.favorites.filter(fav => fav !== id)
        : [...state.favorites, id];
      updateUserFavorites(user.uid, state.favorites);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavoritesPsychologists.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavoritesPsychologists.fulfilled,
        (state, action: PayloadAction<Psychologist[]>) => {
          state.dataFavorites = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchFavoritesPsychologists.rejected, state => {
        state.isLoading = false;
      })
      .addCase(fetchPsychologists.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchPsychologists.fulfilled,
        (
          state,
          action: PayloadAction<{
            psychologists: Psychologist[];
            lastKey: string | null;
            hasMore: boolean;
          }>
        ) => {
          const { psychologists, lastKey, hasMore } = action.payload;
          state.data = [...state.data, ...psychologists];
          state.lastKey = lastKey;
          state.hasMore = hasMore;
          state.isLoading = false;
        }
      )
      .addCase(fetchPsychologists.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setFilter, setFavorites, clearFavorites, toggleFavorite } =
  psychologistsSlice.actions;
export default psychologistsSlice.reducer;
