import { createSlice } from "@reduxjs/toolkit";

//state to handle when to close or open modal

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: null,
  },

  reducers: {
    //show Modaldetailscreen when thumbnail is clicked
    showModalDetail: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { showModalDetail } = modalSlice.actions;

export const selectModal = (state) => state.modal.modal?.modal;

export const modalReducer = modalSlice.reducer;
