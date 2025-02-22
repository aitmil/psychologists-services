import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist, PsychologistsState } from '@/lib/definitions';
import {
  fetchPsychologist,
  fetchPsychologists,
} from '@/lib/redux/psychologists/operations';

const initialState: PsychologistsState = {
  data: [],
  psychologist: null,
  sortBy: 'Name (A to Z)',
  lastKey: null,
  hasMore: true,
  isLoading: false,
  error: null,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
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
      .addCase(fetchPsychologists.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPsychologists.fulfilled,
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
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch psychologists';
      })
      .addCase(fetchPsychologist.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPsychologist.fulfilled,
        (state, action: PayloadAction<Psychologist | null>) => {
          state.psychologist = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchPsychologist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch psychologist';
      });
  },
});

export const { setSortBy, clearData } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
