import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  portfolio: [],
  btcInfo: null,
  ethInfo: null,
  ltcInfo: null,
  xrpInfo: null,
  aaplInfo: null,
  abnbInfo: null,
  amdInfo: null,
  amznInfo: null,
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
    fetchedLtcInfo: (state, action) => {
      state.ltcInfo = action.payload;
    },
    fetchedXrpInfo: (state, action) => {
      state.xrpInfo = action.payload;
    },
    fetchedAaplInfo: (state, action) => {
      state.aaplInfo = action.payload;
    },
    fetchedAbnbInfo: (state, action) => {
      state.abnbInfo = action.payload;
    },
    fetchedAmdInfo: (state, action) => {
      state.amdInfo = action.payload;
    },
    fetchedAmznInfo: (state, action) => {
      state.amznInfo = action.payload;
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
  fetchedLtcInfo,
  fetchedXrpInfo,
  fetchedAaplInfo,
  fetchedAbnbInfo,
  fetchedAmdInfo,
  fetchedAmznInfo,
} = userSlice.actions;

export default userSlice.reducer;
