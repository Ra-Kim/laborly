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
    completed_at: string;
    cancelled_at: string;
    cancel_reason: string;
  }