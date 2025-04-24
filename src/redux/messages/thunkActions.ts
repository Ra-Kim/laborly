import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { IReplyConversation, IStartConversation } from "@/types/messages";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const startConversation = createAsyncThunk("startConversation", async (data: { id: string; body: IStartConversation }, thunkAPI) => {
  const response = await useAxios({
    url: `${BASE_URL}messages/${data.id}`,
    method: "POST",
    data: data.body,
  });

  if (response.error) {
    useApiErrorHandler({ status_code: response.status_code, message: response.error });
    return thunkAPI.rejectWithValue(response.error);
  }

  return response.data;
});

export const replyConversation = createAsyncThunk("replyConversation", async (data: { id: string; body: IReplyConversation }, thunkAPI) => {
  const response = await useAxios({
    url: `${BASE_URL}messages/${data.id}/reply`,
    method: "POST",
    data: data.body,
  });

  if (response.error) {
    useApiErrorHandler({ status_code: response.status_code, message: response.error });
    return thunkAPI.rejectWithValue(response.error);
  }

  return response.data;
});

export const myThreads = createAsyncThunk("my-threads", async (_: string, thunkAPI) => {
  const response = await useAxios({
    url: `${BASE_URL}messages/threads`,
    method: "GET",
  });

  if (response.error) {
    useApiErrorHandler({ status_code: response.status_code, message: response.error });
    return thunkAPI.rejectWithValue(response.error);
  }

  return response.data;
});

export const getSingleThread = createAsyncThunk("get-single-thread", async (data: string, thunkAPI) => {
  const response = await useAxios({
    url: `${BASE_URL}messages/threads/${data}`,
    method: "GET",
  });

  if (response.error) {
    useApiErrorHandler({ status_code: response.status_code, message: response.error });
    return thunkAPI.rejectWithValue(response.error);
  }

  return response.data;
});