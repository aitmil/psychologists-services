import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Psychologist, PsychologistState } from '@/lib/definitions';

const initialState: PsychologistState = {
  data: [],
  filter: 'A to Z',
  favorites: [],
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
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
});

export const { setPsychologists, setFilter, addFavorite, removeFavorite } =
  psychologistsSlice.actions;
export default psychologistsSlice.reducer;
