import { createSlice } from "@reduxjs/toolkit";
import {
  getClientProfile,
  getFavoriteWorkers,
  getJobDetail,
  getJobs,
} from "./thunkActions";
import { IClientProfile, IFavoriteWorker, IJob } from "@/types/client";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  clientProfile: IClientProfile;
  favoriteWorkers: IFavoriteWorker[];
  jobs: IJob[];
  jobDetail: IJob;
}
const initialState: IState = {
  loading: "idle",
  clientProfile: {} as IClientProfile,
  favoriteWorkers: [] as IFavoriteWorker[],
  jobs: [] as IJob[],
  jobDetail: {} as IJob,
};

const ClientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClientProfile.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getClientProfile.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        clientProfile: action.payload,
      };
    });
    builder.addCase(getClientProfile.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getFavoriteWorkers.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getFavoriteWorkers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        favoriteWorkers: action.payload,
      };
    });
    builder.addCase(getFavoriteWorkers.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getJobs.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobs: action.payload,
      };
    });
    builder.addCase(getJobs.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getJobDetail.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getJobDetail.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobDetail: action.payload,
      };
    });
    builder.addCase(getJobDetail.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const ClientReducer = ClientSlice.reducer;
