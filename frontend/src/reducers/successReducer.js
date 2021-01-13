import { GET_SUCCESS, IS_LOADING } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case IS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}