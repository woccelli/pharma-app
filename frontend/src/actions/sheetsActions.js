import axios from "axios";

import {
  GET_ERRORS,
  GET_SHEETS,
  SET_EMAILSENT
} from "./types";

// Set logged in user
export const setLoadedSheets = data => {
  return {
    type: GET_SHEETS,
    payload: data
  };
};

// Get DB sheets
export const getSheets = () => dispatch => {
  axios
    .get("/api/sheets/")
    .then(res => {
      dispatch(setLoadedSheets(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addSheet = (sheetData, history) => dispatch => {
  axios
    .post("/api/sheets/add", sheetData)
    .then(res => history.push("/dashboard")) // re-direct to dashboard on success
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// inform on email sending success
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      dispatch(setEmailSent(res.data))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
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