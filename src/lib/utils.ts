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

 export const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};