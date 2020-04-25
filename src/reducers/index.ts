import { combineReducers } from "redux";
import searchResultReducer from "./counter";
import userReducer from "./userReducer";

export default combineReducers({
  searchResultReducer,
  userReducer
});
