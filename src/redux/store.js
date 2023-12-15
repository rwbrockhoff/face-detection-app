import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import imageSlice from './slices/imageSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    image: imageSlice,
  },
});
