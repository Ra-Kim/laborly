import { createSlice } from "@reduxjs/toolkit";
import { myServices, searchServices } from "./thunkActions";
import { IService } from "@/types/service";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  myServices: IService[];
  searchedServices: IService[];
}
const initialState: IState = {
  loading: "idle",
  myServices: [] as IService[],
  searchedServices: [] as IService[],
};

const ServiceSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(myServices.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(myServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        myServices: action.payload,
      };
    });
    builder.addCase(myServices.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(searchServices.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(searchServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        searchedServices: action.payload,
      };
    });
    builder.addCase(searchServices.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const ServiceReducer = ServiceSlice.reducer;
