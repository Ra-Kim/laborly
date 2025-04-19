import { createSlice } from "@reduxjs/toolkit";
import { getWorkerReviews, getWorkerSummary, myReviews } from "./thunkActions";
import { IReview, IWorkerSummary } from "@/types/reviews";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  reviews: IReview[];
  myReviews: IReview[];
  workerReviewSummary: IWorkerSummary
}
const initialState: IState = {
  loading: "idle",
  reviews: [] as IReview[],
  myReviews: [] as IReview[],
  workerReviewSummary: {} as IWorkerSummary
};

const ReviewSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getWorkerReviews.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerReviews.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        reviews: action.payload,
      };
    });
    builder.addCase(getWorkerReviews.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(myReviews.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(myReviews.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        myReviews: action.payload,
      };
    });
    builder.addCase(myReviews.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getWorkerSummary.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getWorkerSummary.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        workerReviewSummary: action.payload,
      };
    });
    builder.addCase(getWorkerSummary.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const ReviewReducer = ReviewSlice.reducer;
