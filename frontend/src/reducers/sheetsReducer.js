import { GET_SHEETS, SET_EMAILSENT } from "../actions/types";

  const initialState = {
    loadedsheets: [],
    emailsent: false
  };

  export default function(state = initialState, action) {
    switch(action.type) {
      case GET_SHEETS:
        return {
            ...state,
            loadedsheets: action.payload
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