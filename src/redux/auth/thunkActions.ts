import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { ILogin, ISignUp, ISignUpRes } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signUp = createAsyncThunk(
  "signup",
  async (data: ISignUp, thunkAPI) => {
    const CREATE_USER = toast.loading("Creating account, please wait...");
    const response = await useAxios({
      url: `${BASE_URL}auth/signup`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        CREATE_USER
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(CREATE_USER, {
      render: response.data.detail || "Account created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 5000,
    });

    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  "verifyEmail",
  async (data: string, thunkAPI) => {
    const CREATE_USER = toast.loading("Creating account, please wait...");
    const response = await useAxios({
      url: `${BASE_URL}auth/verify-email?token=${data}`,
      method: "POST",
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        CREATE_USER
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(CREATE_USER, {
      render: response.data.detail || "Account created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const resendEmail = createAsyncThunk(
  "resendEmail",
  async (data: string, thunkAPI) => {
    const CREATE_USER = toast.loading("Resending email, please wait...");
    const response = await useAxios({
      url: `${BASE_URL}auth/request-verification-email?email=${data}`,
      method: "POST",
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        CREATE_USER
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(CREATE_USER, {
      render: response.data.detail || "Account created successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const login = createAsyncThunk(
  "login",
  async (data: ILogin, thunkAPI) => {
    const LOG_IN = toast.loading("Logging in...");

    const response = await useAxios({
      url: `${BASE_URL}auth/login/json`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        LOG_IN
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    const res: ISignUpRes = response.data;
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("role", res.user.role);
    localStorage.setItem("user", JSON.stringify(res.user));

    toast.update(LOG_IN, {
      render: "Login successful!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const exchangeCode = createAsyncThunk(
  "exchange-code",
  async (data: { code: string; state: string }, thunkAPI) => {
    const LOG_IN = toast.loading("Logging in...");

    const response = await useAxios({
      url: `${BASE_URL}auth/google/exchange-code`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        LOG_IN
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    const res: ISignUpRes = response.data;
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("role", res.user.role);
    localStorage.setItem("user", JSON.stringify(res.user));

    toast.update(LOG_IN, {
      render: "Login successful!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const googleLogin = createAsyncThunk(
  "google-login",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}auth/google/login`,
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

export const googleCallback = createAsyncThunk(
  "google-callback",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}auth/google/callback`,
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

export const logOut = createAsyncThunk(
  "logout",
  async (data: string, thunkAPI) => {
    const LOG_OUT = toast.loading("Logging out...");

    const response = await useAxios({
      url: `${BASE_URL}auth/logout`,
      method: "POST",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        LOG_OUT
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(LOG_OUT, {
      render: "Logged out successfully",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);
