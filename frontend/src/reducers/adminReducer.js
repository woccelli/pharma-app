import {
    SET_USERS,
    SET_ADDED_USER
  } from "../actions/types";

  const initialState = {
    users: [],
    added_user: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_USERS:
        return {
          ...state,
          users: action.payload
        };
      case SET_ADDED_USER:
        return {
          ...state,
          added_user: action.payload
        };
      default:
        return state;
    }
  }