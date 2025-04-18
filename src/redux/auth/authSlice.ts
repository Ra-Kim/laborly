import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "./thunkActions";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
}
const initialState: IState = {
  loading: "idle",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
      };
    });
    builder.addCase(signUp.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const AuthReducer = AuthSlice.reducer;
