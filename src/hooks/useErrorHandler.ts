import { Id, toast } from "react-toastify";

export const useApiErrorHandler = (
  err: {
    status_code: number;
    message: string;
  },
  toastId?: Id
) => {
  if (err.status_code === 401) {
    toast.error(`${err?.message}`);
    localStorage.removeItem("token");
    localStorage.removeItem("tenantData");
    setTimeout(() => {
      window.location.replace(`/auth/login`);
    }, 1000);
  }
  if (toastId) {
    toast.update(toastId, {
      render: err.message.includes(`not found`)
        ? "Network error-an error occurred"
        : err.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
      toastId: "error",
    });
  } else {
    toast.error(err.message);
  }
  setTimeout(() => toast.dismiss(), 5000);
};
