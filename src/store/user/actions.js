import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid } from "./slice";
import {
  fetchedHoldingsById,
  fetchedBtcInfo,
  fetchedEthInfo,
  fetchedLtcInfo,
  fetchedXrpInfo,
  fetchedAaplInfo,
  fetchedAbnbInfo,
  fetchedAmdInfo,
  fetchedAmznInfo,
} from "./slice";

export const updateAssetHolding = (asset, amount) => {
  return async (dispatch, getState) => {
    try {
      const { profile } = getState().user;

      const response = await axios.patch(
        `${apiUrl}/holdings/update/${profile.id}`,
        {
          asset,
          amount,
        }
      );
      console.log(response);
      // dispatch(assetUpdated(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchHoldingsById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/holdings/${id}`);
      console.log(response.data);
      dispatch(fetchedHoldingsById(response.data.holding));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchBtcInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      );
      console.log(response.data);
      dispatch(fetchedBtcInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchEthInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      );
      console.log(response.data);
      dispatch(fetchedEthInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchLtcInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd`
      );
      console.log(response.data);
      dispatch(fetchedLtcInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchXrpInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`
      );
      console.log(response.data);
      dispatch(fetchedXrpInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAaplInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=AAPL&token=cbtbp8iad3i8shh4rflg`
      );
      console.log(response.data);
      dispatch(fetchedAaplInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAbnbInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=ABNB&token=cbtbp8iad3i8shh4rflg`
      );
      console.log(response.data);
      dispatch(fetchedAbnbInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAmdInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=AMD&token=cbtbp8iad3i8shh4rflg`
      );
      console.log(response.data);
      dispatch(fetchedAmdInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAmznInfo = (asset) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=AMZN&token=cbtbp8iad3i8shh4rflg`
      );
      console.log(response.data);
      dispatch(fetchedAmznInfo(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
