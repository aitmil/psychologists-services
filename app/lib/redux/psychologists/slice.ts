import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist, PsychologistState } from '@/app/lib/definitions';

const initialState: PsychologistState = {
  data: [],
  filter: 'A to Z',
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    setPsychologists(state, action: PayloadAction<Psychologist[]>) {
      state.data = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { setPsychologists, setFilter } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
