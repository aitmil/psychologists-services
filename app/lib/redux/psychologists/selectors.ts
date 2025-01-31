import { RootState } from '../store';

export const selectPsychologists = (state: RootState) =>
  state.psychologists.data;

export const selectCurrentFilter = (state: RootState) =>
  state.psychologists.filter;
