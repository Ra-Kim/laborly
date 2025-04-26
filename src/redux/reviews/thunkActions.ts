import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ISubmitReview } from "@/types/reviews";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const submitReview = createAsyncThunk(
  "submitReview",
  async (data: { id: string; body: ISubmitReview }, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}reviews/${data.id}`,
      method: "POST",
      data: data.body,
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const getWorkerReviews = createAsyncThunk(
  "get-worker-reviews",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}reviews/worker/${data}/public`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const myReviews = createAsyncThunk(
  "my-reviews",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}reviews/my`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const getWorkerSummary = createAsyncThunk(
  "get-worker-summary",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}reviews/summary/${data}`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);
