import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ILogin, ISignUp, ISignUpRes } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signUp = createAsyncThunk(
  "signup",
  async (data: ISignUp, thunkAPI) => {
    const CREATE_USER = toast.loading("Creating account, please wait...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}auth/signup`,
        method: "POST",
        data,
      });

      toast.update(CREATE_USER, {
        render: "Successfully Created New Account",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      let res: ISignUpRes = response.data;
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("role", res.user.role);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err, CREATE_USER);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data: ILogin, thunkAPI) => {
    const LOG_IN = toast.loading("Logging in...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}auth/login`,
        method: "POST",
        data,
      });

      toast.update(LOG_IN, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      let res: ISignUpRes = response.data;
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("role", res.user.role);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = error.response.data as {
          status_code: number;
          message: string;
        };
        useApiErrorHandler(err, LOG_IN);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const googleLogin = createAsyncThunk(
  "google-login",
  async (data: string, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${BASE_URL}auth/google/login`,
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
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "logout",
  async (data: string, thunkAPI) => {
    const LOG_OUT = toast.loading("Logging in...");
    try {
      const response = await useAxios({
        url: `${BASE_URL}auth/logout`,
        method: "POST",
        data,
      });

      toast.update(LOG_OUT, {
        render: "Logged out successfully",
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
        useApiErrorHandler(err, LOG_OUT);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);
