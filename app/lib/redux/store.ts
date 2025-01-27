import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/slice';
import psychologistsReducer from './psychologists/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    psychologists: psychologistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
