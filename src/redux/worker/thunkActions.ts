import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWorkerProfile = createAsyncThunk(
  "get-worker-profile",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}worker/get/profile`,
        method: "GET",
        data,
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
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const patchWorkerProfile = createAsyncThunk(
  "patch-worker-profile",
  async (data: any, thunkAPI) => {
    const UPDATE_WORKER_PROFILE = toast.loading("Updating profile...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}worker/update/profile`,
        method: "PATCH",
        data,
      });

      toast.update(UPDATE_WORKER_PROFILE, {
        render: "Successfully updated profile",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err, UPDATE_WORKER_PROFILE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getWorkerKYC = createAsyncThunk(
  "get-worker-kyc",
  async (data: string, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${BASE_URL}worker/kyc`,
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
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const submitKYC = createAsyncThunk(
  "submitKYC",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}worker/kyc`,
        method: "POST",
        data,
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
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getWorkerJobs = createAsyncThunk(
  "get-worker-jobs",
  async (data: string, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${BASE_URL}worker/jobs`,
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
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getWorkerJobDetail = createAsyncThunk(
    "get-worker-job-detail",
    async (data: string, thunkAPI) => {
      try {
        const response = await useAxios({
          url: `${BASE_URL}worker/jobs/${data}`,
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
          return thunkAPI.rejectWithValue(String(error));
        }
      }
    }
  );