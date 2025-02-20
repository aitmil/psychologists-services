import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@/lib/firebase/services/psychologists';
import { PsychologistsState } from '@/lib/definitions';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async (_, { getState }) => {
    const state = getState() as { psychologists: PsychologistsState };
    const { sortBy, lastKey } = state.psychologists;

    const response = await fetchData('psychologists', sortBy, lastKey, 3);
    return response;
  }
);
