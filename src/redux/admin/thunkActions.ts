import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const getUserProfilePicture = createAsyncThunk(
  "get-user-profile-picture",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}admin/profile/picture-url?user_id=${data}`,
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







