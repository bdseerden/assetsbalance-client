export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user.profile;

export const selectHoldings = (state) => state.user.portfolio;

export const selectBtcInfo = (state) => state.user.btcInfo;

export const selectEthInfo = (state) => state.user.ethInfo;
