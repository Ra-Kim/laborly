import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getClientProfile = createAsyncThunk(
  "get-client-profile",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/get/profile`,
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

export const patchClientProfile = createAsyncThunk(
  "patch-client-profile",
  async (data: any, thunkAPI) => {
    const UPDATE_CLIENT_PROFILE = toast.loading("Updating profile...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/update/profile`,
        method: "PATCH",
        data,
      });

      toast.update(UPDATE_CLIENT_PROFILE, {
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
        useApiErrorHandler(err, UPDATE_CLIENT_PROFILE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, UPDATE_CLIENT_PROFILE);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getFavoriteWorkers = createAsyncThunk(
  "get-favorite-workers",
  async (data: string, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/get/favorites`,
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

export const addFavoriteWorker = createAsyncThunk(
  "addFavoriteWorker",
  async (data: any, thunkAPI) => {
    const ADD_FAVORITE_WORKER = toast.loading("Adding favorite...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/add/favorites${data}`,
        method: "POST",
      });

      toast.update(ADD_FAVORITE_WORKER, {
        render: "Added to favorites",
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
        useApiErrorHandler(err, ADD_FAVORITE_WORKER);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, ADD_FAVORITE_WORKER);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const deleteFavoriteWorker = createAsyncThunk(
  "deleteFavoriteWorker",
  async (data: any, thunkAPI) => {
    const DELETE_FAVORITE_WORKER = toast.loading("Removing from favorite...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/delete/favorites${data}`,
        method: "DELETE",
      });

      toast.update(DELETE_FAVORITE_WORKER, {
        render: "Removed from favorites",
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
        useApiErrorHandler(err, DELETE_FAVORITE_WORKER);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, DELETE_FAVORITE_WORKER);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getClientJobs = createAsyncThunk(
  "get-client-jobs",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/list/jobs`,
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

export const getClientJobDetail = createAsyncThunk(
  "get-client-job-detail",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}client/list/jobs/${data}`,
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