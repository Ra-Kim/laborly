import { createSlice } from "@reduxjs/toolkit";
import {
  getWorkerById,
  getWorkerJobDetail,
  getWorkerJobs,
  getWorkerKYC,
  getWorkerProfile,
  getWorkerProfilePicture,
} from "./thunkActions";
import { IWorkerProfile } from "@/types/worker";
import { IJob } from "@/types/jobs";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  workerProfile: IWorkerProfile;
  worker: IWorkerProfile;
  workerProfilePicture: string;
  workerKYCStatus: string;
  jobs: IJob[];
  jobDetail: IJob;
}
const initialState: IState = {
  loading: "idle",
  workerProfile: {} as IWorkerProfile,
  workerProfilePicture: "",
  worker: {} as IWorkerProfile,
  workerKYCStatus: "",
  jobs: [] as IJob[],
  jobDetail: {} as IJob,
};

const WorkerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getWorkerProfile.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerProfile.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        workerProfile: action.payload,
      };
    });
    builder.addCase(getWorkerProfile.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerProfilePicture.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerProfilePicture.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        clientProfilePicture: action.payload,
      };
    });
    builder.addCase(getWorkerProfilePicture.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerById.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerById.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        worker: action.payload,
      };
    });
    builder.addCase(getWorkerById.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerKYC.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerKYC.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        workerKYCStatus: action.payload,
      };
    });
    builder.addCase(getWorkerKYC.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerJobs.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerJobs.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobs: action.payload,
      };
    });
    builder.addCase(getWorkerJobs.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerJobDetail.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerJobDetail.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        jobDetail: action.payload,
      };
    });
    builder.addCase(getWorkerJobDetail.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const WorkerReducer = WorkerSlice.reducer;
