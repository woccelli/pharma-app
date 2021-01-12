import { SET_SHEETS } from "../actions/types";

  const initialState = {
    sheets: []
  };

  export default function(state = initialState, action) {
    switch(action.type) {
      case SET_SHEETS:
        return {
            ...state,
            sheets: action.payload
        };
      default:
        return state;
    }
}