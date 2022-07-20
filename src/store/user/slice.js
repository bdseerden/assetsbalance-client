import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  portfolio: [],
  btcInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    fetchedHoldingsById: (state, action) => {
      state.portfolio = action.payload;
    },
    fetchedBtcInfo: (state, action) => {
      state.btcInfo = action.payload;
    },
    fetchedEthInfo: (state, action) => {
      state.ethInfo = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  fetchedHoldingsById,
  fetchedBtcInfo,
  fetchedEthInfo,
} = userSlice.actions;

export default userSlice.reducer;
