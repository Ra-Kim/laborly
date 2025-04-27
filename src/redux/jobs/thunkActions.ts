import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ICreateJob } from "@/types/jobs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createJob = createAsyncThunk(
  "createJob",
  async (data: ICreateJob, thunkAPI) => {
    const toastId = toast.loading("Creating job...");
    const response = await useAxios({
      url: `${BASE_URL}jobs/create`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Job created",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const acceptJob = createAsyncThunk(
  "acceptJob",
  async (
    data: {
      job_id: string;
      worker_id: string;
    },
    thunkAPI
  ) => {
    const toastId = toast.loading("Accepting...");
    const response = await useAxios({
      url: `${BASE_URL}jobs/accept`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Accepted",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const completeJob = createAsyncThunk(
  "completeJob",
  async (data: string, thunkAPI) => {
    const toastId = toast.loading("Marking job complete...");
    const response = await useAxios({
      url: `${BASE_URL}jobs/${data}/complete`,
      method: "PUT",
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Marked as complete",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const cancelJob = createAsyncThunk(
  "cancelJob",
  async (data: { id: string; body: { cancel_reason: string } }, thunkAPI) => {
    const toastId = toast.loading("Cancelling job...");
    const response = await useAxios({
      url: `${BASE_URL}jobs/${data.id}/cancel`,
      method: "PUT",
      data: data.body,
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Cancelling job",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const getJobs = createAsyncThunk(
  "get-jobs",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}jobs`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data.items;
  }
);

export const getJobDetail = createAsyncThunk(
  "get-job-detail",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}jobs/${data}`,
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
