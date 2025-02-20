import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserFavorites } from '@/lib/firebase/services/favorites';

import { getAuth } from 'firebase/auth';
import { Psychologist, PsychologistState } from '@/lib/definitions';
import { fetchFavoritesPsychologists, fetchPsychologists } from './operations';

const initialState: PsychologistState = {
  data: [],
  favorites: [],
  sortBy: 'Name (A to Z)',
  lastKey: null,
  hasMore: true,
  isLoading: false,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Psychologist[]>) => {
      state.favorites = action.payload;
    },
    clearFavorites: state => {
      state.favorites = [];
    },
    toggleFavorite: (state, action: PayloadAction<Psychologist>) => {
      const user = getAuth().currentUser;
      if (!user) return;
      const psychologist = action.payload;
      const isFavorite = state.favorites.some(
        fav => fav.id === psychologist.id
      );
      state.favorites = isFavorite
        ? state.favorites.filter(fav => fav.id !== psychologist.id)
        : [...state.favorites, psychologist];
      updateUserFavorites(user.uid, state.favorites);
    },
    clearPsychologists: state => {
      state.data = [];
      state.favorites = [];
      state.lastKey = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchFavoritesPsychologists.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavoritesPsychologists.fulfilled,
        (
          state,
          action: PayloadAction<{
            psychologists: Psychologist[];
            lastValue: string | number | null;
            hasMore: boolean;
          }>
        ) => {
          if (action.payload.psychologists.length > 0) {
            state.favorites = [
              ...state.favorites,
              ...action.payload.psychologists.filter(
                newPsych =>
                  !state.favorites.some(
                    existingPsych => existingPsych.id === newPsych.id
                  )
              ),
            ];
            state.lastKey = action.payload.lastValue;
            state.hasMore = action.payload.hasMore;
            console.log('Payload favorites', action.payload);
          }
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
            lastValue: string | number | null;
            hasMore: boolean;
          }>
        ) => {
          if (action.payload.psychologists.length > 0) {
            state.data = [
              ...state.data,
              ...action.payload.psychologists.filter(
                newPsych =>
                  !state.data.some(
                    existingPsych => existingPsych.id === newPsych.id
                  )
              ),
            ];
            state.lastKey = action.payload.lastValue;
            state.hasMore = action.payload.hasMore;
            console.log('payload', action.payload);
          }
          state.isLoading = false;
        }
      )
      .addCase(fetchPsychologists.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const {
  setSortBy,
  setFavorites,
  clearFavorites,
  toggleFavorite,
  clearPsychologists,
} = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
