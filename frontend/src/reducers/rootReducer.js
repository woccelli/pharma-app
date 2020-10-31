import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import sheetsReducer from "./sheetsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sheets: sheetsReducer
});