import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Define the allowed roles as a TypeScript union type
type UserRole = "CLIENT" | "WORKER";

interface RequireRoleProps {
  allowedRole: UserRole;
  children: ReactNode;
}

const RequireRole = ({ allowedRole, children }: RequireRoleProps) => {
  const location = useLocation();

  // Simulated role fetch (you can get from localStorage, context, auth provider, etc.)
  const role = localStorage.getItem("role") as UserRole | null;

  if (!role || role !== allowedRole) {
    const redirectPath = role === "CLIENT" ? "/client/dashboard" : "/worker/dashboard"
    return (<Navigate to={redirectPath} state={{ from: location }} replace />);
}

  return <>{children}</>;
};

export default RequireRole;
