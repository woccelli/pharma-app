import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import sheetsReducer from "./sheetsReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sheets: sheetsReducer,
  admin: adminReducer
});