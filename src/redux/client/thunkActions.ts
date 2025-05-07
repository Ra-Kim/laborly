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

export const getClientProfilePicture = createAsyncThunk(
  "get-client-profile-picture",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/profile/picture-url`,
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

    return response.data.url;
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
      url: `${BASE_URL}client/profile`,
      method: "PATCH",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        UPDATE_CLIENT_PROFILE
      );
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

export const patchClientProfilePic = createAsyncThunk(
  "patch-client-profile-pic",
  async (data: FormData, thunkAPI) => {
    const UPDATE_CLIENT_PROFILE = toast.loading("Updating profile picture...");
    const response = await useAxios({
      url: `${BASE_URL}client/profile/picture`,
      method: "PATCH",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        UPDATE_CLIENT_PROFILE
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(UPDATE_CLIENT_PROFILE, {
      render: "Successfully updated",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const getFavoriteWorkers = createAsyncThunk(
  "get-favorite-workers",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/favorites`,
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

export const addFavoriteWorker = createAsyncThunk(
  "addFavoriteWorker",
  async (data: string, thunkAPI) => {
    const ADD_FAVORITE_WORKER = toast.loading("Adding favorite...");
    const response = await useAxios({
      url: `${BASE_URL}client/favorites/${data}`,
      method: "POST",
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        ADD_FAVORITE_WORKER
      );
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
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/favorites/${data}`,
      method: "DELETE",
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

export const getClientJobs = createAsyncThunk(
  "get-client-jobs",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}client/jobs`,
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

    return response.data.items;
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
