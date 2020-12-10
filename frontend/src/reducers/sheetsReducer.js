import { GET_SHEETS, SET_EMAILSENT } from "../actions/types";

  const initialState = {
    sheets: [],
    emailsent: false
  };

  export default function(state = initialState, action) {
    switch(action.type) {
      case GET_SHEETS:
        return {
            ...state,
            sheets: action.payload
        };
      case SET_EMAILSENT:
        return {
          ...state,
          emailsent: action.payload.emailsent
        }
      default:
        return state;
    }
}