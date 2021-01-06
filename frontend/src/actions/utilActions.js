
import {
    GET_ERRORS,
    GET_SUCCESS
  } from "./types";

export const clearErrors = () => {
    return {
      type: GET_ERRORS,
      payload: {}
    };
  };

  export const clearSuccess = () => {
    return {
        type: GET_SUCCESS,
        payload: {}
      };
  }