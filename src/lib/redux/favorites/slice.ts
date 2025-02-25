import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState, Psychologist } from '@/lib/definitions';
import {
  fetchAllFavorites,
  fetchFavoritesData,
  toggleFavorite,
} from '@/lib/redux/favorites/operations';

const initialState: FavoritesState = {
  data: [],
  favorites: [],
  sortBy: 'Name (A to Z)',
  lastKey: null,
  hasMore: true,
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    clearData: state => {
      state.data = [];
      state.lastKey = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAllFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchAllFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFavoritesData.pending, state => {
        state.isLoading = true;
        state.error = null;
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
      .addCase(fetchFavoritesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { psychologist, isFavorite } = action.payload;
        state.data = isFavorite
          ? state.data.filter(fav => fav.id !== psychologist.id)
          : [...state.data, psychologist];
      });
  },
});

export const { setSortBy, clearData } = favoritesSlice.actions;
export default favoritesSlice.reducer;
