import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { clearErrors } from "./utilActions"

import {
  GET_ERRORS,
  GET_SUCCESS,
  SET_CURRENT_USER,
  GET_USER_NAME
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login")
      dispatch(clearErrors())
      dispatch({
        type: GET_SUCCESS,
        payload: { registeredUser: true }
      })
    }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Get auth token and set current user
export const updateAuthToken = data => dispatch => {
  // Save to localStorage
  // Set token to localStorage
  const { token } = data;
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  dispatch(clearErrors())
  dispatch(setCurrentUser(decoded));
}

// Login - get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      dispatch(updateAuthToken(res.data))
      history.push('/dashboard')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Check if jwt token still corresponds to DB - get user token
// Necessary since Admin can manually set the subscription date
export const checkUserToken = () => dispatch => {
  axios
    .get("/api/users/check-token-validity")
    .then(res => {
      if (res.data !== "OK") {
        dispatch(updateAuthToken(res.data))
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Send an email with forgotten password link
export const forgottenPwd = (userData, history) => dispatch => {
  axios
    .post("/api/users/forgot-password", userData)
    .then(res => {
      dispatch(clearErrors())
      dispatch({
        type: GET_SUCCESS,
        payload: { pwdEmailSent: true }
      })
      history.push("/login")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Send an email with forgotten password link
export const resetPwd = (data, history) => dispatch => {
  axios
    .post("/api/users/password-reset", data.passwords, {
      params: {
        userId: data.userId,
        token: data.token
      }
    })
    .then(res => {
      dispatch(clearErrors())
      dispatch({
        type: GET_SUCCESS,
        payload: { resetPwd: true }
      })
      history.push("/login")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getUserName = userId => dispatch => {
  axios
  .get("/api/users/user", { params: { userId: userId } })
  .then(res => {
    dispatch({
      type: GET_USER_NAME,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}