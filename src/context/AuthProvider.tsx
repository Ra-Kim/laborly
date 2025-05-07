import { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useAppThunkDispatch } from "@/redux/store";
import { logOut } from "@/redux/auth/thunkActions";
import { toast } from "react-toastify";
import { clearCookies } from "@/lib/utils";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const logout = async () => {
    const dispatch = useAppThunkDispatch();
    try {
      await dispatch(logOut("")).unwrap();
      clearCookies();
      localStorage.removeItem("token");
      window.location.href = "/auth/sign-in";
    } catch (error: any) {
      toast.error(error); // <-- This should show your error message
    }
  };

  function checkAuthentication() {
    const authToken = localStorage.getItem("role");
    return !!authToken;
  }

  function checkRole() {
    return localStorage.getItem("role") || "";
  }

  return (
    <AuthContext.Provider
      value={{ logout, isAuthenticated: checkAuthentication, role: checkRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
