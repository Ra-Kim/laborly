import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { INewService } from "@/types/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createService = createAsyncThunk(
  "createService",
  async (data: INewService, thunkAPI) => {
    const CREATE_SERVICE = toast.loading("Creating service...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}services`,
        method: "POST",
        data,
      });

      toast.update(CREATE_SERVICE, {
        render: "Service created",
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
        useApiErrorHandler(err, CREATE_SERVICE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, CREATE_SERVICE);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async (data: { id: string; body: INewService }, thunkAPI) => {
    const UPDATE_SERVICE = toast.loading("dELETING service...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}service/${data.id}`,
        method: "PUT",
        data: data.body,
      });

      toast.update(UPDATE_SERVICE, {
        render: "Service updated",
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
        useApiErrorHandler(err, UPDATE_SERVICE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, UPDATE_SERVICE);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const deleteService = createAsyncThunk(
  "deleteService",
  async (data: string, thunkAPI) => {
    const DELETE_SERVICE = toast.loading("Deleting service...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}service/${data}`,
        method: "DELETE",
      });

      toast.update(DELETE_SERVICE, {
        render: "Service deleted",
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
        useApiErrorHandler(err, DELETE_SERVICE);
        return thunkAPI.rejectWithValue(err.message);
      } else {
        const err = {
          status_code: 0,
          message: "network error",
        };
        useApiErrorHandler(err, DELETE_SERVICE);
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const myServices = createAsyncThunk(
  "my-services",
  async (data: string, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${BASE_URL}services/my`,
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

export const searchServices = createAsyncThunk(
  "search-services",
  async (data: { location: string; title: string }, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}services/search?title=${data.title}&location=${data.location}`,
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
