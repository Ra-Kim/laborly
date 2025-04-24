import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // update path as needed
import { ReactNode } from "react";

type UserRole = "CLIENT" | "WORKER";

interface RequireRoleProps {
  allowedRole: UserRole;
  children: ReactNode;
}

const RequireRole = ({ allowedRole, children }: RequireRoleProps) => {
  const location = useLocation();
  const { role, isAuthenticated } = useAuth(); // Replace with your actual auth hook

  if (!isAuthenticated()) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (!role() || role() !== allowedRole) {
    const redirectPath =
      role() === "CLIENT"
        ? "/client/dashboard"
        : role() === "WORKER"
        ? "/worker/dashboard"
        : "/auth/sign-in"; // fallback for unexpected roles

    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireRole;
