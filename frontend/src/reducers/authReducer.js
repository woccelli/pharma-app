import {
  SET_CURRENT_USER,
  GET_USER_NAME
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USER_NAME:
      if(isAuthenticated) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          user: action.payload
        }
      };
    default:
      return state;
  }
}