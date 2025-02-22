import { RootState } from '@/lib/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { FavoritesState } from '@/lib/definitions';

export const selectFavoritesState = (state: RootState): FavoritesState =>
  state.favorites;

export const selectFavorites = createSelector(
  [selectFavoritesState],
  (favoritesState: FavoritesState) => ({
    favorites: favoritesState.data,
    loading: favoritesState.isLoading,
    hasMore: favoritesState.hasMore,
    lastKey: favoritesState.lastKey,
    sortBy: favoritesState.sortBy,
  })
);
