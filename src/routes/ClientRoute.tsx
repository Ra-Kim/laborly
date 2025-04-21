import RequireRole from "@/Components/app/RequireRole";
import { ReactNode } from "react";

const ClientRoute = ({ children }: { children: ReactNode }) => (
  <RequireRole allowedRole="CLIENT">{children}</RequireRole>
);

export default ClientRoute;
