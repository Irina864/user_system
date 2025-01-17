'use client';
import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    user: usersSlice,
  },

  devTools: true,
});

export default store;
