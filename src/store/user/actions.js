import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid } from "./slice";
import { fetchedHoldingsById, fetchedBtcInfo, fetchedEthInfo } from "./slice";

// export const updateHoldingsInServer = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       // dispatch(appLoading());
//       const response = await axios.patch(`${apiUrl}/holdings/${id}`);
//       console.log(response);

//       dispatch(incrementHeartsInState());
//       // dispatch(appDoneLoading());
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };

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
        `https://ftx.com/api/markets/${asset}/USD`
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
        `https://ftx.com/api/markets/${asset}/USD`
      );
      console.log(response.data);
      dispatch(fetchedEthInfo(response.data));
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
