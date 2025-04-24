import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const redirectToDashboard = (navigate: any, role: string | null) => {
  if (role === "WORKER") navigate("/worker/dashboard");
  else if (role === "CLIENT") navigate("/client/dashboard");
  else navigate("/auth/sign-in");
};