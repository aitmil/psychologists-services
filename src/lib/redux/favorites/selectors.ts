import { RootState } from '@/lib/redux/store';

export const selectFavorites = (state: RootState) => state.favorites.data;

export const selectLastKey = (state: RootState) => state.favorites.lastKey;

export const selectSortBy = (state: RootState) => state.favorites.sortBy;

export const selectIsLoading = (state: RootState) => state.favorites.isLoading;

export const selectHasMore = (state: RootState) => state.favorites.hasMore;
