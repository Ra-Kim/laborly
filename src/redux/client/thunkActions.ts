import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getClientProfile = createAsyncThunk(
  "get-client-profile",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/profile`,
      method: "GET",
      data,
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

export const getClientById = createAsyncThunk(
  "get-client",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/${data}/public`,
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

export const patchClientProfile = createAsyncThunk(
  "patch-client-profile",
  async (data: any, thunkAPI) => {
    const UPDATE_CLIENT_PROFILE = toast.loading("Updating profile...");
    const response = await useAxios({
      url: `${BASE_URL}client/update/profile`,
      method: "PATCH",
      data,
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      }, UPDATE_CLIENT_PROFILE);
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(UPDATE_CLIENT_PROFILE, {
      render: "Successfully updated profile",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const getFavoriteWorkers = createAsyncThunk(
  "get-favorite-workers",
  async (_, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/get/favorites`,
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

export const addFavoriteWorker = createAsyncThunk(
  "addFavoriteWorker",
  async (data: any, thunkAPI) => {
    const ADD_FAVORITE_WORKER = toast.loading("Adding favorite...");
    const response = await useAxios({
      url: `${BASE_URL}client/add/favorites${data}`,
      method: "POST",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      }, ADD_FAVORITE_WORKER);
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(ADD_FAVORITE_WORKER, {
      render: "Added to favorites",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const deleteFavoriteWorker = createAsyncThunk(
  "deleteFavoriteWorker",
  async (data: any, thunkAPI) => {
    const DELETE_FAVORITE_WORKER = toast.loading("Removing from favorite...");
    const response = await useAxios({
      url: `${BASE_URL}client/delete/favorites${data}`,
      method: "DELETE",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      }, DELETE_FAVORITE_WORKER);
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(DELETE_FAVORITE_WORKER, {
      render: "Removed from favorites",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const getClientJobs = createAsyncThunk(
  "get-client-jobs",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/list/jobs`,
      method: "GET",
      data,
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

export const getClientJobDetail = createAsyncThunk(
  "get-client-job-detail",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/list/jobs/${data}`,
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
;