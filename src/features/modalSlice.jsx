import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //show Modaldetailscreen when thumbnail is clicked
    showModalDetail: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { showModalDetail } = modalSlice.actions;

export const selectModal = (state) => state.modal.modal?.modal;
//console.log("this is modalSlice : ");

export const modalReducer = modalSlice.reducer;
