import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ICreateJob } from "@/types/jobs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createJob = createAsyncThunk(
  "createJob",
  async (data: ICreateJob, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs/create`,
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

export const acceptJob = createAsyncThunk(
  "acceptJob",
  async (data: any, thunkAPI) => {
    const ACCEPT_JOB = toast.loading("Accepting...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs/data`,
        method: "POST",
        data,
      });

      toast.update(ACCEPT_JOB, {
        render: "Accepted",
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
        useApiErrorHandler(err, ACCEPT_JOB);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, ACCEPT_JOB);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const completeJob = createAsyncThunk(
  "completeJob",
  async (data: string, thunkAPI) => {
    const MARK_AS_COMPLETE = toast.loading("Marking job complete...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs/${data}/complete`,
        method: "PUT",
      });

      toast.update(MARK_AS_COMPLETE, {
        render: "Marked as complete",
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
        useApiErrorHandler(err, MARK_AS_COMPLETE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, MARK_AS_COMPLETE);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const cancelJob = createAsyncThunk(
  "cancelJob",
  async (data: string, thunkAPI) => {
    const CANCEL_JOB = toast.loading("Cancelling job...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs/${data}/cancel`,
        method: "PUT",
      });

      toast.update(CANCEL_JOB, {
        render: "Cancelling job",
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
        useApiErrorHandler(err, CANCEL_JOB);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, CANCEL_JOB);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getJobs = createAsyncThunk(
  "get-jobs",
  async (data: string, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs`,
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

export const getJobDetail = createAsyncThunk(
  "get-job-detail",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}jobs/${data}`,
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
