import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist, PsychologistsState } from '@/lib/definitions';
import { fetchPsychologists } from '@/lib/redux/psychologists/operations';

const initialState: PsychologistsState = {
  data: [],
  sortBy: 'Name (A to Z)',
  lastKey: null,
  hasMore: true,
  isLoading: false,
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
      .addCase(fetchPsychologists.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setSortBy, clearData } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
