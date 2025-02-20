import { RootState } from '@/lib/redux/store';

export const selectPsychologists = (state: RootState) =>
  state.psychologists.data;

export const selectFavorites = (state: RootState) =>
  state.psychologists.favorites;

export const selectIsLoading = (state: RootState) =>
  state.psychologists.isLoading;

export const selectHasMore = (state: RootState) => state.psychologists.hasMore;

export const selectLastKey = (state: RootState) => state.psychologists.lastKey;

export const selectSortBy = (state: RootState) => state.psychologists.sortBy;
