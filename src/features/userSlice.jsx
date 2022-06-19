import { createSlice } from "@reduxjs/toolkit";

//state to maintain to logout or login a user
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    //login and logout are actions here
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user?.user;

export const userReducer = userSlice.reducer;
