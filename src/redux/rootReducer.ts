import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/authSlice";

export const rootReducer = combineReducers({
  auth: AuthReducer,
});
