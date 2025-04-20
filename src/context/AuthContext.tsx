import { createContext } from "react";

export interface AuthContextType {
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



