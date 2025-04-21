import { createContext } from "react";

export interface AuthContextType {
  logout: () => void;
  isAuthenticated: () => boolean;
  role: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



