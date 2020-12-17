import axios from "axios";

import {
  GET_ERRORS,
  SET_SHEETS,
  SET_EMAILSENT
} from "./types";

export const setLoadedSheets = data => {
  return {
    type: SET_SHEETS,
    payload: data
  };
};

// Get DB sheets
export const getSheets = () => dispatch => {
  axios
    .get("/api/sheets/")
    .then(res => {
      // Dispatch returned sheets in store
      dispatch(setLoadedSheets(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Inform on email sending success
export const setEmailSent = data => {
  return {
    type: SET_EMAILSENT,
    payload: data
  };
};

export const sendSheet = (emailData) => dispatch => {
  axios
    .post("/api/sheets/send", emailData)
    .then(res => {
      // Clear errors
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      // dispatch "email sent" indicator to store
      dispatch(setEmailSent(res.data))
      
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      // dispatch "email not sent" indicator to store
      dispatch(setEmailSent({ emailsent: false }))
    }
    );
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};