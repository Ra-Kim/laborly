import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { INewService } from "@/types/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createService = createAsyncThunk(
  "createService",
  async (data: INewService, thunkAPI) => {
    const toastId = toast.loading("Creating service...");
    const response = await useAxios({
      url: `${BASE_URL}services`,
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
      render: "Service created",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async (data: { id: string; body: INewService }, thunkAPI) => {
    const toastId = toast.loading("Updating service...");
    const response = await useAxios({
      url: `${BASE_URL}services/${data.id}`,
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
      render: "Service updated",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const deleteService = createAsyncThunk(
  "deleteService",
  async (data: string, thunkAPI) => {
    const toastId = toast.loading("Deleting service...");
    const response = await useAxios({
      url: `${BASE_URL}services/${data}`,
      method: "DELETE",
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Service deleted",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const getMyServices = createAsyncThunk(
  "my-services",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}services/my`,
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

export const searchServices = createAsyncThunk(
  "search-services",
  async (data: { location: string; title: string }, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}services/search?title=${data.title}&location=${data.location}`,
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
