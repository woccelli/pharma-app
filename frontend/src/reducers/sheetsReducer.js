import { GET_SHEETS } from "../actions/types";

  const initialState = {
    loadedsheets: []
  };

  export default function(state = initialState, action) {
    switch(action.type) {
      case GET_SHEETS:
        return {
            ...state,
            loadedsheets: action.payload
        };
      default:
        return state;
    }
}