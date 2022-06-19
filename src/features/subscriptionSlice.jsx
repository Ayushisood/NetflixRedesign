import { createSlice } from "@reduxjs/toolkit";

// state to handle whether user is subscribed to a plan or not
export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: null,
  },

  reducers: {
    showSubscriptionDetail: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { showSubscriptionDetail } = subscriptionSlice.actions;

export const selectSubscription = (state) =>
  state.subscription.subscription?.subscription;

export const subscriptionReducer = subscriptionSlice.reducer;
