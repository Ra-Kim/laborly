import { createSlice } from "@reduxjs/toolkit";
import { getMyServices, getServiceById, searchServices } from "./thunkActions";
import { IService } from "@/types/service";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  myServices: IService[];
  service: IService;
  searchedServices: IService[];
}
const initialState: IState = {
  loading: "idle",
  myServices: [] as IService[],
  service: {} as IService,
  searchedServices: [] as IService[],
};

const ServiceSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMyServices.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getMyServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        myServices: action.payload,
      };
    });
    builder.addCase(getMyServices.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getServiceById.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getServiceById.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        service: action.payload,
      };
    });
    builder.addCase(getServiceById.rejected, (state) => {
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
