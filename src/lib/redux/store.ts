import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/lib/redux/users/slice';
import psychologistsReducer from '@/lib/redux/psychologists/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    psychologists: psychologistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
