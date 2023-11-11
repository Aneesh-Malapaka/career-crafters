import { combineReducers } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";

const cardReducer = combineReducers({
  courses: courseSlice,
  search: searchSlice,
  user: userSlice,
});

export default cardReducer;
