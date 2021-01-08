import {
  SET_USERS,
  SET_ADDED_USER,
  GET_USER_LOGS,
  CLEAR_USER_LOGS,
  GET_SHEET_LOGS,
  CLEAR_SHEET_LOGS
} from "../actions/types";

const initialState = {
  users: [],
  added_user: false,
  userLogs: [],
  sheetLogs: []
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
      var index = state.userLogs.findIndex(log => log.userId === action.payload.userId)
      if (index === -1) {
        return {
          ...state,
          userLogs: [...state.userLogs, action.payload]
        }
      } else {
        return state
      };
    case CLEAR_USER_LOGS:
      return {
        ...state,
        userLogs: []
      };
      case GET_SHEET_LOGS:
      var index = state.sheetLogs.findIndex(log => log.sheetId === action.payload.sheetId)
      if (index === -1) {
        return {
          ...state,
          sheetLogs: [...state.sheetLogs, action.payload]
        }
      } else {
        return state
      };
    case CLEAR_SHEET_LOGS:
      return {
        ...state,
        sheetLogs: []
      };
    default:
      return state;
  }
}