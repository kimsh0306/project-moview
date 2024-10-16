import { combineReducers } from "redux";
import authenticateReducer from "./authenticateReducer.js";
import myMoviesReducer from "./myMoviesReducer.js";

export default combineReducers({
  auth: authenticateReducer,
  myMovies: myMoviesReducer,
});