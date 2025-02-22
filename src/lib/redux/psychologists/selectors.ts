import { PsychologistsState } from '@/lib/definitions';
import { RootState } from '@/lib/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectPsychologistsState = (
  state: RootState
): PsychologistsState => state.psychologists;

export const selectPsychologists = createSelector(
  [selectPsychologistsState],
  (psychologistsState: PsychologistsState) => ({
    psychologists: psychologistsState.data,
    loading: psychologistsState.isLoading,
    hasMore: psychologistsState.hasMore,
    lastKey: psychologistsState.lastKey,
    sortBy: psychologistsState.sortBy,
  })
);

export const selectPsychologist = createSelector(
  [selectPsychologistsState],
  (psychologistsState: PsychologistsState) => ({
    psychologist: psychologistsState.psychologist,
    loading: psychologistsState.isLoading,
  })
);
