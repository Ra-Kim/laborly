import { createSlice } from "@reduxjs/toolkit";
import { getJobDetail, getJobs } from "./thunkActions";
import { IJob } from "@/types/jobs";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  jobs: IJob[];
  jobDetail: IJob;
}
const initialState: IState = {
  loading: "idle",
  jobs: [] as IJob[],
  jobDetail: {} as IJob,
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {
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

export const JobReducer = JobSlice.reducer;
