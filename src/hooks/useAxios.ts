import axios, { AxiosRequestConfig } from "axios";

export const useAxios = async (
  request: AxiosRequestConfig
): Promise<AxiosApiResponse> => {
  try {
    const response = await axios.request({
      ...request,
      withCredentials: true,
      headers: {
        ...request.headers,
      },
    });


    // Example: check for unauthorized response
    if (response.status === 401) {
      localStorage.clear();
    }
    // Return data in your custom format
    return {
      data: response.data,
      error: null,
      status_code: response.status,
    };
  } catch (error: any) {
    console.error("Axios error:", error);

    if (!error.response) {
      return {
        data: null,
        error: "Network error or server unreachable.",
        status_code: 502,
      };
    }

    // Check for `detail` in response
    const errorMessage =
      error.response.data?.detail ||
      error.response.data?.message ||
      error.message;

    return {
      data: null,
      error: errorMessage,
      status_code: error.response.status,
    };
  }
};

export interface AxiosApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status_code: number;
}
