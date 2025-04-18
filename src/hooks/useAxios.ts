import axios, { AxiosRequestConfig } from "axios";

export const useAxios = async (
  request: AxiosRequestConfig
): Promise<AxiosApiResponse> => {
  try {
    const response: AxiosApiResponse = await axios.request({
      ...request,
      headers: {
        ...request.headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // withCredentials: true,
    });

    if (response.status_code === 401) {
      localStorage.clear();
    }
    return response;
  } catch (error: any) {
    // Handle only network errors (no response at all)
    if (!error.response) {
      return {
        data: null,
        error: "Network error. Please check your internet connection.",
        status_code: 0,
      };
    }

    // Re-throw other errors to be handled by your existing error handler
    throw error;
  }
};

export interface AxiosApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status_code: number;
}
