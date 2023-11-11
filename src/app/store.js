import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../reducers/cardReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: cardReducer,
  middleware: [thunk],
});

export default store;
