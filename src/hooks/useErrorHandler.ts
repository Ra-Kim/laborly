import { clearCookies } from "@/lib/utils";
import { Id, toast } from "react-toastify";

export const useApiErrorHandler = (
  err: {
    status_code: number;
    message: string;
  },
  toastId?: Id
) => {
  if (err.status_code === 401 || err.status_code === 403) {
    clearCookies();
    toast.error(`${err?.message}`);
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(`/auth/sign-in`);
    }, 1000);
  }
  if (err.status_code === 429 || err.status_code === 404) {
    toast.clearWaitingQueue();
    return;
  }
  if (toastId) {
    if (err.status_code === 429 || err.status_code === 404) {
      toast.dismiss(toastId);
    }
    toast.update(toastId, {
      render: err.message.includes(`not found`)
        ? "Network error-an error occurred"
        : err.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  } else {
    toast.error(err.message);
  }
  setTimeout(() => toast.dismiss(), 5000);
};
