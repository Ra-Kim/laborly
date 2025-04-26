export interface ICreateJob {
  service_id: string;
  worker_id: string;
  thread_id: string;
}

export interface IJob {
  id: string;
  service_id: string;
  worker_id: string;
  status: string;
  started_at: string;
  completed_at: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  client_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  created_at: "2025-04-26T13:44:46.934Z";
  updated_at: "2025-04-26T13:44:46.934Z";
}

export type jobStatus =
  | "NEGOTIATING"
  | "ACCEPTED"
  | "COMPLETED"
  | "FINALIZED"
  | "CANCELLED";
