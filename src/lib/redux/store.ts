import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/lib/redux/users/slice';
import psychologistsReducer from '@/lib/redux/psychologists/slice';
import favoritesReducer from '@/lib/redux/favorites/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    psychologists: psychologistsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
