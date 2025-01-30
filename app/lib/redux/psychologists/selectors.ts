import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPsychologists = (state: RootState) =>
  state.psychologists.data;

export const selectFilter = (state: RootState) => state.psychologists.filter;

export const selectFilteredPsychologists = createSelector(
  [selectPsychologists, selectFilter],
  (data, filter) => {
    switch (filter) {
      case 'A to Z':
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case 'Z to A':
        return [...data].sort((a, b) => b.name.localeCompare(a.name));
      case 'Less than $10':
        return data.filter(p => p.price_per_hour < 10);
      case 'Greater than $10':
        return data.filter(p => p.price_per_hour > 10);
      case 'Popular':
        return data.filter(p => p.rating >= 4.8);
      case 'Not popular':
        return data.filter(p => p.rating < 4.8);
      case 'Show all':
      default:
        return data;
    }
  }
);
