import RequireRole from "@/Components/app/RequireRole";
import { ReactNode } from "react";

const WorkerRoute = ({ children }: { children: ReactNode }) => (
  <RequireRole allowedRole="WORKER">{children}</RequireRole>
);

export default WorkerRoute;
