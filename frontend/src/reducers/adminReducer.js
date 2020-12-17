import {
    SET_USERS
  } from "../actions/types";

  const initialState = {
    users: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_USERS:
        return {
          ...state,
          users: action.payload
        };
      default:
        return state;
    }
  }