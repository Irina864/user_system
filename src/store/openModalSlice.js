import { createSlice } from '@reduxjs/toolkit';

export const openModalSlice = createSlice({
  name: 'openModal',
  initialState: {
    deleteModal: false,
    saveModal: false,
    serverErrorModal: true,
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
  },
});

export const { toggleDeleteModal, toggleSaveModal, toggleServerErrorModal } =
  openModalSlice.actions;

export default openModalSlice.reducer;
