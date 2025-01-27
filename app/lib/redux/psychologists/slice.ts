import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PsychologistsList, Psychologist } from '@/app/lib/definitions';

const initialState: PsychologistsList = {
  data: [],
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    setPsychologists: (state, action: PayloadAction<Psychologist[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setPsychologists } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;
