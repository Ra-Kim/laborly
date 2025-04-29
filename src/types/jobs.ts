export interface ICreateJob {
  service_id: string;
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
  client_id: string;
  created_at: string;
  updated_at: string;
}

export type jobStatus =
  | "NEGOTIATING"
  | "ACCEPTED"
  | "COMPLETED"
  | "FINALIZED"
  | "CANCELLED";
