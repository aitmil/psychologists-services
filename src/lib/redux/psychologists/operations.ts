import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchData,
  fetchPsychologistById,
} from '@/lib/firebase/services/psychologists';
import {
  FetchDataResponse,
  Psychologist,
  PsychologistsState,
} from '@/lib/definitions';

export const fetchPsychologists = createAsyncThunk<
  FetchDataResponse,
  void,
  { state: { psychologists: PsychologistsState } }
>(
  'psychologists/fetchPsychologists',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { psychologists: PsychologistsState };
      const { sortBy, lastKey } = state.psychologists;

      const response = await fetchData('psychologists', sortBy, lastKey, 3);
      return response;
    } catch (error) {
      console.error('Error fetching psychologists:', error);
      return rejectWithValue('Failed to fetch psychologists');
    }
  }
);

export const fetchPsychologist = createAsyncThunk<Psychologist | null, string>(
  'psychologists/fetchPsychologistById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchPsychologistById(id);
      return response;
    } catch (error) {
      console.error('Error fetching psychologist:', error);
      return rejectWithValue('Failed to fetch psychologist');
    }
  }
);
