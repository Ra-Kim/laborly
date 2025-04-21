import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ISubmitReview } from "@/types/reviews";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const submitReview = createAsyncThunk(
  "submitReview",
  async (data: { id: string; body: ISubmitReview }, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}reviews/${data.id}`,
        method: "POST",
        data: data.body,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getWorkerReviews = createAsyncThunk(
  "get-worker-reviews",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}reviews/worker/${data}`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const myReviews = createAsyncThunk(
  "my-reviews",
  async (data: string, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${BASE_URL}reviews/my`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getWorkerSummary = createAsyncThunk(
  "get-worker-summary",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}reviews/summary/${data}`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);
