import axios from "axios";

import {
  GET_ERRORS,
  SET_SHEETS,
  GET_SUCCESS
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

export const sendSheet = (emailData, history) => dispatch => {
  axios
    .post("/api/sheets/send", emailData)
    .then(res => {
      // Clear errors
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      // dispatch "email sent" indicator to store
      dispatch({
        type: GET_SUCCESS,
        payload: { sheetEmailSent: true }
      })
      history.push("/dashboard")
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};
