import { combineReducers } from "redux";
import authenticateReducer from "./authenticateReducer.js";

export default combineReducers({
  auth: authenticateReducer,
});