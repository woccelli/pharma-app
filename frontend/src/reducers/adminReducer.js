import {
  SET_USERS,
  SET_ADDED_USER,
  GET_USER_LOGS,
  CLEAR_USER_LOGS
} from "../actions/types";

const initialState = {
  users: [],
  added_user: false,
  logs: []
};

export default function (state = initialState, action) {
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
    case GET_USER_LOGS:
      const index = state.logs.findIndex(log => log.userId === action.payload.userId)
      if (index === -1) {
        return {
          ...state,
          logs: [...state.logs, action.payload]
        }
      } else {
        return state
      };
    case CLEAR_USER_LOGS:
      return {
        ...state,
        logs: []
      };
    default:
      return state;
  }
}