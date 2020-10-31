import axios from "axios";

import {
    GET_ERRORS,
    GET_SHEETS
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

