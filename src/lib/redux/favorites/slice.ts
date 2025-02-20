import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { updateUserFavorites } from '@/lib/firebase/services/user';
import { FavoritesState, Psychologist } from '@/lib/definitions';
import { fetchFavoritesData } from '@/lib/redux/favorites/operations';

const initialState: FavoritesState = {
  data: [],
  sortBy: 'Name (A to Z)',
  lastKey: null,
  hasMore: true,
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Psychologist>) => {
      const user = getAuth().currentUser;
      if (!user) return;
      const psychologist = action.payload;
      const isFavorite = state.data.some(fav => fav.id === psychologist.id);
      state.data = isFavorite
        ? state.data.filter(fav => fav.id !== psychologist.id)
        : [...state.data, psychologist];
      updateUserFavorites(user.uid, state.data);
    },
    clearData: state => {
      state.data = [];
      state.lastKey = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchFavoritesData.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavoritesData.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: Psychologist[];
            lastValue: string | number | null;
            hasMore: boolean;
          }>
        ) => {
          if (action.payload.data.length > 0) {
            state.data = [
              ...state.data,
              ...action.payload.data.filter(
                newPsych =>
                  !state.data.some(
                    existingPsych => existingPsych.id === newPsych.id
                  )
              ),
            ];
            state.lastKey = action.payload.lastValue;
            state.hasMore = action.payload.hasMore;
          }
          state.isLoading = false;
        }
      )
      .addCase(fetchFavoritesData.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setSortBy, toggleFavorite, clearData } = favoritesSlice.actions;
export default favoritesSlice.reducer;
