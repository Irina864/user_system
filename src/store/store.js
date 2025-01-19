'use client';
import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
import openModalSlice from './openModalSlice';

export const store = configureStore({
  reducer: {
    user: usersSlice,
    openModal: openModalSlice,
  },

  devTools: true,
});

export default store;
