import { createSlice } from "@reduxjs/toolkit";
import { getUserProfilePicture } from "./thunkActions";

export interface IState {
  profilePicture: string;
}
const initialState: IState = {
  profilePicture: "",
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserProfilePicture.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getUserProfilePicture.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        profilePicture: action.payload,
      };
    });
    builder.addCase(getUserProfilePicture.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const AdminReducer = AdminSlice.reducer;
