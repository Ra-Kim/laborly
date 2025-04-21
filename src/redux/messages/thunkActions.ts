import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { IReplyConversation, IStartConversation } from "@/types/messages";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const startConversation = createAsyncThunk(
  "startConversation",
  async (data: { id: string; body: IStartConversation }, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}messages/${data.id}`,
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

export const replyConversation = createAsyncThunk(
  "replyConversation",
  async (data: { id: string; body: IReplyConversation }, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}messages/${data.id}/reply`,
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

export const myThreads = createAsyncThunk(
    "my-threads",
    async (data: string, thunkAPI) => {
      console.log(data);
      try {
        const response = await useAxios({
          url: `${BASE_URL}messages/threads`,
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

  export const getSingleThread = createAsyncThunk(
    "get-single-thread",
    async (data: string, thunkAPI) => {
      try {
        const response = await useAxios({
          url: `${BASE_URL}messages/threads/${data}`,
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