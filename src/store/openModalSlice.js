import { createSlice } from '@reduxjs/toolkit';

export const openModalSlice = createSlice({
  name: 'openModal',
  initialState: {
    deleteModal: false,
    saveModal: false,
    serverErrorModal: false,
  },
  reducers: {
    toggleDeleteModal: (state, action) => {
      state.deleteModal = !state.deleteModal;
    },
    toggleSaveModal: (state, action) => {
      state.saveModal = !state.saveModal;
    },
    toggleServerErrorModal: (state, action) => {
      state.serverErrorModal = !state.serverErrorModal;
    },
    openServerErrorModal: (state, action) => {
      state.serverErrorModal = true;
    },
  },
});

export const {
  toggleDeleteModal,
  toggleSaveModal,
  toggleServerErrorModal,
  openServerErrorModal,
} = openModalSlice.actions;

export default openModalSlice.reducer;
