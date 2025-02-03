import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/lib/definitions';

const initialState: User = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ name: string; email: string } | null>
    ) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
