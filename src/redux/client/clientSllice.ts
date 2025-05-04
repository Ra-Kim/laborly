import { createSlice } from "@reduxjs/toolkit";
import {
  getClientProfile,
  getFavoriteWorkers,
  getClientJobDetail,
  getClientJobs,
  getClientById,
  getClientProfilePicture,
} from "./thunkActions";
import { IClientProfile, IFavoriteWorker } from "@/types/client";
import { IJob } from "@/types/jobs";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  clientProfile: IClientProfile;
  clientProfilePicture: string;
  client: IClientProfile;
  favoriteWorkers: IFavoriteWorker[];
  jobs: IJob[];
  jobDetail: IJob;
}
const initialState: IState = {
  loading: "idle",
  clientProfile: {} as IClientProfile,
  clientProfilePicture: "",
  client: {} as IClientProfile,
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
    builder.addCase(getClientProfilePicture.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getClientProfilePicture.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        clientProfilePicture: action.payload,
      };
    });
    builder.addCase(getClientProfilePicture.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getClientById.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getClientById.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        client: action.payload,
      };
    });
    builder.addCase(getClientById.rejected, (state) => {
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
    builder.addCase(getClientJobs.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getClientJobs.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobs: action.payload,
      };
    });
    builder.addCase(getClientJobs.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getClientJobDetail.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getClientJobDetail.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobDetail: action.payload,
      };
    });
    builder.addCase(getClientJobDetail.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const ClientReducer = ClientSlice.reducer;
